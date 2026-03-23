---
phase: 03
slug: theme-system
status: draft
nyquist_compliant: false
wave_0_complete: true
created: 2026-03-23
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — manual testing via browser DevTools |
| **Config file** | None — no automated test framework |
| **Quick run command** | Manual: Open browser, test toggle |
| **Full suite command** | Manual: Full checklist (5 requirements) |
| **Estimated runtime** | ~2-3 minutes per full manual test |

---

## Sampling Rate

- **After every task commit:** Manual browser test — verify toggle works, localStorage persists
- **After every plan wave:** Full manual test suite — all 5 requirements, both EN/ES locales, light/dark/system states, keyboard navigation, FOUC check
- **Before `/gsd:verify-work`:** Full manual verification checklist must pass
- **Max feedback latency:** 2-3 minutes (manual testing)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | THEME-01, THEME-02, THEME-03, THEME-04, THEME-05 | manual | Browser: Click toggle, verify class changes | ❌ Manual | ⬜ pending |
| 03-01-02 | 01 | 1 | THEME-01, THEME-02 | manual | Browser: Verify toggle in Header/Drawer | ❌ Manual | ⬜ pending |
| 03-01-03 | 01 | 1 | All requirements | manual | Full manual checklist | ❌ Manual | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements — no Wave 0 test stubs needed.

**Justification:** Theme system is inherently visual and involves browser APIs (localStorage, system preferences, DOM class manipulation). Automated tests would require Playwright/Cypress for DOM assertions + localStorage checks, which is overkill for a phase with 5 visual requirements. Manual testing via browser DevTools is faster and more thorough for verifying FOUC, focus indicators, and system preference detection.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Toggle between light/dark/system themes | THEME-01 | Visual UI interaction, DOM class inspection | Browser DevTools: Click toggle, verify `<html>` class changes between 'light', 'dark', and empty (system) |
| Theme toggle accessible in navigation | THEME-02 | Keyboard navigation, focus indicators | Keyboard test: Tab to toggle, verify focus indicator visible (WCAG AA), press Enter to activate |
| Theme preference persists across sessions | THEME-03 | localStorage + page reload behavior | Browser DevTools: Set theme, close tab, reopen, verify localStorage entry 'theme' + applied theme matches |
| System preference detected on first visit | THEME-04 | OS-level dark mode detection | Browser DevTools: Clear localStorage, toggle OS dark mode in system settings, reload page, verify applied theme matches OS preference |
| No FOUC on page load | THEME-05 | Visual timing, network conditions | Browser DevTools: Throttle network (Slow 3G), reload page, verify no white flash before dark mode applies — blocking script should prevent flash |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies — Manual verification justified for visual theme system
- [x] Sampling continuity: no 3 consecutive tasks without automated verify — Only 3 tasks total, all have manual checkpoints
- [x] Wave 0 covers all MISSING references — No Wave 0 needed (manual-only phase)
- [x] No watch-mode flags — N/A (no test runner)
- [x] Feedback latency < 3 minutes — Manual tests complete within 2-3 minutes
- [x] `nyquist_compliant: false` set in frontmatter — Manual-only validation, not automated

**Approval:** draft 2026-03-23

**Note:** This phase is **intentionally manual-only**. Nyquist compliance (automated verification) is not appropriate for inherently visual theme system testing. Future phases may introduce Playwright/Cypress if E2E UI testing becomes necessary across multiple features.
