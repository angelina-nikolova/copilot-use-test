# Daily Journal - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Flow](#data-flow)
3. [Component Architecture](#component-architecture)
4. [State Management](#state-management)
5. [Type System](#type-system)
6. [Validation Strategy](#validation-strategy)
7. [Service Layer](#service-layer)
8. [Styling System](#styling-system)
9. [Error Handling](#error-handling)
10. [Testing Strategy](#testing-strategy)
11. [Performance Considerations](#performance-considerations)
12. [Migration Path to Supabase](#migration-path-to-supabase)
13. [Development Workflows](#development-workflows)

---

## Architecture Overview

Daily Journal follows **Clean Architecture** principles adapted for React, with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Pages, Components, UI Primitives)     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Application Layer              │
│     (Hooks, State Management)           │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           Domain Layer                  │
│  (Business Logic, Validation, Types)    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│       Infrastructure Layer              │
│    (Services, Storage, API Clients)     │
└─────────────────────────────────────────┘
```

### Key Principles

1. **Pages never access services directly** - They delegate to hooks
2. **Hooks coordinate state** - They call services and manage React state
3. **Services own data access** - All storage logic is centralized
4. **Components are pure** - They render based on props and don't contain business logic
5. **Types flow from domain** - TypeScript interfaces define contracts between layers

### Directory Mapping

| Layer | Directories | Responsibility |
|-------|------------|----------------|
| Presentation | `pages/`, `components/ui/` | Render UI, handle user events |
| Application | `hooks/`, `features/*/hooks/` | Coordinate features, manage state |
| Domain | `types/`, `features/*/schema.ts` | Define data models and validation |
| Infrastructure | `features/*/service.ts` | Data persistence and external APIs |

---

## Data Flow

### Read Flow (Displaying Entries)

```
┌─────────┐     ┌─────────┐     ┌──────────┐     ┌────────────┐
│  Page   │────▶│  Hook   │────▶│ Service  │────▶│ localStorage│
│         │     │         │     │          │     │            │
│HomePage │     │useJournal│     │journal   │     │  (JSON)    │
│         │     │Entries  │     │Service   │     │            │
└─────────┘     └─────────┘     └──────────┘     └────────────┘
     ▲                 │
     │                 │
     └─────(entries)───┘
```

**Steps:**
1. Page renders and calls `useJournalEntries()` hook
2. Hook calls `journalService.getAll()` on mount
3. Service reads from localStorage and deserializes JSON
4. Service returns typed `JournalEntry[]` array
5. Hook updates React state and returns data to page
6. Page renders entry cards with the data

### Write Flow (Creating/Updating Entry)

```
┌─────────┐     ┌─────────┐     ┌──────────┐     ┌────────────┐
│  Page   │────▶│  Hook   │────▶│ Service  │────▶│ localStorage│
│         │     │         │     │          │     │            │
│Journal  │     │useJournal│     │journal   │     │  (JSON)    │
│Entry    │     │Entry    │     │Service   │     │            │
│Page     │     │         │     │          │     │            │
└─────────┘     └─────────┘     └──────────┘     └────────────┘
     │                 ▲                │
     │                 │                │
     └─(form submit)───┴─(saved entry)─┘
```

**Steps:**
1. User submits form in JournalEntryPage
2. React Hook Form validates with Zod schema
3. Page calls `saveEntry()` function from hook
4. Hook calls `journalService.save()` with validated data
5. Service updates/creates entry in localStorage
6. Service returns updated entry
7. Hook updates React state
8. Page shows success feedback

---

## Component Architecture

### UI Component Hierarchy

```
Layout (App Shell)
├── Navigation
└── Outlet (Route Content)
    ├── HomePage
    │   ├── Button (New Entry)
    │   ├── JournalCard (multiple)
    │   │   ├── MoodIndicator
    │   │   └── Button (Edit, Delete)
    │   ├── Modal (Delete Confirmation)
    │   ├── LoadingSpinner
    │   ├── ErrorMessage
    │   └── EmptyState
    ├── JournalsPage
    │   └── (similar to HomePage)
    └── JournalEntryPage
        ├── DateSelector
        ├── MoodSelector
        ├── Textarea
        ├── Button (Save, Cancel)
        ├── LoadingSpinner
        └── ErrorMessage
```

### Component Design Patterns

#### 1. UI Primitives (`components/ui/`)

**Purpose**: Reusable, stateless, domain-agnostic components

**Characteristics:**
- Accept explicit props, no context dependencies
- No business logic or data fetching
- Fully typed with TypeScript interfaces
- Accessible by default
- Styled with Tailwind classes

**Example: Button Component**

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  // Render with appropriate classes
}
```

#### 2. Feature Components (`features/journal/components/`)

**Purpose**: Domain-specific, feature-aware components

**Characteristics:**
- Understand journal domain concepts
- May use feature-specific hooks
- Compose UI primitives
- Handle feature-specific logic

**Example: JournalCard Component**

```typescript
interface JournalCardProps {
  entry: JournalEntry;
  onDelete: (id: string) => void;
}

export function JournalCard({ entry, onDelete }: JournalCardProps) {
  // Renders entry with mood, content preview, actions
  // Uses Button and other UI primitives
}
```

**Example: JournalForm Component**

```typescript
interface JournalFormProps {
  defaultValues?: Partial<JournalEntryFormData>;
  onSubmit: (data: JournalEntryFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function JournalForm({ defaultValues, onSubmit, onCancel, submitLabel }: JournalFormProps) {
  // Integrates React Hook Form + Zod validation
  // Includes mood selector, date picker, textarea
  // Features real-time character counter with color feedback
  // Handles form state, validation errors, and submission
}
```

#### 3. Page Components (`pages/`)

**Purpose**: Route-level composition and coordination

**Characteristics:**
- One page per route
- Compose feature and UI components
- Use hooks for data and state
- Handle route params
- No direct service calls

**Example: HomePage Component**

```typescript
export function HomePage() {
  const { entries, loading, error, deleteEntry } = useJournalEntries();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Render composition with conditional states
}
```

---

## State Management

### Local State Strategy

**React State Types:**

1. **Server State** (entries, user data)
   - Fetched from services
   - Cached in hooks
   - Invalidated after mutations

2. **UI State** (modals, dropdowns, loading)
   - Local to components
   - Short-lived
   - Not persisted

3. **Form State** (input values, validation errors)
   - Managed by React Hook Form
   - Validated with Zod
   - Submitted to services

**State Ownership:**

| State Type | Owner | Example |
|------------|-------|---------|
| Journal entries | `useJournalEntries` hook | `entries: JournalEntry[]` |
| Single entry | `useJournalEntry` hook | `entry: JournalEntry \| null` |
| Delete modal | Page component | `deleteId: string \| null` |
| Form inputs | React Hook Form | Managed internally |
| Loading states | Hooks | `loading: boolean` |
| Error states | Hooks | `error: Error \| null` |

### Custom Hooks Pattern

```typescript
// features/journal/hooks/useJournalEntries.ts
export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const data = await journalService.getAll();
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id: string) => {
    await journalService.delete(id);
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return { entries, loading, error, deleteEntry, reload: loadEntries };
}
```

**Hook Responsibilities:**
- Encapsulate feature-specific state and side effects
- Call services and handle async operations
- Expose clean, typed API to components
- Manage loading, error, and success states
- Provide mutation functions

---

## Type System

### Core Domain Types

```typescript
// types/journal.types.ts

export type MoodType = 
  | 'very_happy' 
  | 'happy' 
  | 'neutral' 
  | 'sad' 
  | 'very_sad';

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  mood: MoodType;
  content: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface JournalEntryInput {
  date: string;
  mood: MoodType;
  content: string;
}
```

### Type Flow Strategy

```
Zod Schema → TypeScript Type → Component Props
     ↓
Validation        ↓
     ↓         Domain Model
     ↓            ↓
Form Input → Service Layer → Storage
```

**Type Sources:**

1. **Inferred from Zod schemas** (preferred for validated data)
   ```typescript
   export const journalEntrySchema = z.object({...});
   export type JournalEntryFormData = z.infer<typeof journalEntrySchema>;
   ```

2. **Explicit interfaces** (for domain models)
   ```typescript
   export interface JournalEntry {...}
   ```

3. **React component props**
   ```typescript
   interface JournalCardProps {
     entry: JournalEntry;
     onDelete: (id: string) => void;
   }
   ```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,                    // All strict checks
    "noImplicitAny": true,             // No implicit any
    "strictNullChecks": true,          // Null/undefined safety
    "noUnusedLocals": true,            // Catch unused variables
    "noUnusedParameters": true,        // Catch unused params
    "noFallthroughCasesInSwitch": true // Switch safety
  }
}
```

---

## Validation Strategy

### Three-Layer Validation

1. **Client-side (Zod + React Hook Form)**
   - Immediate user feedback
   - Prevents invalid submissions
   - Not authoritative

2. **Service-layer (Runtime checks)**
   - Additional safety before storage
   - Protects against programming errors

3. **Database constraints (Future)**
   - Ultimate source of truth
   - When Supabase is integrated

### Zod Schema Design

```typescript
// features/journal/journal.schema.ts
export const journalEntrySchema = z.object({
  date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/, 
    'Date must be in YYYY-MM-DD format'
  ),
  mood: z.enum([
    'very_happy', 
    'happy', 
    'neutral', 
    'sad', 
    'very_sad'
  ]),
  content: z.string()
    .trim()
    .min(1, 'Journal entry cannot be empty')
    .max(10000, 'Journal entry is too long (max 10000 characters)'),
});
```

**Schema Characteristics:**
- Clear, actionable error messages
- Matches domain constraints exactly
- Used for both creation and updates
- Consistent with future database schema

### Form Integration

```typescript
// In component
const form = useForm<JournalEntryFormData>({
  resolver: zodResolver(journalEntrySchema),
  defaultValues: {
    date: format(new Date(), 'yyyy-MM-dd'),
    mood: 'neutral',
    content: '',
  },
});

const onSubmit = async (data: JournalEntryFormData) => {
  // data is fully validated and typed
  await saveEntry(data);
};
```

### Form Features

#### Real-Time Character Counter

The journal entry form includes a real-time character counter with visual feedback:

```typescript
// In JournalForm component
const content = watch('content');
const characterCount = content?.length ?? 0;
const maxCharacters = 10000;

// Render counter with color-coded feedback
<div className={`text-sm transition-colors ${
  characterCount > maxCharacters 
    ? 'text-red-600 dark:text-red-400 font-semibold' 
    : characterCount > maxCharacters * 0.9
    ? 'text-amber-600 dark:text-amber-400'
    : 'text-gray-500 dark:text-gray-400'
}`}>
  {characterCount.toLocaleString()} / {maxCharacters.toLocaleString()} characters
</div>
```

**Character Counter States:**

| Character Count | Color | Indication |
|----------------|-------|------------|
| 0 - 9,000 | Gray | Normal - plenty of space remaining |
| 9,001 - 10,000 | Amber | Warning - approaching character limit |
| 10,001+ | Red (bold) | Error - exceeds maximum allowed characters |

**Implementation Benefits:**
- Provides immediate user feedback while typing
- Uses React Hook Form's `watch()` for efficient updates
- Color-coded visual cues match accessibility standards
- Formatted numbers with commas for readability
- Prevents user frustration from exceeding limits without warning

---

## Service Layer

### Service Design Pattern

```typescript
// features/journal/journal.service.ts
class JournalService {
  async getAll(): Promise<JournalEntry[]> {
    // Read from storage
  }

  async getById(id: string): Promise<JournalEntry | null> {
    // Find specific entry
  }

  async save(input: JournalEntryInput): Promise<JournalEntry> {
    // Create or update
  }

  async delete(id: string): Promise<void> {
    // Remove entry
  }
}

export const journalService = new JournalService();
```

**Service Responsibilities:**
- Abstract storage implementation
- Enforce one-entry-per-day constraint
- Handle timestamps (createdAt, updatedAt)
- Generate IDs for new entries
- Sort and filter data
- Handle storage errors

### Current Implementation: localStorage

```typescript
const STORAGE_KEY = 'daily-journal-entries';

async save(input: JournalEntryInput): Promise<JournalEntry> {
  const entries = await this.getAll();
  const existingIndex = entries.findIndex(e => e.date === input.date);
  
  if (existingIndex >= 0) {
    // Update existing
    const updated = { ...entries[existingIndex], ...input, updatedAt: now() };
    entries[existingIndex] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return updated;
  } else {
    // Create new
    const newEntry = { id: crypto.randomUUID(), ...input, createdAt: now(), updatedAt: now() };
    entries.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return newEntry;
  }
}
```

**Benefits of Service Layer:**
- Easy to swap localStorage → Supabase
- Consistent error handling
- Centralized business rules
- Testable without UI

---

## Styling System

### Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { /* custom scale */ },
        neutral: { /* custom scale */ },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Small, subtle radii (Notion-inspired)
      },
    },
  },
};
```

### Design Tokens

**Spacing Scale:**
- `xs`: 0.5rem (8px)
- `sm`: 0.75rem (12px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)

**Typography Scale:**
- `text-xs`: 0.75rem
- `text-sm`: 0.875rem
- `text-base`: 1rem
- `text-lg`: 1.125rem
- `text-xl`: 1.25rem
- `text-2xl`: 1.5rem

**Component Patterns:**
- Cards: `border border-gray-200 dark:border-gray-700 rounded-lg p-4`
- Buttons: `px-4 py-2 rounded-md font-medium transition-colors`
- Inputs: `border border-gray-300 rounded-md px-3 py-2 focus:ring-2`

See [STYLING.md](./STYLING.md) for full design system documentation.

---

## Error Handling

### Error Handling Strategy

```
┌─────────────┐
│   Service   │ Throws Error
└──────┬──────┘
       │
┌──────▼──────┐
│    Hook     │ Catches, sets error state
└──────┬──────┘
       │
┌──────▼──────┐
│  Component  │ Renders ErrorMessage
└─────────────┘
```

### Hook Error Pattern

```typescript
export function useJournalEntry(id: string) {
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [saving, setSaving] = useState(false);

  const saveEntry = async (input: JournalEntryInput) => {
    try {
      setSaving(true);
      setError(null);
      const saved = await journalService.save(input);
      setEntry(saved);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error; // Re-throw for form handling
    } finally {
      setSaving(false);
    }
  };

  return { entry, error, saving, saveEntry };
}
```

### Component Error Display

```typescript
// components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
  error: Error | null;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg p-4">
      <p className="text-red-800 dark:text-red-200">
        {error.message}
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
```

### User-Facing Error Messages

**Never expose:**
- Stack traces
- Internal error codes
- Database errors
- Authentication tokens

**Always provide:**
- Clear description of what went wrong
- Suggested next action
- Retry option when applicable
- Contact info for persistent issues

---

## Testing Strategy

### Test Pyramid

```
        /\
       /  \
      /E2E \      <- Playwright (planned)
     /______\
    /        \
   /Integration\  <- Vitest + Testing Library
  /__________\
 /            \
/   Unit Tests \  <- Vitest
/______________\
```

### Unit Tests (Pure Logic)

**Test Files:** `*.test.ts`

**Coverage:**
- Validation schemas
- Date utilities
- Data transformations
- Pure helper functions

```typescript
// journal.schema.test.ts
describe('journalEntrySchema', () => {
  it('accepts valid journal entry', () => {
    const valid = {
      date: '2026-08-10',
      mood: 'happy' as const,
      content: 'Today was great!',
    };
    expect(journalEntrySchema.parse(valid)).toEqual(valid);
  });

  it('rejects invalid date format', () => {
    const invalid = { date: '08/10/2026', mood: 'happy', content: 'Test' };
    expect(() => journalEntrySchema.parse(invalid)).toThrow();
  });
});
```

### Component Tests (Integration)

**Test Files:** `*.test.tsx`

**Coverage:**
- Component rendering
- User interactions
- Loading/error/empty states
- Form submissions
- Conditional rendering

```typescript
// JournalCard.test.tsx
describe('JournalCard', () => {
  it('renders entry with mood and content preview', () => {
    const entry: JournalEntry = {
      id: '1',
      date: '2026-08-10',
      mood: 'happy',
      content: 'Test content',
      createdAt: '2026-08-10T10:00:00Z',
      updatedAt: '2026-08-10T10:00:00Z',
    };

    render(<JournalCard entry={entry} onDelete={vi.fn()} />);
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('calls onDelete when delete button clicked', async () => {
    const onDelete = vi.fn();
    render(<JournalCard entry={mockEntry} onDelete={onDelete} />);
    
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
```

### E2E Tests (Critical Paths)

**Test Files:** `e2e/*.spec.ts` (Planned)

**Coverage:**
- Complete user journeys
- Create → Edit → Delete flow
- Error recovery
- Cross-browser compatibility

---

## Performance Considerations

### Current Optimizations

1. **Code Splitting**
   - React Router with lazy loading (when needed)
   - Dynamic imports for heavy features

2. **Efficient Rendering**
   - Proper React keys on lists
   - Avoid inline function definitions in render
   - Memoize expensive computations

3. **Bundle Size**
   - Tree-shaking enabled
   - No unnecessary dependencies
   - Lucide React (icon imports are tree-shakeable)

### Future Optimizations

1. **Data Layer**
   - Pagination for large entry lists
   - Virtualized scrolling for long lists
   - Debounced autosave
   - Optimistic updates

2. **Assets**
   - Image optimization
   - Lazy-loaded images
   - WebP/AVIF formats

3. **Caching**
   - Service worker for offline support
   - React Query for server state (when Supabase added)

---

## Migration Path to Supabase

### Phase 1: Service Layer Preparation ✅

Current implementation uses a service layer that abstracts storage:

```typescript
//journal.service.ts - current
class JournalService {
  async getAll(): Promise<JournalEntry[]> {
    // localStorage implementation
  }
}
```

### Phase 2: Supabase Client Setup

1. **Install Supabase client**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Configure client**
   ```typescript
   // lib/supabase/client.ts
   import { createClient } from '@supabase/supabase-js';
   
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
   
   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

3. **Add environment variables**
   ```bash
   # .env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxxx
   ```

### Phase 3: Database Schema

```sql
-- Migration: Create journal_entries table

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null,
  mood text not null check (mood in ('very_happy', 'happy', 'neutral', 'sad', 'very_sad')),
  content text not null check (length(content) > 0 and length(content) <= 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  unique(user_id, entry_date)
);

-- Row Level Security
alter table public.journal_entries enable row level security;

create policy "Users manage their own journal entries"
on public.journal_entries
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Updated at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.journal_entries
  for each row
  execute function public.handle_updated_at();

-- Index for queries
create index journal_entries_user_date_idx 
on public.journal_entries(user_id, entry_date desc);
```

### Phase 4: Update Service Implementation

```typescript
// journal.service.ts - Supabase version
class JournalService {
  async getAll(): Promise<JournalEntry[]> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('entry_date', { ascending: false });

    if (error) throw error;
    return data.map(this.mapFromDb);
  }

  async save(input: JournalEntryInput): Promise<JournalEntry> {
    const { data, error } = await supabase
      .from('journal_entries')
      .upsert({
        entry_date: input.date,
        mood: input.mood,
        content: input.content,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapFromDb(data);
  }

  private mapFromDb(row: any): JournalEntry {
    return {
      id: row.id,
      date: row.entry_date,
      mood: row.mood,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
```

### Phase 5: Authentication

1. **Add auth provider**
   ```typescript
   // app/providers/AuthProvider.tsx
   export function AuthProvider({ children }: { children: ReactNode }) {
     const [user, setUser] = useState<User | null>(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       supabase.auth.getSession().then(({ data: { session } }) => {
         setUser(session?.user ?? null);
         setLoading(false);
       });

       const { data: { subscription } } = supabase.auth.onAuthStateChange(
         (_event, session) => {
           setUser(session?.user ?? null);
         }
       );

       return () => subscription.unsubscribe();
     }, []);

     return (
       <AuthContext.Provider value={{ user, loading }}>
         {children}
       </AuthContext.Provider>
     );
   }
   ```

2. **Add protected routes**
3. **Create sign-in/sign-up pages**

### Phase 6: Data Migration

For users with existing localStorage data:

```typescript
// migrations/localStorage-to-supabase.ts
export async function migrateLocalStorageToSupabase() {
  const localData = localStorage.getItem('daily-journal-entries');
  if (!localData) return;

  const entries: JournalEntry[] = JSON.parse(localData);
  
  for (const entry of entries) {
    await journalService.save({
      date: entry.date,
      mood: entry.mood,
      content: entry.content,
    });
  }

  // Backup then clear
  localStorage.setItem('daily-journal-entries-backup', localData);
  localStorage.removeItem('daily-journal-entries');
}
```

---

## Development Workflows

### Adding a New Feature

1. **Define types** in `types/` or feature folder
2. **Create schema** in `features/*/schema.ts`
3. **Implement service** in `features/*/service.ts`
4. **Create hook** in `features/*/hooks/`
5. **Build components** in `features/*/components/`
6. **Create page** in `pages/`
7. **Add route** in `app/router/`
8. **Write tests** for each layer
9. **Update documentation**

### Making Changes to Existing Features

1. **Read existing code** to understand patterns
2. **Update types** if data model changes
3. **Update schema** if validation changes
4. **Update service** if storage logic changes
5. **Update hooks** if state management changes
6. **Update components** for UI changes
7. **Update tests** to match changes
8. **Run lint and tests** before committing

### Debugging Workflow

1. **Check browser console** for errors
2. **Use React DevTools** to inspect state
3. **Check localStorage** in Application tab
4. **Add breakpoints** in service layer
5. **Review error boundaries** for caught errors
6. **Check network tab** (future: for Supabase calls)

### Code Review Checklist

- [ ] TypeScript passes with no errors
- [ ] ESLint passes with no warnings
- [ ] All tests pass
- [ ] No console.log statements left
- [ ] Props are properly typed
- [ ] Error states are handled
- [ ] Loading states are shown
- [ ] Empty states are handled
- [ ] Accessibility standards met
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Follows existing patterns
- [ ] Documentation updated if needed

---

## Appendix

### Key Files Reference

| File | Purpose |
|------|---------|
| `src/main.tsx` | Application entry point |
| `src/app/router/index.tsx` | Route configuration |
| `src/app/Layout.tsx` | Root layout with navigation |
| `src/features/journal/journal.service.ts` | Data access layer |
| `src/features/journal/journal.schema.ts` | Validation schemas |
| `src/types/journal.types.ts` | Domain types |
| `tailwind.config.js` | Design system tokens |
| `vite.config.ts` | Build configuration |
| `.github/copilot-instructions.md` | Copilot coding guidelines |

### Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npm run preview                # Preview build locally

# Code Quality
npm run lint                   # Run ESLint
npm run lint -- --fix          # Auto-fix lint issues
npx tsc --noEmit              # Type-check without building

# Testing
npm run test                   # Run tests in watch mode
npm run test -- --run         # Run tests once
npm run test:ui               # Open Vitest UI

# Dependencies
npm outdated                   # Check for updates
npm audit                      # Security audit
```

### Common Patterns

#### Adding a new mood type

1. Update `MoodType` in `types/journal.types.ts`
2. Update `mood` enum in `journal.schema.ts`
3. Update mood selector component
4. Update mood indicator styling
5. Update tests
6. (Future) Add database migration to update check constraint

#### Adding a new form field

1. Update schema in `journal.schema.ts`
2. Update type/interface
3. Add field to form component with appropriate validation
4. Add visual feedback (e.g., character counter for text fields)
5. Update service layer
6. (Future) Add database column

**Example:** The character counter feature was added by:
- Using React Hook Form's `watch()` to track content length
- Adding color-coded visual feedback based on character count
- Matching the validation limit (10,000 characters) from the Zod schema

#### Creating a new page

1. Create component in `pages/`
2. Add route in `app/router/index.tsx`
3. Add navigation link if needed
4. Create tests

---

**Document Version:** 1.1.0  
**Last Updated:** August 10, 2026  
**Recent Changes:**
- Added character counter feature documentation
- Updated form integration examples
- Enhanced common patterns with character counter example

**Maintained by:** Project Team

For questions or clarifications, please open an issue or discussion in the repository.
