# Phase 3: Theme System - Research

**Researched:** 2026-03-23
**Domain:** Next.js theme management with next-themes, Tailwind CSS dark mode, localStorage persistence
**Confidence:** HIGH

## Summary

Theme system implementation in Next.js App Router requires careful coordination between server and client components to prevent FOUC (flash of unstyled content). The industry standard solution is `next-themes` library (v0.4.6, published 2025-03-11), which provides SSR-safe theme switching with system preference detection and localStorage persistence. Tailwind CSS v4 uses CSS-based dark mode configuration via `@custom-variant`, activated by a `dark` class on the `<html>` element.

The critical challenge is handling React 19 + Next.js 16 hydration with Server Components. Phase 2 already implemented dark mode styles throughout the Header component (`dark:bg-gray-950/80`, `dark:text-white`, etc.), so the theme system primarily needs to add/remove the `dark` class to activate these existing styles.

**Primary recommendation:** Use next-themes with `attribute="class"`, wrap app content in ThemeProvider (below NextIntlClientProvider to avoid hydration issues), implement three-state toggle (light/dark/system) as cycle button in Header, and configure Tailwind v4 dark mode via `@custom-variant dark` in globals.css.

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Theme toggle positioned in header right side (desktop), at top of mobile drawer (mirrors Phase 2 language/theme toggle placement decision)
- **D-02:** Sun/moon icon toggle (industry standard, immediately recognizable)
- **D-03:** Icon represents current theme — sun shows in light mode, moon shows in dark mode (clicking switches to other mode)
- **D-04:** Three-state preference system: Light / Dark / System (users can explicitly choose system preference or override it)
- **D-05:** Dark mode uses gray-950 (#030712) background (matches existing Header component from Phase 2, softer than true black)
- **D-06:** Text colors in dark mode: pure white (#FFFFFF) for headings, gray-300 for body text (matches existing Header pattern, meets WCAG AA)
- **D-07:** Borders and dividers adapt: gray-200 (light mode) / gray-800 (dark mode) (maintains consistent visual weight, already used in Header)
- **D-08:** Theme preference stored in localStorage (standard for client-side preferences, next-themes library default)
- **D-09:** FOUC prevention via blocking script in <head> (reads localStorage before first paint, applies theme class to <html> — next-themes default approach)
- **D-10:** First visit with no stored preference: detect system preference using prefers-color-scheme media query (requirement THEME-04)
- **D-11:** Theme changes use quick fade transition (150ms duration)
- **D-12:** Transition applies to all color properties (background, text, borders) uniformly
- **D-13:** Disable transition on initial page load (only animate when user clicks toggle, prevents animated color fade on first render)

### Claude's Discretion
- Exact icon SVG paths for sun/moon
- Three-state UI implementation (cycle button vs dropdown vs segmented control)
- CSS transition timing function (ease, ease-in-out, or linear)
- Focus indicator styling for theme toggle button (must meet WCAG AA)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| THEME-01 | User can toggle between light and dark modes | next-themes `useTheme` hook provides `setTheme('light' \| 'dark' \| 'system')` API for toggle implementation |
| THEME-02 | Theme toggle control is accessible in navigation | Button component integrates into Header.tsx (already client-side with state management), uses semantic button element with aria-label for screen readers |
| THEME-03 | Selected theme persists across browser sessions | next-themes stores preference in localStorage by default (key: 'theme'), survives browser restart and tab close |
| THEME-04 | System dark mode preference is detected on first visit | next-themes `enableSystem={true}` + `defaultTheme="system"` reads `prefers-color-scheme` media query automatically, sets `resolvedTheme` accordingly |
| THEME-05 | Theme transitions are smooth without flash of unstyled content | next-themes injects blocking script before React hydration, reads localStorage and applies theme class to `<html>` before first paint; Tailwind transitions handle visual smoothness |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-themes | 0.4.6 | Theme state management | De facto standard for Next.js theme switching. Prevents FOUC via injected script, handles SSR/hydration safety, syncs localStorage with system preferences, cross-tab synchronization. Already identified in Phase 1 research as standard solution. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.577.0 | Sun/moon icons | Already installed in Phase 1. Tree-shakeable SVG icons for theme toggle button. |
| next-intl | 4.8.3 | Theme label translations | Already installed. Provides `useTranslations('theme')` for accessible button labels in EN/ES. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-themes | Manual localStorage + class toggle | More code, must manually handle FOUC prevention with inline script, no cross-tab sync, reinventing solved problem. Only saves ~5KB but adds maintenance burden. |
| next-themes | usehooks-ts `useDarkMode` | Lighter (~1KB) but no SSR support, causes FOUC, no system preference sync, missing Next.js-specific optimizations. |
| Three-state toggle | Simple two-state (light/dark only) | Simpler UI but ignores THEME-04 requirement and user decision D-04. Missing system preference = accessibility issue for users who prefer OS-level control. |

**Installation:**
```bash
npm install next-themes
```

**Version verification:** Verified 2026-03-23 via `npm view next-themes version` — v0.4.6 published 2025-03-11 (current).

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── [lang]/
│   │   └── layout.tsx        # Add ThemeProvider wrapper here
│   └── globals.css           # Add dark mode @custom-variant and transitions
├── components/
│   ├── Header.tsx            # Integrate ThemeToggle component
│   ├── MobileDrawer.tsx      # Add ThemeToggle at top (D-01)
│   └── ThemeToggle.tsx       # NEW: Three-state toggle button
└── providers/
    └── ThemeProvider.tsx     # NEW: next-themes wrapper (client component)
```

### Pattern 1: ThemeProvider Wrapper (Client Component Boundary)
**What:** Separate client-side ThemeProvider into dedicated component to keep layout.tsx as Server Component for as long as possible.

**When to use:** Always — minimizes client JavaScript boundary, improves performance, follows Next.js App Router best practices.

**Example:**
```typescript
// src/providers/ThemeProvider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="theme"
    >
      {children}
    </NextThemesProvider>
  );
}

// src/app/[lang]/layout.tsx (Server Component)
import { ThemeProvider } from '@/providers/ThemeProvider';

export default async function RootLayout({ children, params }: Props) {
  // ... existing code ...
  return (
    <html lang={lang} suppressHydrationWarning className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Critical:** Add `suppressHydrationWarning` to `<html>` element — next-themes modifies the `class` attribute before React hydrates, causing a benign mismatch warning without this prop.

### Pattern 2: Hydration-Safe Theme Toggle with Mounting Guard
**What:** Defer rendering theme toggle until client-side hydration completes to avoid SSR/client mismatch (theme is always `undefined` on server).

**When to use:** Any component using `useTheme()` hook from next-themes that displays current theme state (icon, label, or active indicator).

**Example:**
```typescript
// src/components/ThemeToggle.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render placeholder during SSR/hydration to avoid mismatch
  if (!mounted) {
    return (
      <button className="rounded-md p-2 w-10 h-10" aria-label="Loading theme toggle">
        <div className="h-6 w-6" /> {/* Spacer to prevent layout shift */}
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;

  return (
    <button
      onClick={cycleTheme}
      className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:focus-visible:outline-white"
      aria-label={`Current theme: ${theme}. Click to cycle.`}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
```

### Pattern 3: Tailwind v4 Dark Mode Configuration
**What:** Tailwind v4 requires CSS-based dark mode configuration via `@custom-variant` directive instead of JavaScript config.

**When to use:** Always in Tailwind v4 projects — this replaces the v3 `darkMode: 'class'` config option.

**Example:**
```css
/* src/app/globals.css */
@import 'tailwindcss';

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-roboto-mono), ui-monospace, monospace;
}

/* Dark mode variant configuration (CRITICAL for next-themes) */
@custom-variant dark (&:where(.dark, .dark *));

/* Smooth theme transitions (D-11, D-12, D-13) */
@media (prefers-reduced-motion: no-preference) {
  * {
    transition-property: color, background-color, border-color;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
  }
}

/* Disable transitions on page load (D-13) */
html.disable-transitions * {
  transition: none !important;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 3.5rem;
}

@media (min-width: 1024px) {
  html {
    scroll-padding-top: 5rem;
  }
}
```

Then in layout.tsx, add script to remove transition-blocking class after mount:
```typescript
// In <body> tag
<body className="font-sans antialiased">
  <script
    dangerouslySetInnerHTML={{
      __html: `document.documentElement.classList.add('disable-transitions');
      setTimeout(() => document.documentElement.classList.remove('disable-transitions'), 100);`
    }}
  />
  <ThemeProvider>
    {/* ... */}
  </ThemeProvider>
</body>
```

### Anti-Patterns to Avoid
- **Using 'use client' on layout.tsx:** Keep layout as Server Component, only mark ThemeProvider wrapper as client component. Reduces client JavaScript bundle.
- **Rendering theme-dependent UI without mounting guard:** Causes hydration mismatch errors. Always check `mounted` state before rendering theme-based content.
- **Placing ThemeProvider outside <html> tag:** next-themes needs access to `<html>` element to apply class. Must be inside `<body>`.
- **Omitting `suppressHydrationWarning` on <html>:** Causes console warnings in development. This warning is benign and expected with next-themes.
- **Using Tailwind v3 darkMode config:** Tailwind v4 ignores `tailwind.config.js` dark mode settings. Must use `@custom-variant` in CSS.
- **Global transitions on all properties:** Causes jank when transitioning layout properties. Limit transitions to color-related properties only (D-12).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Theme state management | Custom localStorage + React context + sync logic | next-themes | Library handles FOUC prevention (injected script), cross-tab synchronization, system preference detection, SSR/hydration edge cases, storage event listeners. Reinventing this risks FOUC bugs and hydration mismatches. |
| FOUC prevention | Manual inline script in <head> to read localStorage | next-themes built-in script | Library script is battle-tested, handles minification, works with strict CSP policies, automatically syncs with React state. Manual script requires careful coordination with React lifecycle. |
| System preference detection | Manual `window.matchMedia('(prefers-color-scheme: dark)')` listener | next-themes `enableSystem` prop | Library handles media query listeners, cleanup, initial detection, and updates when OS theme changes. Manual implementation misses edge cases (e.g., user changes OS preference while site is open). |
| Cycle button state machine | Manual theme state tracking with useState | next-themes `theme` value + `setTheme()` | Library provides single source of truth, syncs with localStorage automatically, handles initial state from system preference. Manual state can drift from stored preference. |

**Key insight:** Theme management has more edge cases than apparent. FOUC prevention requires blocking script execution before React hydration, SSR requires careful handling of `undefined` theme on server, cross-tab synchronization needs storage event listeners, system preference detection needs media query listeners that clean up properly. next-themes solves all of these, and at 5KB gzipped it's cheaper than implementing and maintaining custom solution.

## Common Pitfalls

### Pitfall 1: Hydration Mismatch from Rendering Theme on Server
**What goes wrong:** Using `useTheme()` directly in component that renders on server causes "Text content did not match" error because theme is `undefined` on server but has value on client.

**Why it happens:** next-themes can't access localStorage or system preferences during SSR. Theme value is always `undefined` until client-side JavaScript executes.

**How to avoid:** Use mounting guard pattern — track `mounted` state with `useEffect`, render placeholder during SSR/hydration, only render theme-dependent UI after `mounted === true`.

**Warning signs:** Console errors mentioning hydration mismatch, flash of placeholder content, incorrect initial theme display.

### Pitfall 2: ThemeProvider Placement Breaking Hydration
**What goes wrong:** Placing ThemeProvider *inside* NextIntlClientProvider causes "Missing <html> element" error or breaks theme script injection.

**Why it happens:** next-themes needs direct access to document root to inject script and modify `<html>` class. Nesting inside other providers can interfere with script injection timing.

**How to avoid:** Place ThemeProvider as *outer* wrapper in layout.tsx, before NextIntlClientProvider. Verified correct order: ThemeProvider → NextIntlClientProvider → Header/children.

**Warning signs:** Theme toggle doesn't work, no `dark` class appears on `<html>` element, FOUC occurs despite using next-themes.

### Pitfall 3: Tailwind v4 Dark Mode Not Activating
**What goes wrong:** Adding `dark:` utilities to components but they never apply, even when `<html>` has `dark` class.

**Why it happens:** Tailwind v4 requires explicit `@custom-variant dark` configuration in CSS. Unlike v3, there's no default dark mode behavior from `tailwind.config.js`.

**How to avoid:** Add `@custom-variant dark (&:where(.dark, .dark *))` to globals.css. Verify by inspecting compiled CSS — should see `.dark` selectors in output.

**Warning signs:** Dark mode styles work in development but fail in production build, or styles never apply in any environment. Check build output for `.dark` selectors.

### Pitfall 4: Transition Flicker on Initial Page Load
**What goes wrong:** Theme colors animate/fade when page first loads, creating distracting visual effect (violates D-13).

**Why it happens:** CSS transitions apply immediately, including during initial render when theme class is added to `<html>`. Users see color fade from light → dark (or vice versa) on every page load.

**How to avoid:** Add temporary `disable-transitions` class to `<html>` via inline script, remove after short timeout (100ms). Wrap transition rules in `@media (prefers-reduced-motion: no-preference)` to respect accessibility preferences.

**Warning signs:** Colors visibly animate when page first loads, users with motion sensitivity report discomfort, lighthouse flags unnecessary animations.

### Pitfall 5: Missing Focus Indicators Fail WCAG AA
**What goes wrong:** Theme toggle button has no visible focus indicator for keyboard navigation, failing accessibility requirement QUAL-04.

**Why it happens:** Default browser focus styles removed by CSS reset or Tailwind base styles. Developers forget to add explicit focus styling.

**How to avoid:** Use Tailwind's `focus-visible:outline` utilities to add visible outline when keyboard-focused. Ensure 3:1 contrast ratio between focus indicator and background (WCAG AA requirement for non-text elements).

**Warning signs:** Keyboard users can't see which element is focused, accessibility audits fail, tab navigation provides no visual feedback.

## Code Examples

Verified patterns from official sources and project context:

### Three-State Theme Toggle (Cycle Button)
```typescript
// src/components/ThemeToggle.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('theme');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="rounded-md p-2 w-10 h-10 text-gray-600 dark:text-gray-400"
        aria-label="Loading theme toggle"
        disabled
      >
        <div className="h-6 w-6" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getIcon = () => {
    if (theme === 'dark') return Moon;
    if (theme === 'light') return Sun;
    return Monitor;
  };

  const Icon = getIcon();

  return (
    <button
      onClick={cycleTheme}
      className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:focus-visible:outline-white transition-colors"
      aria-label={t('toggleLabel', { current: theme })}
      title={t('cycleHint')}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
```

### Integration into Header Component
```typescript
// src/components/Header.tsx (existing file, add ThemeToggle)
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import MobileDrawer from './MobileDrawer';
import { ThemeToggle } from './ThemeToggle'; // NEW

const NAV_ITEMS = [
  'about',
  'experience',
  'skills',
  'portfolio',
  'contact',
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  // ... existing IntersectionObserver logic ...

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <div className="flex h-14 items-center lg:h-20">
          <a href="#about" className="text-lg font-bold text-gray-900 dark:text-white">
            EP
          </a>
        </div>

        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item}`} className={/* ... existing classes ... */}>
              {t(item)}
              {activeSection === item && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gray-900 dark:bg-white" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle /> {/* NEW: D-01 placement */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
          >
            {/* ... existing hamburger icon ... */}
          </button>
        </div>
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeSection={activeSection}
      />
    </header>
  );
}
```

### Translation Keys for Theme Toggle
```json
// messages/en.json (add to existing file)
{
  "metadata": { "title": "...", "description": "..." },
  "home": { "heading": "...", "subheading": "..." },
  "nav": { "about": "...", "experience": "...", "skills": "...", "portfolio": "...", "contact": "..." },
  "theme": {
    "toggleLabel": "Theme: {current}",
    "cycleHint": "Click to cycle: Light → Dark → System",
    "light": "Light mode",
    "dark": "Dark mode",
    "system": "System preference"
  },
  "sections": { "experience": "...", "skills": "...", "portfolio": "...", "contact": "..." },
  "placeholders": { "comingSoon": "..." }
}

// messages/es.json (add to existing file)
{
  "metadata": { "title": "...", "description": "..." },
  "home": { "heading": "...", "subheading": "..." },
  "nav": { "about": "...", "experience": "...", "skills": "...", "portfolio": "...", "contact": "..." },
  "theme": {
    "toggleLabel": "Tema: {current}",
    "cycleHint": "Haz clic para cambiar: Claro → Oscuro → Sistema",
    "light": "Modo claro",
    "dark": "Modo oscuro",
    "system": "Preferencia del sistema"
  },
  "sections": { "experience": "...", "skills": "...", "portfolio": "...", "contact": "..." },
  "placeholders": { "comingSoon": "..." }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind v3 `darkMode: 'class'` in tailwind.config.js | Tailwind v4 `@custom-variant dark` in globals.css | Tailwind v4.0 (2024) | Configuration moved from JavaScript to CSS, aligns with v4's CSS-first philosophy. Must update dark mode setup when migrating from v3. |
| Manual localStorage + useEffect | next-themes library | Became standard ~2021 | Eliminates FOUC and hydration edge cases. Library is now de facto standard for Next.js theme management. |
| Simple two-state toggle (light/dark) | Three-state with system preference | Modern accessibility standard (2023+) | Respects user's OS-level dark mode preference, reduces decision fatigue for users who want "automatic" behavior. |
| Separate theme provider files for SSR/CSR | Single 'use client' wrapper component | Next.js App Router (2023) | Cleaner pattern with Server Components, reduces client JavaScript boundary to minimal surface area. |

**Deprecated/outdated:**
- **Tailwind v3 config-based dark mode:** Tailwind v4 ignores `darkMode` key in `tailwind.config.js`. Must use `@custom-variant` directive in CSS.
- **next-themes v0.2.x `resolvedTheme` behavior:** Older versions had inconsistent `resolvedTheme` when `enableSystem={false}`. v0.4.6 fixed this edge case.
- **Manual prefers-color-scheme media query listeners:** Before next-themes, developers manually added `window.matchMedia()` listeners. This approach misses cross-tab sync and requires careful cleanup logic.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — manual testing via browser DevTools |
| Config file | None — see Wave 0 gaps |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| THEME-01 | User can toggle between light/dark/system themes | manual-only | Browser DevTools: click toggle, verify `<html>` class changes | ❌ Manual |
| THEME-02 | Theme toggle accessible in navigation | manual-only | Keyboard test: Tab to toggle, verify focus indicator, press Enter | ❌ Manual |
| THEME-03 | Theme preference persists across sessions | manual-only | Browser DevTools: set theme, close tab, reopen, verify localStorage + applied theme | ❌ Manual |
| THEME-04 | System preference detected on first visit | manual-only | Browser DevTools: clear localStorage, toggle OS dark mode, reload page, verify applied theme | ❌ Manual |
| THEME-05 | No FOUC on page load | manual-only | Browser DevTools: throttle network (Slow 3G), reload page, verify no white flash before dark mode applies | ❌ Manual |

**Justification for manual-only:** Theme system is inherently visual and involves browser APIs (localStorage, system preferences, DOM class manipulation). Automated tests would require Playwright/Cypress for DOM assertions + localStorage checks, which is overkill for a phase with 5 visual requirements. Manual testing via browser DevTools is faster and more thorough for verifying FOUC, focus indicators, and system preference detection.

### Sampling Rate
- **Per task commit:** Manual browser test — verify toggle works, localStorage persists
- **Per wave merge:** Full manual test suite — all 5 requirements, both EN/ES locales, light/dark/system states, keyboard navigation, FOUC check
- **Phase gate:** Manual verification checklist before `/gsd:verify-work`

### Wave 0 Gaps
No test infrastructure detected in project. This phase does not introduce testing framework due to manual-only nature. Future phases may add Playwright for E2E if needed.

## Sources

### Primary (HIGH confidence)
- next-themes v0.4.6 documentation - https://github.com/pacocoursey/next-themes (accessed 2026-03-23, version verified via npm)
- Tailwind CSS v4 dark mode documentation - https://tailwindcss.com/docs/dark-mode (accessed 2026-03-23)
- Next.js App Router Server Components - https://react.dev/reference/react/use-client (accessed 2026-03-23)
- WCAG 2.1 Contrast requirements (1.4.3) - https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html (accessed 2026-03-23)
- WCAG 2.1 Focus Visible requirements (2.4.7) - https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html (accessed 2026-03-23)

### Secondary (MEDIUM confidence)
- localStorage API documentation - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage (accessed 2026-03-23)
- prefers-reduced-motion best practices - https://web.dev/prefers-reduced-motion/ (accessed 2026-03-23)
- Phase 1 STACK.md research - next-themes identified as standard solution for Next.js theme management

### Tertiary (LOW confidence)
- next-themes GitHub issues - identified common pitfalls (hydration mismatches, React 19 compatibility) (accessed 2026-03-23, 43 open issues noted)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - next-themes v0.4.6 verified as current (published 2025-03-11), Tailwind v4 dark mode verified from official docs
- Architecture: HIGH - Patterns verified against next-themes documentation and Next.js App Router best practices, existing Header component structure reviewed
- Pitfalls: MEDIUM-HIGH - Hydration issues documented in next-themes GitHub issues, Tailwind v4 config change verified, transition flicker pattern is common but not officially documented

**Research date:** 2026-03-23
**Valid until:** 2026-06-23 (90 days for stable ecosystem — next-themes is mature library, Tailwind v4 recently released but stable)
