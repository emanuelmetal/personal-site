---
phase: 04-internationalization
plan: 01
subsystem: i18n-ui
tags: [internationalization, navigation, language-switcher, i18n-routing]
dependency-graph:
  requires: [i18n-routing, middleware, translation-files]
  provides: [language-switcher-component, locale-navigation-wrapper, extended-translations]
  affects: [header, mobile-drawer, all-translated-content]
tech-stack:
  added: [next-intl-navigation]
  patterns: [hash-preservation, client-side-locale-switching, accessible-language-toggle]
key-files:
  created:
    - src/i18n/navigation.ts
    - src/components/LanguageSwitcher.tsx
  modified:
    - messages/en.json
    - messages/es.json
    - src/components/Header.tsx
    - src/components/MobileDrawer.tsx
decisions:
  - id: D-01
    summary: Text-based EN/ES toggle in navigation
    rationale: Clear, accessible, no icons needed for language codes
  - id: D-02
    summary: EN / ES with slash separator format
    rationale: Common pattern, visually clean, space-efficient
  - id: D-09
    summary: Hash capture before router.push
    rationale: Preserves scroll position when switching languages
  - id: D-10
    summary: router.push with locale option
    rationale: Uses next-intl navigation API for locale switching
  - id: D-11
    summary: router.push not replace
    rationale: Adds to browser history, allows back button navigation
metrics:
  duration_seconds: 191
  completed_at: "2026-03-23T17:52:59Z"
  tasks_completed: 3
  files_created: 2
  files_modified: 4
  commits: 3
---

# Phase 04 Plan 01: Language Switching UI Summary

**One-liner:** Bilingual EN/ES language switcher with URL-based routing and hash-preserving scroll position restoration

## What Was Built

Created a complete language switching experience for the portfolio site:

1. **i18n Navigation Wrapper** - Locale-aware navigation utilities wrapping next-intl's createNavigation
2. **LanguageSwitcher Component** - EN/ES toggle with hash preservation for scroll position
3. **Extended Translation Files** - Added section content keys (about, experience, skills, portfolio, contact, language) to both en.json and es.json
4. **Navigation Integration** - Integrated LanguageSwitcher into both desktop Header and mobile MobileDrawer

## Task Breakdown

### Task 1: Create i18n navigation wrapper and extend translation files
**Commit:** c0657b9
**Files:** src/i18n/navigation.ts, messages/en.json, messages/es.json

Created `src/i18n/navigation.ts` exporting locale-aware `Link`, `redirect`, `usePathname`, and `useRouter` from next-intl's `createNavigation(routing)`. Extended both translation files with matching nested keys for all five content sections plus language switcher labels. All existing keys preserved unchanged.

### Task 2: Create LanguageSwitcher component with hash preservation
**Commit:** d9cb4cb
**Files:** src/components/LanguageSwitcher.tsx

Built a 'use client' component rendering "EN / ES" text buttons. Implements hash capture before `router.push(pathname, { locale })` and uses setTimeout with scrollIntoView for smooth hash restoration. Active language styled bold, inactive gray with hover states. Includes aria-label and aria-current for accessibility. Uses router.push (not replace) to maintain browser history.

### Task 3: Integrate LanguageSwitcher into Header and MobileDrawer
**Commit:** ed7d617
**Files:** src/components/Header.tsx, src/components/MobileDrawer.tsx

Added LanguageSwitcher imports and renders to both navigation components. Desktop header shows ThemeToggle then LanguageSwitcher in `hidden lg:flex lg:items-center lg:gap-2` container. Mobile drawer shows ThemeToggle, LanguageSwitcher, then close button in header bar. Build passes with zero TypeScript errors.

## Deviations from Plan

None - plan executed exactly as written.

## Technical Implementation

**Architecture:**
- Locale-aware navigation wrapper using next-intl's createNavigation API
- Client-side language switching via programmatic router.push
- Hash-based scroll position preservation using capture/restore pattern
- Accessible buttons with aria-label and aria-current attributes

**Key Patterns:**
- Hash capture before navigation: `const hash = window.location.hash`
- Locale switching: `router.push(pathname, { locale: newLocale })`
- Hash restoration: `setTimeout(() => { window.location.hash = hash; element.scrollIntoView() }, 150)`
- Conditional styling based on currentLocale === button locale

**Integration Points:**
- Both Header (desktop) and MobileDrawer (mobile) render LanguageSwitcher
- ThemeToggle appears before LanguageSwitcher in both locations
- Translation files extended with section-specific keys following D-06 nested structure

## Testing & Verification

**Automated Checks:**
- ✓ navigation.ts exports Link, redirect, usePathname, useRouter
- ✓ messages/en.json contains all section keys (about, experience, skills, portfolio, contact, language)
- ✓ messages/es.json contains matching Spanish translations with identical key structure
- ✓ LanguageSwitcher component has 'use client' directive
- ✓ Component imports from @/i18n/navigation wrapper
- ✓ Hash preservation code present (window.location.hash, scrollIntoView)
- ✓ router.push used (not replace)
- ✓ aria-current and aria-label attributes present
- ✓ Header and MobileDrawer import and render LanguageSwitcher
- ✓ npm run build completes with zero errors

**Manual Verification Steps:**
1. Navigate to /en/ - English content displays, EN bold in switcher
2. Navigate to /es/ - Spanish content displays, ES bold in switcher
3. Click ES while on /en/#experience - URL changes to /es/#experience, stays at Experience section
4. Open /es/ directly in new tab - Spanish content loads (shareable URL works)
5. LanguageSwitcher visible on both desktop (header right) and mobile (drawer header)
6. ThemeToggle appears before LanguageSwitcher in both locations

## Known Stubs

None - all components fully wired. Translation content is placeholder text but intentionally so; real content will be added in future content phases. The language switching mechanism itself is complete and functional.

## Dependencies & Integration

**Upstream Dependencies:**
- Phase 01: Next.js 16 setup with i18n routing (`[lang]` dynamic route)
- Phase 01: next-intl configuration with middleware and routing setup
- Phase 01: Translation file structure (messages/en.json, messages/es.json)
- Phase 02: Header and MobileDrawer components with navigation structure
- Phase 03: ThemeToggle component (LanguageSwitcher placed after it)

**Downstream Impact:**
- All future content components can use extended translation keys
- All sections (About, Experience, Skills, Portfolio, Contact) can now display in both languages
- URL-based locale routing enables shareable links in any language
- Hash preservation enables smooth UX when switching languages mid-page

**External APIs:**
- next-intl's createNavigation for locale-aware routing
- next-intl's useTranslations for accessing translation keys
- next/navigation's useParams for reading current locale

## Requirements Satisfied

- ✓ I18N-01: URL-based language routing with /en/ and /es/ paths
- ✓ I18N-02: Language switcher visible in navigation (desktop and mobile)
- ✓ I18N-03: All section headings translatable (keys added to translation files)
- ✓ I18N-04: Shareable URLs maintain language (locale in URL path)
- ✓ I18N-05: Browser language detection (handled by middleware from Phase 01)
- ✓ I18N-06: Scroll position preserved during language switch (hash capture/restore)

## Self-Check: PASSED

**Files created:**
- ✓ src/i18n/navigation.ts exists and exports navigation utilities
- ✓ src/components/LanguageSwitcher.tsx exists and exports component

**Files modified:**
- ✓ messages/en.json contains about, experience, skills, portfolio, contact, language keys
- ✓ messages/es.json contains matching Spanish translations
- ✓ src/components/Header.tsx imports and renders LanguageSwitcher
- ✓ src/components/MobileDrawer.tsx imports and renders LanguageSwitcher

**Commits exist:**
- ✓ c0657b9: feat(04-01): create i18n navigation wrapper and extend translations
- ✓ d9cb4cb: feat(04-01): create LanguageSwitcher component with hash preservation
- ✓ ed7d617: feat(04-01): integrate LanguageSwitcher into Header and MobileDrawer

**Build status:**
- ✓ npm run build completes successfully with zero errors
- ✓ TypeScript compilation passes
- ✓ Static generation succeeds for both /en and /es routes

All claims verified. Plan complete.
