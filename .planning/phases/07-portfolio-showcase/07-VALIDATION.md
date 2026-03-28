---
phase: 07
slug: portfolio-showcase
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 07 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Deferred to Phase 8 |
| **Config file** | None — No test infrastructure exists yet |
| **Quick run command** | `npm run build` (type checking + build validation) |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (validates TypeScript types and Next.js compilation)
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Build must succeed + manual visual testing
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD | TBD | TBD | PORT-01 | visual | `npm run build + dev server` | ✅ | ⬜ pending |
| TBD | TBD | TBD | PORT-02 | visual | `npm run build + dev server` | ✅ | ⬜ pending |
| TBD | TBD | TBD | PORT-03 | visual | `npm run build + dev server` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements:
- TypeScript type checking via `npm run build`
- Next.js compilation validates component structure
- Dev server (`npm run dev`) for manual visual validation

No new test infrastructure needed for this phase. Static content rendering can be verified through:
1. Build success (proves no TypeScript/React errors)
2. Dev server visual inspection (proves layout/styling/content correct)
3. Responsive testing at 320px/768px/1440px breakpoints
4. Dark mode toggle verification

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Project cards display correctly | PORT-01, PORT-02 | Visual layout validation | 1. Run `npm run dev`<br>2. Navigate to Portfolio section<br>3. Verify 4 project cards appear in 2×2 grid (desktop)<br>4. Check each card shows title, description, tech badges |
| External links work | PORT-03 | Link functionality | 1. Click "View Project" on Agoda card<br>2. Verify opens https://www.anaworldhotel.com/ in new tab<br>3. Repeat for all project links<br>4. Verify GitHub link opens for Alix Partners |
| Responsive layout works | Success Criteria 5 | Layout behavior across breakpoints | 1. Test at 320px (mobile): 1-column stack<br>2. Test at 768px (tablet): verify layout<br>3. Test at 1440px (desktop): 2-column grid<br>4. Verify card spacing and readability |
| Dark mode styling | Theme System | Color contrast validation | 1. Toggle dark mode<br>2. Verify card backgrounds/shadows render correctly<br>3. Check text contrast meets WCAG AA (4.5:1)<br>4. Verify badge colors work in dark mode |
| Bilingual content | PORT-01, PORT-02 | Translation verification | 1. Switch to Spanish (/es)<br>2. Verify all 4 projects show Spanish descriptions<br>3. Verify button labels translate ("Ver Proyecto", "Ver Código")<br>4. Check tech stack names remain English (proper nouns) |

---

## Validation Sign-Off

- [ ] All tasks have build validation (`npm run build`)
- [ ] Sampling continuity: build runs after every commit
- [ ] Wave 0 requirement: none — existing infrastructure sufficient
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] Manual verification checklist provided above
- [ ] `nyquist_compliant: true` set in frontmatter once plans finalized

**Approval:** pending
