---
status: partial
phase: 04-internationalization
source: [04-VERIFICATION.md]
started: 2026-03-23T18:15:00Z
updated: 2026-03-23T18:15:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Visual Language Switcher State
expected: EN bold on /en/ route, ES bold on /es/ route. Inactive button changes color on hover.
result: [pending]

**Test:** Visit /en/ and /es/ in a browser. Check that the correct language button appears bold and the inactive language appears gray with hover effect.

### 2. Scroll Position Preservation
expected: URL changes to /es/#experience and page remains scrolled to Experience section (not jumping to top).
result: [pending]

**Test:** Navigate to /en/#experience (scroll to Experience section), then click ES button in navigation.

### 3. Browser Language Detection
expected: Middleware redirects to /es/ automatically.
result: [pending]

**Test:** Clear browser data/cookies, set browser language preference to Spanish (es), visit the root path /, observe redirect behavior.

### 4. Shareable URL Language
expected: Spanish content displays immediately without requiring manual language selection.
result: [pending]

**Test:** On /es/, copy URL, open in new incognito window or share with another user.

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps
