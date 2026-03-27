---
phase: 5
slug: core-content-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-27
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Wave 0 installs Playwright + Jest |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npm test -- --watch=false` (after Wave 0) |
| **Full suite command** | `npm test && npm run test:e2e` (after Wave 0) |
| **Estimated runtime** | ~15 seconds (unit) + ~30 seconds (e2e) |

---

## Sampling Rate

- **After every task commit:** Run `npm test -- --watch=false`
- **After every plan wave:** Run `npm test && npm run test:e2e`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 45 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD | TBD | TBD | TBD | TBD | TBD | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Note: This table will be populated by gsd-planner based on actual plan tasks.*

---

## Wave 0 Requirements

- [ ] `__tests__/about-section.test.tsx` — unit tests for About section rendering
- [ ] `__tests__/skills-section.test.tsx` — unit tests for Skills badge rendering and categorization
- [ ] `__tests__/contact-section.test.tsx` — unit tests for Contact section links and new-tab behavior
- [ ] `e2e/content-sections.spec.ts` — smoke tests for all three sections visible and interactive
- [ ] `jest.config.js` — Jest configuration for React Testing Library
- [ ] `playwright.config.ts` — Playwright configuration for e2e tests
- [ ] Install dependencies: `@testing-library/react`, `@testing-library/jest-dom`, `@playwright/test`

*Estimated setup time: 2-3 hours (per research findings)*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Badge colors meet WCAG AA contrast | SKILL-01 | Visual accessibility check | Use WebAIM contrast checker on badge colors against gray-950 dark mode background, verify 4.5:1 ratio minimum |
| Profile photo quality and appearance | ABOUT-01 | Subjective visual assessment | Verify photo looks professional, displays clearly at 120px+ size, no pixelation |
| Social link icons recognizable | CONT-02, CONT-03 | Icon design clarity | Verify LinkedIn and GitHub icons are immediately recognizable at button size |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 45s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
