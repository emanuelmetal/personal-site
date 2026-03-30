# Phase 8: Performance Optimization - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Optimize bundle size and meet Core Web Vitals thresholds (FCP <1.5s, TTI <3s, CLS <0.1) to ensure fast loading and professional credibility. This phase addresses PERF-03 (bundle under 150KB), PERF-04 (FCP under 1.5s), and PERF-05 (TTI under 3s).

</domain>

<decisions>
## Implementation Decisions

### Bundle Analysis Strategy
- **D-01:** Bundle analyzer runs on every local `npm run build` — immediate developer feedback, catches regressions early (adds ~5-10s build overhead, acceptable trade-off)
- **D-02:** Warn-only threshold enforcement — console warning if bundle >150KB, but build succeeds (flexible for development, doesn't block deploys for small overages)
- **D-03:** Configure @next/bundle-analyzer in next.config.ts with `enabled: process.env.ANALYZE === 'true'` — preserves existing `npm run analyze` script for detailed reports

### Component Lazy Loading
- **D-04:** Lazy load below-fold sections — Timeline and ProjectGrid use dynamic imports with React.lazy (reduces initial bundle, improves FCP without visible UX impact)
- **D-05:** Lazy load conditional UI — MobileDrawer only loads when needed (on mobile, when hamburger clicked), reduces desktop bundle
- **D-06:** Skeleton placeholders for loading states — gray placeholder boxes matching component dimensions while loading (prevents layout shift/CLS, professional UX)
- **D-07:** Use React Suspense with skeleton fallbacks, not null fallbacks

### Core Web Vitals Measurement
- **D-08:** Install and use `web-vitals` package — industry-standard library for accurate FCP/LCP/CLS/FID measurement
- **D-09:** Integrate in root layout component — add client-side effect in layout.tsx to measure every page load automatically (standard Next.js pattern)
- **D-10:** Log metrics to console in development — developer feedback during local testing, can later extend to analytics endpoint
- **D-11:** Target thresholds: FCP <1.5s, TTI <3s, CLS <0.1 (from PERF-04, PERF-05 requirements)

### Third-Party Script Optimization
- **D-12:** Optimize lucide-react with tree-shaking — verify named imports are tree-shaking correctly, audit bundle analyzer report for icon library contribution
- **D-13:** Keep next-intl and next-themes — libraries are battle-tested, ~50KB cost is reasonable for functionality, replacement would introduce risk and maintenance burden
- **D-14:** Audit icon usage — check which lucide-react icons are imported, ensure only necessary icons are included

### Claude's Discretion
- Exact skeleton placeholder styling (as long as matches component dimensions and maintains color scheme)
- Specific dynamic import syntax and code-splitting boundaries
- Console log formatting for web-vitals output
- Build warning message text when bundle exceeds threshold
- Whether to create separate components for skeletons or inline them

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Foundation
- `.planning/phases/01-project-setup-foundation/01-CONTEXT.md` — Next.js 16 setup, next/image and next/font already optimized (PERF-01, PERF-02 complete), @next/bundle-analyzer already installed
- `.planning/phases/02-layout-navigation/02-CONTEXT.md` — Header, MobileDrawer, Section components structure, responsive breakpoints
- `.planning/phases/03-theme-system/03-CONTEXT.md` — Dark mode implementation, ThemeToggle component
- `.planning/phases/04-internationalization/04-CONTEXT.md` — next-intl setup, LanguageSwitcher component
- `.planning/phases/06-experience-timeline/06-CONTEXT.md` — Timeline and TimelineItem components (candidates for lazy loading)
- `.planning/phases/07-portfolio-showcase/07-CONTEXT.md` — ProjectGrid and ProjectCard components (candidates for lazy loading)

### Existing Code
- `next.config.ts` — Current Next.js configuration, where bundle analyzer will be integrated
- `package.json` — Dependencies including @next/bundle-analyzer (already installed), existing `npm run analyze` script
- `src/app/[lang]/layout.tsx` — Root layout where web-vitals reporting will be integrated
- `src/app/[lang]/page.tsx` — Main page importing Timeline and ProjectGrid (will become dynamic imports)
- `src/components/Timeline/Timeline.tsx` — Below-fold component to lazy load
- `src/components/Portfolio/ProjectGrid.tsx` — Below-fold component to lazy load
- `src/components/MobileDrawer.tsx` — Conditional component to lazy load

### Project Requirements
- `.planning/REQUIREMENTS.md` — PERF-03 (bundle <150KB), PERF-04 (FCP <1.5s), PERF-05 (TTI <3s)
- `.planning/PROJECT.md` — Modern corporate aesthetic, professional credibility, Vercel deployment target

### External Documentation
- Next.js Dynamic Imports: `node_modules/next/dist/docs/app/building-your-application/optimizing/lazy-loading.md` (if exists)
- React.lazy and Suspense patterns for code splitting
- web-vitals library documentation for metric collection

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **@next/bundle-analyzer:** Already installed in package.json devDependencies, just needs configuration in next.config.ts
- **npm run analyze script:** Existing script in package.json (`ANALYZE=true next build`), will be activated by bundle analyzer config
- **Dynamic import support:** Next.js 16 has built-in React.lazy and dynamic import support, no additional setup needed
- **Suspense boundaries:** Can use React Suspense for lazy-loaded components with fallback UI

### Established Patterns
- **Component organization:** All components in `src/components/`, clear file structure for lazy loading targets
- **Client components:** Header, MobileDrawer, ThemeToggle, LanguageSwitcher all use 'use client' directive, understand client-side patterns
- **Build scripts:** Existing pattern of environment variable-based build modes (ANALYZE=true), consistent with bundle analyzer approach
- **Dark mode classes:** Skeleton placeholders should use `bg-gray-200 dark:bg-gray-800` pattern for theme compatibility

### Integration Points
- Bundle analyzer integrates into next.config.ts alongside existing next-intl plugin (plugin composition)
- Dynamic imports replace static imports in page.tsx for Timeline and ProjectGrid components
- web-vitals reporting added as client component effect in layout.tsx (need 'use client' wrapper or separate component)
- Skeleton components created as simple placeholder divs matching Timeline and ProjectGrid dimensions
- MobileDrawer lazy load needs conditional import logic (only on mobile viewport)

### Current Bundle State
- Build output shows multiple chunks: largest visible chunk is ~222KB (0vkgb7xyv-nko.js), needs investigation
- Total .next directory: 236MB (includes all static assets, not just JS bundles)
- No current bundle size monitoring or warnings in place
- React 19, Next.js 16, and Tailwind 4 are already performance-optimized by default

</code_context>

<specifics>
## Specific Ideas

- Bundle analyzer on every build (not just manual `npm run analyze`) ensures regressions are caught immediately during development, not later in PR review
- Warn-only threshold is pragmatic — enforces budget without blocking legitimate temporary overages during refactoring
- Below-fold lazy loading (Timeline, ProjectGrid) has zero UX downside since user can't see them until they scroll anyway
- MobileDrawer lazy load is a win on desktop (majority of traffic) where drawer is never opened
- Skeleton placeholders prevent CLS (Cumulative Layout Shift) which is one of the Core Web Vitals metrics we're targeting
- web-vitals library is the same one used by Lighthouse and Chrome DevTools, ensures measurement consistency
- lucide-react icons are typically well-optimized with tree-shaking, but verifying this catches any misconfiguration
- Keeping next-intl and next-themes avoids "premature optimization" trap — they're not the bottleneck, bundle size is

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-performance-optimization*
*Context gathered: 2026-03-30*
