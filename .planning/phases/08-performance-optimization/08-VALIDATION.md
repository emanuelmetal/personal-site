---
phase: 08
slug: performance-optimization
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-30
---

# Phase 08 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — manual verification with browser DevTools |
| **Config file** | none — no automated tests |
| **Quick run command** | `npm run dev` (visual check) |
| **Full suite command** | `npm run build` (check bundle size) |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run dev`, verify no console errors
- **After every plan wave:** Run `npm run build`, check bundle size warnings
- **Before `/gsd:verify-work`:** Full manual test with Chrome DevTools throttled to "Fast 3G", verify FCP/TTI thresholds met
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD | TBD | TBD | PERF-03 | manual | Check `npm run build` output | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | PERF-04 | manual | Check WebVitals console logs | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | PERF-05 | manual | Check DevTools Performance tab | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Note: Task IDs will be populated during planning phase*

---

## Wave 0 Requirements

No test infrastructure needed for this phase — performance validation is manual with browser DevTools.

*Future consideration: Add Lighthouse CI in Phase 9 (Professional Quality) for automated performance regression testing.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Bundle size <150KB | PERF-03 | Build-time measurement | Run `npm run build`, check output or open `.next/analyze/client.html` if ANALYZE=true |
| FCP <1.5s on 3G | PERF-04 | Network throttling required | Chrome DevTools → Network tab → Throttle to "Fast 3G" → Check Performance panel FCP metric |
| TTI <3s on 3G | PERF-05 | Network throttling required | Chrome DevTools → Performance tab → Record load → Check "Total Blocking Time" (TBT <300ms correlates with TTI <3s) |
| CLS <0.1 | Implicit in phase goal | Visual stability measurement | Chrome DevTools → Performance panel → Check Cumulative Layout Shift metric during page load |

---

## Validation Sign-Off

- [ ] All tasks have manual verification steps documented
- [ ] Sampling continuity: bundle size checked after every wave
- [ ] No Wave 0 dependencies — no test files needed
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s (build time)
- [ ] `nyquist_compliant: true` set in frontmatter (after planner confirms coverage)

**Approval:** pending

**Note:** This phase uses manual verification because:
1. Performance metrics require browser DevTools and network throttling (simulated 3G)
2. Automated performance testing (Lighthouse CI, Puppeteer) is out of scope for Phase 8
3. Bundle size verification is done via Next.js build output and bundle-analyzer reports
4. Future phases could add automated performance regression testing if needed
