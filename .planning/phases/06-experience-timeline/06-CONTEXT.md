# Phase 6: Experience Timeline - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Display 19+ years of work history in a chronological timeline format. Show company names, job titles, date ranges, and key achievements for all positions. Timeline displays in vertical single-column layout with connector line and dots, adapting responsively with enhanced breathing room on desktop.

</domain>

<decisions>
## Implementation Decisions

### Timeline Visual Style
- **D-01:** Vertical timeline with connector line and dots — classic timeline pattern with vertical line on left, dots at each entry, content cards extend to right
- **D-02:** Single-column layout on all screen sizes — mobile and desktop use same vertical structure, desktop gets more breathing room
- **D-03:** Timeline connector line positioned on left side — dots/markers aligned to line, cards extend rightward

### Entry Structure and Content
- **D-04:** Complete career history displayed — all 10 positions from 2007-present (19 years), showing full career progression
- **D-05:** Entry format: Company + Title, Date range, 2-3 achievement bullets — scannable for recruiters, highlights impact
- **D-06:** Achievement bullets extracted from LinkedIn as-is — authentic content directly from user's LinkedIn profile
- **D-07:** Date format: "Month YYYY - Month YYYY" or "Month YYYY - Present" for current role

### Timeline Ordering
- **D-08:** Most recent first (reverse chronological) — current role at top, earliest role at bottom, standard resume format

### Desktop Enhancement
- **D-09:** Same vertical layout, enhanced spacing — desktop adds wider max-width, generous padding, consistent with mobile structure
- **D-10:** No layout changes between mobile/desktop — responsive enhancement is spacing and typography scale only

### Content Source
- **D-11:** Experience data from LinkedIn PDF export — `/Users/emanuelpereyra/Downloads/EmanuelPereyraLinkedIn.pdf` contains complete job history
- **D-12:** Positions to include (reverse chronological):
  1. **intive** - Sr Web Developer (April 2025 - Present)
  2. **Distillery** - Sr SW Engineer (March 2021 - March 2025, 4 years 1 month)
  3. **Summa Solutions** - Tech Lead (August 2020 - March 2021, 8 months)
  4. **Making Sense LLC** - Tech Lead (June 2018 - August 2020, 2 years 3 months)
  5. **McAfee** - Sr Software Engineer (April 2017 - June 2018, 1 year 3 months)
  6. **Intel Corporation** - Front End Software Engineer (November 2015 - March 2017, 1 year 5 months)
  7. **Globant** - Web Developer (March 2015 - October 2015, 8 months)
  8. **3XM Group** - Web Developer (April 2014 - February 2015, 11 months)
  9. **Harriague + Asociados** - Software Developer (August 2013 - March 2014, 8 months)
  10. **ADDOC** - Senior System Engineer (January 2012 - July 2013, 1 year 7 months)
  11. **Banco de la Provincia de Córdoba** - Tester SAP (April 2011 - December 2011, 9 months)
  12. **Aguas de Santiago S.A.** - Software Engineer - Business Intelligence (May 2007 - February 2011, 3 years 10 months)

### Claude's Discretion
- Exact spacing between timeline entries
- Timeline dot size and connector line thickness
- Card shadow and border styling
- Hover/focus states for timeline cards
- Typography size adjustments for achievement bullets

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Content Source
- `/Users/emanuelpereyra/Downloads/EmanuelPereyraLinkedIn.pdf` — Complete LinkedIn experience export with all job descriptions and achievements (must be parsed for timeline data)

### Phase Foundation
- `.planning/phases/01-project-setup-foundation/01-CONTEXT.md` — Next.js Image component, Inter + Roboto Mono fonts, Tailwind CSS 4 with CSS variables
- `.planning/phases/02-layout-navigation/02-CONTEXT.md` — Section component structure, responsive breakpoints (320px/768px/1440px), semantic HTML patterns
- `.planning/phases/03-theme-system/03-CONTEXT.md` — Dark mode color palette (gray-950 bg, gray-300 text), WCAG AA compliance requirements
- `.planning/phases/04-internationalization/04-CONTEXT.md` — Translation file structure (nested by section), next-intl usage with useTranslations hook, bilingual requirement
- `.planning/phases/05-core-content-sections/05-CONTEXT.md` — Two-column responsive grid pattern, badge styling established, professional color scheme

### Existing Code
- `src/app/[lang]/page.tsx` — Experience section currently has placeholder "Content coming soon" at line 53-60
- `src/components/Section.tsx` — Section wrapper with alternating backgrounds and max-w-7xl container
- `messages/en.json` — Translation structure with experience.heading and experience.timeline.present keys
- `messages/es.json` — Spanish translations (parallel structure to English)

### Project Requirements
- `.planning/REQUIREMENTS.md` — EXP-01 (chronological timeline), EXP-02 (roles and achievements), EXP-03 (company/title/dates), EXP-04 (responsive vertical on mobile, enhanced on desktop)
- `.planning/PROJECT.md` — Modern corporate aesthetic, 19+ years experience showcase, target audience: enterprise recruiters

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Section component:** Provides alternating backgrounds (bg-white/bg-gray-50 with dark mode variants), max-w-7xl container, consistent padding
- **Translation system:** next-intl with useTranslations hook, nested key structure ready for experience.timeline array
- **Responsive typography:** Established pattern text-xl sm:text-2xl lg:text-3xl for headings, text-base sm:text-lg for body
- **Lucide React icons:** Already imported and used (Mail, LinkedIn, Github) — can add additional icons if needed
- **Dark mode classes:** Existing dark: utilities throughout (dark:text-white, dark:text-gray-300, dark:bg-gray-950)

### Established Patterns
- **Professional color scheme:** Gray-900 headings, gray-600 body text (light mode), gray-300 body text (dark mode)
- **Badge/pill styling:** Rounded backgrounds with category colors from Phase 5 Skills (can reuse pattern for company tags if desired)
- **Two-column responsive grid:** Grid pattern from Phase 5 About section (not applicable here — Phase 6 uses single-column)
- **Alternating section backgrounds:** Experience section has alternate prop (bg-gray-50 in light mode)
- **Icon button pattern:** Established in Contact section (hover states, accessible aria-labels)

### Integration Points
- Experience section in page.tsx (line 53-60) needs complete rebuild — replace placeholder with timeline component
- Translation files need experience.timeline array with all 12 positions (company, title, startDate, endDate, achievements[])
- Timeline entries should match Section component's max-w-7xl container pattern for consistency
- Vertical connector line implemented with CSS (border-left or absolute positioned div)
- Timeline dots positioned with absolute positioning or CSS pseudo-elements (::before)

</code_context>

<specifics>
## Specific Ideas

### LinkedIn Data Structure
From the PDF extract, each position has:
- Company name clearly stated
- Job title (Sr Web Developer, Tech Lead, etc.)
- Date range with month/year precision
- Bullet points describing achievements and responsibilities (varying from 2-6 bullets per role)
- Location information (Córdoba, Argentina for most positions)

Example position structure (intive):
- **Company:** intive
- **Title:** Sr Web Developer
- **Dates:** abril de 2025 - Present (1 año)
- **Achievements:**
  - Contributing with the new design system at Dow Jones, for DJ+, Factiva and Risk Management products
  - Modern and light weight components loosely coupled to React with css optimized for improved SSR performance

### Implementation Notes
- Most recent role (intive) uses "Present" for end date — translation key experience.timeline.present already exists
- Date parsing may need handling of Spanish month names (abril, marzo, etc.) or convert to English in translation files
- Some positions have 1-2 bullets, others have 4-6 — Phase 6 will select 2-3 most impactful per role
- Longer tenures (Distillery 4 years, Making Sense 2+ years) have richer achievement lists
- Earlier roles (pre-2015) have shorter, more technical descriptions
- Timeline should emphasize recent 10 years (more detail) while showing complete history (demonstrates longevity)

### Visual Reference
- Timeline dots should align with company name or job title line (not centered in card)
- Connector line should extend from first entry (top) to last entry (bottom)
- Cards should have subtle shadow or border (match Section component aesthetic)
- Spacing between entries should allow scanning without overwhelming (Phase 5 used space-y-10 for skill categories)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-experience-timeline*
*Context gathered: 2026-03-27*
