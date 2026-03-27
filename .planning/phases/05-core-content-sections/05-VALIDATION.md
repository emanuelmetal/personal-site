---
phase: 5
slug: core-content-sections
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-27
approved: 2026-03-27
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

**Phase 5 uses lightweight validation approach** — Node.js one-liners for JSON validation, lint checks for code structure. Phase 5 is content-focused (translation files + UI rendering), not behavior-heavy. Full test infrastructure (Playwright/Jest) deferred to Phase 6+ when behavior complexity increases.

Existing infrastructure covers all phase requirements:
- JSON structure validation via Node.js `require()` checks
- TypeScript/ESLint via `npm run lint`
- Build validation via `npm run build`
- Human verification checkpoint for visual/UX quality

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Badge colors meet WCAG AA contrast | SKILL-01 | Visual accessibility check | Use WebAIM contrast checker on badge colors against gray-950 dark mode background, verify 4.5:1 ratio minimum |
| Profile photo quality and appearance | ABOUT-01 | Subjective visual assessment | Verify photo looks professional, displays clearly at 120px+ size, no pixelation |
| Social link icons recognizable | CONT-02, CONT-03 | Icon design clarity | Verify LinkedIn and GitHub icons are immediately recognizable at button size |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (lightweight approach, no test framework needed)
- [x] No watch-mode flags
- [x] Feedback latency < 45s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-03-27 — Lightweight validation approach suitable for content-focused phase
