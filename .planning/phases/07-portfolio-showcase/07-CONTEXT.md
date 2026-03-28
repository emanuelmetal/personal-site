# Phase 7: Portfolio Showcase - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Display 4 professional projects in Portfolio section with project cards showing title, description, tech stack badges, and action links. Cards arranged in 2-column responsive grid (desktop) / 1-column (mobile) with shadow styling. Each card displays available links (live demo and/or GitHub repo).

</domain>

<decisions>
## Implementation Decisions

### Project Selection
- **D-01:** Showcase 4 projects — focused portfolio showing range of skills without overwhelming
- **D-02:** Projects provided by user with complete details (name, description, tech stack, links)
- **D-03:** Project content stored in translation files (portfolio.projects array) for bilingual support

### Project Content (4 projects in most recent first order)
- **D-04:** **Project 1: Agoda's white labeling themes**
  - Description: "As part of the Rocket Travel integration to Agoda's stack, the know-how of whitelabeling was implemented in Agoda's reservation site, with clients such as All Nippon Airlines and Citibank"
  - Tech Stack: ReactJS, Typescript, Tailwind, .NET
  - Links: https://www.anaworldhotel.com/, https://www.citi.com/citi-partner/cititravel/login

- **D-05:** **Project 2: Rocket Travel AAdvantage Client Integration**
  - Description: "Creation of the white-label site and UI adjustments for the American Airlines miles program."
  - Tech Stack: ReactJS, Typescript, ChakraUI
  - Links: https://www.aadvantagehotels.com/, https://search.rocketmiles.com/

- **D-06:** **Project 3: N95 Project**
  - Description: "N95 community buying site for covid essentials, the very early e-commerce site was implemented with Vtex.IO and React components."
  - Tech Stack: React, Typescript, Vtex.io
  - Links: https://www.projectn95.org/

- **D-07:** **Project 4: Alix Partners Corporate Survey**
  - Description: "Creation of a survey wizard for different department directors for Alix Partners"
  - Tech Stack: ReactJS, NodeJS, Typescript, MaterialUI
  - Links: https://github.com/emanuelmetal/alix-survey-project

### Visual Layout
- **D-08:** 2-column grid on desktop (lg breakpoint), 1-column on mobile — balanced layout showing 2 cards per row on desktop, stacking to single column on mobile
- **D-09:** Card with shadow styling — Material Design style with drop shadow, professional appearance with visual depth
- **D-10:** Rounded corners on cards — consistent with modern corporate aesthetic

### Tech Stack Display
- **D-11:** Reuse Skills badge style — same rounded badge pattern from Skills section with consistent visual language
- **D-12:** Single neutral color for all portfolio tech badges — avoids category color confusion, keeps focus on project content
- **D-13:** Tech badges displayed below description, above action buttons — clear hierarchy within card

### Project Links
- **D-14:** Show available links only — display "View Project" for live sites, "View Code" for GitHub repos, or both when available
- **D-15:** No buttons shown for projects without links — description and tech stack speak for themselves
- **D-16:** All external links open in new tabs (target="_blank" rel="noopener noreferrer") — established pattern from Contact section
- **D-17:** Outline/ghost button style — border with colored text, transparent background, lighter visual weight than solid buttons

### Content Ordering
- **D-18:** Most recent first (reverse chronological) — Agoda → Rocket Travel → N95 → Alix Partners, shows current capabilities first, consistent with Timeline section approach

### Claude's Discretion
- Exact shadow depth and blur values for cards
- Button border color and hover states
- Neutral color choice for tech badges (gray-based within theme)
- Card padding and internal spacing
- Gap size between grid items
- Tech badge size and spacing

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Foundation
- `.planning/phases/01-project-setup-foundation/01-CONTEXT.md` — Next.js Image component (if project images added later), Inter + Roboto Mono fonts, Tailwind CSS 4 with CSS variables
- `.planning/phases/02-layout-navigation/02-CONTEXT.md` — Section component structure, responsive breakpoints (320px/768px/1440px), semantic HTML patterns
- `.planning/phases/03-theme-system/03-CONTEXT.md` — Dark mode color palette (gray-950 bg, gray-300 text), WCAG AA compliance requirements
- `.planning/phases/04-internationalization/04-CONTEXT.md` — Translation file structure (nested by section), next-intl usage with useTranslations hook, bilingual requirement
- `.planning/phases/05-core-content-sections/05-CONTEXT.md` — Badge/pill styling pattern (rounded badges with colors), two-column responsive grid pattern
- `.planning/phases/06-experience-timeline/06-CONTEXT.md` — Card styling with shadow/border patterns, professional color scheme

### Existing Code
- `src/app/[lang]/page.tsx` — Portfolio section at line 100-107 with placeholder "Content coming soon" (needs replacement with project grid)
- `src/components/Section.tsx` — Section wrapper with alternating backgrounds (Portfolio has alternate prop = bg-gray-50 in light mode)
- `messages/en.json` — Translation structure with portfolio.heading, portfolio.viewProject, portfolio.viewCode keys (line 207-211)
- `messages/es.json` — Spanish translations (parallel structure to English)

### Project Requirements
- `.planning/REQUIREMENTS.md` — PORT-01 (showcase professional projects), PORT-02 (title, description, technologies), PORT-03 (project links)
- `.planning/PROJECT.md` — Modern corporate aesthetic, target audience: enterprise recruiters and potential customers

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Section component:** Provides alternating backgrounds (Portfolio section already uses alternate prop), max-w-7xl container, consistent padding
- **Translation system:** next-intl with useTranslations hook, portfolio keys already exist (heading, viewProject, viewCode)
- **Badge pattern from Skills section:** Rounded badges with `inline-block rounded-full px-3 py-1.5 text-sm font-medium` classes at page.tsx line 83-88
- **External link pattern from Contact section:** target="_blank" rel="noopener noreferrer" with aria-labels (page.tsx line 132-150)
- **Responsive grid pattern:** `grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12` from About section (page.tsx line 23)
- **Lucide React icons:** Already imported (Mail, LinkedIn, Github) — can add ExternalLink or Code icons for buttons

### Established Patterns
- **Two-column responsive grid:** Established in About section — stacks to 1-column on mobile, 2-columns on lg breakpoint
- **Professional color scheme:** Gray-900 headings, gray-600 body text (light mode), gray-300 body text (dark mode)
- **Hover transitions:** `transition-colors` and `hover:` states on buttons (Contact section social links)
- **Shadow/border styling:** Timeline cards use Flexbox layout with visual depth
- **Alternating section backgrounds:** Portfolio has bg-gray-50 (light) / bg-gray-900 (dark) from alternate prop

### Integration Points
- Portfolio section in page.tsx (line 100-107) needs complete rebuild — replace placeholder with project grid component
- Translation files need portfolio.projects array with 4 project objects (name, description, technologies[], demoUrl?, repoUrl?)
- New component: ProjectCard.tsx (similar to TimelineItem.tsx structure) — displays single project with card styling
- New component: ProjectGrid.tsx (similar to Timeline.tsx structure) — maps over projects array and renders ProjectCard components
- Grid should use Section component's max-w-7xl container for consistency

</code_context>

<specifics>
## Specific Ideas

### Project Data Structure
Translation file structure for portfolio.projects array:
```json
"portfolio": {
  "heading": "Portfolio",
  "viewProject": "View Project",
  "viewCode": "View Code",
  "projects": [
    {
      "name": "Agoda's white labeling themes",
      "description": "As part of the Rocket Travel integration...",
      "technologies": ["ReactJS", "Typescript", "Tailwind", ".NET"],
      "demoUrl": "https://www.anaworldhotel.com/",
      "alternateUrl": "https://www.citi.com/citi-partner/cititravel/login"
    },
    // ... 3 more projects
  ]
}
```

### Visual Design Notes
- Shadow cards inspired by Material Design but adapted to modern corporate aesthetic — subtle, not heavy
- Tech badges use neutral gray color (e.g., gray-200 bg, gray-700 text in light mode) to distinguish from Skills section's category colors
- Outline buttons match the professional tone — blue-600 border/text that matches site's accent color
- Grid gap should be generous (gap-6 or gap-8) to give each project breathing room
- Cards should have hover state (slight shadow increase or subtle scale transform) to indicate interactivity

### Link Handling
- Project 1 (Agoda) has 2 live URLs — could show first as "View Project" and second as "View Demo 2" or combine into dropdown
- Project 4 (Alix Partners) only has GitHub link — shows "View Code" button only
- Projects 1-3 have live demos without GitHub repos — show "View Project" button only
- Planner should decide how to handle multiple demo URLs (alternateUrl field)

### Responsive Behavior
- Mobile (< 768px): Single column, full width cards, generous vertical spacing
- Desktop (≥ 1024px): 2-column grid, 4 projects = 2 rows of 2, balanced layout
- Tablet (768-1023px): Could stay 1-column or switch to 2-column depending on card density

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-portfolio-showcase*
*Context gathered: 2026-03-28*
