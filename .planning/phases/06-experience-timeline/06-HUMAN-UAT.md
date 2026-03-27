---
status: partial
phase: 06-experience-timeline
source: [06-01-VERIFICATION.md]
started: 2026-03-27T22:30:00Z
updated: 2026-03-27T22:30:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Visual Timeline Rendering
**Test:** Navigate to `http://localhost:3000/#experience` in browser, scroll to Experience section
**Expected:**
- Timeline displays with 12 entries vertically stacked
- Blue dots (12px diameter) aligned to left with gray connector line between them
- Connector line does NOT extend below last entry (Aguas de Santiago)
- Content cards aligned to right of dots with proper spacing
- First entry shows "intive" with "April 2025 - Present"
- Last entry shows "Aguas de Santiago S.A." with "May 2007 - February 2011"
**Result:** [pending]

### 2. Responsive Layout Behavior
**Test:** Resize browser window from 320px (mobile) to 1440px (desktop)
**Expected:**
- 320px: Timeline remains single-column, tight spacing, text wraps cleanly, no horizontal overflow
- 768px: Timeline maintains single-column, moderate spacing increase
- 1440px: Timeline maintains single-column, generous spacing (space-y-12), typography scales up (text-2xl headings, text-base body)
**Result:** [pending]

### 3. Dark Mode Visual Contrast
**Test:** Toggle dark mode in navigation bar
**Expected:**
- Dots change from blue-600 to blue-400 (still visible against dark background)
- Connector line changes from gray-300 to gray-700 (subtle but visible)
- Company names change to white
- Job titles remain blue-400
- Achievement text changes to gray-300 (readable contrast on dark background)
- All text passes WCAG AA contrast ratio (4.5:1 for body text)
**Result:** [pending]

### 4. Bilingual Content Display
**Test:** Toggle language switcher between English and Spanish
**Expected:**
- English (`/en/`): All job titles in English (e.g., "Sr Web Developer"), achievements in English, "Present" for current role
- Spanish (`/es/`): All job titles in Spanish (e.g., "Desarrollador Web Senior"), achievements in Spanish, "Presente" for current role
- Company names remain consistent (proper nouns)
- Language switch preserves scroll position in Experience section
**Result:** [pending]

### 5. Achievement Bullet Readability
**Test:** Read achievement bullets for 2-3 positions
**Expected:**
- Achievement bullets are concise and scannable (not overwhelming paragraphs)
- Bullets emphasize results/metrics/scope (e.g., "reduced load time to under 5 seconds")
- No generic descriptions like "worked on X" without impact statement
**Result:** [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0
blocked: 0

## Gaps
