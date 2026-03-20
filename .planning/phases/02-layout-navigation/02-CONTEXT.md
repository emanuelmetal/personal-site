# Phase 2: Layout & Navigation - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a single-page portfolio layout with sticky navigation and smooth scroll behavior. Create semantic HTML sections (About, Experience, Skills, Portfolio, Contact) with responsive design across mobile (320px), tablet (768px), and desktop (1440px) viewports. Navigation must remain accessible at all times and provide smooth scrolling to target sections.

</domain>

<decisions>
## Implementation Decisions

### Navigation Structure
- **D-01:** Desktop nav uses minimal design with abbreviated links (icons or short labels)
- **D-02:** Mobile nav uses hamburger menu with slide-out drawer
- **D-03:** Active section indicator uses subtle visual cue (small dot or thin line, not full highlighting)
- **D-04:** Language and theme toggles positioned right side of nav bar (desktop), top of drawer (mobile)

### Smooth Scroll Behavior
- **D-05:** Use native CSS `scroll-behavior: smooth` (zero JavaScript, browser-native performance)
- **D-06:** Dynamic scroll offset based on viewport to account for sticky header height (different offsets for mobile vs desktop nav heights)
- **D-07:** Standard tab navigation with Enter key activating smooth scroll (accessible pattern)
- **D-08:** Mobile drawer closes automatically after clicking nav link

### Section Layout
- **D-09:** Content-based section height (each section takes only space it needs, not full viewport)
- **D-10:** Alternating background colors for visual separation (e.g., white/gray-50 in light mode, adapts to theme)
- **D-11:** Consistent vertical padding across all sections (py-16 desktop, py-12 mobile via Tailwind utilities)
- **D-12:** Container max-width constraint (e.g., max-w-7xl) for content on ultra-wide screens

### Responsive Design
- **D-13:** Mobile-first approach with Tailwind default breakpoints (sm:768px, lg:1024px, xl:1280px)
- **D-14:** Scaled horizontal padding across devices (px-4 mobile, px-8 tablet, px-12 desktop)
- **D-15:** Responsive typography scaling (e.g., text-2xl sm:text-3xl lg:text-4xl for headings)
- **D-16:** Nav bar height varies by device (h-16 or h-20 desktop, h-14 mobile to save screen space)

### Project Tooling
- **D-17:** Use Bun as package manager instead of npm (user preference noted during discussion)

### Claude's Discretion
- Exact icon choices for abbreviated nav links
- Hamburger menu animation style
- Precise color values for alternating backgrounds (within theme constraints)
- Drawer slide-out animation implementation
- Focus indicator styling (as long as WCAG AA compliant)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Foundation
- `.planning/phases/01-project-setup-foundation/01-CONTEXT.md` — Existing i18n routing structure, font configuration (Inter + Roboto Mono), Tailwind CSS 4 setup with CSS variables

### Project Requirements
- `.planning/REQUIREMENTS.md` — NAV-01 (semantic sections), NAV-02 (sticky nav), NAV-03 (smooth scroll), NAV-04 (responsive design across 320px/768px/1440px)
- `.planning/PROJECT.md` — Modern corporate aesthetic requirement, target audience (enterprise recruiters)

### Technical Specifications
- `src/app/[lang]/layout.tsx` — Existing root layout with i18n provider and font variables
- `src/app/globals.css` — Tailwind 4 setup with @theme directive and CSS variable fonts

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Inter font:** Already configured as `--font-inter` CSS variable, available via `font-sans` utility
- **Roboto Mono:** Configured as `--font-roboto-mono`, available via `font-mono` utility
- **i18n routing:** `[lang]` dynamic route structure set up, `next-intl` provider active
- **Tailwind CSS 4:** Modern setup with CSS variables, ready for theme system in Phase 3

### Established Patterns
- **Font loading:** next/font with display swap, variable fonts for performance
- **Route structure:** `app/[lang]/` pattern for bilingual support (EN/ES)
- **CSS organization:** Tailwind 4 with @theme directive for custom properties
- **Path aliases:** `@/*` configured for clean imports

### Integration Points
- Root layout provides i18n context and font variables to all child components
- Navigation component will be imported into root layout to appear on all pages
- Section IDs must match navigation anchor targets (requirement NAV-01)
- Theme system (Phase 3) will build on existing CSS variable structure

</code_context>

<specifics>
## Specific Ideas

- Minimal nav with abbreviated links keeps vertical space for content (important for recruiters scanning quickly)
- Native CSS smooth scroll avoids JavaScript bundle bloat (aligns with PERF-03 target of <150KB bundle)
- Dynamic scroll offset ensures content isn't hidden behind sticky nav (common UX issue)
- Alternating background colors provide visual rhythm without explicit borders (modern corporate aesthetic)
- Mobile-first with Tailwind defaults leverages existing infrastructure from Phase 1

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-layout-navigation*
*Context gathered: 2026-03-20*
