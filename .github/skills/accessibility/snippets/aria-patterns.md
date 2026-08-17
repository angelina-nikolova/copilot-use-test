# ARIA patterns

Use ARIA to enhance behavior when native HTML semantics are not enough. Prefer semantic HTML first, then add ARIA only when it clarifies state, relationship, or dynamic behavior.

## 1. `aria-live` for status updates
Use this for updates that should be announced without interrupting the user.

```tsx
<p aria-live="polite" role="status">
  Your journal entry was saved.
</p>
```

When to use:
- save success/error messages
- async status updates
- validation result messages

Avoid using it for every keystroke or repeated typing events.

## 2. `aria-invalid` and `aria-describedby`
Use these to connect errors to the relevant field.

```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid={true}
  aria-describedby="email-error"
/>
<p id="email-error" role="alert">
  Enter a valid email address.
</p>
```

When to use:
- form validation errors
- required field feedback
- accessible error messaging

## 3. `aria-expanded` for disclosure controls
Use this on buttons that toggle collapsed content.

```tsx
<button
  type="button"
  aria-expanded={isOpen}
  aria-controls="help-panel"
  onClick={() => setIsOpen((current) => !current)}
>
  Show details
</button>

<div id="help-panel" hidden={!isOpen}>
  Extra guidance for this field.
</div>
```

When to use:
- accordions
- menus
- progressive disclosure panels

## 4. `aria-label` for icon-only controls
Use a text alternative when the visible label is not sufficient.

```tsx
<button type="button" aria-label="Close dialog">
  <CloseIcon aria-hidden="true" />
</button>
```

When to use:
- icon-only buttons
- compact toolbar actions
- decorative symbols that need meaning for assistive tech

## 5. `aria-labelledby` for dialog titles
Associate dialog content with its heading.

```tsx
<div role="dialog" aria-modal="true" aria-labelledby="delete-title">
  <h2 id="delete-title">Delete entry</h2>
  <p>Are you sure you want to delete this entry?</p>
</div>
```

When to use:
- modal dialogs
- confirmation overlays
- focused, temporary UI panels

## 6. `aria-pressed` for toggle buttons
Use this when a button behaves like a toggle.

```tsx
<button type="button" aria-pressed={isFavorite}>
  {isFavorite ? "Remove favorite" : "Add favorite"}
</button>
```

When to use:
- favorite toggles
- starred items
- mode switches that act like a button

## Best practices
- Prefer native HTML first: `button`, `label`, `fieldset`, `legend`, `form`, `dialog`.
- Keep ARIA names and states accurate.
- Do not add ARIA when the native element already provides the behavior.
- Ensure the label, state, and relationship match the real UI.
- Test with keyboard navigation and a screen reader.

## Quick rule
If a native pattern already exists, use it instead of inventing a custom ARIA pattern.
