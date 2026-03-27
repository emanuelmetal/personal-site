# Phase 6: Experience Timeline - Research

**Researched:** 2026-03-27
**Domain:** Vertical timeline component with React/Next.js, responsive CSS layout
**Confidence:** HIGH

## Summary

Phase 6 requires implementing a vertical timeline to display 19+ years of work history (12 positions from 2007-present) with company names, job titles, date ranges, and 2-3 achievement bullets per position. The timeline uses a classic vertical pattern with left-side connector line and dots, content cards extending to the right, displayed in reverse chronological order (most recent first).

The implementation is straightforward using existing project patterns: Flexbox layout with Tailwind CSS, next-intl for translation data, and semantic HTML (ordered list) for accessibility. No external timeline libraries needed — the design is simple enough for custom CSS with established Tailwind utilities.

**Primary recommendation:** Use semantic `<ol>` with CSS-driven visual timeline elements (connector line via border-left, dots via styled divs), store all 12 positions in translation files with company/title/dates/achievements, follow existing Section component patterns for consistency.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Timeline Visual Style:**
- **D-01:** Vertical timeline with connector line and dots — classic timeline pattern with vertical line on left, dots at each entry, content cards extend to right
- **D-02:** Single-column layout on all screen sizes — mobile and desktop use same vertical structure, desktop gets more breathing room
- **D-03:** Timeline connector line positioned on left side — dots/markers aligned to line, cards extend rightward

**Entry Structure and Content:**
- **D-04:** Complete career history displayed — all 10 positions from 2007-present (19 years), showing full career progression (NOTE: LinkedIn PDF shows 12 positions, not 10)
- **D-05:** Entry format: Company + Title, Date range, 2-3 achievement bullets — scannable for recruiters, highlights impact
- **D-06:** Achievement bullets extracted from LinkedIn as-is — authentic content directly from user's LinkedIn profile
- **D-07:** Date format: "Month YYYY - Month YYYY" or "Month YYYY - Present" for current role

**Timeline Ordering:**
- **D-08:** Most recent first (reverse chronological) — current role at top, earliest role at bottom, standard resume format

**Desktop Enhancement:**
- **D-09:** Same vertical layout, enhanced spacing — desktop adds wider max-width, generous padding, consistent with mobile structure
- **D-10:** No layout changes between mobile/desktop — responsive enhancement is spacing and typography scale only

**Content Source:**
- **D-11:** Experience data from LinkedIn PDF export — `/Users/emanuelpereyra/Downloads/EmanuelPereyraLinkedIn.pdf` contains complete job history
- **D-12:** Positions to include (12 total, reverse chronological):
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| EXP-01 | User can view work history in chronological timeline format | Vertical timeline pattern with ordered list, Flexbox layout, CSS connector line |
| EXP-02 | User can see key roles and achievements for each position | Translation structure with company/title/achievements array per position |
| EXP-03 | Timeline displays company names, job titles, and date ranges | Data extracted from LinkedIn PDF, stored in en.json/es.json with structured format |
| EXP-04 | Timeline adapts responsively (vertical on mobile, enhanced layout on desktop) | Same vertical structure all breakpoints, Tailwind responsive utilities (sm:, lg:) for spacing/typography |

</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.4 | Component rendering | Already installed, Server Components support for data handling |
| Next.js | 16.2.0 | Framework | Already installed, provides routing and optimization |
| Tailwind CSS | 4.x | Layout and styling | Already installed, utility-first approach matches project patterns |
| next-intl | 4.8.3 | Translations | Already installed, translation data storage for timeline entries |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.577.0 | Icons (optional) | If adding visual indicators beyond dots (e.g., briefcase icon) |
| clsx | 2.1.1 | Conditional classes | Already used throughout project for dynamic styling |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom CSS timeline | react-vertical-timeline-component | External library adds 50KB+ bundle size, overkill for simple design |
| Semantic `<ol>` | `<div>` with role="list" | No benefit to ARIA override — native semantics preferred |
| Translation files | Markdown/JSON data files | Translation files already established, consistent with project patterns |

**Installation:**
No new packages needed — all required dependencies already installed.

**Version verification:** Confirmed current versions via npm registry (2026-03-27):
- React: 19.2.4 (published 2024-12-07)
- Next.js: 16.2.1 latest (project uses 16.2.0, stable)
- Tailwind CSS: 4.x (project uses latest alpha/beta)
- next-intl: 4.8.3 (stable)

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── Section.tsx          # Existing — reuse for timeline wrapper
│   └── Timeline/
│       ├── Timeline.tsx     # Main timeline component
│       ├── TimelineItem.tsx # Individual entry component
│       └── index.ts         # Barrel export
└── app/[lang]/
    └── page.tsx             # Replace experience section placeholder
```

### Pattern 1: Semantic Ordered List with CSS Styling
**What:** Use `<ol>` for timeline container, `<li>` for each position, CSS for visual timeline elements (line/dots)
**When to use:** Timeline represents chronological sequence — ordered list is semantically correct
**Example:**
```tsx
// Timeline.tsx
import { useTranslations } from 'next-intl';
import TimelineItem from './TimelineItem';

export default function Timeline() {
  const t = useTranslations('experience.timeline');

  // Assuming translation structure: experience.timeline.items = array of positions
  const positions = t.raw('items') as Array<{
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  }>;

  return (
    <ol className="relative space-y-8 lg:space-y-12">
      {positions.map((position, index) => (
        <TimelineItem
          key={`${position.company}-${index}`}
          position={position}
          isLast={index === positions.length - 1}
        />
      ))}
    </ol>
  );
}
```

### Pattern 2: Flexbox Layout with Connector Line
**What:** Flex container with left marker column (dot + line) and right content column
**When to use:** Standard timeline visual pattern, responsive without media query complexity
**Example:**
```tsx
// TimelineItem.tsx
type TimelineItemProps = {
  position: {
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  };
  isLast: boolean;
};

export default function TimelineItem({ position, isLast }: TimelineItemProps) {
  return (
    <li className="flex gap-4 lg:gap-6">
      {/* Left: Timeline marker and connector */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div className="z-10 h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400" />
        {/* Connector line - hidden on last item */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gray-300 dark:bg-gray-700" />
        )}
      </div>

      {/* Right: Content card */}
      <div className="flex-1 pb-8 lg:pb-12">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {position.title}
        </h3>
        <p className="text-base font-medium text-blue-600 dark:text-blue-400">
          {position.company}
        </p>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
          {position.startDate} - {position.endDate}
        </p>
        <ul className="list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300">
          {position.achievements.map((achievement, idx) => (
            <li key={idx} className="text-sm sm:text-base">
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
```

### Pattern 3: Translation Data Structure
**What:** Store all 12 positions in en.json/es.json with nested arrays
**When to use:** Bilingual requirement, structured data, easy content updates
**Example:**
```json
// messages/en.json - experience.timeline section
{
  "experience": {
    "heading": "Work Experience",
    "timeline": {
      "present": "Present",
      "items": [
        {
          "company": "intive",
          "title": "Sr Web Developer",
          "startDate": "April 2025",
          "endDate": "Present",
          "achievements": [
            "Contributing with new design system at Dow Jones for DJ+, Factiva and Risk Management products",
            "Modern and lightweight components loosely coupled to React with CSS optimized for improved SSR performance"
          ]
        },
        {
          "company": "Distillery",
          "title": "Sr SW Engineer",
          "startDate": "March 2021",
          "endDate": "March 2025",
          "achievements": [
            "Improved site reliability and scalability, reducing load time to less than 5 seconds",
            "Led white-label cross-sell initiative for hotels, reducing delivery time from 2-3 sprints to 1",
            "Integrated PayPal in booking form shared between RocketMiles and Booking.com"
          ]
        }
        // ... remaining 10 positions
      ]
    }
  }
}
```

### Anti-Patterns to Avoid
- **Floats for layout:** Use Flexbox instead — floats cause clearing issues and poor responsive behavior
- **Absolute positioning for content:** Only use for connector line/dots — content should be in document flow
- **Index as React key:** Use `${company}-${index}` or unique ID — company name alone may repeat, pure index causes issues if list reorders
- **Hardcoded content in JSX:** All content must be in translation files for bilingual requirement
- **CSS animations on connector line:** Avoid growing/animated lines — adds complexity without value for resume timeline

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Date formatting | Custom parser for "Month YYYY" strings | Keep as-is in translations | Dates are display-only, no calculation needed, translation files handle localization |
| Responsive breakpoints | Custom media queries | Tailwind responsive prefixes (sm:, lg:) | Already established project pattern, consistent spacing scale |
| Dark mode classes | JavaScript theme detection | Tailwind dark: variant | Theme system already implemented with next-themes, automatic class application |
| List rendering optimization | Virtual scrolling, pagination | Standard React map | Only 12 items, no performance concern, all entries should be visible (resume format) |
| Accessibility attributes | Manual ARIA roles | Semantic HTML (`<ol>`, `<li>`) | Native list semantics provide all needed accessibility |

**Key insight:** Timeline component is simpler than it appears — resist temptation to add animation libraries, virtual scrolling, or complex state management. The design is intentionally straightforward (vertical list with CSS styling), matching the professional corporate aesthetic. Overengineering this component adds bundle size and maintenance burden without user benefit.

## Common Pitfalls

### Pitfall 1: Connector Line Extending Below Last Item
**What goes wrong:** Vertical connector line extends past the last timeline entry, creating visual imbalance
**Why it happens:** CSS applies connector line to all items uniformly without checking position
**How to avoid:** Pass `isLast` prop to TimelineItem component, conditionally render connector line with `{!isLast && <div className="connector" />}`
**Warning signs:** Last entry appears disconnected, extra space below timeline

### Pitfall 2: Timeline Dots Not Vertically Centered with Content
**What goes wrong:** Dots align to top of card rather than title text, creating misalignment as content heights vary
**Why it happens:** Flexbox default alignment or absolute positioning without proper offset
**How to avoid:** Use `items-center` on flex container, ensure dot is in flex column with connector line (not in content column). Let flex handle vertical positioning naturally.
**Warning signs:** Dots appear too high or low relative to company name/title, alignment breaks with different content lengths

### Pitfall 3: Mobile Horizontal Overflow from Timeline Markers
**What goes wrong:** Timeline markers or content cards extend beyond viewport width, causing horizontal scroll
**Why it happens:** Fixed widths on marker column, insufficient padding, or content without text wrapping
**How to avoid:** Use flex-based sizing (`flex-shrink: 0` on marker, `flex: 1` on content), ensure sufficient padding, test on 320px viewport
**Warning signs:** Horizontal scrollbar appears on mobile, content gets cut off at screen edge

### Pitfall 4: Dark Mode Connector Line Invisible
**What goes wrong:** Connector line uses gray-300 in dark mode, which is too light against gray-950 background
**Why it happens:** Forgetting to apply dark: variant to connector line background color
**How to avoid:** Apply `dark:bg-gray-700` or darker shade to connector line, test dark mode explicitly during development
**Warning signs:** Timeline appears as floating dots without connector in dark mode

### Pitfall 5: Translation Data Structure Mismatch
**What goes wrong:** Component expects nested object but translation returns flat structure, causing runtime errors
**Why it happens:** Inconsistent data shape between en.json and es.json, or incorrect useTranslations path
**How to avoid:** Mirror exact structure between en.json and es.json, use `t.raw()` for array data, add TypeScript type for position object
**Warning signs:** `map is not a function` errors, missing translation keys, content rendering as `[object Object]`

### Pitfall 6: Achievement Bullets Not Selected (Too Many Displayed)
**What goes wrong:** Displaying all 4-6 bullets from LinkedIn instead of selecting 2-3 most impactful
**Why it happens:** Copy-pasting all achievements without editorial curation
**How to avoid:** During content preparation (not coding), manually select 2-3 most impactful bullets per position, focusing on results/metrics/scope
**Warning signs:** Timeline feels overwhelming, entries vary drastically in height, recruiter feedback about information overload

## Code Examples

Verified patterns from official sources:

### Flexbox Timeline Layout
```tsx
// Source: MDN Flexbox guide, adapted for timeline
<ol className="relative">
  <li className="flex gap-4">
    <div className="relative flex flex-col items-center">
      <div className="h-3 w-3 rounded-full bg-blue-600" />
      <div className="w-0.5 flex-1 bg-gray-300" />
    </div>
    <div className="flex-1 pb-8">
      {/* Content */}
    </div>
  </li>
</ol>
```

### React List Rendering with Keys
```tsx
// Source: React documentation - Rendering Lists
export default function Timeline() {
  const positions = t.raw('items') as Position[];

  return (
    <ol>
      {positions.map((position, index) => (
        <TimelineItem
          key={`${position.company}-${index}`}
          position={position}
        />
      ))}
    </ol>
  );
}
```

### Responsive Spacing (Existing Project Pattern)
```tsx
// Source: src/app/[lang]/page.tsx - Skills section (line 66)
<div className="space-y-10">
  {/* Established pattern: space-y-10 for major sections */}
</div>

// Adapt for timeline with responsive enhancement:
<ol className="space-y-8 lg:space-y-12">
  {/* Mobile: 2rem gap, Desktop: 3rem gap */}
</ol>
```

### Dark Mode Pattern (Existing Project)
```tsx
// Source: src/components/Section.tsx (line 16)
className={`${
  alternate ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-950'
}`}

// Adapt for timeline elements:
<div className="bg-gray-300 dark:bg-gray-700" />  // Connector line
<div className="text-gray-600 dark:text-gray-300" />  // Body text
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| External timeline libraries (react-vertical-timeline-component, react-chrono) | Custom CSS with Flexbox/Grid | 2020-2022 | Bundle sizes reduced, better customization, no library lock-in |
| Absolute positioning for all elements | Flexbox with positioned markers only | 2018-2020 | Simpler responsive behavior, reduced CSS complexity |
| JavaScript for responsive layout changes | CSS media queries + Tailwind responsive prefixes | 2019-2021 | No JS execution needed, better SSR performance |
| Separate mobile/desktop layouts | Single layout with spacing adjustments | 2020-2022 | Consistent UX, simpler maintenance, aligns with mobile-first design |

**Deprecated/outdated:**
- **Timeline animation libraries (AOS, ScrollReveal):** Modern preference for reduced-motion, professional sites avoid distracting animations
- **CSS frameworks (Bootstrap timeline components):** Utility-first (Tailwind) offers better customization without opinionated structure
- **Float-based layouts:** Completely replaced by Flexbox/Grid for timeline patterns

## Open Questions

1. **Should achievement bullets be translated separately or embedded in position objects?**
   - What we know: Current project uses nested structures (skills.data.frontend.10plus array)
   - What's unclear: Whether achievements should be inline with position data or referenced separately
   - Recommendation: Keep achievements embedded in position objects (simpler structure, easier content management, matches project pattern of nested data)

2. **Should we limit achievement bullet length with truncation?**
   - What we know: LinkedIn data varies from short bullets (15 words) to long bullets (40+ words)
   - What's unclear: Whether to enforce max length via CSS or content curation
   - Recommendation: Content curation during translation file creation (select shorter bullets, edit if needed), no CSS truncation (recruiters need full context)

3. **Should timeline dots use color coding by recency or remain uniform?**
   - What we know: User specified blue-600 for professional aesthetic, no mention of color variation
   - What's unclear: Whether different dot colors would aid scanning (e.g., current role different color)
   - Recommendation: Uniform blue-600 dots (D-01 specifies "classic timeline pattern", color variation not mentioned in decisions, Claude's discretion doesn't include colors)

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Development runtime | ✓ | v22.17.1 | — |
| npm | Package management | ✓ | 10.9.2 | — |
| React | Component rendering | ✓ | 19.2.4 (installed) | — |
| Next.js | Framework | ✓ | 16.2.0 (installed) | — |
| Tailwind CSS | Styling | ✓ | 4.x (installed) | — |
| next-intl | Translations | ✓ | 4.8.3 (installed) | — |

**Missing dependencies with no fallback:**
None — all required dependencies already installed and available

**Missing dependencies with fallback:**
None — no optional dependencies identified for this phase

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None — no test framework detected |
| Config file | None detected |
| Quick run command | N/A — no test infrastructure |
| Full suite command | N/A — no test infrastructure |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| EXP-01 | Timeline renders in chronological order (reverse) | unit | N/A — manual validation | ❌ No test infrastructure |
| EXP-02 | Each entry shows company, title, dates, achievements | unit | N/A — manual validation | ❌ No test infrastructure |
| EXP-03 | Timeline displays all required data fields | integration | N/A — manual validation | ❌ No test infrastructure |
| EXP-04 | Timeline responsive on mobile/desktop breakpoints | visual | N/A — manual validation | ❌ No test infrastructure |

### Sampling Rate
**Note:** No test infrastructure detected. All validation will be manual via `npm run dev` and browser testing.

- **Per task commit:** Manual browser check at localhost:3000
- **Per wave merge:** Manual responsive check (320px, 768px, 1440px)
- **Phase gate:** Full visual regression check across breakpoints and themes before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Test framework installation (e.g., Vitest or Jest) — if testing is desired
- [ ] `tests/components/Timeline.test.tsx` — covers timeline rendering and data display
- [ ] `tests/accessibility/timeline-a11y.test.tsx` — covers semantic HTML and ARIA
- [ ] Visual regression setup (Playwright or similar) — for responsive layout validation

**Recommendation:** Given the project's current state (no test infrastructure) and the straightforward nature of the timeline component, manual validation is acceptable for Phase 6. Automated testing can be added in Phase 8 (Performance & Testing) or Phase 9 (Quality) if desired.

## Sources

### Primary (HIGH confidence)
- React 19 Documentation - List rendering patterns and key props (https://react.dev/learn)
- MDN Web Docs - CSS Flexbox layout patterns (https://developer.mozilla.org/en-US/docs/Web/CSS/)
- MDN Web Docs - ARIA list role and semantic HTML (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role)
- Next.js 16 Documentation - Component organization and Server Components (https://nextjs.org/docs)
- Tailwind CSS Documentation - Utility classes for timeline layout (https://tailwindcss.com/docs)
- Project codebase - Existing patterns in Section.tsx, page.tsx, translation files (verified via Read tool)
- LinkedIn PDF export - Complete position data for all 12 roles (extracted via pdftotext)

### Secondary (MEDIUM confidence)
- npm registry - Current package versions for React, Next.js, Tailwind CSS (verified 2026-03-27)

### Tertiary (LOW confidence)
None — all findings verified against official sources or project code

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All dependencies already installed, versions verified via npm registry
- Architecture: HIGH - Patterns verified in existing codebase (Section.tsx, Skills section), React documentation, Tailwind documentation
- Pitfalls: MEDIUM-HIGH - Based on common CSS layout issues (MDN documented), project's dark mode implementation, experience with timeline components
- Content data: HIGH - LinkedIn PDF extracted and verified, all 12 positions documented with achievements
- Accessibility: HIGH - MDN documentation on semantic HTML, ARIA roles, list structures
- Environment availability: HIGH - All dependencies verified as installed and available

**Research date:** 2026-03-27
**Valid until:** 2026-04-26 (30 days - stack is stable, no fast-moving dependencies)
