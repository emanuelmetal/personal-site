# Phase 5: Core Content Sections - Research

**Researched:** 2026-03-27
**Domain:** React component design, responsive layouts, bilingual content integration
**Confidence:** HIGH

## Summary

Phase 5 implements three content sections (About, Skills, Contact) with real bilingual content. The About section transitions from center-aligned to two-column responsive layout with profile photo and professional bio. Skills displays a categorized, tier-based tech stack using badge/pill styling. Contact provides email and social profile links with proper accessibility and security attributes.

All content is bilingual (EN/ES) via next-intl translation files already structured in the codebase. The phase builds on established patterns from Phases 1-4: Section component with alternating backgrounds, responsive typography scaling, dark mode support, and client-side i18n.

**Primary recommendation:** Use CSS Grid for two-column About layout with mobile stacking, implement skills as nested arrays in translation files with map-based rendering, and leverage lucide-react icons (already installed) for social links with proper ARIA labels and security attributes.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Content Strategy
- **D-01:** Use real content now (not placeholders) — add actual bio, skills list, and contact info in this phase
- **D-02:** Translations will have real text for immediate final result and proper content structure validation

#### About Section
- **D-03:** Two-column layout — profile photo on left (desktop), bio and details on right, stacks vertically on mobile
- **D-04:** Brief bio (2-3 sentences) — concise professional summary highlighting 19+ years experience and core expertise
- **D-05:** Just photo + bio — no additional stats, highlights, or availability status (keep it simple and professional)
- **D-06:** Update existing center-aligned layout in page.tsx to two-column responsive layout

#### Skills Section
- **D-07:** Category-based organization — group skills into 4 categories: Frontend, Backend, Cloud & DevOps, Tools & Practices (from translation files)
- **D-08:** Tier-based experience grouping — skills grouped by experience range: '10+ years', '5-10 years', '2-5 years' (shows depth without exact years for every skill)
- **D-09:** Badge/pill visual style — skills as rounded badges, potentially with category colors (e.g., blue Frontend, green Backend)
- **D-10:** Categories shown first, tiers nested within each category (e.g., Frontend section contains three tier subsections)

#### Contact Section
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ABOUT-01 | User can read professional bio and introduction in About section | Two-column responsive layout pattern, next-intl translation integration for bilingual bio content |
| ABOUT-02 | User understands professional background and expertise from About content | Translation file structure with about.bio and about.description keys already established |
| SKILL-01 | User can view categorized tech stack and skills | Category-based organization using translation file's skills.categories structure (frontend/backend/cloud/tools) |
| SKILL-02 | Skills are grouped logically (by technology type or domain) | Nested translation file structure with categories as parent keys, tier arrays as children |
| SKILL-03 | User can quickly scan years of experience per technology area | Tier-based grouping (10+/5-10/2-5 years) with visual hierarchy via typography and spacing |
| CONT-01 | User can find contact email address | mailto: link with translation file contact.email value, styled as prominent text link or button |
| CONT-02 | User can access LinkedIn profile link | Icon button using lucide-react LinkedIn icon, link from translation file, opens in new tab |
| CONT-03 | User can access GitHub profile link | Icon button using lucide-react GitHub icon, link from translation file, opens in new tab |
| CONT-04 | Social profile links open in new tab | target="_blank" rel="noopener noreferrer" attributes on all external links (security best practice) |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

**Critical:** Next.js 16 has breaking changes. Must read `node_modules/next/dist/docs/` before writing code.

**Enforced directives:**
- Next.js APIs, conventions, and file structure differ from training data — verify current patterns
- Heed deprecation notices
- Do not assume Next.js behavior matches training knowledge (as of January 2025)

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.0 | React framework | Already project foundation, App Router with i18n routing established |
| next-intl | 4.8.3 | Internationalization | Phase 4 implementation, provides useTranslations hook for bilingual content |
| react | 19.2.4 | UI library | Project base, server and client components |
| lucide-react | 0.577.0 | Icon library | Already installed, provides LinkedIn/GitHub/Mail icons with consistent styling |
| tailwindcss | 4.2.2 | Utility CSS | Phase 1 setup with CSS variables and @theme directive, responsive utilities |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 | Conditional classes | Already installed, use for dynamic badge colors and conditional styling |
| tailwind-merge | 3.5.0 | Class deduplication | Already installed, use when merging Tailwind classes programmatically |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| lucide-react | react-icons | lucide-react already installed, smaller bundle size, consistent design system |
| CSS Grid | Flexbox for two-column | Grid more semantic for two-dimensional layouts, easier responsive breakpoints |
| Translation files | Hardcoded content | Already using next-intl, maintains bilingual requirement, enables future content updates |

**Installation:**
No new packages required. All dependencies already installed in Phase 1-4.

**Version verification (as of 2026-03-27):**
```bash
npm list next next-intl lucide-react react tailwindcss
# Verified against package.json: all current stable versions
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/[lang]/
│   └── page.tsx              # Update About section, Skills section, Contact section
├── components/
│   └── Section.tsx           # Reuse for all sections (already exists)
└── messages/
    ├── en.json               # Extend with real content (bio, skills arrays, contact links)
    └── es.json               # Spanish translations (parallel structure)
```

### Pattern 1: Two-Column Responsive Layout

**What:** CSS Grid layout that stacks on mobile, displays side-by-side on desktop
**When to use:** About section with photo + bio, any content with primary/secondary hierarchy

**Example:**
```tsx
// Established pattern from Phase 2 responsive breakpoints (320px/768px/1440px)
<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
  <div className="flex justify-center lg:justify-start">
    {/* Profile photo - centers on mobile, left-aligned on desktop */}
    <Image src="/profile.jpg" alt="..." width={200} height={200} />
  </div>
  <div>
    {/* Bio content - full width on mobile, right column on desktop */}
    <p className="text-lg text-gray-600 dark:text-gray-300">{t('about.bio')}</p>
  </div>
</div>
```

**Rationale:** Grid provides natural two-column flow with gap spacing. `lg:grid-cols-2` breakpoint aligns with Phase 2's desktop navigation threshold (1024px). Mobile-first approach stacks vertically by default.

### Pattern 2: Nested Translation File Structure for Skills

**What:** Hierarchical JSON structure with categories → tiers → skill arrays
**When to use:** Skills section with category-based and tier-based grouping

**Example:**
```json
// messages/en.json
{
  "skills": {
    "categories": {
      "frontend": {
        "title": "Frontend",
        "tiers": {
          "10plus": {
            "label": "10+ years",
            "items": ["JavaScript", "TypeScript", "React", "HTML/CSS"]
          },
          "5to10": {
            "label": "5-10 years",
            "items": ["Next.js", "Vue.js", "Tailwind CSS"]
          },
          "2to5": {
            "label": "2-5 years",
            "items": ["React Server Components", "Astro"]
          }
        }
      },
      "backend": { /* similar structure */ }
    }
  }
}
```

**Usage in component:**
```tsx
const t = useTranslations('skills');
const categories = ['frontend', 'backend', 'cloud', 'tools'] as const;

{categories.map(category => (
  <div key={category}>
    <h3>{t(`categories.${category}.title`)}</h3>
    {['10plus', '5to10', '2to5'].map(tier => (
      <div key={tier}>
        <p>{t(`categories.${category}.tiers.${tier}.label`)}</p>
        <div className="flex flex-wrap gap-2">
          {/* Map over items array - requires type assertion or dynamic approach */}
        </div>
      </div>
    ))}
  </div>
))}
```

**Note:** next-intl's useTranslations with nested keys requires careful typing. Alternative approach: store skills as top-level JSON array and import directly (simpler but loses i18n abstraction).

### Pattern 3: Badge/Pill Components with Tailwind

**What:** Rounded, pill-shaped containers for skill tags with consistent spacing and hover effects
**When to use:** Skills display, tags, labels, any grouped items needing visual distinction

**Example:**
```tsx
// Inline component for skill badges
const SkillBadge = ({ label, color }: { label: string; color?: string }) => (
  <span
    className={`
      inline-block rounded-full px-4 py-2 text-sm font-medium
      ${color || 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}
      transition-transform hover:scale-105
    `}
  >
    {label}
  </span>
);

// Category-specific colors (Claude's discretion, must meet WCAG AA)
const categoryColors = {
  frontend: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  backend: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  cloud: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  tools: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
};
```

**Rationale:** Rounded-full creates pill shape. Dark mode uses 50% opacity backgrounds for subtlety. Hover scale adds interactivity without overwhelming. Category colors improve visual grouping.

### Pattern 4: Icon Buttons with Labels

**What:** Accessible button with icon + text label for social links
**When to use:** Contact section, any external link needing visual affordance

**Example:**
```tsx
import { Linkedin, Github, Mail } from 'lucide-react';

// Icon button with label (not icon-only, per D-13)
<a
  href={t('contact.linkedin')}
  target="_blank"
  rel="noopener noreferrer"
  className="
    flex items-center gap-2 rounded-md px-4 py-2
    text-gray-700 hover:bg-gray-100 hover:text-gray-900
    dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white
    transition-colors
  "
  aria-label="LinkedIn profile"
>
  <Linkedin className="h-5 w-5" />
  <span className="text-sm font-medium">{t('contact.linkedin')}</span>
</a>
```

**Rationale:** flex with gap-2 aligns icon + text. Icon size h-5/w-5 matches Phase 2's icon sizing in Header. rel="noopener noreferrer" prevents security vulnerabilities with target="_blank" (CONT-04). aria-label provides context for screen readers even with visible text label.

### Pattern 5: Mailto Links

**What:** Email link that opens default mail client
**When to use:** Contact section email display

**Example:**
```tsx
<a
  href={`mailto:${t('contact.emailAddress')}`}
  className="
    text-lg font-medium text-blue-600 hover:text-blue-800 underline
    dark:text-blue-400 dark:hover:text-blue-300
    transition-colors
  "
>
  {t('contact.emailAddress')}
</a>
```

**Rationale:** mailto: protocol triggers email client. Underline provides clear affordance for email links (standard pattern). Color distinguishes from body text while maintaining professional aesthetic.

### Anti-Patterns to Avoid

- **Icon-only buttons:** Phase 5 decision D-13 explicitly requires icon + text labels for accessibility
- **Exact years for every skill:** Decision D-08 uses tier ranges (10+/5-10/2-5) to avoid maintenance burden
- **Complex animations:** Keep transitions simple (hover scale, color transitions) per PROJECT.md "no gimmicky animations"
- **Hardcoded content in components:** All text must come from translation files for bilingual requirement
- **Forgetting rel="noopener noreferrer":** Security vulnerability when using target="_blank" (required by CONT-04)
- **Deep component extraction:** Keep sections inline in page.tsx unless reused (premature abstraction)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon library | Custom SVG icon components | lucide-react (already installed) | Consistent design system, tree-shakeable, maintained icons for LinkedIn/GitHub/Mail |
| Translation structure | Custom i18n solution | next-intl translation files (already configured) | Type-safe with TypeScript, hot-reload in dev, standard pattern from Phase 4 |
| Responsive breakpoints | Custom media queries | Tailwind responsive utilities (sm:/lg:/xl:) | Consistent with Phase 2 patterns, mobile-first, no CSS boilerplate |
| Conditional classes | String concatenation | clsx + tailwind-merge (already installed) | Handles edge cases, deduplicates classes, cleaner code |
| Dark mode styling | Custom CSS variables | Tailwind dark: prefix (established in Phase 3) | Already configured with ThemeProvider, automatic theme switching |
| Image optimization | <img> tag | next/image (used in current page.tsx) | Automatic optimization, lazy loading, responsive srcsets |

**Key insight:** Phases 1-4 established infrastructure that makes Phase 5 straightforward. No new libraries needed. Primary work is content authoring (translation files) and layout restructuring (page.tsx component updates).

## Common Pitfalls

### Pitfall 1: Translation File Type Safety

**What goes wrong:** TypeScript errors when accessing nested translation keys dynamically

**Why it happens:** next-intl uses dot notation (t('skills.categories.frontend.title')) but TypeScript can't infer deeply nested keys when building them dynamically

**How to avoid:**
- Option 1: Use explicit key strings where possible (preferred for readability)
  ```tsx
  t('skills.categories.frontend.title')
  ```
- Option 2: Use type assertion for dynamic keys
  ```tsx
  t(`skills.categories.${category}.title` as any)
  ```
- Option 3: Store skills as separate JSON and import directly (loses i18n abstraction)

**Warning signs:** TypeScript errors like "Argument of type string is not assignable to parameter of type..."

### Pitfall 2: Profile Image Path

**What goes wrong:** next/image fails with 404 if image path doesn't exist in public/ or isn't properly imported

**Why it happens:** Current page.tsx uses `/placeholder.svg` which may not exist. Phase 5 needs real profile photo.

**How to avoid:**
- Store profile photo in `public/profile.jpg` (or .png/.webp)
- Update Image src to `/profile.jpg`
- Or continue using placeholder until real photo is provided
- Verify file exists in public/ directory before committing

**Warning signs:** Console error "Failed to load resource: 404" for image path

### Pitfall 3: Skills Translation File Complexity

**What goes wrong:** Over-nested JSON structure becomes unmaintainable and hard to type in TypeScript

**Why it happens:** Trying to encode both category and tier structure in translation files with deep nesting

**How to avoid:**
- Balance: Use one level of nesting (categories) and store tiers as flat arrays
- Alternative structure:
  ```json
  {
    "skills": {
      "frontend": {
        "title": "Frontend",
        "expert": ["JavaScript", "TypeScript", "React"],
        "advanced": ["Next.js", "Vue.js"],
        "intermediate": ["Astro"]
      }
    }
  }
  ```
- This reduces nesting while maintaining category grouping

**Warning signs:** TypeScript errors, difficulty accessing deeply nested keys, hard to read JSON

### Pitfall 4: Badge Color Accessibility in Dark Mode

**What goes wrong:** Badge colors with good contrast in light mode fail WCAG AA in dark mode

**Why it happens:** Simply inverting colors doesn't account for different background luminance

**How to avoid:**
- Test both light and dark mode for each badge color
- Use lower opacity backgrounds in dark mode (e.g., `dark:bg-blue-900/50` instead of `dark:bg-blue-900`)
- Verify contrast ratios: https://webaim.org/resources/contrastchecker/
- Phase 3 established gray-950 dark mode background — test badge colors against this specific background

**Warning signs:** Text hard to read in dark mode, washed-out appearance, low contrast warnings in browser devtools

### Pitfall 5: External Link Security

**What goes wrong:** Using target="_blank" without rel="noopener noreferrer" exposes security vulnerability (tabnabbing)

**Why it happens:** Older patterns didn't include rel attributes, developer unfamiliarity with security implications

**How to avoid:**
- ALWAYS pair target="_blank" with rel="noopener noreferrer"
- Pattern:
  ```tsx
  <a href="..." target="_blank" rel="noopener noreferrer">
  ```
- Both attributes required: noopener prevents window.opener access, noreferrer prevents referrer header leakage

**Warning signs:** ESLint warnings about target="_blank", security audit failures

### Pitfall 6: Mobile Layout Testing

**What goes wrong:** Two-column About layout looks good on desktop but breaks on mobile (overlapping elements, tiny text, poor spacing)

**Why it happens:** Desktop-first development, not testing at Phase 2's target breakpoints (320px minimum)

**How to avoid:**
- Test at 320px, 768px, 1440px (Phase 2 breakpoints)
- Use Chrome DevTools responsive mode
- Verify grid stacks vertically on mobile (grid-cols-1 default)
- Check image sizing: may need smaller width on mobile
  ```tsx
  width={120} height={120} className="lg:w-[200px] lg:h-[200px]"
  ```

**Warning signs:** Horizontal scroll on mobile, overlapping text/images, tiny unreadable text

## Code Examples

Verified patterns from existing codebase and established conventions.

### About Section: Two-Column Layout

```tsx
// Source: Phase 2 responsive patterns, Phase 5 decision D-03/D-06
// Location: src/app/[lang]/page.tsx

<Section id="about">
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
    {/* Left column: Profile photo */}
    <div className="flex justify-center lg:justify-start">
      <Image
        src="/profile.jpg"
        alt="Emanuel Pereyra"
        width={200}
        height={200}
        priority={true}
        className="rounded-full"
      />
    </div>

    {/* Right column: Bio and details */}
    <div className="flex flex-col justify-center">
      <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
        Emanuel Pereyra
      </h1>
      <p className="text-lg text-gray-600 sm:text-xl dark:text-gray-300">
        {t('about.bio')}
      </p>
      <p className="mt-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        {t('about.description')}
      </p>
    </div>
  </div>
</Section>
```

### Skills Section: Category and Tier Structure

```tsx
// Source: Phase 5 decisions D-07 through D-10
// Location: src/app/[lang]/page.tsx

<Section id="skills">
  <h2 className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
    {t('sections.skills')}
  </h2>

  <div className="space-y-8">
    {/* Frontend Category */}
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {t('skills.categories.frontend')}
      </h3>

      {/* 10+ years tier */}
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          10+ years
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 transition-transform hover:scale-105 dark:bg-blue-900/50 dark:text-blue-300">
            JavaScript
          </span>
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 transition-transform hover:scale-105 dark:bg-blue-900/50 dark:text-blue-300">
            TypeScript
          </span>
          {/* More badges... */}
        </div>
      </div>

      {/* Repeat for 5-10 years, 2-5 years tiers */}
    </div>

    {/* Repeat for Backend, Cloud, Tools categories */}
  </div>
</Section>
```

### Contact Section: Email and Social Links

```tsx
// Source: Phase 5 decisions D-11 through D-14
// Location: src/app/[lang]/page.tsx
import { Linkedin, Github, Mail } from 'lucide-react';

<Section id="contact">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
      {t('sections.contact')}
    </h2>

    {/* CTA message */}
    <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
      {t('contact.cta')}
    </p>

    {/* Email link */}
    <div className="mb-6">
      <a
        href="mailto:emanuel.pereyra@example.com"
        className="inline-flex items-center gap-2 text-lg font-medium text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <Mail className="h-5 w-5" />
        <span>emanuel.pereyra@example.com</span>
      </a>
    </div>

    {/* Social links */}
    <div className="flex justify-center gap-4">
      <a
        href="https://www.linkedin.com/in/username"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-md px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        aria-label="LinkedIn profile"
      >
        <Linkedin className="h-5 w-5" />
        <span className="text-sm font-medium">{t('contact.linkedin')}</span>
      </a>

      <a
        href="https://github.com/username"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-md px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        aria-label="GitHub profile"
      >
        <Github className="h-5 w-5" />
        <span className="text-sm font-medium">{t('contact.github')}</span>
      </a>
    </div>
  </div>
</Section>
```

### Translation File Structure: Skills Data

```json
// Source: Phase 5 decision D-07, D-08
// Location: messages/en.json (extend existing structure)

{
  "skills": {
    "heading": "Skills & Technologies",
    "categories": {
      "frontend": "Frontend",
      "backend": "Backend",
      "cloud": "Cloud & DevOps",
      "tools": "Tools & Practices"
    },
    "data": {
      "frontend": {
        "10plus": ["JavaScript", "TypeScript", "React", "HTML/CSS", "Responsive Design"],
        "5to10": ["Next.js", "Vue.js", "Tailwind CSS", "Webpack"],
        "2to5": ["React Server Components", "Astro", "Vite"]
      },
      "backend": {
        "10plus": ["Node.js", "Express", "REST APIs", "PostgreSQL"],
        "5to10": ["GraphQL", "MongoDB", "Redis", "Microservices"],
        "2to5": ["Prisma", "tRPC", "Serverless Functions"]
      },
      "cloud": {
        "10plus": ["Git", "CI/CD", "Linux", "Docker"],
        "5to10": ["AWS", "Kubernetes", "Terraform", "GitHub Actions"],
        "2to5": ["Vercel", "Railway", "Cloudflare Workers"]
      },
      "tools": {
        "10plus": ["Agile", "Code Review", "Testing", "Documentation"],
        "5to10": ["TypeScript", "Jest", "ESLint", "Storybook"],
        "2to5": ["Playwright", "Vitest", "Turborepo"]
      }
    }
  },
  "contact": {
    "heading": "Get In Touch",
    "cta": "Let's connect and discuss how I can contribute to your team.",
    "email": "Email",
    "emailAddress": "emanuel.pereyra@example.com",
    "linkedin": "LinkedIn",
    "linkedinUrl": "https://www.linkedin.com/in/username",
    "github": "GitHub",
    "githubUrl": "https://github.com/username"
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Flexbox for all layouts | CSS Grid for two-dimensional layouts | ~2020 with broad browser support | Grid more semantic, fewer nested divs, natural responsive behavior |
| Icon fonts (Font Awesome) | SVG component libraries (lucide-react, react-icons) | ~2021 | Better performance, tree-shaking, customizable colors without CSS hacks |
| Separate mobile/desktop components | Responsive utilities (Tailwind sm:/lg:) | ~2019 with utility-first CSS | Single component, easier maintenance, consistent breakpoints |
| Hard-coded strings | i18n from day one | Ongoing best practice | Easier to add languages later, content separate from code |
| target="_blank" alone | target="_blank" + rel="noopener noreferrer" | ~2018 security advisory | Prevents tabnabbing security vulnerability |

**Deprecated/outdated:**
- **Icon fonts:** Font Awesome and similar icon fonts still work but SVG components provide better performance and flexibility
- **display: table for layouts:** Superseded by Flexbox and Grid, no longer needed for vertical centering or equal-height columns
- **Separate .module.css files:** Tailwind utility classes reduce need for CSS Modules in most cases (still valid for complex animations)

## Environment Availability

> Phase has no external dependencies beyond npm packages already installed. All requirements met by existing codebase infrastructure.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| next | Framework base | ✓ | 16.2.0 | — |
| next-intl | Bilingual content | ✓ | 4.8.3 | — |
| lucide-react | Social icons | ✓ | 0.577.0 | — |
| tailwindcss | Styling | ✓ | 4.2.2 | — |

**Missing dependencies with no fallback:** None

**Missing dependencies with fallback:** None

**Note:** This is a code-only phase. No external services, databases, or build tools beyond existing Node.js/npm environment required.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — Wave 0 gap |
| Config file | None — see Wave 0 |
| Quick run command | N/A — no tests exist |
| Full suite command | N/A — no tests exist |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ABOUT-01 | User can read professional bio in About section | smoke | `npx playwright test --grep "about section" -x` | ❌ Wave 0 |
| ABOUT-02 | User understands professional background from content | manual-only | N/A — subjective content quality evaluation | N/A (manual review) |
| SKILL-01 | User can view categorized tech stack | smoke | `npx playwright test --grep "skills section" -x` | ❌ Wave 0 |
| SKILL-02 | Skills grouped by technology type | unit | `npm test -- src/app/[lang]/page.test.tsx -t "skills categories" -x` | ❌ Wave 0 |
| SKILL-03 | User can scan years of experience per area | smoke | `npx playwright test --grep "skill tiers" -x` | ❌ Wave 0 |
| CONT-01 | User can find contact email | smoke | `npx playwright test --grep "email link" -x` | ❌ Wave 0 |
| CONT-02 | User can access LinkedIn profile link | smoke | `npx playwright test --grep "linkedin link" -x` | ❌ Wave 0 |
| CONT-03 | User can access GitHub profile link | smoke | `npx playwright test --grep "github link" -x` | ❌ Wave 0 |
| CONT-04 | Social links open in new tab | unit | `npm test -- src/app/[lang]/page.test.tsx -t "external links" -x` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** Insufficient — no test framework installed
- **Per wave merge:** Insufficient — no test framework installed
- **Phase gate:** Manual validation via browser testing (light/dark mode, EN/ES, responsive breakpoints)

### Wave 0 Gaps

**Critical:** No test framework configured. Phase 5 can proceed with manual testing but future phases should establish testing infrastructure.

#### Missing Test Infrastructure

- [ ] **Playwright for E2E/smoke tests** — covers ABOUT-01, SKILL-01, SKILL-03, CONT-01, CONT-02, CONT-03
  - Install: `npm install -D @playwright/test`
  - Config: `playwright.config.ts` with base URL and browser setup
  - Test file: `tests/content-sections.spec.ts`
  - Quick run: `npx playwright test --grep "content sections" -x` (~10 seconds)

- [ ] **Jest + React Testing Library for unit tests** — covers SKILL-02, CONT-04
  - Install: `npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom`
  - Config: `jest.config.js` with Next.js preset
  - Test file: `src/app/[lang]/__tests__/page.test.tsx`
  - Quick run: `npm test -- --testPathPattern=page.test.tsx -x` (~5 seconds)

- [ ] **Manual test checklist** — covers ABOUT-02 (content quality)
  - Document: `.planning/phases/05-core-content-sections/MANUAL-TESTS.md`
  - Items: Bio clarity, professional tone, 19+ years highlighted, bilingual accuracy, recruiter perspective

#### Recommended Approach

**For Phase 5:**
- Proceed with manual testing (browser-based)
- Test checklist: About layout responsive, Skills badges render, Contact links work, EN/ES translations complete, dark mode styling correct

**For Future Phases:**
- Phase 8 (Performance & Quality) should add test infrastructure
- Playwright for smoke tests (fast, covers user requirements)
- Jest for unit tests (fast, covers component logic)
- Manual checklist for subjective quality evaluation

**Effort estimate:** 2-3 hours to set up test infrastructure (Playwright + Jest), 1 hour to write tests for Phase 5 requirements, ~30 seconds to run quick test suite on subsequent commits.

## Open Questions

1. **Profile Photo Source**
   - What we know: Current page.tsx uses /placeholder.svg (may not exist)
   - What's unclear: Is real profile photo available? What dimensions/format?
   - Recommendation: Use placeholder for Phase 5 implementation, replace with real photo before deployment. Verify /placeholder.svg exists or create temporary placeholder.

2. **Actual Contact Information**
   - What we know: Translation files need real email and social profile URLs (decision D-01)
   - What's unclear: What are the actual LinkedIn/GitHub URLs? Real email address?
   - Recommendation: Use example.com placeholders in code, add actual URLs to translation files in Wave 1 or before deployment.

3. **Skills List Content**
   - What we know: Need to populate skills.data structure with real skills in 4 categories × 3 tiers
   - What's unclear: Complete list of skills and accurate tier placement (10+/5-10/2-5 years)
   - Recommendation: Draft initial skills list based on "19+ years experience" and "full-stack engineer" from bio. User can refine in translation files.

4. **Badge Color Accessibility Verification**
   - What we know: Category badges need colors that meet WCAG AA in both light and dark mode
   - What's unclear: Do proposed colors (blue/green/purple/orange) pass contrast checks against gray-950 dark mode background?
   - Recommendation: Test with contrast checker (https://webaim.org/resources/contrastchecker/) during implementation. Use 50% opacity backgrounds in dark mode as starting point.

## Sources

### Primary (HIGH confidence)

- **Codebase inspection** — src/app/[lang]/page.tsx, src/components/Section.tsx, messages/en.json (existing patterns and structure)
- **package.json** — Verified versions: next@16.2.0, next-intl@4.8.3, lucide-react@0.577.0, tailwindcss@4.2.2
- **Phase 1-4 CONTEXT.md files** — Established patterns: responsive breakpoints (320px/768px/1440px), dark mode colors (gray-950 bg), translation file structure
- **CLAUDE.md directive** — Next.js 16 breaking changes warning, must verify current APIs

### Secondary (MEDIUM confidence)

- **React documentation (training data, Jan 2025)** — Component patterns, hooks usage (useTranslations from next-intl)
- **Tailwind CSS documentation (training data, v4.0)** — Utility classes, responsive modifiers, dark mode prefix
- **Web standards (MDN, 2024-2025)** — target="_blank" security, mailto: links, CSS Grid layout

### Tertiary (LOW confidence)

- None — all findings verified against codebase or official package versions

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All packages already installed and versions verified via npm list
- Architecture: HIGH — Patterns established in Phases 1-4, reusing existing infrastructure
- Pitfalls: MEDIUM — Based on common React/Next.js issues, not Phase 5 specific experience
- Translation file structure: MEDIUM — next-intl typing with nested keys requires careful approach
- Badge color accessibility: LOW — Needs verification during implementation with contrast checker

**Research date:** 2026-03-27
**Valid until:** 2026-04-27 (30 days - stable technologies, unlikely to change)

---

*Research complete. Ready for planning.*
