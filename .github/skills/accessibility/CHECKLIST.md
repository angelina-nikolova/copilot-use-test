# React + TypeScript + Vite Engineering Checklist

## Purpose & Usage

- [ ] Use this checklist when creating, changing, reviewing, or preparing a React + TypeScript + Vite project for release.
- [ ] Apply only the items relevant to the change; record intentional exceptions in the pull request or project documentation.
- [ ] Prefer existing project conventions when they differ from a generic recommendation.

## Reference Files

- [ ] `package.json` — scripts, dependencies, engines, package manager.
- [ ] `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — TypeScript settings.
- [ ] `vite.config.ts` — Vite plugins, aliases, development server, build options.
- [ ] `src/main.tsx` — application bootstrap and global providers.
- [ ] `src/App.tsx` — root UI composition, if applicable.
- [ ] `src/styles/` or `src/index.css` — global styles, tokens, resets.
- [ ] `src/components/` — reusable UI components.
- [ ] `src/features/` — feature-oriented modules, when used.
- [ ] `src/hooks/` — shared React hooks.
- [ ] `src/lib/` or `src/utils/` — framework-independent utilities.
- [ ] `src/types/` — shared TypeScript types.
- [ ] `src/assets/` — static assets imported by application code.
- [ ] `public/` — files served unchanged at the site root.
- [ ] `tests/`, `src/**/*.test.ts(x)`, or `src/**/*.spec.ts(x)` — automated tests.
- [ ] `.env.example` — documented environment-variable names without secrets.
- [ ] `.eslintrc*`, `eslint.config.*`, `.prettierrc*` — quality and formatting rules.
- [ ] `.github/workflows/` — CI, test, and deployment workflows.

## Project Structure

- [ ] Keep application source code under `src/`.
- [ ] Group code consistently by feature, domain, or component responsibility.
- [ ] Keep reusable components, hooks, utilities, and types discoverable and narrowly scoped.
- [ ] Avoid deeply nested directories and unclear catch-all folders.
- [ ] Co-locate tests, styles, and component-specific types when that improves maintainability.
- [ ] Use descriptive, consistent filenames and exports.
- [ ] Avoid circular imports between modules.
- [ ] Keep framework-independent business logic separate from React rendering code where practical.
- [ ] Remove unused files, exports, assets, and dead code.

## TypeScript

- [ ] Enable strict TypeScript settings unless a documented compatibility constraint prevents it.
- [ ] Avoid `any`; use explicit types, generics, `unknown`, or type guards instead.
- [ ] Define types from domain concepts rather than duplicating object shapes.
- [ ] Prefer `interface` for extendable object contracts and `type` for unions, aliases, and compositions.
- [ ] Model nullable and optional values accurately.
- [ ] Narrow `unknown` values at boundaries such as APIs, storage, forms, and events.
- [ ] Type component props, hook arguments, hook return values, and public utility APIs.
- [ ] Use discriminated unions for states with mutually exclusive variants.
- [ ] Avoid unsafe type assertions; validate before asserting when data is external or uncertain.
- [ ] Keep generated or API-contract types separate from hand-authored UI types where useful.
- [ ] Run `tsc --noEmit` or the project type-check script before merging.

## React Components

- [ ] Keep components focused on one clear responsibility.
- [ ] Use function components and typed props.
- [ ] Name components after the user-facing concept or responsibility they represent.
- [ ] Prefer composition over large components with many boolean mode props.
- [ ] Keep presentational components separate from data-fetching or orchestration logic when complexity warrants it.
- [ ] Use stable, meaningful keys for rendered lists; never use array indexes when items can reorder, insert, or delete.
- [ ] Avoid unnecessary wrapper elements; use fragments where appropriate.
- [ ] Avoid mutating props, state, context values, or objects received from external code.
- [ ] Make empty, loading, success, and error behavior explicit.
- [ ] Document non-obvious component constraints and public props.

## Hooks, State, and Effects

- [ ] Call hooks only at the top level of React components or custom hooks.
- [ ] Extract repeated stateful logic into well-named custom hooks.
- [ ] Keep state as local as possible; lift it only when multiple consumers need it.
- [ ] Store the minimal source of truth and derive values during rendering when feasible.
- [ ] Use immutable updates for objects and arrays.
- [ ] Use functional state updates when the next value depends on the previous one.
- [ ] Avoid duplicating server state in local state unless there is a clear synchronization strategy.
- [ ] Use `useEffect` only for synchronization with external systems, subscriptions, timers, or imperative APIs.
- [ ] Include correct effect dependencies; do not suppress dependency warnings without a documented reason.
- [ ] Clean up subscriptions, timers, observers, and in-flight effects when required.
- [ ] Guard against stale responses and updates after unmounting.
- [ ] Use `useMemo` and `useCallback` only when they solve a measured rendering or referential-stability problem.
- [ ] Avoid putting derived values, event handling, or ordinary calculations into effects.

## Vite and Configuration

- [ ] Keep `vite.config.ts` minimal, typed, and version-controlled.
- [ ] Configure path aliases consistently in both Vite and TypeScript.
- [ ] Use `import.meta.env` for Vite environment variables.
- [ ] Prefix browser-exposed variables with `VITE_`.
- [ ] Never place secrets in `VITE_*` variables or client-side bundles.
- [ ] Provide `.env.example` with required variable names and safe example values.
- [ ] Validate required environment variables at startup or build time.
- [ ] Use Vite plugins only when they have a clear need and active maintenance.
- [ ] Configure the development server, base path, and asset handling for the deployment target.
- [ ] Review manual chunking and bundle settings only when bundle analysis supports the change.
- [ ] Keep source maps appropriate to the environment and security requirements.

## Accessibility

- [ ] Use semantic HTML before adding ARIA attributes.
- [ ] Ensure every interactive element is keyboard accessible.
- [ ] Use native `<button>` elements for actions and `<a>` elements for navigation.
- [ ] Provide visible, high-contrast focus indicators.
- [ ] Associate every form control with a visible or programmatic label.
- [ ] Provide text alternatives for meaningful images and icons.
- [ ] Mark decorative images appropriately.
- [ ] Maintain logical heading order and page landmarks.
- [ ] Use sufficient color contrast and do not communicate meaning by color alone.
- [ ] Announce important dynamic updates with appropriate live regions when needed.
- [ ] Manage focus when opening dialogs, changing routes, or revealing errors.
- [ ] Ensure dialogs can be dismissed and trap focus while open.
- [ ] Test common flows with keyboard-only navigation and a screen reader where possible.

## Performance

- [ ] Measure before optimizing with browser profiling, bundle analysis, or production metrics.
- [ ] Avoid unnecessary re-renders caused by unstable props, context values, or effects.
- [ ] Code-split route-level or large optional features when it improves initial load.
- [ ] Use lazy loading with a meaningful loading fallback.
- [ ] Optimize images with suitable dimensions, formats, loading behavior, and `srcset` where applicable.
- [ ] Avoid shipping large unused libraries or duplicate dependency versions.
- [ ] Virtualize very large lists when rendering becomes expensive.
- [ ] Debounce or throttle high-frequency work such as search, resize, and scroll handling when appropriate.
- [ ] Avoid expensive calculations during every render; cache only when profiling justifies it.
- [ ] Verify production bundle size and runtime performance after material changes.

## Forms and Validation

- [ ] Use controlled or intentionally uncontrolled inputs consistently.
- [ ] Validate user input both client-side for usability and server-side for trust boundaries.
- [ ] Show clear, actionable validation messages near the relevant control.
- [ ] Preserve entered values when a non-destructive validation or network error occurs.
- [ ] Prevent duplicate submissions while a request is pending.
- [ ] Disable submission only when users can understand how to resolve the disabled state.
- [ ] Support keyboard submission and sensible input types, autocomplete, and mobile input modes.
- [ ] Focus the first relevant error or provide an accessible error summary after failed submission.
- [ ] Normalize and validate data at the boundary before it reaches application logic.
- [ ] Avoid logging sensitive submitted values.

## Loading, Empty, and Error States

- [ ] Define loading behavior for every asynchronous user flow.
- [ ] Use loading UI that preserves layout and communicates progress appropriately.
- [ ] Provide useful empty states with a next action where relevant.
- [ ] Handle expected API, network, authorization, and validation failures.
- [ ] Use error boundaries around meaningful application or route boundaries.
- [ ] Provide retry behavior when retrying is safe and useful.
- [ ] Avoid exposing stack traces, internal identifiers, or sensitive backend details to users.
- [ ] Log actionable error context through the approved monitoring solution.
- [ ] Ensure failed requests do not leave controls permanently disabled or UI misleadingly stale.

## Security and Privacy

- [ ] Treat all client input, URL values, storage values, and API responses as untrusted.
- [ ] Do not embed secrets, private keys, tokens, or credentials in source code or client environment variables.
- [ ] Avoid `dangerouslySetInnerHTML`; sanitize trusted HTML with an approved sanitizer when unavoidable.
- [ ] Avoid constructing executable code from strings.
- [ ] Encode or validate user-controlled values used in URLs, redirects, queries, and rendered content.
- [ ] Use secure authentication and authorization checks on the server; client checks are for UX only.
- [ ] Store sensitive data only when necessary and according to project policy.
- [ ] Avoid exposing sensitive data in logs, analytics, error reports, or browser storage.
- [ ] Review third-party scripts, SDKs, and package permissions before adoption.
- [ ] Configure production security headers and Content Security Policy at the hosting layer where applicable.

## Testing

- [ ] Test user-visible behavior rather than implementation details.
- [ ] Cover primary success paths, edge cases, loading states, empty states, and failure states.
- [ ] Use accessible queries such as role, label, and visible text in component tests.
- [ ] Mock network boundaries rather than internal implementation details where practical.
- [ ] Test custom hooks and utilities independently when they contain significant logic.
- [ ] Add regression tests for fixed defects when practical.
- [ ] Include integration tests for critical multi-component flows.
- [ ] Add end-to-end coverage for high-value journeys such as sign-in, checkout, or core workflows.
- [ ] Keep tests deterministic; avoid dependence on time, network, order, or shared mutable state.
- [ ] Run the complete relevant test suite before merging.

## Linting and Formatting

- [ ] Use ESLint with TypeScript and React-aware rules.
- [ ] Enable hooks linting rules.
- [ ] Use a consistent formatter such as Prettier where adopted by the project.
- [ ] Ensure linting, formatting, type-checking, and tests run in CI.
- [ ] Avoid broad lint disables; scope and explain exceptions.
- [ ] Keep imports ordered according to project conventions.
- [ ] Remove unused imports, variables, dependencies, and suppression comments.
- [ ] Verify formatting before committing.

## Dependencies

- [ ] Prefer platform and existing project capabilities before adding a dependency.
- [ ] Evaluate maintenance activity, license, bundle impact, security history, and API fit before adding packages.
- [ ] Use the project’s locked package manager and commit lockfile updates.
- [ ] Pin or constrain versions according to project policy.
- [ ] Remove packages that are no longer used.
- [ ] Run dependency vulnerability checks using the approved package-manager or CI workflow.
- [ ] Review major-version upgrades for breaking changes and migration requirements.
- [ ] Avoid importing entire utility libraries when a smaller import or native API suffices.

## Build and Production Readiness

- [ ] Confirm production builds succeed from a clean install.
- [ ] Run type-checking, linting, tests, and the production build before release.
- [ ] Verify environment variables and deployment configuration for the target environment.
- [ ] Confirm the configured Vite `base` path matches the hosting location.
- [ ] Test the built application locally or in a preview environment.
- [ ] Verify direct navigation and refresh behavior for client-side routes.
- [ ] Confirm static assets resolve correctly in the deployed environment.
- [ ] Check error monitoring, analytics, and feature flags for the release environment.
- [ ] Review source-map exposure and production logging behavior.
- [ ] Confirm rollback, cache invalidation, and release notes procedures when applicable.

## Code Review

- [ ] Confirm the change has a clear user or business purpose.
- [ ] Verify the implementation matches existing architecture and conventions.
- [ ] Check naming, module boundaries, and public APIs for clarity.
- [ ] Review state transitions, async behavior, cleanup, and race conditions.
- [ ] Review accessibility, keyboard behavior, and responsive behavior.
- [ ] Review security-sensitive data flows, rendering, redirects, and external inputs.
- [ ] Verify test coverage is proportionate to the change’s risk.
- [ ] Confirm no unrelated refactors, generated files, secrets, or debug artifacts are included.
- [ ] Check production build output and CI results.
- [ ] Document follow-up work, known limitations, and intentional exceptions.