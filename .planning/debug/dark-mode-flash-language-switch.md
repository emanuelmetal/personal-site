---
status: diagnosed
trigger: "Investigate why there is a flash in dark mode when the language is switched."
created: 2026-03-23T00:00:00Z
updated: 2026-03-23T00:00:05Z
---

## Current Focus

hypothesis: The disable-transitions inline script in layout.tsx only runs on initial mount, not on router.push navigation. When language switches via router.push, the page re-renders without the disable-transitions class, causing 150ms CSS transitions to animate from light to dark colors during hydration.
test: Check if router.push navigation triggers full page reload or client-side navigation, and whether the inline script re-executes
expecting: Inline script does NOT re-execute on router.push navigation, causing theme transitions to be visible during language switch
next_action: Verify client-side vs server-side navigation behavior and confirm disable-transitions timing

## Symptoms

expected: When switching languages in dark mode, page should reload without any visual flash or theme change
actual: There is a flash when the page loads after switching languages in dark mode
errors: None reported - visual flash issue
reproduction:
1. Set theme to dark mode
2. Switch language using LanguageSwitcher component
3. Observe flash during page load
started: Unknown - likely since language switching was implemented in Phase 04

## Eliminated

## Evidence

- timestamp: 2026-03-23T00:00:00Z
  checked: LanguageSwitcher.tsx implementation
  found: Uses router.push(pathname, { locale: newLocale }) for language switching (line 18). This is client-side navigation from next-intl's navigation helper.
  implication: Language switching triggers client-side navigation, not a full page reload

- timestamp: 2026-03-23T00:00:01Z
  checked: layout.tsx inline script
  found: Lines 53-57 contain inline script that adds 'disable-transitions' class and removes it after 100ms. This script is embedded in the <body> tag.
  implication: Script runs on initial page load to prevent FOUC during hydration

- timestamp: 2026-03-23T00:00:02Z
  checked: globals.css transition rules
  found: Lines 12-18 define 150ms transitions for color, background-color, border-color. Lines 21-23 define html.disable-transitions * { transition: none !important; }
  implication: Without disable-transitions class, theme changes will animate over 150ms

- timestamp: 2026-03-23T00:00:03Z
  checked: ThemeProvider configuration
  found: disableTransitionOnChange is set to false (line 11), storageKey is "theme" (line 12), uses class attribute strategy (line 8)
  implication: next-themes will not suppress transitions when theme changes - relies on our disable-transitions CSS class

- timestamp: 2026-03-23T00:00:04Z
  checked: Phase 3 verification docs
  found: .planning/phases/03-theme-system/03-VERIFICATION.md confirms disable-transitions script was designed to prevent FOUC on initial page load only
  implication: The disable-transitions mechanism was never designed to handle route transitions - only initial mount

## Resolution

root_cause: The disable-transitions inline script in layout.tsx (lines 53-57) only executes on initial HTML load, not during client-side navigation. When LanguageSwitcher uses router.push() for locale changes, React re-renders the page without re-executing the <body>'s inline script. This means the 'disable-transitions' class is never added during language switches. As a result, the 150ms CSS transitions (defined in globals.css lines 12-18) animate the theme colors during hydration, causing the visible flash from light to dark mode.
fix:
verification:
files_changed: []
