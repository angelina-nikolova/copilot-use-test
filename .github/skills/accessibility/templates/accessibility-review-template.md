# Accessibility Review Template

## Summary
- Feature or page reviewed:
- Reviewer:
- Date:
- Testing context: desktop / tablet / mobile
- Browser and assistive tech used:

## Core checks

### 1. Keyboard access
- [ ] All interactive elements are reachable by keyboard.
- [ ] Focus order is logical and visible.
- [ ] Focus is not trapped unintentionally.
- [ ] Escape closes dismissible UI when appropriate.
- [ ] Keyboard-only users can complete the main task.

### 2. Semantics and labels
- [ ] Buttons have clear accessible names.
- [ ] Form controls have visible labels and proper `for`/`id` association.
- [ ] Landmarks are used appropriately (`main`, `nav`, `form`, `dialog`, etc.).
- [ ] Headings follow a logical hierarchy.
- [ ] Icon-only controls have accessible text or `aria-label`.

### 3. Forms and validation
- [ ] Required fields are clearly identified.
- [ ] Errors are associated with the relevant field using `aria-describedby`/`aria-invalid`.
- [ ] Validation messages are clear and actionable.
- [ ] Input states are understandable without color alone.
- [ ] Form submission is possible without a mouse.

### 4. Dynamic content and announcements
- [ ] Status updates are announced appropriately.
- [ ] Loading, success, and error states are conveyed accessibly.
- [ ] Focus moves intentionally after a change in context.
- [ ] No content is announced repeatedly or noisily.

### 5. Contrast and readability
- [ ] Text and controls meet sufficient contrast.
- [ ] Focus indicators are visible.
- [ ] Content remains readable at common zoom levels.
- [ ] Color is not the only signal for meaning.

### 6. Modals and overlays
- [ ] Dialogs have a title and `role="dialog"` plus `aria-modal="true"` when appropriate.
- [ ] Focus moves into the dialog on open and returns after close.
- [ ] Background content is not interactable while modal is open.
- [ ] Escape and close controls work correctly.

## Findings
### Pass
- 

### Issues
- 

### Recommendations
- 

## Final status
- [ ] Approved
- [ ] Needs fixes before merge
- [ ] Follow-up required

## Notes
- Additional context:
- Known limitations:
    