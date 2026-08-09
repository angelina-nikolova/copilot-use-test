# Tailwind CSS Styling Guide

This document outlines the Tailwind CSS patterns and conventions used in the Daily Journal app.

## Color Palette

### Primary Colors
```
primary-50  → #f0f9ff  (lightest blue)
primary-100 → #e0f2fe
primary-200 → #bae6fd
primary-300 → #7dd3fc
primary-400 → #38bdf8
primary-500 → #0ea5e9
primary-600 → #0284c7  (brand color)
primary-700 → #0369a1
primary-800 → #075985
primary-900 → #0c4a6e
primary-950 → #082f49  (darkest blue)
```

### Semantic Colors
- **Success**: green-500/600
- **Error**: red-600/800
- **Warning**: orange-500/600
- **Info**: blue-500/600

## Typography

### Font Sizes
```
text-xs    → 0.75rem   (12px)
text-sm    → 0.875rem  (14px)
text-base  → 1rem      (16px)
text-lg    → 1.125rem  (18px)
text-xl    → 1.25rem   (20px)
text-2xl   → 1.5rem    (24px)
text-3xl   → 1.875rem  (30px)
text-4xl   → 2.25rem   (36px)
text-5xl   → 3rem      (48px)
```

### Font Weights
```
font-medium   → 500
font-semibold → 600
font-bold     → 700
```

### Gradient Text
```tsx
<h1 className="bg-gradient-to-r from-gray-900 to-primary-700 dark:from-white dark:to-primary-400 bg-clip-text text-transparent">
  Title
</h1>
```

## Spacing

### Consistent Gaps
```
gap-1  → 0.25rem  (4px)   - tight spacing
gap-2  → 0.5rem   (8px)   - default small
gap-3  → 0.75rem  (12px)  - default medium
gap-4  → 1rem     (16px)  - default large
gap-6  → 1.5rem   (24px)  - extra large
gap-8  → 2rem     (32px)  - section spacing
gap-10 → 2.5rem   (40px)  - major sections
```

### Padding
```
p-4  → 1rem      (16px)  - card padding small
p-6  → 1.5rem    (24px)  - card padding medium
p-8  → 2rem      (32px)  - card padding large
p-10 → 2.5rem    (40px)  - page sections
```

## Border Radius

```
rounded-lg   → 0.5rem   (8px)   - buttons, small cards
rounded-xl   → 0.75rem  (12px)  - cards, forms
rounded-2xl  → 1rem     (16px)  - large cards, containers
rounded-full → 9999px           - pills, badges
```

## Shadows

```
shadow-sm  → subtle shadow
shadow-md  → medium shadow
shadow-lg  → large shadow
shadow-xl  → extra large shadow
shadow-2xl → massive shadow
```

### Custom Shadows
```
hover:shadow-xl   - card hover
hover:shadow-2xl  - prominent hover
```

## Animations & Transitions

### Duration
```
duration-200 → 200ms  - quick (buttons, links)
duration-300 → 300ms  - standard (cards, modals)
duration-500 → 500ms  - slow (page transitions)
```

### Custom Animations

#### Fade In
```tsx
<div className="fade-in">
  {/* Content fades in from bottom */}
</div>
```

#### Slide In Left
```tsx
<div className="slide-in-left">
  {/* Content slides in from left */}
</div>
```

#### Loading Dots
```tsx
<div className="loading-dots">Loading</div>
{/* Animates ... after text */}
```

### Transform Effects
```
hover:-translate-y-1  → lift up on hover
hover:scale-105       → scale up slightly
hover:scale-110       → scale up more
active:scale-95       → press down effect
```

## Background Gradients

### Subtle Page Background
```
bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50/30 
dark:from-gray-950 dark:via-gray-900 dark:to-gray-900
```

### Card Backgrounds
```
bg-gradient-to-br from-white to-primary-50/30 
dark:from-gray-800 dark:to-primary-900/10
```

### Button Gradients
```
bg-gradient-to-r from-primary-600 to-primary-700 
hover:from-primary-700 hover:to-primary-800
```

## Focus States

### Focus Ring (Accessibility)
```
focus:outline-none 
focus:ring-2 
focus:ring-primary-500 
focus:ring-offset-2 
focus:ring-offset-white 
dark:focus:ring-offset-gray-900
```

### Input Focus
```
focus:border-primary-500 
focus:ring-4 
focus:ring-primary-100 
dark:focus:ring-primary-900/30
```

## Hover States

### Links & Buttons
```
hover:text-primary-600 
dark:hover:text-primary-400
hover:bg-gray-100 
dark:hover:bg-gray-700
```

### Cards
```
hover:shadow-xl 
hover:-translate-y-1 
hover:border-primary-300 
dark:hover:border-primary-700
```

## Component Patterns

### Button
```tsx
<button className="
  inline-flex items-center justify-center 
  px-6 py-2.5 
  bg-gradient-to-r from-primary-600 to-primary-700 
  text-white font-medium 
  rounded-lg 
  shadow-md hover:shadow-lg 
  transition-all duration-200 
  focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 
  active:scale-95 
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Button Text
</button>
```

### Card
```tsx
<article className="
  relative group
  bg-white dark:bg-gray-800 
  p-6 
  border border-gray-200 dark:border-gray-700 
  hover:border-primary-300 dark:hover:border-primary-700 
  rounded-xl 
  shadow-md hover:shadow-xl 
  hover:-translate-y-1 
  transition-all duration-300 
  fade-in
">
  {/* Content */}
</article>
```

### Input
```tsx
<input className="
  w-full 
  px-4 py-3 
  bg-white dark:bg-gray-900 
  border-2 border-gray-300 dark:border-gray-600 
  rounded-xl 
  transition-all duration-200 
  focus:border-primary-500 dark:focus:border-primary-500 
  focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 
  focus:outline-none 
  hover:border-gray-400 dark:hover:border-gray-500 
  dark:text-white
" />
```

### Loading Spinner
```tsx
<div className="
  w-16 h-16 
  border-4 
  border-primary-200 dark:border-primary-800 
  border-t-primary-600 dark:border-t-primary-400 
  rounded-full 
  animate-spin
" />
```

### Empty State
```tsx
<div className="
  bg-gradient-to-br from-gray-50 to-blue-50/50 
  dark:from-gray-800/50 dark:to-blue-900/10 
  py-20 
  border-2 border-gray-300 dark:border-gray-700 border-dashed 
  rounded-2xl 
  text-center 
  fade-in
">
  {/* Icon, title, description, action */}
</div>
```

### Error Message
```tsx
<div className="
  bg-red-50 dark:bg-red-900/20 
  p-4 
  rounded-xl 
  text-red-600 dark:text-red-400 
  border border-red-200 dark:border-red-800 
  slide-in-left
">
  ⚠️ Error message
</div>
```

## Navigation

### Sticky Header
```tsx
<nav className="
  sticky top-0 z-50 
  backdrop-blur-md 
  bg-white/80 dark:bg-gray-800/80 
  border-b border-gray-200/50 dark:border-gray-700/50 
  shadow-sm
">
  {/* Nav content */}
</nav>
```

### Active Nav Link
```tsx
<Link className={`
  flex items-center gap-2 
  px-4 py-2 
  rounded-lg 
  transition-all duration-200 
  ${isActive 
    ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 dark:from-primary-900/30 dark:to-primary-900/20 dark:text-primary-400 shadow-sm scale-105' 
    : 'text-gray-600 hover:bg-gray-100/70 dark:text-gray-400 dark:hover:bg-gray-700/70 hover:scale-105'
  }
`}>
  Link Text
</Link>
```

## Responsive Design

### Breakpoints
```
sm:  640px  - small tablets
md:  768px  - tablets
lg:  1024px - desktops
xl:  1280px - large screens
2xl: 1536px - extra large screens
```

### Common Patterns
```
hidden sm:inline        - show on small screens+
grid-cols-1 md:grid-cols-2  - 1 column mobile, 2 on tablet+
max-w-4xl mx-auto      - centered container
px-4 sm:px-6 lg:px-8   - responsive padding
```

## Dark Mode

### Background Colors
```
bg-white dark:bg-gray-800       - cards
bg-gray-50 dark:bg-gray-900     - page background
bg-gray-100 dark:bg-gray-700    - hover states
```

### Text Colors
```
text-gray-900 dark:text-white       - headings
text-gray-700 dark:text-gray-300    - body
text-gray-600 dark:text-gray-400    - secondary
text-gray-500 dark:text-gray-500    - disabled
```

### Border Colors
```
border-gray-200 dark:border-gray-700
border-gray-300 dark:border-gray-600
```

## Best Practices

1. **Always include dark mode variants** for backgrounds, text, and borders
2. **Use transitions** on interactive elements (min 200ms)
3. **Include focus states** for accessibility
4. **Add hover effects** to indicate interactivity
5. **Use semantic colors** (red for errors, green for success)
6. **Maintain consistent spacing** (4, 6, 8, 10 pattern)
7. **Apply rounded corners consistently** (xl for cards, 2xl for large containers)
8. **Add animations** for better UX (fade-in, slide-in)
9. **Use gradients sparingly** for emphasis only
10. **Test in both light and dark modes**

## Custom Scrollbar

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500;
}
```

Apply with: `className="custom-scrollbar"`
