# Phase 3: Theme System - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement light/dark mode toggle with system preference detection and persistence across browser sessions. Users can switch between themes using a control in the navigation, with preferences stored locally and theme changes applying instantly without page reload or flash of unstyled content.

</domain>

<decisions>
## Implementation Decisions

### Theme Toggle UI/UX
- **D-01:** Theme toggle positioned in header right side (desktop), at top of mobile drawer (mirrors Phase 2 language/theme toggle placement decision)
- **D-02:** Sun/moon icon toggle (industry standard, immediately recognizable)
- **D-03:** Icon represents current theme — sun shows in light mode, moon shows in dark mode (clicking switches to other mode)
- **D-04:** Three-state preference system: Light / Dark / System (users can explicitly choose system preference or override it)

### Color Palette & Contrast
- **D-05:** Dark mode uses gray-950 (#030712) background (matches existing Header component from Phase 2, softer than true black)
- **D-06:** Text colors in dark mode: pure white (#FFFFFF) for headings, gray-300 for body text (matches existing Header pattern, meets WCAG AA)
- **D-07:** Borders and dividers adapt: gray-200 (light mode) / gray-800 (dark mode) (maintains consistent visual weight, already used in Header)

### Storage & Persistence
- **D-08:** Theme preference stored in localStorage (standard for client-side preferences, next-themes library default)
- **D-09:** FOUC prevention via blocking script in <head> (reads localStorage before first paint, applies theme class to <html> — next-themes default approach)
- **D-10:** First visit with no stored preference: detect system preference using prefers-color-scheme media query (requirement THEME-04)

### Transition Behavior
- **D-11:** Theme changes use quick fade transition (150ms duration)
- **D-12:** Transition applies to all color properties (background, text, borders) uniformly
- **D-13:** Disable transition on initial page load (only animate when user clicks toggle, prevents animated color fade on first render)

### Claude's Discretion
- Exact icon SVG paths for sun/moon
- Three-state UI implementation (cycle button vs dropdown vs segmented control)
- CSS transition timing function (ease, ease-in-out, or linear)
- Focus indicator styling for theme toggle button (must meet WCAG AA)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Foundation
- `.planning/phases/01-project-setup-foundation/01-CONTEXT.md` — Tailwind CSS 4 setup with CSS variables (@theme directive), font configuration (Inter + Roboto Mono)
- `.planning/phases/02-layout-navigation/02-CONTEXT.md` — Header component structure, existing dark mode styles (dark: prefix already used), responsive breakpoints

### Existing Code
- `src/app/[lang]/layout.tsx` — Root layout where ThemeProvider will be added
- `src/app/globals.css` — Tailwind @theme directive with CSS variables for fonts (theme colors will extend this)
- `src/components/Header.tsx` — Navigation bar where theme toggle will be integrated (already has dark:bg-gray-950/80, dark:border-gray-800, dark:text-white)
- `src/components/MobileDrawer.tsx` — Mobile drawer where theme toggle will appear on small screens

### Project Requirements
- `.planning/REQUIREMENTS.md` — THEME-01 (toggle control), THEME-02 (accessible in nav), THEME-03 (persistence), THEME-04 (system preference detection), THEME-05 (instant transitions without FOUC)
- `.planning/PROJECT.md` — Modern corporate aesthetic, WCAG AA compliance expectation (QUAL-03)

### Research Findings
- `.planning/research/STACK.md` — next-themes library identified in Phase 1 research as standard solution for Next.js theme management

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Header component:** Already client-side ('use client'), has state management (useState for drawer), uses dark: utilities throughout
- **Tailwind CSS 4:** Configured with @theme directive and CSS variables, ready for theme system integration
- **Font variables:** --font-inter and --font-roboto-mono already set up, theme can add --color-* variables
- **next-intl:** i18n provider active, theme toggle can use translations via useTranslations('theme')

### Established Patterns
- **Dark mode classes:** Header already uses dark:bg-gray-950/80, dark:border-gray-800, dark:text-white — theme system activates these via class on <html>
- **Client components:** Header is 'use client' with hooks, theme toggle follows same pattern
- **Responsive utilities:** Header uses lg: breakpoint for desktop nav, theme toggle mirrors this
- **Icon pattern:** Header uses inline SVG for hamburger menu, theme toggle icons follow same approach

### Integration Points
- Theme toggle button integrates into Header component (desktop: right side next to hamburger, mobile: inside MobileDrawer)
- ThemeProvider wraps app content in root layout.tsx (above NextIntlClientProvider or below it, research which is correct)
- CSS transitions defined in globals.css (applies to all elements or scoped to avoid initial load animation)
- Three-state preference stored in localStorage as 'light' | 'dark' | 'system' string

</code_context>

<specifics>
## Specific Ideas

- Phase 2 already decided: "Language and theme toggles positioned right side of nav bar (desktop), top of drawer (mobile)" — theme toggle placement is predetermined
- Header component already has complete dark mode styling (dark: prefixes on every element) — theme system just needs to add/remove 'dark' class on <html> to activate them
- Requirement THEME-05 says "instantly" but we chose 150ms fade — close enough to instant while adding polish
- Gray-950 background chosen specifically because Header already uses it (consistency with Phase 2)
- Three-state system (Light/Dark/System) is more complex UI than typical two-state toggle — may need cycle button or small dropdown

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-theme-system*
*Context gathered: 2026-03-23*
