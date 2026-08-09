---
description: Describe when these instructions should be loaded by the agent based on task context
# applyTo: 'Describe when these instructions should be loaded by the agent based on task context' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file

applyTo: "**/*.css"
---

<!-- Tip: Use /create-instructions in chat to generate content with agent assistance -->

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.



Generated file without custom instructions will be like this:

# Tailwind CSS Instructions — Daily Journal

## Purpose

These instructions define the CSS and Tailwind CSS standards for the Daily Journal application.

The application is a modern, responsive web application built with:

- React
- Vite
- TypeScript/JavaScript
- Tailwind CSS
- Supabase
- Component-based UI architecture

The visual design should feel:

- Calm
- Personal
- Minimal
- Warm
- Modern
- Accessible
- Uncluttered

The interface should support the user's daily journaling habit rather than distract from it.

---

# 1. General Styling Principles

Prioritize:

1. Readability
2. Simplicity
3. Consistency
4. Accessibility
5. Responsive behavior
6. Maintainability

Avoid unnecessary visual complexity.

Do not introduce styling merely for decoration.

Every visual element should have a purpose.

Prefer whitespace, typography, subtle borders, and restrained shadows over excessive visual effects.

---

# 2. Tailwind First

Use Tailwind CSS utility classes as the primary styling solution.

Prefer:

```tsx
<div className="rounded-xl border bg-white p-6 shadow-sm">
```

over creating a new CSS class such as:

```css
.journal-card {
  ...
}
```

Do not create custom CSS when the same result can reasonably be achieved with Tailwind utilities.

Use CSS files only when:

- Tailwind cannot reasonably express the behavior
- Complex animations are required
- Third-party components require overrides
- Browser-specific styling is necessary
- Complex reusable visual effects justify custom CSS

---

# 3. Avoid Inline Style Objects

Avoid:

```tsx
<div style={{ marginTop: 20, color: "red" }}>
```

Prefer Tailwind:

```tsx
<div className="mt-5 text-red-500">
```

Only use inline styles when the value is genuinely dynamic and cannot reasonably be represented using Tailwind.

---

# 4. Design System

Use a consistent visual system throughout the application.

Do not introduce arbitrary colors, spacing values, border radii, or font sizes in individual components.

Prefer the project's Tailwind theme and existing design tokens.

If a design token does not exist but is required repeatedly, add it to the Tailwind configuration/theme rather than repeating arbitrary values.

Avoid excessive use of arbitrary values such as:

```tsx
text-[#123456]
```

or:

```tsx
mt-[17px]
```

unless there is a specific design requirement.

---

# 5. Color Philosophy

The Daily Journal should use a calm and emotionally neutral palette.

Recommended semantic categories:

### Background

Use soft neutral backgrounds.

Examples:

```text
bg-slate-50
bg-stone-50
bg-neutral-50
```

### Primary

Use one consistent primary accent throughout the application.

Primary actions should be visually recognizable.

Examples:

```text
bg-indigo-600
bg-violet-600
bg-teal-600
```

The exact project palette should be defined centrally.

### Success

Use green only for positive system states:

```text
text-green-600
bg-green-50
```

### Warning

Use amber/yellow for warnings:

```text
text-amber-600
bg-amber-50
```

### Error

Use red only for errors or destructive actions:

```text
text-red-600
bg-red-50
```

Do not use bright colors excessively.

---

# 6. Mood Tracker Colors

Mood colors should communicate mood without becoming visually overwhelming.

Use semantic mood categories rather than hard-coding colors repeatedly.

Example:

```text
Very low
Low
Neutral
Good
Very good
```

Mood indicators should remain understandable for users with color-vision deficiencies.

Do not rely on color alone.

Always combine color with:

- Text
- Icon
- Label
- Shape
- Accessible aria-label when appropriate

Example:

```tsx
<button
  aria-label="Very good mood"
  className="..."
>
  😊
</button>
```

---

# 7. Typography

Typography should prioritize comfortable reading.

Journal text is the primary content of the application and should have generous line height.

Recommended:

```text
text-base
leading-7
```

or:

```text
text-lg
leading-8
```

for longer journal content.

Headings should establish a clear hierarchy.

Example:

```tsx
<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
```

Avoid excessive use of:

```text
font-bold
uppercase
tracking-wide
```

Use strong typography sparingly.

---

# 8. Journal Editor

The journal editor is one of the most important components.

It should feel comfortable and distraction-free.

Recommended characteristics:

- Large writing area
- Generous padding
- Clear focus state
- Minimal borders
- Comfortable line height
- Responsive width
- Clear save state

Example:

```tsx
<textarea
  className="
    min-h-[300px]
    w-full
    resize-y
    rounded-xl
    border
    bg-white
    p-5
    text-base
    leading-7
    outline-none
    transition
    focus:ring-2
  "
/>
```

Do not make the editor visually dense.

---

# 9. Cards

Use cards for:

- Journal entries
- Mood summaries
- Statistics
- Daily overview
- Settings sections

Preferred structure:

```tsx
<div className="rounded-2xl border bg-white p-5 shadow-sm">
```

Avoid heavy shadows.

Prefer:

```text
shadow-sm
```

over:

```text
shadow-xl
```

unless there is a strong visual reason.

---

# 10. Buttons

Buttons should have clear hierarchy.

### Primary

Use for the main action:

```tsx
<button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
```

### Secondary

Use for supporting actions:

```tsx
<button className="rounded-lg border px-4 py-2 text-sm font-medium">
```

### Destructive

Use for actions such as deleting a journal entry:

```tsx
<button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white">
```

Do not make every button look like a primary button.

---

# 11. Button States

Interactive elements must provide visible states.

Support:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading

Example:

```tsx
className="
  rounded-lg
  bg-primary
  px-4
  py-2
  font-medium
  transition-colors
  hover:bg-primary/90
  focus:outline-none
  focus:ring-2
  focus:ring-primary/50
  disabled:cursor-not-allowed
  disabled:opacity-50
"
```

Never remove focus indicators without providing an accessible replacement.

---

# 12. Forms

Forms should be visually consistent.

Use:

- Clear labels
- Consistent spacing
- Visible focus states
- Helpful validation messages
- Accessible error states

Example:

```tsx
<label className="mb-2 block text-sm font-medium">
  Journal title
</label>

<input
  className="
    w-full
    rounded-lg
    border
    px-3
    py-2
    outline-none
    focus:ring-2
  "
/>
```

Do not use placeholder text as the only label.

---

# 13. Responsive Design

The application must work well on:

- Mobile phones
- Tablets
- Laptops
- Large desktop screens

Use mobile-first Tailwind classes.

Prefer:

```tsx
<div className="p-4 sm:p-6 lg:p-8">
```

rather than desktop-first styling.

Typical breakpoints:

```text
default → mobile
sm → small tablet / large mobile
md → tablet
lg → desktop
xl → large desktop
```

Do not assume a fixed viewport width.

---

# 14. Page Layout

Use a consistent maximum content width.

For journal content:

```tsx
<main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
```

For reading/writing focused content, consider a narrower width:

```tsx
<div className="mx-auto w-full max-w-3xl">
```

Avoid unnecessarily wide text blocks.

---

# 15. Spacing

Use Tailwind's spacing scale consistently.

Prefer:

```text
gap-2
gap-4
gap-6
gap-8
```

and:

```text
p-4
p-6
p-8
```

Avoid arbitrary spacing unless necessary.

Maintain consistent vertical rhythm between sections.

---

# 16. Border Radius

Use a small set of consistent radius values.

Recommended:

```text
rounded-lg
rounded-xl
rounded-2xl
```

Use:

- `rounded-lg` for controls
- `rounded-xl` for cards/forms
- `rounded-2xl` for larger containers

Do not randomly mix many different radius values.

---

# 17. Icons

Use one icon library consistently throughout the application.

Do not mix multiple icon libraries unless necessary.

Icons should:

- Have accessible labels when needed
- Not replace important text
- Use consistent sizing

Typical sizes:

```text
size-4
size-5
size-6
```

Use `aria-hidden="true"` for purely decorative icons.

---

# 18. Accessibility

Accessibility is mandatory.

All interactive elements must be keyboard accessible.

Ensure:

- Sufficient color contrast
- Visible focus states
- Proper labels
- Semantic HTML
- Keyboard navigation
- Accessible error messages
- Accessible mood selection
- Screen-reader-friendly controls

Do not rely exclusively on:

- Color
- Icons
- Hover states

to communicate important information.

---

# 19. Dark Mode

If dark mode is implemented, all components must support it consistently.

Use Tailwind's dark variant:

```tsx
<div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
```

Do not implement dark mode for only individual components.

When adding a new component, consider both:

```text
light mode
dark mode
```

Colors should maintain adequate contrast in both modes.

---

# 20. Loading States

Use subtle loading states.

Avoid blocking the entire interface unnecessarily.

Examples:

```text
animate-pulse
animate-spin
opacity-50
```

For journal saving:

```text
Saving...
Saved
Unable to save
```

The UI should communicate the state clearly.

---

# 21. Empty States

Empty states should be helpful rather than simply displaying:

```text
No data.
```

For example:

```text
No journal entries yet.

Start writing about your day.
```

Include a clear primary action when appropriate.

---

# 22. Error States

Errors should be:

- Clear
- Specific
- Non-technical
- Actionable

Avoid displaying raw Supabase errors directly to users.

Do not expose:

- Database details
- SQL errors
- Internal implementation details
- Authentication internals

Use user-friendly messages.

---

# 23. Responsive Journal Cards

Journal entry cards should adapt to screen size.

Example:

```tsx
<article className="rounded-xl border bg-white p-4 sm:p-6">
```

Avoid fixed heights for journal content.

Use:

```text
min-h-*
```

only when necessary.

Do not truncate journal content unless the user has an obvious way to expand it.

---

# 24. Navigation

Navigation should remain simple.

The Daily Journal should prioritize:

- Today
- Journal
- Mood
- History
- Settings

Do not overload the navigation with unnecessary options.

On mobile, consider a compact navigation pattern.

---

# 25. Dashboard

The dashboard should emphasize today's journal.

Recommended hierarchy:

1. Greeting / date
2. Today's mood
3. Today's journal
4. Recent entries
5. Mood trends
6. Secondary statistics

The most important action should be visually dominant.

---

# 26. Mood Selection UI

Mood selection should be quick and intuitive.

A suitable pattern is:

```text
😞  😕  😐  🙂  😊
```

Each option should have:

- Accessible label
- Selected state
- Hover state
- Focus state
- Clear visual distinction

Do not rely solely on emoji color.

---

# 27. Animations

Animations should be subtle.

Prefer:

```text
transition
transition-colors
transition-opacity
duration-200
```

Use animation to improve understanding, not to attract attention unnecessarily.

Avoid:

- Excessive bouncing
- Large movement
- Continuous animations
- Distracting page transitions

Respect reduced-motion preferences when animations are used.

Use:

```css
motion-reduce:
```

Tailwind utilities where appropriate.

---

# 28. Supabase UI States

Supabase operations should always have corresponding UI states.

For example:

```text
Loading
Success
Error
Empty
```

The styling layer should make these states visually distinct.

Never assume a Supabase request succeeds immediately.

---

# 29. Component Reuse

Do not duplicate Tailwind class combinations unnecessarily.

If the same visual pattern appears repeatedly, create a reusable React component.

Examples:

```text
Button
Card
Input
Textarea
Modal
Badge
MoodSelector
JournalCard
EmptyState
LoadingState
```

Prefer composition over large components containing many conditional styles.

---

# 30. Conditional Classes

For conditional styling, use the project's established class utility.

If the project uses `clsx`, `classnames`, or `cn`, follow the existing convention.

Example:

```tsx
className={cn(
  "rounded-lg px-4 py-2",
  isActive && "bg-primary text-white",
  !isActive && "border bg-white"
)}
```

Do not introduce a second class utility library.

---

# 31. Tailwind Class Ordering

Keep Tailwind classes readable and consistent.

Prefer this conceptual order:

1. Layout
2. Position
3. Size
4. Spacing
5. Typography
6. Background
7. Border
8. Effects
9. Transitions
10. States

Example:

```tsx
className="
  flex
  w-full
  items-center
  gap-4
  rounded-xl
  border
  bg-white
  p-4
  text-sm
  shadow-sm
  transition
  hover:shadow-md
"
```

Follow the project's formatter/plugin if it automatically sorts Tailwind classes.

---

# 32. Avoid Overengineering

Do not introduce:

- Large CSS frameworks
- Multiple styling systems
- Unnecessary CSS modules
- Styled-components
- Emotion
- Additional UI libraries

unless explicitly required by the project.

The default styling approach should remain:

```text
React + Tailwind CSS
```

---

# 33. Do Not Modify Global Styles Unnecessarily

Global CSS changes can affect the entire application.

Before modifying global styles:

1. Check whether Tailwind utilities can solve the problem.
2. Check whether the component can solve the problem locally.
3. Only then modify global CSS.

Global styles should remain minimal.

---

# 34. CSS Variables and Design Tokens

When a value is used throughout the application, define it as a design token rather than repeating it.

Examples:

```text
--color-primary
--color-background
--color-foreground
--color-muted
--color-border
--radius-card
```

Keep the design system centralized.

Do not create duplicate tokens representing the same concept.

---

# 35. Mobile-First Rule

Always write the base style for mobile first.

Example:

```tsx
className="
  flex
  flex-col
  gap-4
  md:flex-row
  md:items-center
"
```

Avoid:

```tsx
className="
  flex-row
  md:flex-col
"
```

unless there is a specific reason.

---

# 36. Touch Targets

Interactive controls on mobile should have sufficiently large touch areas.

Avoid tiny buttons such as:

```text
h-5 w-5
```

for primary interactions.

Prefer approximately:

```text
min-h-10
min-w-10
```

for interactive controls where practical.

---

# 37. Tables and Statistics

If statistics are displayed, ensure they remain readable on mobile.

Prefer responsive layouts over wide tables.

For example:

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
```

Use cards for summary statistics when appropriate.

---

# 38. Date and Journal Metadata

Journal metadata such as:

- Date
- Time
- Mood
- Updated state

should be visually secondary to the journal content.

Use muted text:

```tsx
text-sm text-muted-foreground
```

Do not make metadata compete with the journal itself.

---

# 39. Destructive Actions

Delete actions must be visually distinct.

For example:

```text
Delete entry
```

should not look identical to:

```text
Save entry
```

For destructive operations:

- Use appropriate warning styling
- Consider confirmation
- Never hide the destructive consequence

---

# 40. Privacy-Oriented UI

A journal contains personal user-generated content.

The UI should communicate privacy and trust.

Avoid unnecessarily exposing journal content in:

- Notifications
- URLs
- Tooltips
- Debug messages
- Error messages
- Browser console output

Do not style or display sensitive content unnecessarily.

---

# 41. AI Coding Rules

When modifying the UI:

1. Inspect existing components first.
2. Reuse existing Tailwind patterns.
3. Reuse existing design tokens.
4. Reuse existing components.
5. Avoid introducing new dependencies.
6. Preserve responsive behavior.
7. Preserve accessibility.
8. Preserve dark mode if implemented.
9. Do not rewrite unrelated components.
10. Keep changes focused on the requested feature.

Before creating a new component, check whether an existing component can be extended.

---

# 42. Do Not Break Existing Design

When adding a feature:

- Match the existing spacing.
- Match existing colors.
- Match existing typography.
- Match existing border radius.
- Match existing button styles.
- Match existing responsive behavior.

Do not redesign the application unless explicitly requested.

---

# 43. Verification Checklist

Before considering a UI change complete, verify:

### Visual

- [ ] Layout is consistent with the existing application.
- [ ] Spacing is consistent.
- [ ] Typography is consistent.
- [ ] Colors use existing design tokens.
- [ ] Components do not look visually overloaded.

### Responsive

- [ ] Mobile layout works.
- [ ] Tablet layout works.
- [ ] Desktop layout works.
- [ ] No horizontal scrolling occurs unintentionally.
- [ ] Touch targets are usable.

### Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Form fields have labels.
- [ ] Important information is not communicated only by color.
- [ ] Icons have appropriate accessibility attributes.

### Technical

- [ ] Tailwind is used instead of unnecessary custom CSS.
- [ ] Existing components are reused.
- [ ] No unnecessary dependencies were added.
- [ ] No unrelated files were changed.
- [ ] Existing functionality remains intact.

---

# 44. Preferred Implementation Pattern

When implementing a new UI feature, follow this sequence:

```text
1. Inspect existing UI
        ↓
2. Identify reusable components
        ↓
3. Identify existing design tokens
        ↓
4. Build mobile-first structure
        ↓
5. Add Tailwind styling
        ↓
6. Add responsive behavior
        ↓
7. Add accessibility states
        ↓
8. Add loading/error/empty states
        ↓
9. Test the component
        ↓
10. Verify visual consistency
```

---

# 45. Core Rule

The Daily Journal should feel like a **quiet, comfortable place to write and reflect**.

When choosing between two valid UI solutions, prefer the one that is:

- Simpler
- Calmer
- More readable
- More accessible
- More consistent
- Easier to maintain

Do not let the UI become more complicated than the journaling experience requires.