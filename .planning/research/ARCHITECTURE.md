# Architecture Patterns

**Domain:** Professional Portfolio Website
**Researched:** 2026-03-20
**Confidence:** HIGH (based on official Next.js, React, and Tailwind CSS documentation)

## Recommended Architecture

Professional portfolio sites follow a **component-based single-page architecture** with the following structure:

```
Root Layout (Theme + i18n providers)
├── Navigation (sticky header)
├── Page Content (single scrollable page)
│   ├── About Section
│   ├── Experience Section (Timeline)
│   ├── Skills Section
│   ├── Portfolio Section
│   └── Contact Section
└── Footer
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Root Layout** | HTML shell, global providers (theme, i18n), global styles | All child components via React Context |
| **Navigation** | Sticky header, language switcher, theme toggle, smooth scroll links | Root Layout (theme/locale state), Section components (scroll targets) |
| **Section Components** | Self-contained content blocks (About, Experience, etc.) | Root Layout (theme/locale context), child components |
| **Timeline Component** | Chronological work history display | Experience Section, TimelineItem components |
| **PortfolioCard** | Individual project showcase | Portfolio Section |
| **ThemeProvider** | Manages light/dark mode state and persistence | Root Layout, all styled components |
| **LocaleProvider** | Manages language state and translation loading | Root Layout, all text-displaying components |

### Data Flow

**State Management:**
```
User Interaction (click theme toggle)
    ↓
ThemeProvider (state update)
    ↓
localStorage (persistence)
    ↓
Root Layout (className update)
    ↓
All Components (Tailwind dark: classes apply)
```

**Content Flow:**
```
Static Content (config files/JSON)
    ↓
Page Component (loads content)
    ↓
Section Components (receive via props)
    ↓
UI Components (render content)
```

**Navigation Flow:**
```
User clicks nav link
    ↓
Smooth scroll handler (client-side)
    ↓
Element.scrollIntoView()
    ↓
Section becomes visible
```

## File System Architecture

Next.js uses file-system based routing with special files:

```
app/
├── layout.tsx              # Root layout (required, wraps all pages)
├── page.tsx                # Home page (single-page portfolio)
├── globals.css             # Global styles, Tailwind imports
├── components/
│   ├── Navigation.tsx      # Sticky header with nav links
│   ├── ThemeToggle.tsx     # Light/dark mode switcher
│   ├── LanguageSwitcher.tsx # i18n language selector
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Portfolio.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Timeline.tsx
│       ├── TimelineItem.tsx
│       ├── PortfolioCard.tsx
│       └── Button.tsx
├── lib/
│   ├── content.ts          # Content loading utilities
│   └── utils.ts            # Helper functions
├── providers/
│   ├── ThemeProvider.tsx   # Theme context and state
│   └── LocaleProvider.tsx  # i18n context and state
└── data/
    ├── experience.json     # Work history data
    ├── projects.json       # Portfolio projects
    └── translations/
        ├── en.json
        └── es.json
```

## Patterns to Follow

### Pattern 1: Root Layout with Providers
**What:** Wrap entire application with theme and locale providers in root layout
**When:** Always for portfolio sites with theme switching and i18n
**Example:**
```typescript
// app/layout.tsx
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LocaleProvider } from '@/providers/LocaleProvider'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationMismatch>
      <body>
        <ThemeProvider>
          <LocaleProvider>
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Pattern 2: Section-Based Single Page
**What:** Organize content into semantic sections with IDs for scroll navigation
**When:** Single-page portfolio sites with anchor-based navigation
**Example:**
```typescript
// app/page.tsx
import Navigation from '@/components/Navigation'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Portfolio from '@/components/sections/Portfolio'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <section id="about"><About /></section>
        <section id="experience"><Experience /></section>
        <section id="skills"><Skills /></section>
        <section id="portfolio"><Portfolio /></section>
        <section id="contact"><Contact /></section>
      </main>
    </>
  )
}
```

### Pattern 3: Theme Management with Tailwind Dark Mode
**What:** Use Tailwind's `dark:` variant with class-based strategy, persist to localStorage
**When:** Implementing light/dark mode toggle
**Example:**
```typescript
// providers/ThemeProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('theme') as Theme
    if (stored) {
      setTheme(stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

```css
/* globals.css */
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));
```

### Pattern 4: Static Content with Type Safety
**What:** Define content in typed JSON/TypeScript files, import directly
**When:** Portfolio content is static and version-controlled
**Example:**
```typescript
// data/experience.json
[
  {
    "id": "1",
    "company": "ACME Corp",
    "role": "Senior Software Engineer",
    "period": "2020 - Present",
    "achievements": [
      "Led team of 5 engineers",
      "Reduced deployment time by 60%"
    ]
  }
]

// types/content.ts
export interface Experience {
  id: string
  company: string
  role: string
  period: string
  achievements: string[]
}

// components/sections/Experience.tsx
import experienceData from '@/data/experience.json'
import { Experience } from '@/types/content'
import Timeline from '@/components/ui/Timeline'

export default function Experience() {
  const experiences = experienceData as Experience[]

  return (
    <div>
      <h2>Experience</h2>
      <Timeline items={experiences} />
    </div>
  )
}
```

### Pattern 5: Smooth Scroll Navigation
**What:** Client-side smooth scrolling to section anchors
**When:** Single-page sites with in-page navigation
**Example:**
```typescript
// components/Navigation.tsx
'use client'

export default function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <ul>
        <li>
          <button onClick={() => scrollToSection('about')}>About</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('experience')}>Experience</button>
        </li>
        {/* ... more nav items */}
      </ul>
    </nav>
  )
}
```

### Pattern 6: Component Composition Over Configuration
**What:** Build complex UIs by composing simple, focused components
**When:** Always (React best practice)
**Example:**
```typescript
// components/ui/Timeline.tsx
export default function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <TimelineItem key={item.id} experience={item} />
      ))}
    </div>
  )
}

// components/ui/TimelineItem.tsx
export default function TimelineItem({ experience }: { experience: Experience }) {
  return (
    <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
      <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-500" />
      <h3 className="text-xl font-semibold">{experience.role}</h3>
      <p className="text-gray-600 dark:text-gray-400">{experience.company}</p>
      <p className="text-sm text-gray-500">{experience.period}</p>
      <ul className="mt-2 list-disc pl-4">
        {experience.achievements.map((achievement, i) => (
          <li key={i}>{achievement}</li>
        ))}
      </ul>
    </div>
  )
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Multi-Page Navigation for Portfolio
**What:** Creating separate routes (/about, /experience, etc.) for a portfolio
**Why bad:** Breaks single-page experience, requires navigation state, loses scroll context
**Instead:** Use section-based layout with smooth scroll navigation on single page

### Anti-Pattern 2: CSS-in-JS for Static Portfolio
**What:** Using runtime CSS-in-JS libraries (styled-components, Emotion) for static sites
**Why bad:** Adds unnecessary JavaScript, hurts performance, increases bundle size
**Instead:** Use Tailwind CSS utilities and CSS Modules for component-specific styles

### Anti-Pattern 3: Client-Side Data Fetching for Static Content
**What:** Using `useEffect` or SWR to fetch portfolio content that never changes
**Why bad:** Causes loading states, flash of empty content, unnecessary network requests
**Instead:** Import static JSON/TypeScript content directly, render server-side

### Anti-Pattern 4: Global State Management Libraries
**What:** Adding Redux, Zustand, or MobX for theme/locale state
**Why bad:** Overkill for simple state, increases complexity and bundle size
**Instead:** Use React Context API for theme/locale, it's sufficient for these use cases

### Anti-Pattern 5: Deep Component Prop Drilling
**What:** Passing theme/locale props through 5+ component levels
**Why bad:** Makes components tightly coupled, difficult to refactor, verbose
**Instead:** Use React Context for cross-cutting concerns (theme, locale)

### Anti-Pattern 6: Mixing Server and Client Components Incorrectly
**What:** Making entire page client-side with 'use client' at top
**Why bad:** Loses server-side rendering benefits, increases bundle size
**Instead:** Keep page as Server Component, only use 'use client' for interactive components (ThemeToggle, Navigation)

### Anti-Pattern 7: Flash of Unstyled Content (FOUC) with Theme
**What:** Loading theme preference after page renders, causing theme flicker
**Why bad:** Poor UX, unprofessional appearance
**Instead:** Add inline script in `<head>` to apply theme class before first paint:

```html
<script dangerouslySetInnerHTML={{
  __html: `
    (function() {
      const theme = localStorage.getItem('theme')
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      }
    })()
  `
}} />
```

## Scalability Considerations

| Concern | At Initial Build | Future Enhancement | Large Scale |
|---------|------------------|-------------------|-------------|
| **Content Volume** | Hardcoded JSON files (10-20 entries) | Markdown files with frontmatter | CMS integration (Contentful, Sanity) |
| **Languages** | 2 languages (EN/ES) in JSON | Additional languages in separate files | i18n routing with dedicated pages per locale |
| **Assets** | Direct image imports | Next.js Image component with optimization | CDN with optimized image pipeline |
| **Interactivity** | Basic scroll/theme/language switching | Animations with Framer Motion | Complex interactions, form handling |
| **Analytics** | Simple page view tracking | Event tracking for section views | Full analytics suite with conversions |
| **Performance** | Static generation sufficient | Incremental Static Regeneration for updates | Edge caching, streaming |

## Deployment Considerations

### Vercel (Recommended)
- **Why:** Built for Next.js, zero-config deployment, automatic optimizations
- **Setup:** Connect GitHub repo, automatic deployments on push
- **Features:** Preview deployments, edge functions, analytics

### Netlify (Alternative)
- **Why:** Strong static site hosting, good Next.js support
- **Setup:** Add `netlify.toml` with Next.js plugin
- **Features:** Form handling, split testing, serverless functions

### Build Configuration
Both platforms work optimally with static generation:

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static HTML export (optional, for pure static)
  images: {
    unoptimized: true, // Required if using output: 'export'
  },
}

module.exports = nextConfig
```

**Note:** For single-page portfolio with no dynamic routes, `output: 'export'` provides fully static HTML that works on any hosting platform.

## Build Order and Dependencies

### Phase 1: Foundation (No Dependencies)
Build first, required by everything else:
1. **Root Layout** - HTML shell, global styles
2. **Theme Provider** - Required by all styled components
3. **Basic UI Components** - Button, Card primitives
4. **Content Type Definitions** - TypeScript interfaces

### Phase 2: Core Sections (Depends on Phase 1)
Build after foundation is stable:
1. **Navigation Component** - Requires Theme Provider
2. **Section Containers** - About, Experience, Skills, Portfolio, Contact
3. **Timeline Components** - For Experience section
4. **Portfolio Card** - For Portfolio section

### Phase 3: Features (Depends on Phases 1-2)
Build after core sections work:
1. **Locale Provider** - i18n context
2. **Language Switcher** - Requires Locale Provider
3. **Translation Files** - JSON content for both languages
4. **Content Loading** - Connect sections to content

### Phase 4: Polish (Depends on All Previous)
Build last, enhancement layer:
1. **Smooth Scroll** - Navigation scroll behavior
2. **Responsive Styles** - Mobile/tablet/desktop breakpoints
3. **Loading States** - Skeleton screens (if needed)
4. **SEO Metadata** - Meta tags, Open Graph, structured data

### Suggested Development Workflow

1. **Start with visual foundation:**
   - Setup Next.js with Tailwind
   - Create root layout with basic styling
   - Implement Theme Provider and toggle
   - Verify light/dark mode works

2. **Build static content structure:**
   - Create all section components with placeholder content
   - Wire up Navigation with smooth scroll
   - Test single-page layout and navigation

3. **Add real content:**
   - Define content types
   - Create JSON data files
   - Connect sections to content
   - Verify content displays correctly

4. **Internationalization:**
   - Implement Locale Provider
   - Create translation files
   - Add Language Switcher
   - Test language switching

5. **Responsive and polish:**
   - Add responsive breakpoints
   - Refine spacing and typography
   - Add micro-interactions
   - Performance optimization

**Rationale:** This order minimizes rework. Theme system affects all styling decisions, so build it first. Static structure before content allows testing layout. i18n last because it touches all components but doesn't change structure.

## Sources

- **Next.js Official Documentation** (v16.2.0, last updated 2026-03-03)
  - [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) - File-system routing, layout patterns
  - [Data Fetching](https://nextjs.org/docs/app/getting-started/fetching-data) - Server/client data patterns, streaming
  - [CSS and Styling](https://nextjs.org/docs/app/getting-started/css) - Tailwind setup, CSS Modules, global styles

- **React Official Documentation** (January 2025)
  - [Thinking in React](https://react.dev/learn/thinking-in-react) - Component hierarchy, data flow, state management principles

- **Tailwind CSS Documentation** (current)
  - [Dark Mode](https://tailwindcss.com/docs/dark-mode) - Class-based strategy, system preferences, localStorage persistence

**Confidence:** HIGH - All patterns derived from official documentation of technologies specified in project constraints. Portfolio-specific patterns based on fundamental Next.js/React/Tailwind principles.