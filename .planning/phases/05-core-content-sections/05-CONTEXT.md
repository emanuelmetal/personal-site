# Phase 5: Core Content Sections - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Populate About, Skills, and Contact sections with actual content. Display professional bio in two-column layout, categorized tech stack with tier-based experience grouping and badge styling, and contact information with email and social profile links. All content bilingual (EN/ES) via translation files.

</domain>

<decisions>
## Implementation Decisions

### Content Strategy
- **D-01:** Use real content now (not placeholders) — add actual bio, skills list, and contact info in this phase
- **D-02:** Translations will have real text for immediate final result and proper content structure validation

### About Section
- **D-03:** Two-column layout — profile photo on left (desktop), bio and details on right, stacks vertically on mobile
- **D-04:** Brief bio (2-3 sentences) — concise professional summary highlighting 19+ years experience and core expertise
- **D-05:** Just photo + bio — no additional stats, highlights, or availability status (keep it simple and professional)
- **D-06:** Update existing center-aligned layout in page.tsx to two-column responsive layout

### Skills Section
- **D-07:** Category-based organization — group skills into 4 categories: Frontend, Backend, Cloud & DevOps, Tools & Practices (from translation files)
- **D-08:** Tier-based experience grouping — skills grouped by experience range: '10+ years', '5-10 years', '2-5 years' (shows depth without exact years for every skill)
- **D-09:** Badge/pill visual style — skills as rounded badges, potentially with category colors (e.g., blue Frontend, green Backend)
- **D-10:** Categories shown first, tiers nested within each category (e.g., Frontend section contains three tier subsections)

### Contact Section
- **D-11:** Centered vertical stack layout — email centered at top, social links (LinkedIn/GitHub) as icon buttons below in a row
- **D-12:** Brief CTA above contacts — use translation file's "Let's connect and discuss how I can contribute to your team." or similar warm invitation
- **D-13:** Icon buttons with labels — LinkedIn/GitHub icons as clickable buttons with text labels (clear for all users, accessible)
- **D-14:** All social links open in new tabs (target="_blank" rel="noopener noreferrer") per requirement CONT-04

### Claude's Discretion
- Exact color choices for category badges (as long as accessible and within theme)
- Icon SVG paths for LinkedIn and GitHub
- Precise spacing and padding within sections
- Hover/focus states for social link buttons
- Bio text content and phrasing (will use real professional summary)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Foundation
- `.planning/phases/01-project-setup-foundation/01-CONTEXT.md` — next/image configuration, Inter + Roboto Mono fonts, Tailwind CSS 4 with CSS variables
- `.planning/phases/02-layout-navigation/02-CONTEXT.md` — Section component structure, responsive breakpoints (320px/768px/1440px), typography patterns
- `.planning/phases/03-theme-system/03-CONTEXT.md` — Dark mode color palette (gray-950 bg, gray-300 text), WCAG AA compliance
- `.planning/phases/04-internationalization/04-CONTEXT.md` — Translation file structure (nested by section), next-intl usage patterns, bilingual requirement

### Existing Code
- `src/app/[lang]/page.tsx` — Current About section with center-aligned layout (needs conversion to two-column)
- `src/components/Section.tsx` — Section wrapper with alternating backgrounds and max-w-7xl container
- `messages/en.json` — Translation structure with about, skills, contact keys already defined
- `messages/es.json` — Spanish translations (parallel structure to English)

### Project Requirements
- `.planning/REQUIREMENTS.md` — ABOUT-01, ABOUT-02 (bio and background), SKILL-01, SKILL-02, SKILL-03 (categorized skills with experience), CONT-01 through CONT-04 (email, LinkedIn, GitHub with new-tab behavior)
- `.planning/PROJECT.md` — Modern corporate aesthetic, 19+ years experience to showcase, target audience: enterprise recruiters

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Section component:** Provides alternating backgrounds (bg-white/bg-gray-50 dark mode variants), max-w-7xl container, consistent padding
- **Translation system:** next-intl with useTranslations hook, nested key structure (e.g., t('about.bio'), t('skills.categories.frontend'))
- **Responsive typography:** Established pattern text-2xl sm:text-3xl lg:text-4xl for headings
- **next/image:** Already used for profile photo (120px rounded-full) — can keep or resize for two-column layout
- **Dark mode classes:** Existing dark: utilities throughout (dark:text-white, dark:text-gray-300, dark:bg-gray-950)

### Established Patterns
- **Two-column responsive:** Can use `grid grid-cols-1 lg:grid-cols-2 gap-8` pattern (stacks on mobile, side-by-side on desktop)
- **Icon buttons:** Similar pattern to ThemeToggle (client component with SVG icons, accessible with aria-labels)
- **Bilingual content:** All user-facing text goes in translation files, components use t() function
- **Professional color scheme:** Phase 2 established gray-900 for headings, gray-600 for body text (light mode)

### Integration Points
- About section in page.tsx needs layout restructure (center-aligned → two-column)
- Skills section currently has "Content coming soon" placeholder — replace with categorized badges
- Contact section placeholder → replace with CTA message + email + social icon buttons
- Translation files need real content keys: about.bio, skills data structure, contact.email, contact.linkedin, contact.github

</code_context>

<specifics>
## Specific Ideas

- Two-column About layout mirrors professional LinkedIn/resume format — familiar to recruiters
- Tier-based experience grouping (10+/5-10/2-5 years) communicates depth without overwhelming with exact numbers for every skill
- Badge/pill style for skills adds visual interest while maintaining modern corporate aesthetic
- Translation file already has skills.categories (frontend/backend/cloud/tools) — planner should extend with actual skill arrays
- CTA message from translation file: "Let's connect and discuss how I can contribute to your team." — warm but professional tone
- Icon buttons with labels (not icon-only) ensures accessibility and clarity for all users

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-core-content-sections*
*Context gathered: 2026-03-27*
