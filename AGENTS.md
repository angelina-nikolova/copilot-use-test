---
description: Describe when these instructions should be loaded by the agent based on task context
# applyTo: 'Describe when these instructions should be loaded by the agent based on task context' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file
---

<!-- Tip: Use /create-instructions in chat to generate content with agent assistance -->

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# Daily Journal — Agent Guide

## Source of truth (must follow)

AI agents **MUST** read and follow these repository instruction files before making changes. When guidance conflicts, use the most specific applicable instruction file; this guide provides Daily Journal product and architecture direction.

- [`.github/instructions/general.instructions.md`](../.github/instructions/general.instructions.md)
- [`.github/instructions/copilot-instructions.md`](../.github/instructions/copilot-instructions.md)
- [`.github/instructions/typescript-react.instructions.md`](../.github/instructions/typescript-react.instructions.md)
- [`.github/instructions/css-tailwind.instructions.md`](../.github/instructions/css-tailwind.instructions.md)

## Project intent

Build a calm, private daily-journaling web application with a mood tracker. The product should feel focused and trustworthy: a Notion-like editorial workspace, not a social feed or a gamified wellness app.

Primary stack:

- React + TypeScript
- Supabase (Postgres, Auth, Row Level Security, Storage only if attachments are introduced)
- A modern React build tool and component system already present in the repository

Priorities, in order:

1. Protect each user's private data.
2. Make daily writing and review effortless.
3. Keep the codebase understandable, testable, and cheap to change.
4. Preserve a restrained, accessible visual system.

## Working principles

- Inspect existing code, conventions, and dependencies before adding a pattern or package.
- Make the smallest coherent change that solves the task. Do not refactor unrelated code.
- Prefer explicit, boring code over clever abstractions.
- Keep domain logic independent of presentational components.
- Treat database migrations and RLS policies as application code: version them, review them, and test them.
- Do not expose, log, or place Supabase service-role credentials in browser code.
- If requirements affect schema, privacy, or authentication behavior and are ambiguous, state the assumption before implementing.

## Suggested architecture

Keep feature code close together while separating responsibilities:

```text
src/
  app/                 # App composition, routes, providers
  components/          # Reusable, domain-agnostic UI primitives
  features/
    journal/           # Entry editor, entry list, journal queries/types
    mood/              # Mood selection, trends, mood queries/types
    auth/              # Sign-in/out and account flows
  lib/
    supabase/          # Client setup and typed data-access helpers
    validation/        # Shared schemas and validation helpers
  hooks/               # Reusable hooks with a clear cross-feature purpose
  styles/              # Global tokens and base styles
supabase/
  migrations/          # Ordered SQL migrations, including RLS policies
  seed.sql             # Optional local development seed data only
```

Use feature folders for code that belongs to one user capability. Reusable UI components must not query Supabase or understand journal-specific data. Keep direct Supabase calls in feature data modules or a small repository layer, not scattered through JSX.

## React and TypeScript

- Use function components, named exports, and strict TypeScript. Do not use `any`; use `unknown` and narrow it when input is untrusted.
- Define domain types from generated Supabase database types where available. Keep UI-only types separate.
- Prefer `type` for object shapes and unions; use `interface` only when declaration merging or extension is intentional.
- Make component props narrow and explicit. Avoid catch-all prop bags and boolean-prop combinations that create unclear states.
- Keep rendering pure. Put I/O, subscriptions, and imperative browser behavior in effects or event handlers.
- Effects must have correct dependencies and cleanup. Do not use an effect to derive values that can be calculated during render.
- Use controlled form inputs for entry content and mood selection. Avoid premature global state; keep local editor state local.
- Extract hooks only for meaningful reusable behavior. A hook should expose a small, typed API and own its loading/error lifecycle.
- Prefer composition over a large configurable component. Use `children` and focused subcomponents where it improves clarity.
- Use stable list keys from database IDs, never array indexes for mutable journal-entry lists.

Example query boundary:

```ts
export async function getEntriesForMonth(monthStart: string): Promise<JournalEntry[]> {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('id, entry_date, title, content, mood, created_at, updated_at')
    .gte('entry_date', monthStart)
    .order('entry_date', { ascending: false });

  if (error) throw error;
  return data;
}
```

Select only needed columns. Never rely on the client to filter private rows; RLS must enforce ownership.

## Data model and Supabase

Use `auth.users` as the source of identity. Application tables reference it through `user_id uuid not null references auth.users(id) on delete cascade`.

Suggested baseline table:

```text
journal_entries
  id           uuid primary key default gen_random_uuid()
  user_id      uuid not null
  entry_date   date not null
  title        text nullable
  content      text not null default ''
  mood         smallint nullable
  created_at   timestamptz not null default now()
  updated_at   timestamptz not null default now()
```

- Add `unique (user_id, entry_date)` if the product allows one entry per day. If multiple entries per day are desired, model that deliberately instead.
- Validate mood with a database `check` constraint matching the UI scale, for example `mood between 1 and 5`.
- Add indexes for the actual access paths, typically `(user_id, entry_date desc)`. Do not add speculative indexes.
- Use migrations for every schema, function, trigger, index, and policy change. Never edit production schema manually as the only record of a change.
- Use a database trigger or an explicit trusted update path to maintain `updated_at`; be consistent across tables.
- Generate and commit/update TypeScript database types after schema changes according to the repository’s established workflow.

### Row Level Security

Enable RLS on every public application table. A user may only read and mutate rows whose `user_id` equals `auth.uid()`.

Baseline policy intent:

```sql
alter table public.journal_entries enable row level security;

create policy "Users can manage their own journal entries"
on public.journal_entries
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
```

- Policies are mandatory even when client queries filter by `user_id`.
- Do not accept `user_id` from a form as authority. Derive it from the authenticated session or let the policy reject mismatches.
- Never weaken RLS to make a query work. Fix the query, policy, or server-side boundary instead.
- Use a server-only environment for the service-role key, only for carefully justified administrative operations. It bypasses RLS.
- Store user attachments in user-scoped paths, enforce Storage policies, validate file type and size, and avoid public buckets for journal content.

### Auth and sessions

- Use Supabase Auth’s supported session flow for the chosen React architecture.
- Show explicit loading and signed-out states while session status resolves; do not briefly render private content before auth is known.
- Protect routes and data loaders, but treat RLS as the final authorization layer.
- Handle expired sessions gracefully: preserve unsaved local draft content where practical, prompt the user to sign in again, and never silently discard writing.
- Do not display raw authentication-provider errors to users. Map them to safe, actionable messages.

## State and data fetching

- Separate server data (entries, profile) from UI state (open editor, filter, draft). Use a proven query/cache library only if it is already installed or its benefits clearly justify adding it.
- Model loading, empty, error, and success states for every async screen.
- After a mutation, update/invalidate the relevant cached data consistently. Do not rely on a full page reload.
- Use optimistic updates only when rollback is clear and the interaction materially benefits. Saving journal text should communicate its state honestly.
- Debounce autosave thoughtfully; show `Saving…`, `Saved`, and recoverable failure states. Keep the last local draft until persistence succeeds.
- Avoid broad `select('*')`, duplicate requests caused by effects, and data fetching inside deeply nested presentational components.

## Forms, validation, and errors

- Validate at three layers: accessible client feedback for usability, shared server/API validation where applicable, and database constraints for integrity.
- Prefer a schema validator already used in the project. Centralize rules such as title length, content length, allowed mood values, and date formatting.
- Trim and normalize input only when it does not unexpectedly change the user’s writing. Preserve journal body line breaks.
- Never render user-authored journal content as unsafe HTML. If rich text is added later, sanitize with a well-maintained allowlist before rendering.
- Surface useful messages with a next action. Log technical detail only through the project’s approved observability path and never include journal body content, tokens, or personal data.
- Use error boundaries for unexpected rendering failures and provide a safe retry path for recoverable request failures.

## UI and UX direction

The visual language is quiet, editorial, and Notion-inspired: strong typography, generous whitespace, subtle surfaces, small-radius borders, restrained hierarchy, and fast keyboard-friendly editing.

- Do not use emoji as icons, mood indicators, or decorative UI. Use text labels, simple iconography, or an accessible visual scale instead.
- Do not use purple gradients. Avoid decorative gradients generally; prefer neutral backgrounds and a limited, purposeful accent color.
- Avoid overly rounded cards, excessive shadows, glass effects, animated backgrounds, or dashboard clutter.
- Make the mood tracker legible without relying only on color. Pair each value with a text label and/or number.
- Prioritize the writing surface. Entry controls should be discoverable but not compete with the editor.
- Support empty states that invite the first entry without being sentimental or intrusive.
- Respect `prefers-reduced-motion`; keep motion brief and functional.
- Maintain responsive behavior for narrow screens, especially the editor, date navigation, and mood controls.
- Use design tokens/CSS variables for color, spacing, type scale, radii, and elevations. Do not introduce one-off values when a token fits.

## Accessibility

- Use semantic HTML first: headings in order, `button` for actions, `label` for fields, and native form controls when suitable.
- Ensure all features work by keyboard, including entry navigation, mood selection, saving, dialogs, and menus.
- Keep visible focus indicators. Never remove outlines without a clear accessible replacement.
- Provide text alternatives for icons and use `aria-label` only where visible text cannot do the job.
- Use `aria-live` sparingly for save status and form errors; do not create noisy announcements while the user types.
- Meet WCAG AA contrast for text and interactive controls. Verify color is not the only way to communicate status.
- Manage focus when opening/closing dialogs and after meaningful state changes.

## Testing and quality checks

- Run the repository’s formatter, linter, type checker, and test suite before handing off a change.
- Unit-test pure domain logic, validation, date behavior, and data mapping.
- Component-test critical states: loading, empty, error, keyboard interaction, validation feedback, and saving states.
- Add integration/end-to-end coverage for essential user journeys: sign in, create/edit an entry, set mood, view past entries, and data isolation between users.
- Test RLS with at least two authenticated users and verify that cross-user select, update, insert-with-foreign-user-id, and delete attempts fail.
- Use deterministic dates/time zones in tests. Journal dates should be defined as local calendar dates, not derived carelessly from UTC timestamps.
- Do not lower coverage or delete failing tests to make a change pass without explaining why.

## Performance and reliability

- Keep initial JavaScript small; lazy-load routes or heavyweight editor/chart features when worthwhile.
- Paginate or window long histories. Do not load every entry for a long-lived account at once.
- Memoize only after identifying a meaningful render cost; avoid obscuring ordinary code with blanket memoization.
- Use database indexes informed by query plans and production-like data volume.
- Guard against duplicate submissions and concurrent saves. Use an idempotent upsert for the one-entry-per-day model where appropriate.
- Avoid storing large journal content in analytics, URLs, browser history, or client logs.

## Environment variables

- Commit an `.env.example` with variable names and safe placeholders, never real values.
- Browser-safe variables may include the Supabase URL and anonymous/publishable key, using the build tool’s required public prefix.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. It must never be bundled, committed, or referenced by client modules.
- Fail clearly at startup when required configuration is missing. Validate environment variables in one configuration module rather than reading them ad hoc across the app.
- Rotate exposed credentials immediately and audit deployment configuration; deleting a local file does not revoke a leaked key.

## Git and delivery practices

- Keep commits small and single-purpose, with imperative messages such as `Add journal entry RLS policy`.
- Include schema migrations, generated type updates, and relevant tests in the same change when a data contract changes.
- Do not commit `.env` files, access tokens, production exports, user entries, or screenshots containing private journal data.
- Before merging, review for privacy regressions, broken auth flows, inaccessible controls, and unintended schema/policy changes.
- Document meaningful architectural decisions briefly near the code or in the project documentation; avoid stale, duplicated documentation.

## Explicit do / don’t rules

### Do

- Do keep journal data private by default and enforce it in RLS.
- Do make save status and failures visible without alarming the user.
- Do use typed, narrow data-access functions and validated inputs.
- Do preserve drafts when possible and make destructive actions confirmable and recoverable.
- Do design every feature for keyboard use, small screens, and clear empty/error states.
- Do add migrations and tests whenever behavior or data contracts change.

### Don’t

- Don’t put the service-role key, secrets, or privileged database logic in the client.
- Don’t disable, bypass, or rely on client-side filtering instead of RLS.
- Don’t use `any`, unchecked casts, raw HTML rendering, or untyped Supabase response handling.
- Don’t use emoji, purple gradients, noisy decorative effects, or gamification that distracts from writing.
- Don’t silently lose unsaved text, hide failed saves, or expose raw backend error messages.
- Don’t introduce a new state library, UI kit, editor, or dependency without a concrete need and maintenance rationale.
- Don’t rewrite unrelated code or alter existing user data as part of a feature implementation.

## Definition of done

A change is ready when it is typed, formatted, linted, tested at an appropriate level, works in loading/empty/error states, respects accessibility and responsive behavior, and preserves user-data privacy through schema and RLS protections. Document any known limitation or follow-up instead of hiding it.
