---
name: readme-blueprint-generator
description: Describe when to use this prompt
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

Define the prompt content here. You can include instructions, examples, and any other relevant information to guide the AI's responses.

---
name: readme-blueprint-generator
description: Create or refresh an evidence-based README for this React, Vite, TypeScript, and Supabase daily-mood app.
argument-hint: "[create | update]"
---

# README blueprint generator

Create or update the repository's `README.md`. This prompt is specifically for the daily-mood application: users record or view a mood for a day, represented by an emoji and supporting text.

Treat the repository as the source of truth. General Copilot and design instructions already exist; follow them, but do not repeat or restate them in the README unless they directly affect how someone uses, configures, or contributes to this app.

## Working method

1. First inspect the existing `README.md` (if any), `package.json`, lockfile, TypeScript and Vite configuration, source tree, tests, Supabase files, migrations, and relevant files under `.github/`.
2. Identify facts from the codebase rather than assuming conventions. In particular, verify package-manager commands, scripts, routing, state/data-fetching approach, authentication behavior, Supabase client location, and deployment information.
3. Preserve correct useful material in an existing README, while replacing stale, duplicated, or unsupported statements. Do not create unrelated documentation files.
4. Do not expose secrets. Document environment-variable names and where to obtain values, but never place real values, service-role keys, access tokens, or credentials in `README.md`.
5. If a required detail is unavailable, use a short, explicit placeholder such as `TODO: add deployment URL` only when it helps a new contributor. Do not invent URLs, scripts, database columns, policies, test tools, badges, screenshots, or commands.

## Required README structure

Use clear Markdown and adapt section order only when the repository's established documentation style requires it. Include these sections when supported by the codebase:

1. **Title and overview**
   - State the product name if it can be determined; otherwise use a neutral working title.
   - Explain in a few sentences that the app presents daily moods through an emoji and readable text, and state the primary user value.
   - Add a concise feature list grounded in implemented behavior.

2. **Technology**
   - Identify React, Vite, TypeScript, and Supabase and their roles.
   - Include relevant versions only when they are visible in project configuration.
   - Mention other meaningful libraries only if the code uses them.

3. **Prerequisites and quick start**
   - State the required runtime/package manager based on the repository files.
   - Provide copyable install, environment setup, and local-development steps using the exact available scripts.
   - Include the local URL only when Vite configuration or normal project behavior supports it; clarify if it differs.

4. **Supabase and environment configuration**
   - Explain how to create or select a Supabase project only if the repository requires one.
   - Document each client-side environment variable found in the code (for example, a `VITE_`-prefixed Supabase URL and anonymous/publishable key), its purpose, and the expected local env file.
   - Describe how migrations, generated types, seed data, row-level security policies, and authentication are applied or configured when corresponding files exist.
   - Clearly distinguish browser-safe public configuration from server-only secrets. Never recommend putting a service-role key in a Vite client.

5. **How daily moods are displayed**
   - Describe the observed UI behavior: which date or dates appear, how a mood's emoji and text are rendered, and any empty, loading, error, or unauthenticated states present in the app.
   - Explain emoji handling accurately. If the code maps a mood value to an emoji, document that mapping or link to its source; if emoji is stored with the record, say so instead.
   - Do not claim that users can create, edit, delete, filter, or share moods unless that feature is implemented.

6. **Mood data model**
   - Document the actual table/type/interface or schema used for mood records.
   - Include a compact field table with field name, type/format, purpose, and constraints only where verified.
   - Cover identifiers, day/date representation, mood value or emoji, display text/notes, ownership, and timestamps only when present.
   - Explain relationships, validation, uniqueness, and RLS/access rules only when defined in migrations, policies, or code.

7. **Architecture and project layout**
   - Explain the data path from React UI through the app's data-access layer/Supabase client to Supabase.
   - Describe components, hooks, services, types, and routes using actual directory names and responsibilities.
   - Include a small Mermaid diagram only if it clarifies a real multi-step flow; otherwise keep the explanation prose-based.
   - Add a focused project-tree excerpt that excludes generated and dependency directories.

8. **Development, quality, and delivery commands**
   - Document the exact `package.json` commands for development, production build, preview, linting, type checking, formatting, and tests where available.
   - For each command, give a one-line purpose. Omit commands not defined by the project.
   - Note any Supabase CLI commands only if the repository uses or documents them.

9. **Project conventions and contributing**
   - Summarize only conventions that a contributor needs to follow and that are evidenced by configuration or existing project instructions: TypeScript practices, component/file conventions, import style, accessibility, testing, formatting, and commit/PR workflow.
   - Link to the relevant existing guidance rather than duplicating it.
   - Include license and deployment sections only when repository evidence exists.

## Writing and validation rules

- Write for a new developer who needs to run the app and understand its mood feature without reading the full codebase.
- Prefer concise explanations, tables for environment variables and data fields, and fenced shell blocks for commands.
- Use relative Markdown links that work on GitHub. Ensure every local link points to an existing file.
- Keep statements specific and verifiable. Flag genuine gaps rather than filling them with generic React, Vite, or Supabase advice.
- Keep the README aligned with the current implementation; do not alter application code, configuration, database files, or `.env` files while performing this task.
- Before finishing, re-check all mentioned scripts, filenames, variable names, schema details, and links against the repository. Then provide a brief summary of what was added or updated and any facts that still need a maintainer decision.
