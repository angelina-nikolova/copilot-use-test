# GitHub Copilot Instructions

## Product and stack

Build this as a production-quality, privacy-first daily journal web application with structured mood tracking. The stack is Vite, React, TypeScript, Supabase, Tailwind CSS, React Router, React Hook Form, Zod, date-fns, Lucide React, Vitest, React Testing Library, and Playwright. Deploy to Vercel.

Optimize for security, correctness, maintainability, user experience, then performance. Prefer simple, explicit, readable solutions over clever abstractions, unnecessary dependencies, or premature optimization.

## General Copilot behavior

- First follow the established codebase conventions; do not introduce a competing pattern without a clear need.
- Use TypeScript for all new application code: `.tsx` for React components and `.ts` for logic, hooks, services, schemas, and types.
- Keep TypeScript strict. Do not use `any`; model data, errors, props, and API boundaries explicitly.
- Prefer small, focused function components and hooks. Do not create class components or monolithic “do everything” components.
- Add or update focused tests whenever changing business logic, forms, authentication, database access, or a meaningful user flow.
- Do not invent requirements, silently weaken validation or authorization, expose sensitive data, or add an external library when the existing stack can solve the problem.
- When a decision is ambiguous, choose the smallest maintainable implementation that preserves future extensibility.

## Architecture and file organization

Use clean-architecture boundaries adapted for React:

- Pages are route-level composition only. They must not contain business rules or direct Supabase calls.
- Components render UI and delegate behavior to hooks and callbacks.
- Hooks coordinate React state, loading/error state, and feature services.
- Services/repositories own Supabase queries and mutations.
- Schemas validate inputs at the boundary; types define the domain contract.

Use a pragmatic hybrid organization. Keep shared code grouped by technical role, while colocating substantial journal, mood, and auth domain code in feature modules. Do not force tiny one-off components into their own feature folder.

```text
src/
├── app/
│   ├── providers/
│   └── router/
├── components/
│   └── ui/                 # reusable design-system primitives
├── features/
│   ├── auth/
│   ├── journal/
│   ├── mood/
│   └── settings/
├── hooks/                  # truly cross-feature hooks
├── lib/                    # configured clients and integrations
├── pages/                  # route components
├── types/                  # shared domain types only
└── utils/                  # pure cross-feature helpers
```

A substantial feature may contain `components/`, `hooks/`, a `*.service.ts`, `*.schema.ts`, and `*.types.ts`. Prefer a feature-local type or schema before promoting it to a shared folder.

```text
src/features/journal/
├── components/
│   ├── JournalEditor.tsx
│   └── JournalCard.tsx
├── hooks/
│   └── useJournalEntries.ts
├── journal.schema.ts
├── journal.service.ts
└── journal.types.ts
```

## TypeScript and naming

- Use `PascalCase` for components, interfaces, and types: `JournalEntry`, `MoodSelector.tsx`.
- Use `camelCase` for variables, functions, and hooks; hooks start with `use`: `createJournalEntry`, `useMoodEntries`.
- Use `UPPER_SNAKE_CASE` only for true global constants: `MAX_JOURNAL_LENGTH`.
- Use `kebab-case` for folders.
- Prefer semantic names over abbreviations. Use meaningful booleans: `isSaving`, `hasEntries`, `canEdit`.
- Convert database `snake_case` rows to an explicit application model at the service boundary when needed; do not scatter conversion logic through components.

```ts
export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
```

## React, routing, and state

- Use React Router with explicit route configuration under `src/app/router/`.
- Keep route components in `src/pages/`; pages compose features and manage route parameters only.
- Expected routes include `/`, `/journal`, `/journal/:id`, `/mood`, and `/settings`.
- Use `useState` and `useReducer` for local state. Use Context only for genuinely shared client state, such as the authenticated user or theme.
- For Supabase server data, use reusable custom hooks plus React state/Context. Do not add a data-fetching/state library unless requirements materially outgrow this approach.
- Every data-driven UI must explicitly render loading, error, empty, and success states. An empty journal should offer a clear next action, never a blank screen.
- Use an error boundary for unexpected render failures. Handle expected form, authentication, and request errors close to the interaction and show clear, non-technical messages.

## UI, styling, and accessibility

- Use Tailwind CSS. Build and reuse a small internal design system in `src/components/ui/` (for example, `Button`, `Input`, `Card`, `Modal`, and form primitives).
- Keep spacing, typography, borders, focus states, disabled states, and feedback states consistent. Avoid arbitrary one-off inline styles and duplicated class patterns.
- Design mobile-first, then enhance with Tailwind breakpoints for tablet and desktop.
- Support both light and dark themes: default to system preference and provide a manual user toggle. Use semantic theme tokens/classes rather than hard-coded colors.
- Use Lucide React for interface icons; do not use emoji or random SVG sources as primary UI icons.
- Use semantic HTML, visible labels, keyboard-accessible controls, logical focus order, sufficient contrast, and native elements before ARIA. Add ARIA only when semantic HTML cannot express the behavior.
- Dialogs, menus, and destructive confirmations must be keyboard operable and manage focus correctly.

## Forms and validation

- Use React Hook Form with Zod for journal, mood, authentication, profile, and settings forms.
- Define reusable schemas near the owning feature and infer types from them where appropriate.
- Validate on the client for UX, but treat client validation as non-authoritative; database constraints and RLS remain required.
- Provide field-level, actionable messages and preserve user input after recoverable submission failures.
- Never display raw Supabase, SQL, or stack-trace messages to users.

```ts
export const moodEntrySchema = z.object({
  mood: z.enum(["very_low", "low", "neutral", "good", "very_good"]),
  intensity: z.number().int().min(1).max(10),
  note: z.string().trim().max(500).optional(),
  occurredAt: z.string().datetime(),
});

export type MoodEntryInput = z.infer<typeof moodEntrySchema>;
```

## Supabase, authentication, and privacy

- Create exactly one browser Supabase client in `src/lib/supabase.ts`. Do not initialize clients inside components or create per-service clients.
- Components must never call Supabase directly. Feature services own database/auth calls; hooks consume those services and expose UI-ready state.
- Use Supabase email-and-password authentication. Keep auth behavior in `features/auth/`, separate from presentational components.
- Handle session restoration and auth changes through a single, well-owned auth provider/hook; unsubscribe listeners during cleanup.
- Protect all journal, mood, profile, and other user-owned data with Row Level Security. Every user-owned table must enforce ownership with `auth.uid()` in policies.
- Never disable or bypass RLS for convenience, rely on client-side authorization, expose a service-role key, or log journal text, mood notes, tokens, or sensitive profile data.
- Do not put sensitive journal data in local storage unless a requirement explicitly calls for it and the security implications are reviewed.
- Use least-privilege database policies and explicit foreign keys. UI checks may improve UX but are never authorization.

Example policy intent (adapt migrations to the actual schema):

```sql
alter table public.journal_entries enable row level security;

create policy "Users manage their own journal entries"
on public.journal_entries
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
```

## Database and migrations

- Use PostgreSQL conventions: plural `snake_case` tables and `snake_case` columns.
- Use UUID primary keys named `id`, foreign keys such as `user_id`, and `created_at` / `updated_at` timestamps where applicable.
- Keep journal and mood records private, normalized, and queryable. Add indexes only for demonstrated query patterns.
- Make every schema, policy, trigger, or seed change through a descriptive Supabase migration committed to Git. Do not rely on dashboard-only changes and never manually change production schema.

Suggested domain shape:

```text
user_profiles
  id (references auth.users.id)
  created_at
  updated_at

journal_entries
  id
  user_id
  content
  created_at
  updated_at

mood_entries
  id
  user_id
  mood
  intensity
  note (nullable)
  occurred_at
  created_at
  updated_at
```

Mood entries must use predefined values plus an intensity from 1 through 10 and an optional note. Do not store mood only as unstructured free text. This supports trends, charts, and later AI features.

## Journal behavior and dates

- Support journal create, read, update, and delete. Saves are explicit in the initial implementation.
- Design editing APIs and UI state so autosave can be added later without rewriting the feature; do not implement automatic autosave unless requested.
- Require a clear confirmation before deletion. Do not make destructive actions the default or irreversible without warning.
- Use date-fns for formatting, comparisons, and calculations. Put date logic in utilities/hooks rather than embedding complex calculations in components.
- Store and transmit timestamps consistently (prefer UTC ISO strings); render dates in the user’s locale/time zone when presenting them.

## Environment configuration and deployment

- Read Vite configuration only through `import.meta.env`.
- Use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` only for public browser configuration. The anon key is public but must still be protected by RLS; never expose server-only secrets to Vite.
- Commit `.env.example` with placeholder names only. Do not commit `.env`, `.env.local`, credentials, access tokens, or production data.
- Maintain separate local development, preview/staging, and production configurations—prefer separate Supabase projects/environments. Never mix development and production user data.
- Target Vercel with preview deployments for branches/pull requests and a separately configured production deployment.

## Testing and quality

- Use Vitest for unit tests, React Testing Library for component/integration tests, and Playwright for critical end-to-end journeys.
- Test behavior users observe, not implementation details. Mock service boundaries instead of mocking every internal function.
- Cover authentication flows, protected routing, journal CRUD, deletion confirmation, structured mood validation/tracking, error states, empty states, and important accessibility interactions.
- Test Supabase services and RLS-sensitive paths with realistic error handling. Never use a real production project or personal journal content in tests.
- Use ESLint, Prettier, and strict TypeScript. Keep imports organized, remove unused code, and address lint/type failures rather than suppressing them without a documented reason.

## Performance

- Make code correct and maintainable first. Avoid needless renders, over-fetching, and broad database queries.
- Select only needed columns, paginate or limit growing lists, and query by indexed ownership/date fields when appropriate.
- Lazy-load large routes or optional features when it materially improves initial load.
- Use `memo`, `useMemo`, and `useCallback` only when profiling, a concrete render path, or stable-reference behavior shows a benefit.

## Documentation and Git

- Maintain a practical `README.md` covering setup, local development, tests, environment variables, and deployment.
- Record meaningful architecture and security decisions when they affect future contributors. Prefer self-documenting code over comments that repeat the code.
- Use Conventional Commits, for example:

```text
feat: add mood tracking calendar
fix: validate journal entry length
refactor: simplify auth session hook
docs: update local setup guide
test: cover journal deletion confirmation
```

## AI-ready boundaries

- Keep mood and journal data structured and services isolated so future features such as summaries, reflections, and trend insights can be added cleanly.
- Do not add AI SDKs, API keys, prompt logic, or background processing until a feature explicitly requires them.
- When AI is introduced later, place it behind a dedicated service boundary, minimize the data sent, require explicit user consent where appropriate, and preserve the same privacy-first rules.

## Final generation checklist

When proposing or modifying code, ensure it is TypeScript-safe, follows the page → feature → hook → service boundary, has accessible Tailwind UI, handles loading/error/empty/success states, validates inputs with Zod, preserves RLS and private-data rules, uses migrations for schema changes, and includes proportionate tests.

