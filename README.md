# Daily Journal

A privacy-first daily journaling web application built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- ✍️ **One Entry Per Day**: Create or update a single journal entry for each calendar day
- 😊 **Mood Tracking**: Track your emotional state with intuitive mood indicators (5 mood levels)
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Dark Mode Support**: Comfortable reading in any lighting condition with automatic theme switching
- 💾 **Local Storage**: All data stored locally with a clean service layer for future backend integration
- 🔒 **Privacy First**: Your journal entries never leave your device
- ✨ **Beautiful UI**: Modern gradient backgrounds, smooth animations, and polished interactions
- ♿ **Accessible**: Keyboard navigation, screen reader support, and WCAG AA compliant

## 🎨 Design & Styling

The app features a **premium, polished design** with Tailwind CSS:

### Visual Design
- **Gradient Backgrounds**: Subtle gradient overlays for depth and visual interest
- **Glass Morphism**: Backdrop blur effects on navigation for a modern look
- **Card Hover Effects**: Smooth elevation changes with shadow and transform effects
- **Rounded Corners**: Generous border radius (xl/2xl) for a softer, friendlier feel
- **Color System**: Primary blue palette with semantic colors for different states

### Animations & Transitions
- **Fade In**: Smooth page load animations
- **Slide In**: Side-entry animations for alerts and messages
- **Scale Effects**: Subtle scale transformations on hover and active states
- **Loading States**: Professional spinner with animated dots
- **Micro-interactions**: Button press effects, icon transforms, and smooth color transitions

### Component Styling
- **Buttons**: Gradient backgrounds, shadow elevation, active scale effects
- **Forms**: Enhanced inputs with focus rings, hover states, and validation feedback
- **Mood Selector**: Interactive cards with scale effects and visual feedback
- **Navigation**: Sticky header with backdrop blur and active state indicators
- **Cards**: Elevated cards with gradient overlays and smooth hover transitions
- **Empty States**: Friendly illustrations with bordered dashed containers

### Accessibility Features
- Custom focus-visible rings (primary color with offset)
- High contrast text and borders
- Semantic HTML structure
- ARIA labels and roles
- Loading indicators with status text
- Keyboard navigation support

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Dates**: date-fns

## Project Structure

```
src/
├── app/                    # Application setup
│   ├── Layout.tsx         # Main layout with navigation
│   └── router/            # Route configuration
├── components/            # Reusable UI components
│   └── ui/
│       └── Button.tsx
├── features/              # Feature modules
│   └── journal/
│       ├── components/    # Journal-specific components
│       ├── hooks/         # Journal custom hooks
│       ├── journal.schema.ts    # Zod validation schemas
│       ├── journal.service.ts   # Data persistence layer
│       └── journal.types.ts     # (moved to types/)
├── pages/                 # Route-level page components
│   ├── HomePage.tsx
│   ├── JournalsPage.tsx
│   └── JournalEntryPage.tsx
├── types/                 # Shared TypeScript types
│   └── journal.types.ts
└── main.tsx              # Application entry point
```

## Architecture

The application follows clean architecture principles:

- **Pages**: Route-level composition, no business logic
- **Components**: UI rendering, delegating behavior to hooks
- **Hooks**: State management and service coordination
- **Services**: Data persistence abstraction (currently localStorage, designed for easy Supabase migration)
- **Schemas**: Input validation at boundaries using Zod

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173 by default)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development

The app will be available at `http://localhost:5173` (or the next available port)
Dashboard with stats cards, quick actions, and recent entries preview
- **My Journals** (`/journals`): Complete list of all entries with delete confirmation
- **New/Edit Entry** (`/journal/new` or `/journal/:id`): Form to create or edit entries with date picker, mood selector, and text area

## 🎨 UI Components

### Reusable Components
- **Button**: Multiple variants (primary, secondary, danger) and sizes (sm, md, lg)
- **LoadingSpinner**: Configurable spinner with optional text
- **EmptyState**: Consistent empty state pattern with icon, title, description, and action
- **ErrorMessage**: Styled error display with icon and border

### Feature Components
- **JournalCard**: Rich card with gradient overlay, mood badge, and hover effects
- **JournalForm**: Comprehensive form with validation, emoji mood selector, and enhanced input
- **Home** (`/`): Summary dashboard with quick stats and recent entries
- **My Journals** (`/journals`): List view of all journal entries with delete functionality
- **New/Edit Entry** (`/journal/new` or `/journal/:id`): Form to create or edit journal entries

## Data Model

Each journal entry contains:

```typescript
{
  id: string;           // Unique identifier
  date: string;         // ISO date (YYYY-MM-DD)
  mood: MoodType;       // One of: very_happy, happy, neutral, sad, very_sad
  content: string;      // Journal text (1-10000 characters)
  createdAt: string;    // ISO timestamp
  updatedAt: string;    // ISO timestamp
}
```

## Service Layer

The `journal.service.ts` provides a clean interface for data operations:

```typescript
- getAll(): Get all entries sorted by date
- getById(id): Get a specific entry
- getByDate(date): Get entry for a specific date
- save(input): Create or update an entry (upsert by date)
- delete(id): Remove an entry
- getForCurrentMonth(): Get current month's entries
- getCount(): Get total entry count
```

This abstraction allows easy swapping to a backend service (like Supabase) without changing component code.

## Future Enhancements

- [ ] Supabase backend integration
- [ ] User authentication
- [ ] Rich text editor
- [ ] Export/import functionality
- [ ] Search and filtering
- [ ] Mood analytics and trends
- [ ] Tags and categories
- [ ] Image attachments

## License

MIT
