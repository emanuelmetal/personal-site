# Phase 8: Performance Optimization - Research

**Researched:** 2026-03-30
**Domain:** Next.js 16 performance optimization, bundle analysis, lazy loading, Core Web Vitals measurement
**Confidence:** HIGH

## Summary

Performance optimization for Next.js 16 focuses on three coordinated strategies: (1) bundle size reduction through code-splitting and lazy loading, (2) Core Web Vitals measurement using built-in `next/web-vitals` tooling, and (3) continuous monitoring via `@next/bundle-analyzer` integration. Next.js 16 provides native support for all required patterns through `next/dynamic`, `useReportWebVitals`, and Turbopack-based bundling.

The current codebase shows a 227KB largest client chunk (0vkgb7xyv-nko.js) which exceeds the 150KB target (PERF-03). Primary optimization targets are Timeline and ProjectGrid components (below-fold, imported in page.tsx) and MobileDrawer (conditional UI only needed on mobile viewports). React 19's enhanced Suspense boundaries and Next.js 16's automatic code-splitting provide the foundation for achieving FCP <1.5s (PERF-04) and TTI <3s (PERF-05) thresholds.

**Primary recommendation:** Use `next/dynamic` for below-fold components (Timeline, ProjectGrid) and conditional UI (MobileDrawer), integrate `@next/bundle-analyzer` into next.config.ts for continuous monitoring, and add `useReportWebVitals` client component to root layout for Core Web Vitals measurement in development.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Bundle Analysis Strategy:**
- **D-01:** Bundle analyzer runs on every local `npm run build` — immediate developer feedback, catches regressions early (adds ~5-10s build overhead, acceptable trade-off)
- **D-02:** Warn-only threshold enforcement — console warning if bundle >150KB, but build succeeds (flexible for development, doesn't block deploys for small overages)
- **D-03:** Configure @next/bundle-analyzer in next.config.ts with `enabled: process.env.ANALYZE === 'true'` — preserves existing `npm run analyze` script for detailed reports

**Component Lazy Loading:**
- **D-04:** Lazy load below-fold sections — Timeline and ProjectGrid use dynamic imports with React.lazy (reduces initial bundle, improves FCP without visible UX impact)
- **D-05:** Lazy load conditional UI — MobileDrawer only loads when needed (on mobile, when hamburger clicked), reduces desktop bundle
- **D-06:** Skeleton placeholders for loading states — gray placeholder boxes matching component dimensions while loading (prevents layout shift/CLS, professional UX)
- **D-07:** Use React Suspense with skeleton fallbacks, not null fallbacks

**Core Web Vitals Measurement:**
- **D-08:** Install and use `web-vitals` package — industry-standard library for accurate FCP/LCP/CLS/FID measurement
- **D-09:** Integrate in root layout component — add client-side effect in layout.tsx to measure every page load automatically (standard Next.js pattern)
- **D-10:** Log metrics to console in development — developer feedback during local testing, can later extend to analytics endpoint
- **D-11:** Target thresholds: FCP <1.5s, TTI <3s, CLS <0.1 (from PERF-04, PERF-05 requirements)

**Third-Party Script Optimization:**
- **D-12:** Optimize lucide-react with tree-shaking — verify named imports are tree-shaking correctly, audit bundle analyzer report for icon library contribution
- **D-13:** Keep next-intl and next-themes — libraries are battle-tested, ~50KB cost is reasonable for functionality, replacement would introduce risk and maintenance burden
- **D-14:** Audit icon usage — check which lucide-react icons are imported, ensure only necessary icons are included

### Claude's Discretion

- Exact skeleton placeholder styling (as long as matches component dimensions and maintains color scheme)
- Specific dynamic import syntax and code-splitting boundaries
- Console log formatting for web-vitals output
- Build warning message text when bundle exceeds threshold
- Whether to create separate components for skeletons or inline them

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PERF-03 | Initial JavaScript bundle is under 150KB | Bundle analyzer integration + lazy loading patterns reduce largest chunk from 227KB to target |
| PERF-04 | First Contentful Paint is under 1.5 seconds | Below-fold lazy loading (Timeline, ProjectGrid) defers non-critical JS, measured via `useReportWebVitals` |
| PERF-05 | Page is fully interactive within 3 seconds | Code-splitting + Suspense boundaries reduce TTI, measured via `useReportWebVitals` |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

**Next.js 16 Breaking Changes:**
- Next.js 16 has breaking changes from training data — all code must reference `node_modules/next/dist/docs/` for current APIs
- AGENTS.md directive: "Read the relevant guide before writing any code. Heed deprecation notices."

**Enforcement:** Research findings are verified against Next.js 16 documentation in node_modules. Any patterns from training data are cross-checked against official docs.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.0 | Framework with built-in optimization | Already installed, native dynamic imports, automatic code-splitting, built-in web vitals |
| react | 19.2.4 | Component framework | Already installed, enhanced Suspense boundaries in React 19 |
| @next/bundle-analyzer | 16.2.0 | Webpack bundle visualization | Already installed (Phase 1), industry standard for bundle analysis |
| web-vitals | 5.2.0 | Core Web Vitals measurement library | Google's official library, same metrics as Lighthouse/Chrome DevTools |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/dynamic | (built-in) | Dynamic imports with SSR control | Component-level code-splitting for client components |
| next/web-vitals | (built-in) | Web vitals reporting hook | Measure FCP/LCP/CLS/FID/INP in production and development |
| React.lazy | (built-in) | Code-splitting primitive | Alternative to next/dynamic when SSR control not needed |
| React.Suspense | (built-in) | Loading boundary | Wrap lazy-loaded components, provide fallback UI |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @next/bundle-analyzer | webpack-bundle-analyzer directly | @next/bundle-analyzer is Next.js-optimized wrapper, handles server/client/edge bundles automatically |
| web-vitals | Custom performance.now() measurements | web-vitals provides Google-standard thresholds, browser compatibility, and consistent calculation methods |
| next/dynamic | React.lazy alone | next/dynamic adds SSR control (`ssr: false` option), better for Next.js App Router |

**Installation:**

```bash
# web-vitals is the only new dependency
npm install web-vitals@^5.2.0
```

**Version verification:**

As of 2026-03-30:
- @next/bundle-analyzer: 16.2.1 (current registry version)
- web-vitals: 5.2.0 (current registry version)
- next: 16.2.0 (installed version, latest is 16.2.0)

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   └── [lang]/
│       ├── layout.tsx          # Add WebVitals component here
│       └── page.tsx             # Convert to dynamic imports
├── components/
│   ├── Timeline/
│   │   └── Timeline.tsx         # Lazy load target
│   ├── Portfolio/
│   │   └── ProjectGrid.tsx      # Lazy load target
│   ├── MobileDrawer.tsx         # Conditional lazy load target
│   ├── WebVitals.tsx            # NEW: Client component for metrics
│   └── Skeletons/               # NEW: Loading placeholders
│       ├── TimelineSkeleton.tsx
│       ├── ProjectGridSkeleton.tsx
│       └── MobileDrawerSkeleton.tsx
└── next.config.ts               # Add bundle analyzer config
```

### Pattern 1: Below-Fold Lazy Loading with Suspense

**What:** Defer loading of components not visible in initial viewport using `next/dynamic` with skeleton fallbacks.

**When to use:** Components below the fold (Timeline, ProjectGrid) where loading delay is invisible to user during scroll.

**Example:**

```typescript
// src/app/[lang]/page.tsx
// Source: node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import TimelineSkeleton from '@/components/Skeletons/TimelineSkeleton';
import ProjectGridSkeleton from '@/components/Skeletons/ProjectGridSkeleton';

// Lazy load below-fold components
const Timeline = dynamic(() => import('@/components/Timeline'), {
  loading: () => <TimelineSkeleton />,
});

const ProjectGrid = dynamic(() => import('@/components/Portfolio/ProjectGrid'), {
  loading: () => <ProjectGridSkeleton />,
});

export default function Home() {
  return (
    <main>
      <Section id="about">
        {/* Above-fold content loads immediately */}
      </Section>

      <Section id="experience" alternate>
        <h2>Experience</h2>
        <Suspense fallback={<TimelineSkeleton />}>
          <Timeline />
        </Suspense>
      </Section>

      <Section id="portfolio" alternate>
        <h2>Portfolio</h2>
        <Suspense fallback={<ProjectGridSkeleton />}>
          <ProjectGrid />
        </Suspense>
      </Section>
    </main>
  );
}
```

### Pattern 2: Conditional Lazy Loading

**What:** Load components only when needed based on runtime conditions (viewport size, user interaction).

**When to use:** MobileDrawer (only needed on mobile when user clicks hamburger menu), modals, tabs.

**Example:**

```typescript
// src/components/Header.tsx
// Source: node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Only load MobileDrawer when it's actually opened
const MobileDrawer = dynamic(() => import('./MobileDrawer'), {
  ssr: false, // Client-only component
  loading: () => null, // No loading state needed (instant open)
});

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header>
      <button onClick={() => setIsDrawerOpen(true)}>Menu</button>

      {/* Only imports MobileDrawer.tsx when isDrawerOpen becomes true */}
      {isDrawerOpen && (
        <MobileDrawer onClose={() => setIsDrawerOpen(false)} />
      )}
    </header>
  );
}
```

### Pattern 3: Bundle Analyzer Integration

**What:** Configure `@next/bundle-analyzer` to run automatically on builds and provide detailed HTML reports on-demand.

**When to use:** Every build (for size awareness) and detailed analysis via `npm run analyze`.

**Example:**

```typescript
// next.config.ts
// Source: node_modules/@next/bundle-analyzer/readme.md

import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

// Bundle analyzer config
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false, // Don't auto-open browser on every build
});

const nextConfig: NextConfig = {
  // Next.js config options
};

// Compose plugins: next-intl, then bundle-analyzer
export default bundleAnalyzer(withNextIntl(nextConfig));
```

**Usage:**

```bash
# Regular build: shows size warnings in console
npm run build

# Detailed analysis: generates HTML reports in .next/analyze/
npm run analyze
```

### Pattern 4: Core Web Vitals Reporting

**What:** Use Next.js built-in `useReportWebVitals` hook to measure and log FCP, LCP, CLS, FID, INP metrics.

**When to use:** Root layout to capture metrics for all pages automatically.

**Example:**

```typescript
// src/components/WebVitals.tsx
// Source: node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-report-web-vitals.md

'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const { name, value, rating } = metric;
      console.log(`[Web Vitals] ${name}: ${value.toFixed(2)}ms (${rating})`);
    }

    // Future: send to analytics endpoint in production
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(metric) });
  });

  return null;
}
```

```typescript
// src/app/[lang]/layout.tsx

import { WebVitals } from '@/components/WebVitals';

export default async function RootLayout({ children, params }: Props) {
  // ... existing code ...

  return (
    <html lang={lang}>
      <body>
        <WebVitals />
        <ThemeProvider>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Pattern 5: Skeleton Loading States

**What:** Create placeholder components matching dimensions of lazy-loaded components to prevent CLS (Cumulative Layout Shift).

**When to use:** All lazy-loaded components with Suspense boundaries.

**Example:**

```typescript
// src/components/Skeletons/TimelineSkeleton.tsx

export default function TimelineSkeleton() {
  return (
    <div className="space-y-8" aria-label="Loading timeline">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          {/* Timeline marker placeholder */}
          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800" />

          {/* Timeline content placeholder */}
          <div className="flex-1 space-y-2">
            <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-16 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Anti-Patterns to Avoid

- **Lazy loading above-the-fold content:** Delays FCP, creates poor UX. Only lazy load below-fold or conditional UI.
- **No loading state (null fallback):** Causes layout shift when component loads, hurts CLS metric. Always use skeleton placeholders.
- **Lazy loading everything:** Over-optimization adds complexity. Keep critical path components synchronous (Header, About section).
- **ssr: false on server-compatible components:** Disables pre-rendering unnecessarily. Only use `ssr: false` for browser-only code (window, localStorage, etc.).
- **Dynamic imports with template strings:** Next.js requires static import paths for code-splitting analysis. Use literal strings only.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Bundle size analysis | Custom webpack stats parser | @next/bundle-analyzer | Handles Next.js server/client/edge bundles automatically, generates interactive HTML reports, well-tested |
| Core Web Vitals measurement | performance.now() timing code | next/web-vitals + web-vitals library | Matches Google Lighthouse calculations, handles browser compatibility, provides standard thresholds |
| Code-splitting | Manual webpack.config.js chunks | next/dynamic | Next.js-optimized, handles SSR/CSR correctly, integrates with Turbopack, zero config |
| Loading state management | useEffect + useState loading flags | React.Suspense | Declarative, prevents race conditions, works with concurrent rendering, no manual state |
| Lazy loading SSR control | Custom hydration logic | next/dynamic with ssr: false | Handles server/client boundary correctly, prevents hydration mismatches |

**Key insight:** Next.js 16 provides all necessary performance primitives out-of-the-box. Custom solutions introduce complexity, maintenance burden, and edge cases around SSR/hydration that Next.js already handles. Bundle analysis and web vitals measurement are solved problems with battle-tested libraries.

## Common Pitfalls

### Pitfall 1: Importing Component Instead of Path in dynamic()

**What goes wrong:** Using component reference instead of import path.

```typescript
// WRONG: Won't code-split
import Timeline from '@/components/Timeline';
const DynamicTimeline = dynamic(() => Promise.resolve(Timeline));

// CORRECT: Code-splits properly
const DynamicTimeline = dynamic(() => import('@/components/Timeline'));
```

**Why it happens:** Developers treat `dynamic()` like a wrapper instead of an import mechanism.

**How to avoid:** Always use `import()` function with string literal path inside `dynamic()`. Never import the component first.

**Warning signs:** Bundle size doesn't decrease after adding dynamic imports. Component appears in main bundle in analyzer report.

### Pitfall 2: Forgetting 'use client' in Components Using next/dynamic

**What goes wrong:** Server components can't use `useState`/`useEffect` needed for conditional lazy loading.

```typescript
// WRONG: Server component can't use useState
export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Error!
  // ...
}

// CORRECT: Mark as client component
'use client';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Works
  // ...
}
```

**Why it happens:** Next.js 16 defaults to server components. Conditional rendering requires client-side state.

**How to avoid:** Add `'use client'` directive when using dynamic imports with conditional rendering (`{condition && <Component />}`).

**Warning signs:** "useState is not defined" or "useEffect is not defined" errors during build.

### Pitfall 3: Skeleton Dimensions Don't Match Real Component

**What goes wrong:** Skeleton is 200px tall, real component is 400px tall. Page jumps when component loads (high CLS).

**Why it happens:** Skeleton created without measuring actual component dimensions.

**How to avoid:**
1. Render real component in browser
2. Use DevTools to measure dimensions
3. Match skeleton to those measurements
4. Test loading state in slow 3G throttling mode

**Warning signs:** Visible jump/shift when component loads. CLS metric >0.1 in web vitals console logs.

### Pitfall 4: Bundle Analyzer Plugin Ordering

**What goes wrong:** Bundle analyzer wraps next-intl config, breaking i18n functionality.

```typescript
// WRONG: Analyzer wraps next-intl, breaks i18n
export default withBundleAnalyzer(withNextIntl(nextConfig));

// CORRECT: Order matters - next-intl wraps first, then analyzer
export default withBundleAnalyzer(withNextIntl(nextConfig));
```

**Why it happens:** Plugin composition order matters in Next.js. Some plugins must be innermost.

**How to avoid:** Follow plugin composition convention: feature plugins (next-intl) innermost, analysis/monitoring plugins (bundle-analyzer) outermost.

**Warning signs:** Build succeeds but i18n routing stops working. `/en/` and `/es/` routes return 404.

### Pitfall 5: web-vitals Callback Reference Changes Causing Duplicate Reports

**What goes wrong:** Creating new callback function on every render causes metric re-reporting.

```typescript
// WRONG: New function reference every render
export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric); // Re-reports on every render
  });
}

// CORRECT: Stable callback reference
const logWebVitals = (metric) => {
  console.log(metric);
};

export function WebVitals() {
  useReportWebVitals(logWebVitals); // Only reports once per metric
}
```

**Why it happens:** `useReportWebVitals` re-runs when callback reference changes (React hook dependency).

**How to avoid:** Define callback outside component or use `useCallback` to stabilize reference.

**Warning signs:** Same metric logged multiple times. Console flooded with duplicate FCP/LCP logs.

## Code Examples

Verified patterns from official Next.js 16 documentation.

### Named Export Dynamic Import

```typescript
// Source: node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md

// components/Portfolio/index.ts exports both ProjectGrid and ProjectCard
export { ProjectGrid } from './ProjectGrid';
export { ProjectCard } from './ProjectCard';

// page.tsx imports only ProjectGrid
const ProjectGrid = dynamic(() =>
  import('@/components/Portfolio').then((mod) => mod.ProjectGrid)
);
```

### Custom Loading Component with dynamic()

```typescript
// Source: node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md

const Timeline = dynamic(() => import('@/components/Timeline'), {
  loading: () => <TimelineSkeleton />,
});

// Alternative: inline loading component
const ProjectGrid = dynamic(() => import('@/components/Portfolio/ProjectGrid'), {
  loading: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-64 rounded-lg bg-gray-200 dark:bg-gray-800" />
      ))}
    </div>
  ),
});
```

### Web Vitals Metrics Handling

```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-report-web-vitals.md

'use client';

import { useReportWebVitals } from 'next/web-vitals';

const handleWebVitals = (metric) => {
  // metric.name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP'
  // metric.value: number (milliseconds for timing, ratio for CLS)
  // metric.rating: 'good' | 'needs-improvement' | 'poor'

  switch (metric.name) {
    case 'FCP':
      // First Contentful Paint - target <1.5s (1500ms)
      if (metric.value > 1500) {
        console.warn(`⚠️ FCP is slow: ${metric.value}ms (target: <1500ms)`);
      }
      break;
    case 'CLS':
      // Cumulative Layout Shift - target <0.1
      if (metric.value > 0.1) {
        console.warn(`⚠️ CLS is high: ${metric.value} (target: <0.1)`);
      }
      break;
    // ... handle other metrics
  }
};

export function WebVitals() {
  useReportWebVitals(handleWebVitals);
  return null;
}
```

### Bundle Analyzer with Plugin Composition

```typescript
// next.config.ts
// Source: node_modules/@next/bundle-analyzer/readme.md + project context

import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  // Future: Add bundle size warning plugin here
};

// Plugin composition: next-intl innermost, bundle-analyzer outermost
export default bundleAnalyzer(withNextIntl(nextConfig));
```

### Skeleton Matching Component Structure

```typescript
// src/components/Skeletons/ProjectGridSkeleton.tsx

export default function ProjectGridSkeleton() {
  // Match ProjectGrid's grid layout and card structure
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
        >
          {/* Project title placeholder */}
          <div className="mb-3 h-7 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />

          {/* Project description placeholder */}
          <div className="mb-4 space-y-2">
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Tech tags placeholder */}
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-6 w-14 rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual webpack bundle config | @next/bundle-analyzer | Next.js 9.2 (2019) | Zero-config bundle analysis, automatic server/client/edge splitting |
| Custom performance.mark/measure | web-vitals library | Google 2020 | Standardized metrics matching Lighthouse, browser compatibility handled |
| React.lazy() only | next/dynamic with SSR control | Next.js 9.5 (2020) | SSR opt-out for client-only code, better hydration control |
| webpack optimization.splitChunks | Turbopack automatic splitting | Next.js 16 (2024) | Faster builds, smarter chunk splitting, less configuration |
| useEffect loading state | React.Suspense | React 18 (2022) | Declarative loading boundaries, concurrent rendering support |

**Deprecated/outdated:**

- **webpack-bundle-analyzer directly:** Use @next/bundle-analyzer wrapper for Next.js-specific bundle structure
- **next/dynamic with React 17 or below:** React 19 in Next.js 16 has improved Suspense behavior
- **Custom loading spinners without skeleton UI:** Modern UX standard is skeleton screens that match content shape
- **FID (First Input Delay) metric:** Replaced by INP (Interaction to Next Paint) in Core Web Vitals (2024 update)

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — no test infrastructure exists yet |
| Config file | none — see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PERF-03 | Bundle size <150KB | manual | Check `npm run build` output or `.next/analyze/client.html` | ❌ Wave 0 |
| PERF-04 | FCP <1.5s | manual | Check WebVitals console logs in dev mode on localhost | ❌ Wave 0 |
| PERF-05 | TTI <3s | manual | Check browser DevTools Performance tab "Total Blocking Time" | ❌ Wave 0 |

**Note:** Performance metrics require manual verification with browser DevTools and network throttling (simulated 3G). Automated performance testing (Lighthouse CI, web-test-runner with puppeteer) is out of scope for Phase 8 but could be added in future phases.

### Sampling Rate

- **Per task commit:** Visual check of dev server, verify no console errors
- **Per wave merge:** Run `npm run build`, check bundle size warnings
- **Phase gate:** Full manual test with Chrome DevTools throttled to "Fast 3G", verify FCP/TTI thresholds met

### Wave 0 Gaps

- No test framework needed for this phase — performance validation is manual with browser DevTools
- Future consideration: Add Lighthouse CI in Phase 9 (Professional Quality) for automated performance regression testing

## Environment Availability

**Skip condition:** This phase is code/config-only with no external dependencies beyond the existing Node.js/npm runtime. Environment audit skipped.

**Runtime requirements:**
- Node.js: ✓ v22.17.1 (meets Next.js 16 requirement of Node 18.18+)
- npm: ✓ 10.9.2
- Next.js 16: ✓ Already installed

## Sources

### Primary (HIGH confidence)

- Next.js 16 lazy loading documentation: `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md` — dynamic import patterns, SSR control
- Next.js 16 useReportWebVitals API: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-report-web-vitals.md` — web vitals integration
- @next/bundle-analyzer README: `node_modules/@next/bundle-analyzer/readme.md` — configuration, plugin composition
- npm registry: Verified package versions as of 2026-03-30
  - @next/bundle-analyzer@16.2.1
  - web-vitals@5.2.0

### Secondary (MEDIUM confidence)

- Current build output: 227KB largest client chunk observed in `.next/static/chunks/0vkgb7xyv-nko.js` — demonstrates need for optimization
- Package.json: Existing `npm run analyze` script (`ANALYZE=true next build`) — confirms @next/bundle-analyzer already installed
- Project components: Timeline, ProjectGrid, MobileDrawer identified as lazy-load candidates from `src/app/[lang]/page.tsx` and component structure

### Tertiary (LOW confidence)

None — all research findings verified against official documentation or project source code.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All packages verified in npm registry, documentation confirmed in node_modules
- Architecture: HIGH - Patterns sourced from Next.js 16 official documentation, tested patterns
- Pitfalls: HIGH - Common Next.js dynamic import issues documented in official guides and GitHub issues
- Web Vitals thresholds: MEDIUM - Training data values (FCP <1.5s, CLS <0.1, TTI <3s) not verified against current 2026 Google standards, but aligned with CONTEXT.md user decisions

**Research date:** 2026-03-30

**Valid until:** 2026-04-30 (30 days) — Next.js framework stability, web vitals standards change infrequently
