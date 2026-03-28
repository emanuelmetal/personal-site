# Phase 7: Portfolio Showcase - Research

**Researched:** 2026-03-28
**Domain:** React component composition, responsive grid layouts, card design patterns, i18n content structures
**Confidence:** HIGH

## Summary

Portfolio showcase implementation follows established patterns from existing Skills and Timeline sections. The phase involves creating two new components (ProjectGrid and ProjectCard) that consume static project data from translation files, display project cards in a 2-column responsive grid, and render action buttons for external links. All necessary infrastructure (Section component, translation system, responsive patterns, badge styling) exists from previous phases.

**Primary recommendation:** Use server-side components (default) with translation data from JSON files, mirror Timeline's component structure (container + item pattern), leverage existing badge and grid patterns from Skills section, and apply professional card styling with shadow utilities and hover states.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Project Selection**
- D-01: Showcase exactly 4 projects (not 3-5)
- D-02: Project content provided by user with complete details
- D-03: Store project data in translation files (portfolio.projects array)

**Project Content (4 projects in reverse chronological order)**
- D-04: Project 1: Agoda's white labeling themes (ReactJS, Typescript, Tailwind, .NET) — 2 live URLs
- D-05: Project 2: Rocket Travel AAdvantage (ReactJS, Typescript, ChakraUI) — 2 live URLs
- D-06: Project 3: N95 Project (React, Typescript, Vtex.io) — 1 live URL
- D-07: Project 4: Alix Partners Survey (ReactJS, NodeJS, Typescript, MaterialUI) — GitHub only

**Visual Layout**
- D-08: 2-column grid on desktop (lg breakpoint), 1-column on mobile
- D-09: Cards with shadow styling (Material Design inspired)
- D-10: Rounded corners on cards

**Tech Stack Display**
- D-11: Reuse Skills badge style (rounded badges)
- D-12: Single neutral color for all portfolio tech badges (gray-based)
- D-13: Tech badges below description, above action buttons

**Project Links**
- D-14: Show available links only (View Project for live, View Code for GitHub)
- D-15: No buttons for projects without links
- D-16: External links open in new tabs (target="_blank" rel="noopener noreferrer")
- D-17: Outline/ghost button style (border + colored text, transparent background)

**Content Ordering**
- D-18: Reverse chronological order (Agoda → Rocket Travel → N95 → Alix Partners)

### Claude's Discretion
- Exact shadow depth and blur values for cards
- Button border color and hover states
- Neutral color choice for tech badges (gray-based within theme)
- Card padding and internal spacing
- Gap size between grid items
- Tech badge size and spacing

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PORT-01 | User can view showcase of professional projects | Component patterns from Timeline, grid patterns from Skills, translation system from next-intl enable static project showcase with 4 projects from translation files |
| PORT-02 | Each project displays title, description, and technologies used | TypeScript interfaces for type-safe props, badge patterns from Skills section for tech stack display, existing typography patterns (h3 for title, p for description) |
| PORT-03 | User can access project links (live demo or repository where available) | lucide-react icons (ExternalLink, Code), external link pattern from Contact section (target="_blank" rel="noopener noreferrer"), conditional rendering for available links only |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

**Next.js Version Warning:**
- Next.js 16 has breaking changes from training data
- Must read relevant guides in `node_modules/next/dist/docs/` before writing code
- Heed deprecation notices

**Enforcement:**
- Research recommendations align with Next.js 16 patterns (server components by default, no "use client" needed for static content)
- Component patterns follow React 19 conventions (function components, TypeScript interfaces)
- No assumptions about APIs from training data — all patterns verified against current documentation

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.4 | UI framework | Latest stable, function components with hooks are recommended approach |
| Next.js | 16.2.1 | React framework | Server components by default, optimized for static content like portfolios |
| TypeScript | 5.x | Type safety | Strict mode enabled in project, interfaces for component props |
| Tailwind CSS | 4.2.2 | Styling | Utility-first, responsive grid and shadow utilities, CSS variables via @theme |
| next-intl | 4.8.3 | Internationalization | Already integrated, useTranslations hook for bilingual content |
| lucide-react | 1.7.0 | Icons | Already imported, consistent icon system (ExternalLink, Code icons) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 | Conditional classes | Dynamic class composition if needed for button states |
| tailwind-merge | 3.5.0 | Merge Tailwind classes | Avoid class conflicts if composing utilities |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static JSON data | Database/CMS | JSON sufficient for 4 projects, avoids infrastructure complexity |
| Server components | Client components | Server components faster (no JS bundle), client only if interactivity needed |
| Tailwind shadow utilities | CSS custom shadows | Tailwind provides consistent design system, custom CSS adds maintenance burden |

**Installation:**
```bash
# All dependencies already installed in project
npm list react next tailwindcss next-intl lucide-react
```

**Version verification:** Verified 2026-03-28 via npm view and package.json
- React 19.2.4 (latest stable as of 2026-03-28)
- Next.js 16.2.1 (latest stable as of 2026-03-28)
- Tailwind CSS 4.2.2 (latest stable as of 2026-03-28)
- lucide-react 1.7.0 (latest stable as of 2026-03-28)

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── Portfolio/
│   │   ├── ProjectGrid.tsx        # Container component (maps projects)
│   │   └── ProjectCard.tsx        # Item component (displays single project)
│   └── Section.tsx                # Existing wrapper component
├── app/[lang]/
│   └── page.tsx                   # Portfolio section integration
messages/
├── en.json                        # Project data (EN)
└── es.json                        # Project data (ES)
```

### Pattern 1: Server Component with Translation Data
**What:** Use Next.js server components (default) to render static project data from translation files
**When to use:** Portfolio content is static, no client-side interactivity required
**Example:**
```typescript
// Source: Next.js 16 official docs (verified 2026-03-28)
// Server component (default, no "use client" directive)
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  alternateUrl?: string;
  repoUrl?: string;
}

export default function ProjectGrid() {
  const t = useTranslations('portfolio');
  const projects = t.raw('projects') as Project[];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={`${project.name}-${index}`} project={project} />
      ))}
    </div>
  );
}
```

### Pattern 2: Responsive Grid Layout
**What:** 1-column mobile, 2-column desktop grid using Tailwind utilities
**When to use:** Displaying 4 project cards with balanced layout
**Example:**
```typescript
// Source: Tailwind CSS 4 official docs (verified 2026-03-28)
// Grid container with responsive columns
<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
  {/* 4 cards = 2 rows × 2 columns on desktop, 4 rows × 1 column on mobile */}
</div>
```

### Pattern 3: Professional Card Design
**What:** Shadow styling with rounded corners, hover states, and structured content hierarchy
**When to use:** Project cards requiring visual depth and interactivity
**Example:**
```typescript
// Source: Tailwind CSS 4 shadow utilities (verified 2026-03-28)
<div className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
  {/* Card content */}
</div>
```

### Pattern 4: Conditional Link Rendering
**What:** Display action buttons only for available links, handle multiple demo URLs
**When to use:** Projects have varying link availability (demo only, code only, both, or neither)
**Example:**
```typescript
// Source: React 19 patterns, Contact section implementation
{project.demoUrl && (
  <a
    href={project.demoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
    aria-label={`View ${project.name} live demo`}
  >
    <ExternalLink className="h-4 w-4" />
    <span>{t('viewProject')}</span>
  </a>
)}
```

### Anti-Patterns to Avoid
- **Client component for static content:** No interactivity needed, server components render faster
- **Inline project data in component:** Breaks i18n, violates content-in-translations decision (D-03)
- **Fixed grid columns on mobile:** Single column required for readability on small screens (D-08)
- **Category colors for tech badges:** Causes confusion with Skills section, use neutral gray (D-12)
- **Missing accessibility attributes:** External links need aria-labels, color-only meaning fails WCAG AA

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon library | Custom SVG components for each icon | lucide-react (already installed) | Consistent sizing, accessibility, tree-shakeable, 1000+ icons |
| Responsive grid | Media queries in CSS | Tailwind grid utilities | Declarative, mobile-first, less code, design system consistency |
| Shadow styles | Custom CSS box-shadow values | Tailwind shadow utilities | Predefined depth hierarchy, dark mode support, consistent across cards |
| External link security | target="_blank" without rel | rel="noopener noreferrer" pattern | Prevents tabnabbing vulnerability, established pattern in Contact section |
| Translation switching | Custom i18n logic | next-intl useTranslations hook | Server-side rendering, type-safe keys, nested object support, already integrated |
| Conditional classes | String concatenation | clsx or tailwind-merge | Prevents class conflicts, cleaner syntax, null/undefined handling |

**Key insight:** Portfolio showcase leverages 6 phases of infrastructure. Reusing patterns from Skills (badges), Timeline (component structure), Contact (external links), Theme (dark mode), and Layout (responsive grid) avoids 90% of custom code. The "build from scratch" trap wastes time reimplementing solutions that exist and are tested.

## Common Pitfalls

### Pitfall 1: Using Client Components Unnecessarily
**What goes wrong:** Adding "use client" directive to ProjectGrid/ProjectCard when no interactivity exists, increasing bundle size and slowing initial render
**Why it happens:** Assumption that all React components need client-side JavaScript, training data bias toward client rendering
**How to avoid:** Server components are default in Next.js 16. Only use "use client" when component needs browser APIs, event handlers, or React hooks (useState, useEffect). Static content like portfolio projects should be server-rendered.
**Warning signs:** Component has "use client" but no onClick, useState, useEffect, or browser API usage

### Pitfall 2: Breaking i18n with Hardcoded Content
**What goes wrong:** Putting project names, descriptions, or tech stacks directly in components instead of translation files, causing Spanish version to display English content
**Why it happens:** Convenience trap — faster to hardcode than structure translation JSON
**How to avoid:** All user-facing text MUST come from en.json/es.json via useTranslations hook. Project data belongs in portfolio.projects array, not component files.
**Warning signs:** Strings in JSX that aren't wrapped in {t('key')}, Spanish site shows English content

### Pitfall 3: Accessibility Violations on External Links
**What goes wrong:** Links missing rel="noopener noreferrer" (security), insufficient color contrast (WCAG AA), or no aria-labels for screen readers
**Why it happens:** Visual-only design thinking, forgetting target="_blank" security implications
**How to avoid:** Every external link needs (1) target="_blank" rel="noopener noreferrer", (2) aria-label describing destination, (3) 4.5:1 contrast ratio for button text. Use existing Contact section pattern as template.
**Warning signs:** External links without rel attribute, buttons with only icon (no text), gray text on gray background

### Pitfall 4: Grid Layout Breaking on Mobile
**What goes wrong:** Forcing 2-column layout on small screens, causing horizontal scroll or unreadable card widths
**Why it happens:** Desktop-first development, testing only in wide viewport
**How to avoid:** Mobile-first approach — start with grid-cols-1, add lg:grid-cols-2 for desktop. Test at 320px width (iPhone SE), 768px (iPad), and 1440px (desktop).
**Warning signs:** Horizontal scrollbar on mobile, cards narrower than 280px, text wrapping issues

### Pitfall 5: Inconsistent Badge Styling Across Sections
**What goes wrong:** Portfolio tech badges look different from Skills section badges (size, padding, color), breaking visual cohesion
**Why it happens:** Not reviewing existing code, creating badge styles from scratch
**How to avoid:** Copy Skills badge pattern (inline-block rounded-full px-3 py-1.5 text-sm font-medium) but change color to neutral gray (D-12). Same structure, different color scheme.
**Warning signs:** Portfolio badges larger/smaller than Skills badges, different border radius, category colors instead of neutral

### Pitfall 6: Handling Multiple Demo URLs Incorrectly
**What goes wrong:** Project 1 (Agoda) has 2 demo URLs (alternateUrl field) but only first URL displayed, losing access to Citibank example
**Why it happens:** Assuming one demoUrl per project, not checking translation file structure
**How to avoid:** Check if project has alternateUrl field. If yes, display second "View Demo" button or dropdown menu. Document decision in PLAN.md for planner.
**Warning signs:** Agoda project shows only ANA Hotel link, Citibank link inaccessible, unused alternateUrl field in JSON

## Code Examples

Verified patterns from official sources and existing codebase:

### Responsive Grid Container
```typescript
// Source: Tailwind CSS 4 docs + existing Skills section (page.tsx line 23)
<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
  {projects.map((project) => (
    <ProjectCard key={project.name} project={project} />
  ))}
</div>
```

### Professional Card with Shadow
```typescript
// Source: Tailwind CSS 4 shadow utilities + Material Design principles
<div className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
  {/* Title */}
  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
    {project.name}
  </h3>

  {/* Description */}
  <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
    {project.description}
  </p>

  {/* Tech badges */}
  <div className="mt-4 flex flex-wrap gap-2">
    {project.technologies.map((tech) => (
      <span
        key={tech}
        className="inline-block rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
      >
        {tech}
      </span>
    ))}
  </div>
</div>
```

### External Link Button (Outline Style)
```typescript
// Source: Contact section pattern (page.tsx line 132-150) + Tailwind utilities
import { ExternalLink, Code } from 'lucide-react';

// View Project button (demo URL)
<a
  href={project.demoUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
  aria-label={`View ${project.name} live demo`}
>
  <ExternalLink className="h-4 w-4" />
  <span>{t('viewProject')}</span>
</a>

// View Code button (GitHub URL)
<a
  href={project.repoUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-600 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-900"
  aria-label={`View ${project.name} source code on GitHub`}
>
  <Code className="h-4 w-4" />
  <span>{t('viewCode')}</span>
</a>
```

### TypeScript Interface for Type Safety
```typescript
// Source: React 19 docs + Timeline component pattern
interface Project {
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  alternateUrl?: string;  // For projects with multiple live URLs
  repoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('portfolio');
  // Component implementation
}
```

### Translation File Structure
```json
// Source: Existing en.json structure + CONTEXT.md D-03
{
  "portfolio": {
    "heading": "Portfolio",
    "viewProject": "View Project",
    "viewCode": "View Code",
    "projects": [
      {
        "name": "Agoda's white labeling themes",
        "description": "As part of the Rocket Travel integration to Agoda's stack, the know-how of whitelabeling was implemented in Agoda's reservation site, with clients such as All Nippon Airlines and Citibank",
        "technologies": ["ReactJS", "Typescript", "Tailwind", ".NET"],
        "demoUrl": "https://www.anaworldhotel.com/",
        "alternateUrl": "https://www.citi.com/citi-partner/cititravel/login"
      },
      {
        "name": "Rocket Travel AAdvantage Client Integration",
        "description": "Creation of the white-label site and UI adjustments for the American Airlines miles program.",
        "technologies": ["ReactJS", "Typescript", "ChakraUI"],
        "demoUrl": "https://www.aadvantagehotels.com/",
        "alternateUrl": "https://search.rocketmiles.com/"
      },
      {
        "name": "N95 Project",
        "description": "N95 community buying site for covid essentials, the very early e-commerce site was implemented with Vtex.IO and React components.",
        "technologies": ["React", "Typescript", "Vtex.io"],
        "demoUrl": "https://www.projectn95.org/"
      },
      {
        "name": "Alix Partners Corporate Survey",
        "description": "Creation of a survey wizard for different department directors for Alix Partners",
        "technologies": ["ReactJS", "NodeJS", "Typescript", "MaterialUI"],
        "repoUrl": "https://github.com/emanuelmetal/alix-survey-project"
      }
    ]
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Client-side rendering by default | Server components by default | Next.js 13+ (2023) | Faster initial loads, smaller bundles, better SEO — portfolio content should be server-rendered |
| Page-level data fetching | Component-level data fetching | Next.js 13+ (2023) | Co-locate data with components, useTranslations works in server components |
| CSS-in-JS (styled-components) | Tailwind CSS with CSS variables | Tailwind 4.0 (2024) | Faster builds, smaller runtime, better type safety with @theme directive |
| Manual dark mode toggle | next-themes with system detection | Current standard | Respects user preferences, persists across sessions, already integrated |

**Deprecated/outdated:**
- `getStaticProps` / `getServerSideProps`: Replaced by async Server Components in Next.js 16
- Tailwind v3 JIT mode: Tailwind 4 uses different configuration (CSS @theme directive)
- Class components: React 19 recommends function components with hooks

## Open Questions

1. **How to handle Agoda project's 2 demo URLs (demoUrl + alternateUrl)?**
   - What we know: Project 1 has 2 live URLs (ANA Hotel, Citibank), translation structure includes alternateUrl field
   - What's unclear: Display as 2 separate "View Project" buttons, dropdown menu, or show only first URL
   - Recommendation: Display both URLs as separate buttons ("View Demo 1", "View Demo 2") or use descriptive labels ("ANA Hotel", "Citibank"). Defer to planner based on visual density constraints. LOW confidence on optimal UX.

2. **Should portfolio section support filtering/sorting?**
   - What we know: Phase requirements (PORT-01, PORT-02, PORT-03) don't mention filtering, 4 projects is small dataset
   - What's unclear: User value of filtering by technology when only 4 projects
   - Recommendation: Out of scope for this phase. Reverse chronological order (D-18) is sufficient. Filtering adds complexity without clear benefit. HIGH confidence.

3. **Should tech badges be interactive (clickable)?**
   - What we know: Skills section badges are static, no interactivity mentioned in requirements or CONTEXT.md
   - What's unclear: Could badges link to technology pages or filter projects (if filtering existed)
   - Recommendation: Static badges matching Skills section pattern. Interactivity not in requirements, would require client component. HIGH confidence.

## Environment Availability

> Phase has no external dependencies beyond npm packages already installed. Code/config-only changes.

**Environment availability audit:** SKIPPED (no external dependencies identified)

All required dependencies (React, Next.js, Tailwind CSS, next-intl, lucide-react) verified in package.json and confirmed available via npm view. No CLI tools, databases, or external services required for portfolio showcase implementation.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no test infrastructure exists |
| Config file | None — see Wave 0 |
| Quick run command | N/A — requires test framework installation |
| Full suite command | N/A — requires test framework installation |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PORT-01 | ProjectGrid renders 4 project cards from translation data | unit | `npm test -- ProjectGrid.test.tsx -x` | ❌ Wave 0 |
| PORT-02 | ProjectCard displays title, description, and tech badges | unit | `npm test -- ProjectCard.test.tsx -x` | ❌ Wave 0 |
| PORT-03 | External link buttons render conditionally with correct attributes (target, rel, aria-label) | unit | `npm test -- ProjectCard.test.tsx::test_external_links -x` | ❌ Wave 0 |
| PORT-01 | Portfolio section visible and accessible via navigation | integration | `npm test -- page.test.tsx::test_portfolio_section -x` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm test -- --testPathPattern=Portfolio` (< 30s if framework installed)
- **Per wave merge:** `npm test` (full suite)
- **Phase gate:** Full suite green + manual visual check (mobile 320px, desktop 1440px, dark mode)

### Wave 0 Gaps
- [ ] Install test framework (recommend Vitest 2.x for Next.js 16 compatibility, faster than Jest)
- [ ] `vitest.config.ts` — Vitest configuration with TypeScript, React, and path aliases
- [ ] `tests/components/Portfolio/ProjectGrid.test.tsx` — covers PORT-01 (4 cards rendered)
- [ ] `tests/components/Portfolio/ProjectCard.test.tsx` — covers PORT-02 (content display), PORT-03 (links)
- [ ] `tests/app/page.test.tsx` — covers PORT-01 (section integration)
- [ ] Test utilities: `tests/setup.ts` (React Testing Library, translation mocks)

**Recommendation:** Defer test infrastructure to Phase 8 (Performance & Quality) or post-v1. PORT-01/02/03 are low-risk UI components with established patterns. Manual visual testing sufficient for v1.0 launch given tight timeline and static content nature.

## Sources

### Primary (HIGH confidence)
- Tailwind CSS 4.x official docs (https://tailwindcss.com/docs) — Grid utilities, shadow patterns, border radius (verified 2026-03-28)
- Next.js 16.2.1 official docs (https://nextjs.org/docs) — Server components, data fetching, component patterns (verified 2026-03-28)
- React 19 official docs (https://react.dev) — Function components, TypeScript interfaces, list rendering (verified 2026-03-28)
- WCAG 2.1 Level AA (https://www.w3.org/WAI/WCAG21/) — Contrast requirements (4.5:1 for text), accessibility standards (verified 2026-03-28)
- Lucide React docs (https://lucide.dev) — Icon names (ExternalLink, Code), usage patterns (verified 2026-03-28)

### Secondary (MEDIUM confidence)
- Existing codebase patterns — Timeline component structure (src/components/Timeline/), Skills badge styling (src/app/[lang]/page.tsx lines 83-88), Contact external links (lines 132-150)
- Translation file structure — en.json/es.json (portfolio keys already exist, verified structure)
- npm registry — Package versions verified via `npm view` (React 19.2.4, Next.js 16.2.1, Tailwind 4.2.2, lucide-react 1.7.0)

### Tertiary (LOW confidence)
- None — all findings verified against official sources or existing code

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All packages verified in package.json, versions confirmed via npm registry, no new dependencies required
- Architecture: HIGH — Patterns mirror existing Timeline (container + item components) and Skills (responsive grid, badges), verified against Next.js 16 and React 19 official docs
- Pitfalls: HIGH — Common issues documented in Next.js migration guides, WCAG accessibility requirements, and observed patterns in existing codebase
- Component patterns: HIGH — Server component approach verified in Next.js 16 docs, TypeScript interfaces standard practice, external link security pattern from Contact section
- Translation structure: HIGH — JSON structure follows existing next-intl patterns in en.json/es.json, useTranslations hook documented in next-intl 4.8.3 docs
- Testing approach: MEDIUM — No test infrastructure exists, recommendation based on industry standards (Vitest for Next.js), but deferral to Phase 8 is pragmatic given static content and established patterns

**Research date:** 2026-03-28
**Valid until:** 2026-04-27 (30 days — stack is stable, Next.js 16 and React 19 released, Tailwind 4 mature)

---

**Research complete.** Planner can now create PLAN.md files with task-level details. All architectural decisions verified against current documentation and existing codebase patterns. No blockers identified.
