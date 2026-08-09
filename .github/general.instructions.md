---
  applyto: "**"
---

# GitHub Copilot Instructions

## Project Overview

This project is a modern web application built with:

- **Frontend:** React + Vite
- **Backend:** Supabase
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase Auth
- **Application Type:** Daily Journal with Mood Tracker

The application allows users to:

- Create daily journal entries
- Edit and delete journal entries
- Track daily mood and emotions
- Review journal history
- View mood history and trends
- Analyze personal mood patterns
- Manage private personal data securely

---

# 1. General Development Principles

Always prioritize:

- Clean and readable code
- Simple solutions over unnecessary complexity
- Maintainable architecture
- Reusable components
- Strong separation of concerns
- Clear naming conventions
- Consistent formatting
- Accessibility
- Security
- Good user experience

Avoid:

- Over-engineering
- Duplicate code
- Large monolithic components
- Unnecessary dependencies
- Unnecessary abstractions
- Rewriting working code without a clear reason

When modifying existing code, preserve existing functionality unless the requested change requires otherwise.

---

# 2. Technology Stack

The primary technology stack is:

```text
Vite
React
JavaScript / TypeScript
Supabase
PostgreSQL
Supabase Auth
```

Do not introduce a new framework or major library without a clear reason.

Before adding a dependency:

1. Check whether the existing project already provides the required functionality.
2. Prefer native browser or React functionality when appropriate.
3. Prefer small, well-maintained dependencies.
4. Avoid dependencies that significantly increase bundle size.
5. Explain why a new dependency is necessary.

---

# 3. Project Structure

Prefer a structure similar to:

```text
src/
├── components/
│   ├── common/
│   ├── journal/
│   ├── mood/
│   └── layout/
│
├── pages/
│
├── hooks/
│
├── services/
│
├── context/
│
├── lib/
│
├── utils/
│
├── assets/
│
├── styles/
│
├── App.jsx
└── main.jsx
```

If the existing project already has an established structure, follow it rather than restructuring the entire application.

---

# 4. Component Architecture

React components should:

- Have a single clear responsibility
- Be small and understandable
- Be reusable where appropriate
- Avoid unnecessary internal complexity
- Prefer composition over excessive configuration
- Keep business logic outside presentation components when possible

Prefer:

```jsx
<JournalEntryForm />
<MoodSelector />
<MoodHistory />
<JournalEntryList />
```

Avoid large components that handle:

- UI
- authentication
- database operations
- validation
- business logic
- navigation

all in one file.

---

# 5. Component Naming

Use descriptive PascalCase names for React components.

Good:

```text
JournalEntryForm
MoodSelector
MoodHistoryChart
JournalEntryCard
DailyMoodSummary
NavigationBar
```

Avoid:

```text
Thing
Box
Component1
Data
Stuff
```

File names should normally match their component names.

Example:

```text
MoodSelector.jsx
JournalEntryCard.jsx
DailyMoodSummary.jsx
```

---

# 6. React Hooks

Use React hooks according to their intended purpose.

Use:

- `useState` for local state
- `useEffect` for synchronization with external systems
- `useMemo` only when memoization provides a meaningful benefit
- `useCallback` only when referential stability matters
- Custom hooks for reusable application logic

Avoid using `useEffect` for ordinary derived values.

Prefer:

```jsx
const moodLabel = moods.find(
  (mood) => mood.id === selectedMood
)?.label;
```

instead of storing `moodLabel` separately in state.

---

# 7. Custom Hooks

Reusable application logic should be extracted into custom hooks.

Possible examples:

```text
hooks/
├── useAuth.js
├── useJournal.js
├── useMoodTracker.js
└── useDebounce.js
```

Examples of responsibilities:

### useAuth

- Current user
- Session state
- Login
- Logout
- Registration

### useJournal

- Load entries
- Create entry
- Update entry
- Delete entry

### useMoodTracker

- Load mood history
- Save mood
- Calculate mood summaries
- Provide mood-related state

Do not create hooks simply to wrap a single trivial operation.

---

# 8. State Management

Use the simplest appropriate state-management solution.

Preferred order:

1. Local React state for component-specific state
2. React Context for application-wide state
3. Supabase for persistent server/database state

Avoid introducing Redux, Zustand, or another global state library unless there is a demonstrated need.

Do not duplicate server state unnecessarily in multiple places.

---

# 9. JavaScript Guidelines

Use modern JavaScript.

Prefer:

```javascript
const
let
async/await
destructuring
optional chaining
nullish coalescing
array methods
ES modules
```

Prefer:

```javascript
const entry = await getJournalEntry(id);
```

over:

```javascript
getJournalEntry(id).then((entry) => {
  // ...
});
```

Avoid:

```javascript
var
```

unless there is a specific compatibility reason.

Use descriptive variable names.

Good:

```javascript
const journalEntries = [];
const selectedMood = "happy";
const currentUser = user;
```

Avoid:

```javascript
const x = [];
const m = "happy";
const u = user;
```

---

# 10. TypeScript

If TypeScript is used or introduced:

- Enable strict mode
- Avoid `any`
- Define reusable types
- Type component props
- Type Supabase responses
- Keep domain models centralized

Example:

```ts
interface JournalEntry {
  id: string;
  user_id: string;
  content: string;
  mood: string;
  created_at: string;
  updated_at: string;
}
```

Prefer explicit types over `any`.

---

# 11. Supabase Architecture

Supabase is responsible for:

- Authentication
- Database access
- User-specific data
- Persistent journal entries
- Mood history

Supabase client initialization should be centralized.

Example:

```text
src/
└── lib/
    └── supabase.js
```

Do not initialize the Supabase client repeatedly across components.

---

# 12. Supabase Services

Database operations should preferably be separated from React components.

Use:

```text
services/
├── journalService.js
├── moodService.js
└── userService.js
```

Example:

```javascript
export async function getJournalEntries(userId) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
```

Components should not contain large database queries.

Avoid:

```jsx
// Large Supabase queries directly inside UI components
```

---

# 13. Database Design

Use clear and consistent table names.

Possible tables:

```text
profiles
journal_entries
moods
mood_entries
```

A journal entry may contain:

```text
id
user_id
content
mood
entry_date
created_at
updated_at
```

A mood entry may contain:

```text
id
user_id
mood
mood_score
entry_date
created_at
```

Use appropriate PostgreSQL data types.

Use timestamps consistently.

Prefer UTC timestamps in the database unless there is a specific reason to use another approach.

---

# 14. Row Level Security

Because journal entries are private personal information, Row Level Security (RLS) is mandatory.

Never disable RLS simply to make a query work.

Users must only be able to access their own data.

Policies should enforce ownership using the authenticated Supabase user.

Conceptually:

```text
auth.uid() = user_id
```

Every table containing user-owned information should have an appropriate RLS policy.

---

# 15. Supabase Security

Never expose:

- Supabase service-role keys
- Private API keys
- Passwords
- Secrets
- Server-only credentials

The frontend may use the public Supabase project URL and public anonymous key as intended by Supabase.

Never use the service-role key in browser/client-side code.

---

# 16. Authentication

Use Supabase Auth.

Authentication should support:

- Registration
- Login
- Logout
- Session persistence
- Loading state
- Authentication errors
- Protected application areas

Authentication state should be centralized.

Possible structure:

```text
context/
└── AuthContext.jsx

hooks/
└── useAuth.js
```

---

# 17. Protected Routes

Authenticated-only pages should not be accessible to unauthenticated users.

Examples:

```text
/dashboard
/journal
/history
/mood
/settings
```

Unauthenticated users should be redirected to an appropriate authentication page.

Handle the initial authentication loading state to prevent incorrect redirects while the Supabase session is being restored.

---

# 18. Journal Feature

The journal is the primary feature of the application.

A journal entry should support:

- Entry date
- Text content
- Mood
- Optional tags
- Created timestamp
- Updated timestamp

Possible journal entry:

```json
{
  "content": "Today was productive.",
  "mood": "happy",
  "tags": ["work", "success"]
}
```

---

# 19. Journal Entry Rules

Users should be able to:

- Create entries
- Read entries
- Edit entries
- Delete entries
- Search entries where appropriate
- Filter entries by date
- Filter entries by mood

Always confirm destructive actions when appropriate.

Deleting an entry should not happen accidentally.

---

# 20. Journal Editor

The journal editor should prioritize:

- Simple writing experience
- Minimal distractions
- Clear save state
- Validation
- Error handling
- Mobile usability

The user should clearly understand whether the entry is:

```text
Saving...
Saved
Unsaved changes
Error saving
```

Avoid losing user-written content.

---

# 21. Mood Tracker

The mood tracker should allow users to record their emotional state.

Possible moods:

```text
happy
calm
neutral
sad
angry
anxious
excited
tired
```

The exact mood list should be centralized rather than duplicated throughout the application.

For example:

```text
utils/
└── moods.js
```

---

# 22. Mood Data

Mood tracking should support:

- Daily mood selection
- Mood history
- Mood trends
- Mood summaries
- Calendar/history views
- Charts where useful

Do not present mood statistics as medical or psychological diagnoses.

The application should describe patterns as observations rather than clinical conclusions.

Prefer:

```text
"You recorded more low moods this week."
```

Avoid:

```text
"Your data proves that you are depressed."
```

---

# 23. Mood Visualization

Charts should be:

- Easy to understand
- Accessible
- Responsive
- Visually calm
- Useful rather than decorative

Possible visualizations:

- Mood over time
- Weekly mood summary
- Monthly mood distribution
- Mood frequency
- Calendar mood overview

Avoid unnecessary charts.

Every visualization should answer a meaningful user question.

---

# 24. Date and Time Handling

Journal dates are important.

Use a consistent strategy for:

- Entry dates
- Created timestamps
- Updated timestamps
- User-local display

Be careful with timezone conversions.

Avoid manually manipulating dates using string operations when a reliable date utility is already available in the project.

Do not accidentally change the journal date because of UTC/local timezone conversion.

---

# 25. Forms

Forms should:

- Have accessible labels
- Validate input
- Show useful errors
- Prevent accidental duplicate submissions
- Provide loading states
- Preserve user input after recoverable errors

Example:

```jsx
<label htmlFor="journal">
  Journal entry
</label>

<textarea
  id="journal"
  name="journal"
/>
```

---

# 26. Validation

Validate user input before sending it to Supabase.

Examples:

- Journal content should not exceed a reasonable length
- Required fields should be validated
- Mood values should come from the allowed mood list
- Dates should be valid

Validation should exist at the appropriate client and database/security layers.

Never rely solely on client-side validation for security.

---

# 27. Error Handling

Handle errors explicitly.

Common error scenarios:

- Network failure
- Supabase failure
- Authentication failure
- Invalid input
- Session expiration
- Permission denied
- Missing record

Use friendly user-facing messages.

Avoid exposing raw database errors to users.

Bad:

```text
PostgREST error 23505 relation journal_entries...
```

Better:

```text
We couldn't save your journal entry. Please try again.
```

Log technical details only when appropriate and never log sensitive journal content.

---

# 28. Loading States

Every asynchronous operation should have an appropriate loading state.

Examples:

```text
Loading journal...
Saving...
Deleting...
Loading mood history...
```

Avoid leaving users wondering whether an operation is still running.

Buttons should be disabled during operations when necessary to prevent duplicate requests.

---

# 29. Empty States

Provide useful empty states.

Examples:

```text
No journal entries yet.

Start by writing about your day.
```

For mood history:

```text
No mood data yet.

Record your first mood to start building your mood history.
```

Empty states should guide the user toward the next useful action.

---

# 30. Accessibility

Follow WCAG-oriented accessibility practices.

Use:

- Semantic HTML
- Proper labels
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Meaningful headings
- Appropriate contrast
- Accessible error messages

Do not use clickable `div` elements when a semantic button or link is appropriate.

Prefer:

```jsx
<button type="button">
  Save entry
</button>
```

over:

```jsx
<div onClick={saveEntry}>
  Save
</div>
```

---

# 31. Responsive Design

The application should work well on:

- Desktop
- Laptop
- Tablet
- Mobile

Do not design only for desktop.

Journal writing should be particularly comfortable on mobile devices.

Avoid horizontal scrolling wherever possible.

---

# 32. UI/UX Principles

The application should feel:

- Calm
- Personal
- Private
- Simple
- Focused
- Non-judgmental
- Distraction-free

Avoid excessive:

- Animations
- Notifications
- Popups
- Decorative elements
- Visual clutter

The journal should remain the focus.

---

# 33. Privacy

Journal entries may contain highly personal information.

Treat all journal content as private.

Never:

- Display another user's journal entries
- Include journal content in analytics unnecessarily
- Log journal content
- Put journal text into URLs
- Expose journal content in error messages
- Store journal content in browser storage unless explicitly required

---

# 34. Browser Storage

Do not store sensitive journal information in:

```text
localStorage
sessionStorage
cookies
```

unless there is a clearly justified and secure reason.

Prefer Supabase/database persistence for journal data.

If local draft storage is introduced, document:

- What is stored
- Why it is stored
- How it is cleared
- Potential privacy implications

---

# 35. Environment Variables

Use environment variables for configuration.

Example:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Never commit secret credentials.

Do not place service-role credentials in Vite environment variables exposed to the client.

Remember that `VITE_*` variables are exposed to client-side code.

---

# 36. Routing

Use the routing solution already present in the project.

Keep routes organized.

Possible structure:

```text
/
├── login
├── register
├── dashboard
├── journal
├── journal/:id
├── mood
├── history
└── settings
```

Protected routes should require authentication.

---

# 37. Performance

Optimize when there is a measurable or obvious benefit.

Consider:

- Lazy loading
- Code splitting
- Efficient Supabase queries
- Pagination for large histories
- Avoiding unnecessary renders
- Optimized images
- Small dependencies

Do not optimize prematurely.

Prefer readable code unless performance requires additional complexity.

---

# 38. Database Query Performance

Avoid fetching unnecessary data.

Prefer:

```javascript
.select("id, content, mood, entry_date")
```

when only those fields are required.

Use appropriate:

- Indexes
- Filters
- Ordering
- Pagination

Avoid loading the entire journal history if the dataset can become large.

---

# 39. Testing

When adding important functionality, consider tests for:

### Components

- Rendering
- User interaction
- Form validation
- Error states

### Hooks

- Loading
- Success
- Failure
- State transitions

### Services

- Supabase queries
- Error handling
- User ownership

### User flows

- Registration
- Login
- Create journal entry
- Edit journal entry
- Delete journal entry
- Record mood
- View mood history

---

# 40. Git Guidelines

Use meaningful commit messages.
