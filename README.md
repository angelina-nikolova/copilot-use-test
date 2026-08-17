# Daily Journal

A calm, privacy-focused daily journaling web application with integrated mood tracking. Built with React, TypeScript, and designed with clean architecture principles.

## Overview

Daily Journal provides a focused, distraction-free space for personal reflection and daily writing. The application combines a Notion-inspired editorial experience with structured mood tracking, helping users maintain a consistent journaling practice and gain insights into their emotional patterns over time.

**Key Characteristics:**
- Privacy-first design with local data storage
- One entry per day model
- Clean, accessible, keyboard-friendly interface
- Mood tracking with 5-point scale
- Designed for future Supabase integration

## Features

### ✅ Currently Implemented

- **Daily Journal Entries**: Create, edit, and delete journal entries with a date-based system (one entry per day)
- **Mood Tracking**: Track daily mood with 5 predefined values (very happy, happy, neutral, sad, very sad)
- **Entry Management**: View all entries sorted by date, filter by month, and manage your journal history
- **Rich Text Editor**: Clean writing interface with real-time character counter (up to 10,000 characters)
- **Character Counter**: Visual feedback with color-coded indicators (gray → amber → red) as you approach the character limit
- **Delete Confirmation**: Explicit confirmation dialogs prevent accidental data loss
- **Responsive Design**: Mobile-first UI that works seamlessly across devices
- **Dark Mode Support**: System preference detection with manual toggle capability
- **Local Data Persistence**: All entries stored locally with a service layer ready for backend integration
- **Loading & Error States**: Clear feedback for all asynchronous operations
- **Empty States**: Helpful prompts when no entries exist

## Tech Stack

### Core Framework
- **React 18.3** - UI library with hooks and function components
- **TypeScript 5.6** - Type-safe application code
- **Vite 6.0** - Fast build tool and development server

### Routing & Navigation
- **React Router 7.1** - Client-side routing with nested routes

### Forms & Validation
- **React Hook Form 7.54** - Performant form state management
- **Zod 3.24** - Runtime type validation and schema definition
- **@hookform/resolvers 3.9** - Zod integration for React Hook Form

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React 0.468** - Icon library with consistent design
- **PostCSS 8.4** - CSS processing and autoprefixing

### Date Management
- **date-fns 4.1** - Modern date utility library for formatting and calculations

### Testing
- **Vitest 2.1** - Fast unit test runner compatible with Vite
- **@vitejs/plugin-react 4.3** - React support for Vitest

### Code Quality
- **ESLint 9.17** - Linting with TypeScript and React rules
- **TypeScript ESLint 8.18** - TypeScript-specific linting rules
- **Prettier** (via ESLint config) - Code formatting

## Project Structure

The project follows clean architecture principles with feature-based organization:

```
copilot-use-test/
├── .github/                      # GitHub-specific configuration
│   ├── agents/                   # Custom Copilot agent definitions
│   │   └── documentation-readme.agent.md
│   ├── prompts/                  # Prompt templates
│   ├── copilot-instructions.md   # Main Copilot guidelines
│   ├── general.instructions.md   # General coding standards
│   ├── typescript-react.instructions.md
│   ├── css-tailwind.instructions.md
│   └── design.instructions.md
├── public/                       # Static assets
│   └── logo.avif
├── src/
│   ├── app/                      # Application composition
│   │   ├── Layout.tsx            # Root layout component
│   │   ├── router/               # Route configuration
│   │   │   └── index.tsx
│   │   └── index.ts
│   ├── components/               # Reusable UI components
│   │   └── ui/                   # Design system primitives
│   │       ├── Button.tsx
│   │       ├── DateSelector.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorMessage.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── Modal.tsx
│   │       └── Navigation.tsx
│   ├── features/                 # Feature-specific code
│   │   └── journal/              # Journal domain logic
│   │       ├── components/       # Journal-specific components
│   │       ├── hooks/            # Journal-related hooks
│   │       ├── journal.schema.ts # Zod validation schemas
│   │       └── journal.service.ts # Data access layer
│   ├── pages/                    # Route-level components
│   │   ├── HomePage.tsx          # Landing page with entry list
│   │   ├── JournalsPage.tsx      # All journals view
│   │   └── JournalEntryPage.tsx  # Single entry editor
│   ├── types/                    # Shared TypeScript types
│   │   └── journal.types.ts
│   ├── assets/                   # Images, fonts, etc.
│   ├── index.css                 # Global styles and Tailwind imports
│   └── main.tsx                  # Application entry point
├── AGENTS.md                     # Agent instructions and guidelines
├── STYLING.md                    # Design system documentation
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json             # App-specific TypeScript config
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
└── eslint.config.js              # ESLint configuration
```

### Architecture Layers

**Pages** → **Features** → **Hooks** → **Services**

- **Pages**: Route-level composition, no business logic or direct data access
- **Features**: Domain-specific components, hooks, services, schemas, and types
- **Hooks**: Coordinate React state, loading/error states, and call services
- **Services**: Own data access logic (currently localStorage, designed for Supabase)
- **Components/UI**: Reusable, domain-agnostic design system primitives

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd copilot-use-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server with hot reload

# Building
npm run build        # Type-check with tsc and build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint on all files

# Testing
npm run test         # Run Vitest in watch mode
npm run test:ui      # Run Vitest with UI interface
```

## Usage

### Creating Your First Entry

1. Visit the home page
2. Click "New Entry" or press the keyboard shortcut
3. Select today's date (or any past date)
4. Choose your current mood from the 5-point scale
5. Write your journal entry - the character counter will update in real-time
   - Gray text: under 9,000 characters
   - Amber text: 9,000-10,000 characters (approaching limit)
   - Red text: over 10,000 characters (exceeds limit)
6. Click "Save Entry" to save your entry

### Editing an Existing Entry

1. Click on any entry card from the home page or journals list
2. Update the mood or content
3. Click "Save Entry" to persist changes

### Deleting an Entry

1. Click the "Delete" button on an entry card
2. Confirm the deletion in the modal dialog
3. The entry will be permanently removed

### Navigation

- **Home (`/`)**: View current month's entries with quick stats
- **Journals (`/journals`)**: Browse all journal entries
- **Entry Editor (`/journal/:id`)**: View or edit a specific entry

## Data Model

### JournalEntry

```typescript
interface JournalEntry {
  id: string;              // UUID
  date: string;            // YYYY-MM-DD format
  mood: MoodType;          // 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad'
  content: string;         // Journal text (1-10,000 characters)
  createdAt: string;       // ISO 8601 timestamp
  updatedAt: string;       // ISO 8601 timestamp
}
```

### Validation Rules

- **Date**: Must be in YYYY-MM-DD format, only one entry per date
- **Mood**: Required, must be one of the 5 predefined values
- **Content**: Required, 1-10,000 characters after trimming

## Environment Configuration

Currently, the application runs entirely client-side with localStorage. No environment variables are required.

### Future Supabase Integration

When Supabase is integrated, the following environment variables will be needed:

```bash
# .env.example (for future use)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note**: Never commit actual credentials. The `.env` file is gitignored.

## Testing

The project uses Vitest for unit and integration testing.

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests once (CI mode)
npm run test -- --run
```

### Test Coverage Focus

- Pure domain logic (validation, date utilities)
- Component states (loading, error, empty, success)
- Form validation and submission
- User interactions (keyboard, clicks, confirmations)
- CRUD operations through the service layer

## Accessibility

The application follows WCAG 2.1 AA standards:

- ✅ Semantic HTML with proper heading hierarchy
- ✅ Keyboard-accessible navigation and controls
- ✅ Visible focus indicators
- ✅ Sufficient color contrast (checked in both light and dark modes)
- ✅ Proper ARIA labels where needed
- ✅ Form validation with clear error messages
- ✅ Screen reader friendly announcements

## Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile browsers: iOS Safari 14+, Chrome for Android

## Design Philosophy

Daily Journal embraces a **calm, editorial interface** inspired by Notion:

- Strong typography with generous whitespace
- Subtle surfaces with small-radius borders
- Restrained color hierarchy
- Fast, keyboard-friendly editing
- No emoji as UI elements
- No purple gradients or decorative effects
- Respect for `prefers-reduced-motion`

See [STYLING.md](./STYLING.md) for detailed design system documentation.

## Development Guidelines

### Code Style

- Use function components and hooks (no class components)
- Keep TypeScript strict (no `any` types)
- Small, focused components with single responsibilities
- Explicit prop types and proper TypeScript modeling
- Pure rendering with I/O in effects or handlers

### Commit Conventions

Follow Conventional Commits format:

```
feat: add mood tracking calendar
fix: validate journal entry length
refactor: simplify auth session hook
docs: update local setup guide
test: cover journal deletion confirmation
```

### Before Committing

1. Run the linter: `npm run lint`
2. Run tests: `npm run test -- --run`
3. Type-check: `npm run build` (or `tsc -b`)
4. Ensure no console errors in the browser

## Roadmap

### Planned Features

- [ ] **Supabase Integration**: Replace localStorage with Supabase backend
- [ ] **Authentication**: Email/password authentication with Supabase Auth
- [ ] **Row Level Security**: User-scoped data with proper RLS policies
- [ ] **Mood Visualization**: Charts and trends for mood data
- [ ] **Calendar View**: Month/year calendar with entry indicators
- [ ] **Entry Attachments**: Image upload with Supabase Storage
- [ ] **Search & Filtering**: Full-text search and advanced filters
- [ ] **Autosave**: Draft preservation with debounced saves
- [ ] **AI Features**: Reflection prompts and summaries (with user consent)
- [ ] **Export**: PDF, Markdown, or JSON export options
- [ ] **Tags & Categories**: Organize entries with custom labels
- [ ] **End-to-End Testing**: Playwright test suite for critical flows

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Vercel will auto-detect Vite and use the correct build settings
4. Deploy!

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains the static files
# Deploy dist/ to any static hosting service
```

## Contributing

This is a demonstration project built with GitHub Copilot. Contributions are welcome for:

- Bug fixes
- Performance improvements
- Accessibility enhancements
- Test coverage
- Documentation improvements

Please ensure all tests pass and code is linted before submitting pull requests.

## License

[Specify your license here - e.g., MIT, Apache 2.0, or proprietary]

## Acknowledgments

- Built with guidance from GitHub Copilot
- Designed following clean architecture principles
- Inspired by Notion's calm, focused editorial interface

---

**Questions or Issues?** Please open an issue in the repository.
