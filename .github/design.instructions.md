---
description: Describe when these instructions should be loaded by the agent based on task context
# applyTo: 'Describe when these instructions should be loaded by the agent based on task context' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file

applyTo: "**/*.{css, scss, less, js, jsx, ts, tsx, html}"
---

<!-- Tip: Use /create-instructions in chat to generate content with agent assistance -->

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.


# Daily Journal — Design Instructions

## Purpose

Build a calm, focused daily-journal experience for a Vite + React + Supabase application. The product should take visual and interaction cues from the clarity, density, and document-first workflow of Notion, while remaining an original interface. It **MUST NOT** copy Notion branding, logos, proprietary illustrations, exact UI assets, or product text.

This document is the source of truth for visual decisions. When an implementation detail is not specified, choose the simplest restrained option that preserves a quiet, editorial, productivity-tool feel.

## Non-negotiable rules

- The interface **MUST** feel document-first, lightweight, organized, and intentionally understated.
- The interface **MUST NOT** use emojis anywhere: not in UI copy, mood options, empty states, buttons, navigation, headings, placeholders, or seeded content.
- The interface **MUST NOT** use purple gradients. Prefer flat, neutral surfaces; do not introduce decorative gradients of any color unless a future product requirement explicitly calls for one.
- The interface **MUST NOT** use Notion’s name, logo, favicon, illustrations, exact icons, or branded wording.
- The interface **MUST NOT** rely on color alone to convey status, mood, selection, validation, or focus.
- The interface **MUST** work well in light mode first. If dark mode is added, it **MUST** use the same semantic tokens rather than ad-hoc colors.
- The interface **MUST** use a consistent spacing, type, radius, and shadow system. Do not invent one-off values.
- Animation **MUST** be subtle, brief, and optional for users who prefer reduced motion.

## Design principles

1. **Writing comes first.** The journal editor and its content should be visually dominant; controls recede until needed.
2. **Quiet hierarchy.** Use typography, whitespace, alignment, and restrained borders before adding color or shadows.
3. **Dense but breathable.** Information may be compact, but touch targets and line height must remain comfortable.
4. **Progressive disclosure.** Place secondary actions in menus, hover/focus toolbars, or contextual controls rather than permanently crowding the canvas.
5. **Stable structure.** Keep navigation, page metadata, and editor locations predictable across pages.
6. **Human and practical.** Mood, reflection prompts, and empty states should feel supportive without becoming sentimental or decorative.

## Foundations

### Typography

- **MUST** use a clean sans-serif UI stack: `Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- **SHOULD** use the same stack for body and interface text. A restrained serif may be used only for long-form reading mode, never as the primary UI font.
- Base font size: `15px` or `16px`; body line height: `1.5` to `1.65`.
- Use these type roles:
  - Display/page title: `32px`, `font-weight: 700`, `line-height: 1.2` on desktop; `26px` on mobile.
  - Section heading: `20px`, `font-weight: 650–700`, `line-height: 1.3`.
  - Subheading: `16px`, `font-weight: 600`.
  - Body/editor text: `16px`, `font-weight: 400`.
  - UI label: `14px`, `font-weight: 500–600`.
  - Metadata/helper text: `13px`, `font-weight: 400–500`.
- **MUST NOT** use excessive all-caps. If used for a tiny category label, add letter spacing and keep it rare.
- Titles **MUST** be editable in-place or clearly presented as the primary document title.

### Color tokens

Use CSS variables or a token object. These values are a starting palette; components must consume semantic names, not hard-coded hex values.

```css
:root {
  --bg-page: #ffffff;
  --bg-sidebar: #f7f7f5;
  --bg-subtle: #f5f5f4;
  --bg-hover: #eeeeec;
  --bg-selected: #e9e9e7;
  --bg-inverse: #292927;

  --text-primary: #37352f;
  --text-secondary: #787774;
  --text-tertiary: #9b9a97;
  --text-inverse: #ffffff;

  --border-subtle: #e9e9e7;
  --border-strong: #d3d3d1;
  --focus-ring: #2383e2;
  --accent: #2383e2;
  --accent-hover: #0f6fca;

  --success-bg: #edf7ee;
  --success-text: #2f6d3a;
  --warning-bg: #fdf4df;
  --warning-text: #8a5b14;
  --danger-bg: #fbecec;
  --danger-text: #b33030;
}
```

- **MUST** keep the primary interface neutral: warm white, soft gray, charcoal text, and a single restrained blue action/focus color.
- **SHOULD** use status colors only as small supporting signals with text labels or icons.
- Mood colors **MUST** be muted, distinct in luminance, and paired with a written mood label. Do not use saturated rainbow palettes.
- **MUST NOT** use purple as the principal brand/action color, and **MUST NOT** use purple gradients.

### Spacing, radii, and elevation

- Use a 4px spacing grid: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`.
- Standard control height: `32px` compact, `36px` default, `40px` prominent. Minimum interactive hit area: `44 × 44px` on touch devices.
- Radius: `4px` for controls and inputs, `6px` for cards/popovers, `8px` only for larger panels. Avoid pill-shaped UI except compact tags.
- Borders are preferred over shadows for separation.
- Use elevation sparingly:
  - Resting cards: no shadow or `0 1px 2px rgb(0 0 0 / 4%)`.
  - Popovers/menus: `0 4px 12px rgb(0 0 0 / 10%)`.
  - **MUST NOT** use large, soft, marketing-style drop shadows.

### Icons

- Use one consistent open-source SVG icon set, such as Lucide.
- Default icon size: `16px`; toolbar icons: `18px`; icon-only touch controls: `20px` inside a 36–40px target.
- Icons **MUST** have accessible names through visible text, `aria-label`, or a tooltip.
- Use icons to clarify actions (search, calendar, settings, add, archive), never as decoration.
- **MUST NOT** use emoji as an icon substitute.

## Application shell

### Desktop layout

- The app **MUST** use a persistent left sidebar, a slim top bar, and a centered document canvas.
- Sidebar width: `240px` default; allow collapse to an icon rail or fully hide when the user requests it.
- Sidebar is a soft off-white surface (`--bg-sidebar`) with a right border (`--border-subtle`), not a floating card.
- Main content should occupy the remaining viewport. The journal document column should max out at `760–860px` and be aligned with a generous left inset rather than centered in an oversized empty region.
- Use a top bar of `48–52px` height. It should be visually quiet with a bottom border only when needed for separation.
- Avoid dashboard-like boxed regions. Use a page canvas with local sections instead.

### Sidebar

- Top area: workspace/app name, optional account menu, and sidebar collapse control.
- Primary navigation items: Today, Journal, Calendar, Mood Insights, and Settings. Keep labels simple and do not imitate Notion navigation names unnecessarily.
- Include a clearly visible “New entry” action. It may be an icon-plus-label row or a compact neutral button, not a large colored call-to-action.
- Journal entries should appear as a chronological, searchable list with date first and an optional one-line title or excerpt.
- Group history by meaningful periods (This week, Earlier this month, Month + year) only when that helps scanning.
- Selected row: subtle neutral fill and medium-weight text; do not use a thick colored bar as the only selection cue.
- Row hover: quiet neutral fill. Reveal secondary row actions only on hover/focus; they must remain available via keyboard and touch alternatives.
- The sidebar **MUST** remain scrollable independently when its contents exceed the viewport.

### Top bar

- Left: breadcrumb or current location, with an optional sidebar toggle on narrow screens.
- Right: save status, search, and a small account/settings menu. Do not fill the bar with permanent buttons.
- Save status should be plain language: “Saving…”, “Saved”, “Offline changes”, or “Couldn’t save”. It **MUST NOT** rely only on a colored dot.
- Search should open a focused command/search panel, not navigate the user away from their draft unexpectedly.

## Journal page and editor

### Page structure

Order each journal page consistently:

1. Date and optional context line
2. Editable title
3. Mood check-in
4. Optional prompt or properties row
5. Divider or whitespace
6. Rich-text journal body
7. Optional related/history section below the editor

- The page content must have comfortable top padding (`48–64px` desktop; `24–32px` mobile).
- Display the date in a readable long format, for example “Friday, August 8, 2026”.
- Treat date, mood, and tags as compact metadata. They must not compete with the title or writing area.

### Editor behavior

- The editor **MUST** feel like a clean document canvas: no permanent heavy outline, no card frame around every paragraph.
- Body width: `680–760px` within the document column for readable line lengths.
- Placeholder: “Start writing…” or similarly direct language. Never use emoji in a placeholder.
- Support standard block patterns: paragraph, headings, bulleted/numbered lists, quote, divider, checklist, and inline links. Implement only features the product supports; do not render fake controls.
- Formatting toolbar should appear contextually on text selection or as a compact fixed/editor-level action. Keep it short and keyboard-accessible.
- Show block drag handles and add controls on hover/focus only; they must not obscure text or cause layout shift.
- Auto-save drafts with debounce. Clearly communicate pending, successful, and failed save states.
- If Supabase persistence fails, preserve the local draft and offer a visible retry action.
- Use optimistic updates only when failure handling is clear and reversible.

### Prompts and metadata

- Prompts should be optional and collapsible. Example: “What is on your mind today?”
- Prompt cards use a subtle background and border, 12–16px padding, and no decorative illustration.
- Tags should be compact neutral chips with text labels. Do not use a rainbow of tag colors.
- Do not make journal metadata look like a form that must be completed before writing.

## Mood tracker

- Present moods as a compact, labeled selector using text plus simple line icons, abstract glyphs, or color swatches. **Do not use emoji faces.**
- Use 5–7 understandable labels, such as: Very low, Low, Neutral, Good, Very good. Labels are more important than visual metaphor.
- Each option needs:
  - A visible text label.
  - A non-color selection indicator (checkmark, border, or selected state).
  - Keyboard support with arrow keys when implemented as a radio group.
  - An accessible radio label and selected state.
- Mood selector should be one horizontal row on desktop and wrap or become a compact grid on mobile.
- Allow a short optional note, such as “What influenced this?”
- Insights must favor simple, interpretable views: monthly trend line, weekly distribution, and correlations only when data supports them. Include clear empty states when data is insufficient.
- Charts **MUST** include a text summary or table alternative and color-independent labels/tooltips.

## Controls and components

### Buttons

- Primary button: dark charcoal fill or restrained blue fill, white text, 36px height, 4px radius. Reserve for the main action in a local context.
- Secondary button: white or transparent surface, subtle border, charcoal text.
- Tertiary/ghost button: transparent with hover fill; useful in toolbars and rows.
- Destructive action: use danger text or fill only after the user has reached a destructive decision point; never make it the default prominent action.
- Buttons **MUST** use clear action verbs: “New entry”, “Save changes”, “Try again”, “Delete entry”.
- Disabled buttons must be visibly muted and have an explanation when the reason is not obvious.

### Inputs and selects

- Inputs: 36px default height, 4px radius, subtle border, white background.
- On focus, use the blue focus ring plus a border change. Never remove native focus visibility without a replacement.
- Labels **MUST** be persistent and visible; placeholders do not replace labels.
- Inline title/editor fields may appear borderless at rest, but must show a focus state.
- Validation messages appear below the relevant control in plain language and are connected with `aria-describedby`.
- Use native selects when possible. Custom comboboxes must support keyboard navigation, escape to close, and announced selection changes.

### Cards, menus, and dialogs

- Cards should be used only where grouping is meaningful: prompt, insight summary, confirmation, or settings section.
- Use `--border-subtle`, 6px radius, and 12–20px padding. Avoid “cardifying” the full application.
- Menus and popovers must align to their trigger, have a clear focus order, close with Escape, and restore focus to the trigger.
- Destructive actions require a confirmation dialog that names the affected entry and explains whether recovery is possible.

### Empty, loading, and error states

- Empty states should state what is missing, why it matters, and provide one next action. Example: “No journal entries yet. Create today’s entry to begin.”
- Avoid illustrations unless they are original, small, and genuinely useful. Never use emoji as the empty-state visual.
- Loading states should preserve layout with subtle skeletons; avoid repeated spinners inside a document editor.
- Errors should be specific and actionable. Example: “Your entry could not be saved. Your changes are still on this device. Try again.”
- For offline or auth states, never discard typed content silently.

## Responsive behavior

- Desktop breakpoint: approximately `1024px`; tablet: `768–1023px`; mobile: below `768px`.
- On tablet, allow a narrower sidebar or an overlay sidebar. Keep the editor readable and never force horizontal scrolling.
- On mobile, sidebar becomes a modal drawer triggered from the top bar. It must trap focus while open and dismiss with Escape, close control, or backdrop tap.
- Mobile page padding: `16–20px`; document title and body remain full width within safe margins.
- Metadata and mood controls may wrap; maintain an intentional gap and logical reading order.
- Toolbars should reduce to essential actions or overflow menus on small screens. Never shrink targets below 44px touch size.
- Tables and charts should either scroll within their own labeled container or transform into a vertical summary; the page itself must not overflow horizontally.

## Accessibility requirements

- Meet WCAG 2.2 AA contrast requirements for text, focus indicators, controls, and chart data.
- Support complete keyboard operation: navigation, entry creation, editor access, mood selection, menus, dialogs, and deletion confirmation.
- Use semantic HTML first: `nav`, `main`, headings in order, `button`, `label`, `input`, `textarea`, `dialog` or an accessible dialog pattern.
- Provide a “Skip to journal content” link when the sidebar is present.
- Focus order must follow visual order. Focus rings must be visible against every surface.
- All icon-only actions need accessible labels and tooltips.
- Announce auto-save, errors, and async changes with an appropriate polite/status live region without interrupting typing.
- Respect `prefers-reduced-motion`; disable nonessential transitions and all motion-based feedback.
- Do not encode mood, validation, or selected state with color alone.

## Interaction and motion

- Use `120–180ms` ease-out transitions for hover, focus, menus, and small state changes.
- Avoid bouncing, parallax, confetti, pulsing decoration, or large entrance animations.
- Clicking “New entry” creates or opens today’s entry and places focus in the title or editor, according to whether a title is required.
- Use keyboard shortcuts only when they are conventional and discoverable: for example, `Cmd/Ctrl + K` for search and `Cmd/Ctrl + Enter` for an explicit save if one exists. Never make shortcuts the only path.
- Before navigating away with unsaved local-only changes, show a concise confirmation and preserve recoverable drafts.
- Use toast notifications sparingly for reversible confirmation. Important failures must also be represented persistently near the affected content.

## React and Supabase implementation guidance

- Define tokens as CSS custom properties or a typed theme module; components must reference semantic tokens.
- Build reusable primitives for `Button`, `IconButton`, `TextField`, `Select`, `Dialog`, `Menu`, `Tooltip`, `SidebarItem`, `StatusMessage`, and `EmptyState` before creating page-specific variants.
- Keep presentational components separate from Supabase data access. Data hooks/services should own fetching, optimistic updates, retries, and error states.
- Model draft/save state explicitly: `idle`, `editing`, `saving`, `saved`, `error`, and `offline` as appropriate. Do not infer save success merely from a timer.
- Use stable loading skeletons for entry lists and page metadata. The editor must not lose focus or reset content during a background refetch.
- Treat user-entered journal text as sensitive: avoid exposing it in URLs, analytics event payloads, console logs, error reports, or public sharing defaults.
- Persist user preferences such as sidebar state or reduced visual density locally only after obtaining the necessary product-level decision; do not surprise users with cross-device behavior they did not choose.

## Visual consistency checklist

Before shipping any screen or component, verify:

- Does it use existing color, spacing, radius, typography, and shadow tokens?
- Is the primary writing task more visually prominent than controls and metadata?
- Are borders and whitespace doing the organizing before color or elevation?
- Does every interactive state have hover, focus-visible, disabled, loading, and error behavior where relevant?
- Can it be used without a mouse and understood without color?
- Does it avoid emojis, purple gradients, decorative gradients, copied branding, and overly glossy UI?
- Is it comfortable at 320px wide, at a standard laptop width, and with browser zoom at 200%?
- Does persistence failure preserve the journal draft and tell the user what happened?

## Final direction

Favor quiet confidence over visual novelty. A successful screen resembles a well-organized personal document workspace: neutral, readable, responsive, and supportive of uninterrupted writing. When choosing between a more decorative option and a more legible, lower-friction option, choose the latter.
