---
phase: 03-theme-system
plan: 01
subsystem: ui
tags: [next-themes, dark-mode, tailwind-v4, theme-toggle, localStorage, FOUC-prevention]

# Dependency graph
requires:
  - phase: 02-layout-navigation
    provides: Header component structure with dark: utilities, MobileDrawer component, responsive breakpoints
  - phase: 01-project-setup-foundation
    provides: Tailwind CSS 4 with @theme directive, Next.js 16 app router, next-intl i18n provider
provides:
  - Complete three-state theme system (Light/Dark/System) with next-themes
  - ThemeProvider wrapping app content with FOUC prevention
  - ThemeToggle component with sun/moon/monitor icons cycling through modes
  - Tailwind v4 dark mode configuration via @custom-variant
  - 150ms color transition with initial-load suppression
  - localStorage persistence and system preference detection
  - Bilingual theme toggle labels (EN/ES)
affects: [content, portfolio, timeline, contact, all future UI components with dark mode styling]

# Tech tracking
tech-stack:
  added: [next-themes@0.4.4, lucide-react icons (Sun/Moon/Monitor)]
  patterns:
    - "ThemeProvider wraps outside NextIntlClientProvider for hydration safety"
    - "Mounting guard pattern (useState + useEffect) prevents hydration mismatch"
    - "@custom-variant dark directive for Tailwind v4 class-based dark mode"
    - "Inline script in layout.tsx disables transitions on initial page load"
    - "Responsive theme toggle: desktop-only in header, mobile-only in drawer"

key-files:
  created:
    - src/providers/ThemeProvider.tsx
    - src/components/ThemeToggle.tsx
  modified:
    - src/app/globals.css
    - src/app/[lang]/layout.tsx
    - src/components/Header.tsx
    - src/components/MobileDrawer.tsx
    - messages/en.json
    - messages/es.json

key-decisions:
  - "Used next-themes library for theme management (handles localStorage, FOUC prevention, system detection)"
  - "Three-state cycle: light -> dark -> system -> light (explicit system option per THEME-04)"
  - "ThemeProvider wraps outside NextIntlClientProvider to avoid hydration warnings"
  - "150ms transition on color properties only (background, text, borders) with disabled initial load animation"
  - "Responsive toggle placement: hidden on mobile header, visible in drawer header bar (per CONTEXT.md D-01)"
  - "Mounting guard with placeholder preserving button dimensions prevents layout shift during hydration"

patterns-established:
  - "Pattern 1: Client component hydration safety via mounted state guard (prevents server/client mismatch)"
  - "Pattern 2: Responsive component visibility using hidden lg:flex wrappers"
  - "Pattern 3: Theme transitions respect prefers-reduced-motion with @media query"
  - "Pattern 4: Inline script in layout for instant theme application before React hydration"

requirements-completed: [THEME-01, THEME-02, THEME-03, THEME-04, THEME-05]

# Metrics
duration: 29min
completed: 2026-03-23
---

# Phase 3 Plan 1: Theme System Implementation Summary

**Complete three-state theme toggle (Light/Dark/System) with next-themes, localStorage persistence, system preference detection, FOUC prevention, and 150ms color transitions**

## Performance

- **Duration:** 29 min
- **Started:** 2024-11-23T14:43:38Z (commit 5b43482)
- **Completed:** 2024-11-23T15:13:36Z (commit be36329)
- **Tasks:** 3 (2 implementation + 1 human verification checkpoint)
- **Files modified:** 8 created/modified
- **Commits:** 3 (2 feature + 1 fix)

## Accomplishments
- Three-state theme system with cycle button (Sun icon = light, Moon = dark, Monitor = system)
- Theme preference persists across browser sessions via localStorage
- System prefers-color-scheme detected on first visit with no stored preference
- Zero flash of unstyled content (FOUC) on page load using next-themes blocking script
- Smooth 150ms color transitions on theme change (disabled on initial page load)
- Theme toggle accessible in desktop header and mobile drawer with bilingual labels
- All existing Header/MobileDrawer dark: utilities now activated by theme system

## Task Commits

Each task was committed atomically:

1. **Task 1: Create theme infrastructure** - `5b43482` (feat)
2. **Task 2: Integrate ThemeToggle into Header and MobileDrawer** - `dbda1b0` (feat)
3. **Task 3: Fix theme toggle mobile visibility** - `be36329` (fix)

## Files Created/Modified

**Created:**
- `src/providers/ThemeProvider.tsx` - next-themes wrapper with class strategy, system preference enabled, localStorage key "theme"
- `src/components/ThemeToggle.tsx` - Three-state cycle button with mounting guard, lucide-react icons, keyboard accessibility, bilingual labels via useTranslations

**Modified:**
- `src/app/globals.css` - Added @custom-variant dark directive, 150ms color transitions with prefers-reduced-motion support, disable-transitions class for initial load
- `src/app/[lang]/layout.tsx` - Added ThemeProvider wrapping NextIntlClientProvider, suppressHydrationWarning on html, inline script to suppress initial transitions, dark mode body classes (bg-white dark:bg-gray-950)
- `src/components/Header.tsx` - Integrated ThemeToggle in header right side with hidden lg:flex wrapper (desktop-only)
- `src/components/MobileDrawer.tsx` - Integrated ThemeToggle in drawer header bar next to close button (mobile-only)
- `messages/en.json` - Added theme.toggleLabel, theme.cycleHint, theme.light/dark/system keys
- `messages/es.json` - Added theme keys with Spanish translations

## Decisions Made

1. **next-themes library chosen** - Handles localStorage, FOUC prevention, system preference detection automatically. Industry standard for Next.js theme management.

2. **Three-state cycle order: light -> dark -> system** - Provides explicit system option (requirement THEME-04) rather than just light/dark toggle.

3. **ThemeProvider wraps outside NextIntlClientProvider** - Prevents hydration warnings from next-themes modifying html class before React hydration. ThemeToggle still accesses translations because it renders inside Header which is within NextIntlClientProvider.

4. **Mounting guard with dimensionally-matched placeholder** - Prevents hydration mismatch (server renders without theme, client has theme). Placeholder has same w-10 h-10 dimensions to prevent layout shift.

5. **150ms transition with initial-load suppression** - Smooth enough for polish but fast enough to feel instant. Inline script adds disable-transitions class for 100ms on page load to prevent animated color flash.

6. **Responsive toggle placement** - Desktop: visible in header via hidden lg:flex wrapper. Mobile: hidden in header, visible in drawer header bar. Mirrors Phase 2 language toggle pattern decision (CONTEXT.md D-01).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed theme toggle visibility on mobile**
- **Found during:** Task 3 (human verification checkpoint)
- **Issue:** ThemeToggle was visible in both header AND drawer on mobile screens. Per CONTEXT.md D-01, theme toggle should only appear in mobile drawer, not in header on mobile.
- **Fix:** Wrapped ThemeToggle in Header with `<div className="hidden lg:flex">` to hide it on screens smaller than 1024px (lg breakpoint). MobileDrawer already had correct placement.
- **Files modified:** src/components/Header.tsx
- **Verification:** Build passes. Theme toggle hidden on mobile header, visible in drawer header bar.
- **Committed in:** be36329 (fix commit after Task 2)

---

**Total deviations:** 1 auto-fixed (1 bug fix from user feedback)
**Impact on plan:** Task 2 implementation misinterpreted plan instruction ("ThemeToggle appears on both desktop and mobile in the header bar"). User verification correctly identified violation of CONTEXT.md D-01. Fix required one-line wrapper addition. No scope impact.

## Issues Encountered

None - all tasks completed successfully. Initial Task 2 implementation had mobile visibility bug caught during human verification checkpoint, fixed immediately.

## User Setup Required

None - no external service configuration required. Theme system is entirely client-side (localStorage + CSS).

## Verification Results

Per Task 3 checkpoint, user verified:
- Theme toggle cycles through three states (Sun/Moon/Monitor icons)
- Theme persists across browser close/reopen (localStorage working)
- System preference detected on first visit with cleared localStorage
- No FOUC on page load or hard refresh (next-themes blocking script working)
- 150ms smooth transition on theme change, instant on initial load (disable-transitions working)
- **Issue found:** Theme toggle visible on mobile header (should be drawer-only) - **FIXED** in commit be36329
- Keyboard accessibility: Tab focus visible, Enter key cycles theme
- Mobile drawer has theme toggle in header bar next to close button

## Known Stubs

None - theme system is fully functional with no placeholder implementations.

## Next Phase Readiness

Theme system foundation complete and verified. All future UI components can now use dark: utility classes which will be activated by the theme system's html.dark class toggle.

**Ready for:** Phase 4+ content implementation with dark mode styling.

**Established pattern:** All client components with theme-aware UI should follow mounting guard pattern if they read theme state directly (prevents hydration mismatch).

## Self-Check

Verifying all claimed artifacts exist and commits are recorded:

**Files created:**
- [x] src/providers/ThemeProvider.tsx exists
- [x] src/components/ThemeToggle.tsx exists

**Files modified:**
- [x] src/app/globals.css contains @custom-variant dark
- [x] src/app/[lang]/layout.tsx contains ThemeProvider and suppressHydrationWarning
- [x] src/components/Header.tsx contains ThemeToggle with hidden lg:flex
- [x] src/components/MobileDrawer.tsx contains ThemeToggle in header bar
- [x] messages/en.json contains theme keys
- [x] messages/es.json contains theme keys

**Commits exist:**
- [x] 5b43482 (Task 1 - theme infrastructure)
- [x] dbda1b0 (Task 2 - ThemeToggle integration)
- [x] be36329 (Fix - mobile visibility)

## Self-Check: PASSED

All files exist, all commits recorded, all requirements completed.

---
*Phase: 03-theme-system*
*Completed: 2026-03-23*
