---
phase: 04
slug: internationalization
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 04 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright (to be installed in Wave 0) |
| **Config file** | `playwright.config.ts` (Wave 0) |
| **Quick run command** | `npm run test:i18n` |
| **Full suite command** | `npx playwright test tests/i18n/` |
| **Estimated runtime** | ~15-20 seconds (6 integration tests) |

---

## Sampling Rate

- **After every task commit:** Run `npm run test:i18n` after Wave 0 completes
- **After every plan wave:** Full suite must pass
- **Before `/gsd:verify-work`:** Full i18n test suite green
- **Max feedback latency:** 15-20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | I18N-04 | integration | `playwright test i18n/content-translation.spec.ts -x` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | I18N-01, I18N-03, I18N-05, I18N-06 | integration | `playwright test i18n/language-switcher.spec.ts -x` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | I18N-02 | integration | `playwright test i18n/switcher-visibility.spec.ts -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

**Test framework installation and scaffolding:**

- [ ] `npm install -D @playwright/test` — Install Playwright testing framework
- [ ] `npx playwright install` — Install browser binaries
- [ ] `playwright.config.ts` — Base configuration with test directory and base URL
- [ ] `tests/i18n/language-switcher.spec.ts` — Test language switching functionality (I18N-01, I18N-03, I18N-05, I18N-06)
- [ ] `tests/i18n/switcher-visibility.spec.ts` — Test switcher appears in Header and MobileDrawer (I18N-02)
- [ ] `tests/i18n/content-translation.spec.ts` — Test section content displays in selected language (I18N-04)
- [ ] `tests/i18n/url-structure.spec.ts` — Test URL reflects /en/ or /es/ path (I18N-03)
- [ ] `tests/i18n/url-shareability.spec.ts` — Test shared URLs preserve language (I18N-05)
- [ ] `tests/i18n/locale-detection-scroll.spec.ts` — Test browser language detection and scroll preservation (I18N-06)
- [ ] `package.json` — Add `"test:i18n": "playwright test tests/i18n/"` script

**Justification:** Playwright required because i18n testing involves navigation, URL changes, browser language detection, and scroll position—all require real browser environment. Unit tests for translation keys wouldn't catch integration issues.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| None | N/A | All requirements have automated Playwright tests | N/A |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20 seconds
- [ ] `nyquist_compliant: false` set in frontmatter — Wave 0 not yet complete

**Approval:** draft 2026-03-23 (pending Wave 0 completion)

**Note:** Once Wave 0 test infrastructure is in place and test files created, update `nyquist_compliant: true` and `wave_0_complete: true` in frontmatter.
