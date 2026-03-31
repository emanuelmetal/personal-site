---
phase: 09-accessibility-quality
plan: 01
subsystem: [layout, navigation, content]
tags: [bugfix, ux, contact-info]
dependency_graph:
  requires: [phase-08-performance]
  provides: [fixed-header-overlap, fixed-nav-detection, updated-contact-info]
  affects: [all-sections, header-nav, contact-section]
tech_stack:
  added: []
  patterns: [css-padding, intersection-observer, lucide-icons]
key_files:
  created: []
  modified:
    - src/app/globals.css
    - src/components/Header.tsx
    - src/app/[lang]/page.tsx
    - messages/en.json
    - messages/es.json
decisions:
  - key: Adjust IntersectionObserver threshold instead of forcing min-height
    rationale: Cleaner solution that doesn't artificially inflate section height
    alternatives: [Add min-height to Contact section]
    chosen: Reduce top rootMargin from -20% to -10%
metrics:
  duration: 140
  completed_date: "2026-03-31"
  tasks_completed: 3
  files_modified: 5
  commits: 3
---

# Phase 09 Plan 01: Fix Critical Bugs Summary

**One-liner:** Fixed header overlap with padding, adjusted nav detection threshold for short sections, and updated contact info with Twitter/Instagram links.

## Overview

Fixed three critical UX bugs affecting navigation and contact display:
1. Header was covering the top of the About section on page load
2. Contact section was not being detected by IntersectionObserver due to height threshold
3. Contact information was outdated (old email, old LinkedIn username, missing social links)

All fixes implemented with minimal changes and no architectural modifications.

## Tasks Completed

### Task 1: Fix header overlap with main content padding
**Status:** ✓ Complete
**Commit:** 7d6a7a7

Added padding-top to main element matching header height:
- Mobile: 3.5rem (h-14 header)
- Desktop: 5rem (h-20 header)

This prevents the sticky header from covering the About section content on initial page load. The existing scroll-padding-top CSS property already handled smooth scroll offset, but padding on the main container was needed for the initial viewport.

**Files modified:**
- src/app/globals.css

### Task 2: Fix Contact section detection with adjusted IntersectionObserver
**Status:** ✓ Complete
**Commit:** 8369c39

Changed IntersectionObserver rootMargin from `-20% 0px -80% 0px` to `-10% 0px -80% 0px`.

The Contact section content is shorter than 20% viewport height, which prevented it from ever triggering the intersection threshold. Reducing the top threshold to -10% allows shorter sections to be detected while still requiring them to be prominently in view before activating.

**Files modified:**
- src/components/Header.tsx

### Task 3: Update contact information and add social media links
**Status:** ✓ Complete
**Commit:** 4381f17

Updated all contact information in both English and Spanish locales:
- Email: contact@emanuelpereyra.com → emanuel.pereyra77@gmail.com
- LinkedIn: /in/emanuelpereyra → /in/emap77
- Added Twitter: x.com/emapereyra77
- Added Instagram: instagram.com/emanuel.pereyra77

Imported Twitter and Instagram icons from lucide-react and added new social link buttons in the Contact section. Added flex-wrap to social links container for mobile responsiveness.

**Files modified:**
- messages/en.json
- messages/es.json
- src/app/[lang]/page.tsx

## Deviations from Plan

None - plan executed exactly as written. No auto-fixes, blocking issues, or architectural changes were needed.

## Key Decisions

**D-01: Use main padding instead of section-specific margin**
- **Context:** Need to prevent header from covering About section on page load
- **Decision:** Add padding-top to main element matching header height
- **Rationale:** More maintainable than adding margin to individual sections; single source of truth for header offset
- **Impact:** Minimal - 10 lines of CSS

**D-02: Adjust IntersectionObserver threshold instead of forcing section height**
- **Context:** Contact section too short for -20% rootMargin threshold
- **Decision:** Reduce threshold to -10%
- **Rationale:** Cleaner solution that doesn't artificially inflate section height or affect layout
- **Alternatives considered:** Add min-height to Contact section (rejected - would force unwanted whitespace)
- **Impact:** One-line change; allows sections as short as 10vh to be detected

**D-03: Add flex-wrap to social links container**
- **Context:** Four social links may not fit on a single row on small mobile screens
- **Decision:** Change from `flex` to `flex flex-wrap`
- **Rationale:** Prevents overflow and allows graceful wrapping on narrow viewports
- **Impact:** Minor CSS change; improves mobile UX

## Verification

All tasks verified:

1. **Header overlap fixed:** Main element now has padding-top (3.5rem mobile, 5rem desktop), preventing About section from being hidden by sticky header
2. **Contact detection working:** IntersectionObserver threshold adjusted to -10%, Contact section now highlights in nav when scrolled into view
3. **Contact info updated:** All contact information correct in both locales, Twitter and Instagram links present with icons

Build verified successful with no TypeScript or linting errors.

## Impact

**User-facing changes:**
- About section content now fully visible on page load (no longer hidden by header)
- Contact nav link correctly highlights when user scrolls to bottom of page
- Contact section shows current email (emanuel.pereyra77@gmail.com) and LinkedIn username (emap77)
- Contact section includes Twitter and Instagram links with icons

**Technical changes:**
- CSS: Added main element padding responsive to header height
- JS: Adjusted IntersectionObserver threshold for better detection of short sections
- i18n: Updated contact info in both EN/ES locales
- UI: Added Twitter/Instagram social links with lucide-react icons

**Quality improvements:**
- Fixed UX issue where header covered content on page load
- Fixed navigation detection bug for short sections
- Updated outdated contact information
- Added missing social media links

## Known Stubs

None. All contact information is now accurate and functional.

## Self-Check: PASSED

**Created files:**
- None (modification-only plan)

**Modified files verified:**
✓ src/app/globals.css exists
✓ src/components/Header.tsx exists
✓ src/app/[lang]/page.tsx exists
✓ messages/en.json exists
✓ messages/es.json exists

**Commits verified:**
✓ 7d6a7a7: fix(09-01): add main padding to prevent header overlap
✓ 8369c39: fix(09-01): adjust IntersectionObserver threshold for short sections
✓ 4381f17: feat(09-01): update contact info and add Twitter/Instagram links

All artifacts accounted for and committed.
