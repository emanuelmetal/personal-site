# Phase 8: Performance Optimization - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-30
**Phase:** 08-performance-optimization
**Areas discussed:** Bundle analysis strategy, Component lazy loading, Core Web Vitals measurement, Third-party script optimization

---

## Bundle Analysis Strategy

### Question 1: When should bundle analysis run to catch size regressions?

| Option | Description | Selected |
|--------|-------------|----------|
| Every local build (recommended) | Bundle analyzer runs on `npm run build`, generates report automatically. Immediate feedback for developers, catches issues early. May slow down builds slightly (~5-10s overhead). | ✓ |
| Manual analysis only | Keep separate `npm run analyze` script, run when investigating performance. Faster regular builds, but requires discipline to check. Risk of missing regressions until later. | |
| CI/CD only | Bundle analysis runs in GitHub Actions/Vercel, fails build if over 150KB threshold. Clean local builds, but slower feedback loop (wait for CI to run). | |

**User's choice:** Every local build (recommended)
**Notes:** Immediate feedback for developers is critical for catching performance regressions early. The ~5-10s build overhead is acceptable for the project's scale.

---

### Question 2: Should the build fail if bundle exceeds 150KB, or just warn?

| Option | Description | Selected |
|--------|-------------|----------|
| Warn only (recommended) | Bundle analyzer shows report, console warning if >150KB, but build succeeds. Flexible for development, doesn't block deploys for small overages. Developer can assess urgency. | ✓ |
| Hard fail on threshold | Build fails immediately if any chunk >150KB. Enforces strict budget, prevents regressions. May be disruptive during development if legitimately over temporarily. | |
| You decide | Claude chooses based on project constraints and typical patterns. | |

**User's choice:** Warn only (recommended)
**Notes:** Flexible approach that enforces budget awareness without blocking legitimate temporary overages during refactoring or development.

---

## Component Lazy Loading

### Question 3: Which components should use dynamic imports with lazy loading?

| Option | Description | Selected |
|--------|-------------|----------|
| Below-fold sections (recommended) | Timeline and ProjectGrid components load on-demand since they're lower on page. Reduces initial bundle, improves FCP. User likely won't notice delay since they haven't scrolled yet. | ✓ |
| Conditional UI only | MobileDrawer (only on mobile when hamburger clicked), ThemeToggle/LanguageSwitcher dropdowns if complex. Conservative approach - only lazy load what's definitely not needed at page load. | ✓ |
| None - keep simple | No lazy loading - all components in main bundle. Simpler code, no dynamic import complexity. Portfolio site is small enough that eager loading everything may be fine. | |
| Aggressive optimization | Lazy load everything possible: Timeline, ProjectGrid, MobileDrawer, even icons. Maximum bundle reduction but adds complexity and may cause visible loading delays. | |

**User's choice:** Below-fold sections (recommended), Conditional UI only
**Notes:** Balanced approach targeting both below-fold content (Timeline, ProjectGrid) and conditional UI (MobileDrawer) for maximum impact without over-engineering.

---

### Question 4: Should lazy-loaded components show loading indicators?

| Option | Description | Selected |
|--------|-------------|----------|
| Skeleton placeholders (recommended) | Show gray placeholder boxes matching component dimensions while loading. Professional UX, prevents layout shift (CLS), user knows content is coming. Common pattern for modern sites. | ✓ |
| No indicators - instant render | Use React Suspense with null fallback, component appears when ready. Simpler code, but may cause brief blank space or layout shift if component takes time to load. | |
| You decide | Claude chooses loading strategy based on typical loading times and UX impact. | |

**User's choice:** Skeleton placeholders (recommended)
**Notes:** Professional UX pattern that prevents Cumulative Layout Shift (CLS), which is one of the Core Web Vitals metrics being optimized in this phase.

---

## Core Web Vitals Measurement

### Question 5: How should we measure and report Core Web Vitals (FCP, TTI, CLS)?

| Option | Description | Selected |
|--------|-------------|----------|
| web-vitals library (recommended) | Import `web-vitals` package, log FCP/LCP/CLS/FID to console in development. Industry-standard, accurate measurement, easy to verify during dev. Can later send to analytics. | ✓ |
| Lighthouse CI integration | Run Lighthouse in GitHub Actions on every PR, comment with scores. Automated testing, catches regressions. Requires CI setup, slower feedback than local measurement. | |
| Vercel Analytics | Use Vercel's built-in Real User Monitoring after deploy. Production data from real users, no dev setup. Only works post-deploy, no pre-deploy verification. | |
| Manual testing only | Run Lighthouse manually in Chrome DevTools when needed. Simple, no dependencies. Relies on developer discipline, easy to forget. | |

**User's choice:** web-vitals library (recommended)
**Notes:** Industry-standard library used by Lighthouse and Chrome DevTools, ensures measurement consistency. Provides immediate feedback during local development.

---

### Question 6: Where should web-vitals reporting be integrated?

| Option | Description | Selected |
|--------|-------------|----------|
| Root layout component (recommended) | Add web-vitals reporting in layout.tsx client-side effect. Measures every page load automatically, centralized setup. Standard Next.js pattern documented in their examples. | ✓ |
| Custom _app wrapper | Create separate monitoring component imported in layout. Cleaner separation of concerns, easier to toggle on/off. Slightly more code. | |
| You decide | Claude chooses integration point based on Next.js App Router conventions. | |

**User's choice:** Root layout component (recommended)
**Notes:** Standard Next.js App Router pattern for performance monitoring. Centralized setup ensures all pages are measured consistently.

---

## Third-Party Script Optimization

### Question 7: How should we optimize lucide-react icon imports to reduce bundle size?

| Option | Description | Selected |
|--------|-------------|----------|
| Tree-shaking with named imports (recommended) | Change from `import { Icon } from 'lucide-react'` to direct paths if needed. Most bundlers tree-shake automatically, but verify it's working. Low effort, good ROI. | ✓ |
| Inline SVGs for critical icons | Replace lucide-react with inline SVG for above-fold icons (menu, theme toggle, language switcher). Eliminates icon library from initial bundle, but more maintenance. | |
| Keep as-is and monitor | lucide-react is already optimized with tree-shaking. Only optimize if bundle analysis shows it's actually a problem. Don't prematurely optimize. | |
| You decide | Claude audits actual icon usage and bundle contribution, then chooses best approach. | |

**User's choice:** Tree-shaking with named imports (recommended)
**Notes:** Low-effort optimization to verify tree-shaking is working correctly. Catches any bundler misconfiguration without requiring code rewrites.

---

### Question 8: Should we audit and potentially replace next-intl/next-themes for smaller alternatives?

| Option | Description | Selected |
|--------|-------------|----------|
| Keep existing libraries (recommended) | next-intl and next-themes are battle-tested, well-maintained, and handle edge cases. Bundle cost (~50KB) is reasonable for functionality. Replacement would introduce risk and maintenance burden. | ✓ |
| Audit and consider alternatives | Research lighter i18n and theme libraries, benchmark bundle impact. May find smaller options, but migration cost and feature parity are risks. Only worth it if significantly over budget. | |
| You decide | Claude checks actual bundle contribution of these libraries and decides if optimization is warranted. | |

**User's choice:** Keep existing libraries (recommended)
**Notes:** Avoids premature optimization trap. Libraries are battle-tested and the ~50KB cost is reasonable for the functionality they provide. Focus optimization efforts on actual bottlenecks.

---

## Claude's Discretion

- Exact skeleton placeholder styling (as long as matches component dimensions and maintains theme compatibility)
- Specific dynamic import syntax and code-splitting boundaries
- Console log formatting for web-vitals output
- Build warning message text when bundle exceeds threshold
- Whether to create separate components for skeletons or inline them

---

## Summary

All four areas discussed with clear decisions captured. User selected balanced, pragmatic approaches:
- Bundle analysis on every build with warn-only enforcement
- Lazy loading for below-fold sections and conditional UI with skeleton placeholders
- web-vitals library integrated in root layout for Core Web Vitals measurement
- Tree-shaking verification for icons, keep existing i18n/theme libraries

Ready to proceed to planning phase.
