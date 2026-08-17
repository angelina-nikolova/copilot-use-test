# Accessibility Skill

## Purpose

The **Accessibility Skill** provides a structured approach for reviewing and improving accessibility across the application.

It should help verify that **components, pages, forms, buttons, menus, navigation, interactive elements, content, and application flows** are accessible, usable, and performant for users with disabilities.

The skill should prioritize **WCAG 2.2**, semantic HTML, keyboard accessibility, screen-reader compatibility, responsive behavior, and accessibility-related performance considerations.

---

## Project Context

This project uses:

- **Vite**
- **React**
- **TypeScript**
- **Supabase**
- Web-based user interface
- Daily journal / mood-tracking functionality

Accessibility checks must respect the existing project architecture, design system, reusable components, and established coding conventions.

Do not introduce unnecessary dependencies or architectural changes solely to address an accessibility issue.

---

## Core Responsibilities

The Accessibility Agent must be able to:

1. Audit individual React components.
2. Audit complete pages.
3. Audit application-wide navigation.
4. Review forms and validation.
5. Review buttons and interactive controls.
6. Review menus, dialogs, popovers, dropdowns, tabs, accordions, and similar widgets.
7. Review keyboard navigation.
8. Review screen-reader compatibility.
9. Review semantic HTML.
10. Review focus management.
11. Review ARIA usage.
12. Review color contrast and visual accessibility.
13. Review responsive/mobile accessibility.
14. Review reduced-motion behavior.
15. Review accessibility of loading, error, empty, and success states.
16. Review accessibility regressions introduced by recent changes.
17. Identify accessibility-related performance problems.
18. Recommend concrete fixes.
19. Implement fixes when explicitly requested.
20. Re-check affected functionality after changes.

---

# Accessibility Standards

Use the following standards as the primary reference:

- **WCAG 2.2**
- WCAG principles:
  - Perceivable
  - Operable
  - Understandable
  - Robust
- Prefer **Level AA** compliance as the project target.
- Follow established semantic HTML and WAI-ARIA practices.
- Prefer native HTML accessibility features over custom ARIA implementations.

Do not add ARIA attributes when native HTML already provides the required semantics.

---

# Audit Priority

Classify findings using:

### Critical

Issues that prevent users from accessing or completing essential functionality.

Examples:

- Keyboard users cannot operate essential functionality.
- Interactive controls cannot receive focus.
- A form cannot be submitted without a mouse.
- Essential information is completely unavailable to screen readers.
- Focus becomes trapped or lost in a critical workflow.

### High

Major accessibility barriers affecting important functionality.

Examples:

- Missing form labels.
- Incorrect heading structure affecting navigation.
- Broken modal focus management.
- Insufficient color contrast for essential content.
- Important dynamic updates are not announced.

### Medium

Meaningful accessibility problems with workarounds.

Examples:

- Missing accessible names on secondary controls.
- Poor focus visibility.
- Incorrect ARIA relationships.
- Inconsistent keyboard interaction.

### Low

Minor improvements or best-practice deviations.

Examples:

- Minor semantic improvements.
- Redundant ARIA.
- Non-critical accessibility enhancements.

---

# Semantic HTML

Prefer semantic HTML over generic elements.

Use appropriate elements such as:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `aside`
- `footer`
- `button`
- `a`
- `form`
- `label`
- `fieldset`
- `legend`
- `table`

Avoid using:

```tsx
<div onClick={...}>
```

when a semantic interactive element such as `button` is appropriate.

Do not recreate native browser behavior unnecessarily.

---

# Keyboard Accessibility

Every interactive feature must be usable with a keyboard.

Verify:

- `Tab` navigation
- `Shift + Tab`
- `Enter`
- `Space`
- Arrow keys where appropriate
- `Escape`
- Home/End where appropriate
- Logical tab order
- No keyboard traps
- Visible focus indicator
- Focus restoration after dialogs or menus close

Do not rely exclusively on:

- mouse hover
- pointer events
- drag-and-drop
- touch gestures

Provide an accessible keyboard alternative where necessary.

---

# Focus Management

Check focus behavior for:

- dialogs
- modals
- menus
- dropdowns
- popovers
- drawers
- route changes
- dynamically inserted content
- form validation
- asynchronous operations

When opening a modal:

1. Move focus into the modal appropriately.
2. Prevent inappropriate interaction with background content.
3. Maintain logical focus behavior.
4. Return focus to the triggering element when the modal closes, unless another destination is more appropriate.

Do not remove focus outlines without providing an equivalent visible focus indicator.

---

# Forms

Every form control must have an accessible name.

Verify:

- `<label>` association
- `htmlFor` / `id`
- Accessible names
- Required fields
- Error messages
- Validation states
- Help text
- Grouped controls
- Checkbox and radio semantics
- Keyboard interaction
- Screen-reader announcements

Example:

```tsx
<label htmlFor="journal-title">
  Title
</label>

<input
  id="journal-title"
  name="title"
/>
```

Do not rely solely on placeholders as labels.

---

# Form Validation

Validation must be accessible.

Errors should:

- Clearly identify the affected field.
- Explain what needs to be corrected.
- Be associated with the relevant input.
- Be understandable without relying only on color.
- Be discoverable by screen readers.

Prefer relationships such as:

```tsx
aria-describedby
aria-invalid
```

when appropriate.

Avoid displaying only:

```text
Invalid field
```

without explaining the problem.

---

# Buttons

Buttons must:

- Have an accessible name.
- Clearly communicate their purpose.
- Be keyboard accessible.
- Have a visible focus state.
- Provide an appropriate disabled/loading state.

Icon-only buttons require an accessible name.

Example:

```tsx
<button
  type="button"
  aria-label="Delete journal entry"
>
  <TrashIcon aria-hidden="true" />
</button>
```

Do not use visible icons as the only accessible name unless their meaning is reliably exposed.

---

# Links

Use links for navigation.

Use buttons for actions.

Avoid:

```tsx
<a onClick={handleDelete}>
```

when the interaction is an action rather than navigation.

Verify:

- meaningful link text
- keyboard accessibility
- visible focus
- destination clarity
- no misleading link semantics

Avoid generic link labels such as:

- Click here
- Read more
- Learn more

when the context does not make their destination clear.

---

# Navigation

Verify:

- Landmark structure
- Navigation landmarks
- Logical heading hierarchy
- Keyboard accessibility
- Current-page indication
- Skip navigation mechanism where appropriate
- Mobile navigation accessibility
- Menu open/close behavior
- Focus management

The application should provide a logical navigation experience for keyboard and screen-reader users.

---

# Headings

Maintain a logical heading hierarchy.

Use:

```html
<h1>
<h2>
<h3>
```

according to document structure.

Do not choose heading levels solely for visual styling.

Do not use headings as generic text styling.

Each important page should have a clear primary heading.

---

# ARIA

Follow the principle:

> No ARIA is better than incorrect ARIA.

Before adding ARIA:

1. Determine whether semantic HTML solves the problem.
2. Determine whether the existing ARIA is correct.
3. Check accessible name and role.
4. Check state and property relationships.
5. Verify behavior with keyboard and screen readers.

Avoid unnecessary:

```tsx
role="button"
```

when a native:

```tsx
<button>
```

can be used.

Do not use ARIA to hide genuine accessibility problems.

---

# Dynamic Content

Review dynamic UI states such as:

- loading
- saving
- success
- error
- empty state
- asynchronous updates
- notifications
- validation messages

Important status changes should be communicated appropriately to assistive technologies.

Consider:

```tsx
aria-live
role="status"
role="alert"
```

only when appropriate.

Avoid excessive live-region announcements.

---

# Dialogs and Modals

Dialogs must have:

- Accessible name
- Correct dialog semantics
- Keyboard support
- Escape behavior where appropriate
- Correct focus handling
- Appropriate background interaction behavior
- Focus restoration

Verify that screen-reader users can understand:

- why the dialog opened
- what action is expected
- how to close it

---

# Menus and Dropdowns

Review:

- keyboard navigation
- focus management
- accessible names
- open/closed state
- Escape behavior
- arrow-key behavior when applicable
- click/touch behavior
- outside-click behavior

Do not implement menu behavior that conflicts with established ARIA patterns.

---

# Color and Visual Accessibility

Check:

- text contrast
- interactive-element contrast
- focus indicators
- disabled-state clarity
- error-state clarity
- success-state clarity
- information conveyed by color alone

Never communicate important information using color alone.

For example, avoid:

```text
Red = error
Green = success
```

without an additional textual, semantic, or icon-based indication.

---

# Responsive Accessibility

Test accessibility across:

- desktop
- tablet
- mobile
- narrow viewport
- zoomed content

Check:

- horizontal scrolling
- clipped text
- inaccessible controls
- touch target usability
- responsive menus
- focus visibility
- content reflow

Accessibility must not depend on a specific screen size.

---

# Motion and Animation

Respect user preferences for reduced motion.

When animations are used, consider:

```css
@media (prefers-reduced-motion: reduce) {
  ...
}
```

Avoid unnecessary:

- flashing
- rapidly moving content
- distracting transitions
- animations that interfere with interaction

Do not make critical information dependent on animation.

---

# Images and Media

Every meaningful image must have appropriate alternative text.

Decorative images should generally use:

```tsx
alt=""
```

Verify:

- meaningful alt text
- decorative image handling
- informative icons
- SVG accessibility
- media controls
- captions/transcripts where applicable

Do not describe decorative images unnecessarily.

---

# Icons

For decorative icons:

```tsx
aria-hidden="true"
```

may be appropriate.

For meaningful icons:

- provide an accessible name
- ensure the meaning is available without relying solely on visual appearance

Icon-only interactive controls must always have an accessible name.

---

# Tables

When tables are used, verify:

- table semantics
- header cells
- relationships between headers and cells
- captions where useful
- responsive behavior
- screen-reader navigation

Do not use tables for layout.

---

# Performance and Accessibility

Accessibility reviews must also consider performance.

Look for:

- unnecessary re-renders
- expensive accessibility-tree updates
- excessive DOM complexity
- unnecessary animations
- blocking JavaScript
- delayed interaction readiness
- inefficient event handlers
- excessive live-region updates

Do not sacrifice accessibility for micro-optimizations.

Accessibility should remain the priority when performance and accessibility concerns conflict.

---

# React-Specific Checks

Review React implementations for:

- stable element semantics
- correct event handling
- keyboard event handling
- focus refs
- conditional rendering
- dynamic component states
- portals
- modal rendering
- hydration-related issues where applicable
- controlled/uncontrolled form behavior
- accessible component abstractions

Be especially careful when conditional rendering removes the currently focused element.

---

# Testing Strategy

Use multiple levels of testing.

## Static Analysis

Check for common issues using project-supported tools such as:

- ESLint accessibility rules
- TypeScript
- existing accessibility linting configuration

Do not introduce new dependencies unless necessary.

## Automated Testing

Where testing infrastructure exists, verify:

- accessible roles
- accessible names
- keyboard behavior
- form errors
- focus behavior
- dialog behavior

Prefer user-oriented assertions over implementation details.

## Manual Testing

When appropriate, manually verify:

- keyboard-only navigation
- focus visibility
- zoom
- responsive layouts
- screen-reader behavior
- reduced motion
- error and loading states

Automated tests must not be considered sufficient by themselves.

---

# Review Workflow

When reviewing a component or page:

### Step 1 — Understand

Identify:

- purpose
- user workflow
- interactive elements
- dynamic states
- navigation behavior
- dependencies

### Step 2 — Inspect Structure

Check:

- semantic HTML
- landmarks
- headings
- labels
- roles
- accessible names

### Step 3 — Test Interaction

Check:

- keyboard
- focus
- mouse/pointer
- touch
- screen-reader behavior where possible

### Step 4 — Check Visual Accessibility

Check:

- contrast
- focus indicators
- zoom
- responsive behavior
- motion

### Step 5 — Check Dynamic States

Check:

- loading
- errors
- success
- empty states
- asynchronous updates

### Step 6 — Check Performance

Identify accessibility-related performance concerns without introducing premature optimization.

### Step 7 — Report Findings

Every finding should contain:

- Severity
- Location
- Problem
- Why it matters
- Recommended fix
- Relevant WCAG principle/success criterion when reasonably identifiable

### Step 8 — Verify

After implementing fixes:

- re-run relevant tests
- re-check keyboard behavior
- re-check focus
- re-check affected screen-reader semantics
- confirm no regression

---

# Expected Review Format

Use the following structure when reporting an audit:

```text
## Accessibility Audit

### Summary

Overall accessibility status and key findings.

### Critical Issues

- [ ] Finding
  - Location:
  - Impact:
  - Recommendation:
  - WCAG:

### High Issues

...

### Medium Issues

...

### Low Issues

...

### Passed Checks

- Semantic HTML
- Keyboard navigation
- Focus management
- Forms
- ARIA
- Responsive behavior
- Reduced motion
- Dynamic states

### Recommended Next Steps

1. ...
2. ...
3. ...
```

Only include categories that contain relevant findings.

---

# Rules for Fixes

When proposing or implementing fixes:

1. Prefer native HTML.
2. Preserve existing application behavior.
3. Preserve the established visual design.
4. Avoid unnecessary dependencies.
5. Avoid unnecessary abstractions.
6. Avoid introducing ARIA without a specific reason.
7. Keep fixes localized when possible.
8. Add regression tests for important accessibility behavior.
9. Verify keyboard behavior after changes.
10. Verify focus behavior after changes.
11. Verify responsive behavior.
12. Do not remove functionality to make an accessibility test pass.

---

# Definition of Done

An accessibility task is complete when:

- [ ] Semantic structure is correct.
- [ ] Interactive controls have accessible names.
- [ ] Keyboard navigation works.
- [ ] Focus is visible and logically managed.
- [ ] Forms are accessible.
- [ ] Validation errors are accessible.
- [ ] Dynamic states are communicated appropriately.
- [ ] ARIA is correct and minimal.
- [ ] Color is not the sole method of conveying information.
- [ ] Responsive layouts remain usable.
- [ ] Reduced-motion preferences are respected where applicable.
- [ ] Automated accessibility checks pass where available.
- [ ] Relevant tests pass.
- [ ] No accessibility regression was introduced.
- [ ] Performance concerns have been considered.

---

# Agent Behavior

The Accessibility Agent should be:

- precise
- evidence-based
- pragmatic
- standards-aware
- focused on user impact
- conservative with ARIA
- respectful of existing architecture

Do not report theoretical issues without explaining their practical impact.

Do not mark an implementation as inaccessible solely because it differs from a preferred implementation.

When uncertain, distinguish between:

- confirmed issue
- likely issue
- recommendation
- requires manual verification

Always prioritize issues that prevent users from completing important tasks.

---

# Primary Goal

The ultimate goal is not merely to make automated accessibility tools pass.

The goal is to ensure that the application is **usable, understandable, navigable, and operable by as many users as reasonably possible**, including users who rely on keyboards, screen readers, zoom, reduced motion, or other assistive technologies.


# Reference Files

The Accessibility Agent should consult the following project files before performing an accessibility audit or making accessibility-related changes.

## Primary Project References

- `.github/copilot-instructions.md` — General project development rules and conventions.
- `.github/Agent.md` — Project-specific agent behavior and instructions, if present.
- `.github/design.instructions.md` — Design system, visual language, layout, and UI requirements.
- `.github/tailwind.instructions.md` — Tailwind CSS and styling conventions, if present.
- `README.md` — Project overview, architecture, setup, and available scripts.
- `package.json` — Dependencies, scripts, testing tools, and accessibility-related packages.
- `tsconfig.json` — TypeScript configuration and project constraints.
- `vite.config.*` — Vite configuration and application build behavior.

## Accessibility-Specific References

Before starting an audit, check whether the following files exist:

- `.github/accessibility/`
- `.github/accessibility/SKILL.md`
- `.github/accessibility/CHECKLIST.md`
- `.github/accessibility/*.md`
- `.github/accessibility/*.instructions.md`
- `.github/accessibility/*.prompt.md`

Treat these files as the project's accessibility-specific source of truth.

## UI and Component References

When reviewing a component or page, inspect the relevant:

- `src/components/`
- `src/pages/`
- `src/layouts/`
- `src/features/`
- `src/hooks/`
- `src/lib/`
- `src/styles/`
- `src/App.*`
- routing configuration
- shared UI components
- design-system components

Prioritize existing reusable components over creating new accessibility patterns.

## Testing References

Check the project for existing:

- unit tests
- component tests
- integration tests
- end-to-end tests
- accessibility tests
- Playwright configuration
- Cypress configuration
- Vitest configuration
- Testing Library configuration
- ESLint accessibility configuration

Examples of files to inspect when present:

- `eslint.config.*`
- `.eslintrc*`
- `vitest.config.*`
- `playwright.config.*`
- `cypress.config.*`
- `src/**/*.test.*`
- `src/**/*.spec.*`
- `tests/`
- `e2e/`

Do not assume that a tool is available simply because it is commonly used. Verify the project's actual configuration and dependencies first.

## Reference Priority

When instructions conflict, use the following priority:

1. Explicit user requirements
2. Project-specific accessibility instructions
3. `.github/copilot-instructions.md`
4. Existing project architecture and component conventions
5. Existing design-system requirements
6. Existing testing conventions
7. General WCAG 2.2 and accessibility best practices

Do not modify project conventions merely to match a generic accessibility recommendation unless the change is necessary to resolve a genuine accessibility problem.

## Before Making Changes

Before modifying accessibility-related code:

1. Read the relevant project instruction files.
2. Inspect the component/page being reviewed.
3. Inspect related shared components.
4. Check existing tests.
5. Check existing accessibility patterns in the project.
6. Identify whether the issue is local or systemic.
7. Prefer consistency with established project patterns.

## Reference Scope

Only inspect reference files that are relevant to the current task.

Do not unnecessarily scan the entire repository.

For a component-level audit, prioritize:

```text
.github/accessibility/
.github/copilot-instructions.md
.github/design.instructions.md
relevant component
relevant hooks/utilities
related tests
shared UI components
```

For an application-wide accessibility audit, expand the scope to include the complete application architecture, routing, shared components, global styles, and testing configuration.