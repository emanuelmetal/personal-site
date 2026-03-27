---
phase: 6
slug: experience-timeline
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-27
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification (visual QA) |
| **Config file** | none — frontend-only component phase |
| **Quick run command** | `npm run dev` (visual check) |
| **Full suite command** | Manual UAT checklist |
| **Estimated runtime** | ~30 seconds per verification |

---

## Sampling Rate

- **After every task commit:** Visual check in browser (localhost:3000)
- **After every plan wave:** Full UAT checklist verification
- **Before `/gsd:verify-work`:** All acceptance criteria verified visually
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD | TBD | TBD | EXP-01, EXP-02, EXP-03, EXP-04 | visual | `npm run dev` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements — no additional test files needed.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Timeline visual rendering | EXP-01 | Visual component — vertical line with dots, card layout | Open /#experience section, verify vertical timeline with connector line and dots visible |
| Entry content display | EXP-02, EXP-03 | Content verification — company, title, dates, achievements | Verify each of 12 positions shows: company name, job title, date range, 2-3 achievement bullets |
| Responsive adaptation | EXP-04 | Responsive layout — mobile/desktop spacing | Test at 320px (mobile), 768px (tablet), 1440px (desktop) — verify vertical layout with enhanced spacing on larger screens |
| Dark mode compatibility | THEME-01 (inherited) | Visual — color contrast and theme colors | Toggle dark mode, verify timeline uses dark:text-gray-300, dark:border-gray-800, WCAG AA compliance |
| Bilingual content | I18N-04 (inherited) | Translation verification | Switch to Spanish (/es/), verify all timeline content displays in Spanish |

---

## Validation Sign-Off

- [ ] All tasks have manual verification instructions
- [ ] Sampling continuity: visual check after each commit
- [ ] Wave 0 covers all MISSING references (N/A — no missing infrastructure)
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter (after validation)

**Approval:** pending
