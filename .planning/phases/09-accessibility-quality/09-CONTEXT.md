# Phase 9: Accessibility & Quality - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Ensure the portfolio site meets professional standards with keyboard navigation, screen reader support, and WCAG AA compliance for both light and dark themes. Deliver a polished, modern corporate aesthetic (clean and minimal like Stripe/Vercel) with proper visual hierarchy, readable typography, and accessible interactions.

</domain>

<decisions>
## Implementation Decisions

### Bug Fixes (Priority - Must Do First)

- **D-01:** Header overlap fix — Add top padding to main content equal to header height (h-14 mobile / h-20 desktop) to prevent About section from being covered by sticky header
- **D-02:** Contact section detection — Fix IntersectionObserver by adjusting rootMargin or adding min-height to Contact section (too short for -20% top / -80% bottom threshold)
- **D-03:** Contact information updates:
  - Email: emanuel.pereyra77@gmail.com
  - LinkedIn: emap77
  - Add Twitter/X icon → https://x.com/emapereyra77
  - Add Instagram icon → https://www.instagram.com/emanuel.pereyra77/

### Visual Design Aesthetic

- **D-04:** Design reference — Clean and minimal aesthetic (Stripe, Vercel): lots of whitespace, simple color palette (grays + one accent), understated elegance, professional without flashy
- **D-05:** Typography scale — Keep current text-xl/2xl/3xl sizing, refine font weights, line heights, and letter spacing for polish (no size changes)
- **D-06:** Spacing rhythm — Increase whitespace with more generous section padding and larger gaps between elements for premium, less cramped feel
- **D-07:** Color palette shift — Use cooler grays with subtle blue tint (slate-* scale) instead of neutral gray-* for modern, tech-forward feel like Vercel
- **D-08:** Light mode section differentiation — Use gray-50 for alternate sections (subtle like Stripe) to improve visual separation while maintaining clean aesthetic

### Color Contrast Compliance

- **D-09:** WCAG AA audit approach — Comprehensive audit of all text/background combinations in both themes against 4.5:1 ratio for text, 3:1 for UI components
- **D-10:** Dark mode contrast fixes — Lighten text colors (use gray-200/300 instead of gray-400) to ensure 4.5:1 ratio on dark backgrounds
- **D-11:** Fix all violations found during audit — No exceptions, achieve full WCAG AA compliance in both light and dark modes

### Keyboard Navigation

- **D-12:** Focus indicators — Use Tailwind's focus-visible:ring-2 with blue outline (enhanced browser default), clearly visible in both themes
- **D-13:** Skip to main content link — Add hidden-by-default skip link that appears on first Tab press, following WCAG best practice
- **D-14:** Tab order — Logical top-to-bottom, left-to-right using natural DOM order (no custom tabindex): Header (logo, nav, theme, lang) → Main sections → within-section elements

### Screen Reader Support

- **D-15:** ARIA labeling — Essential landmarks and labels only (role="main", role="navigation", aria-label where needed for buttons/icons). Don't over-annotate.
- **D-16:** Section change announcements — Use aria-live region to announce "Now viewing: [Section]" when IntersectionObserver updates active section
- **D-17:** Alt text detail — Descriptive but concise. Profile: "Emanuel Pereyra, Software Engineer". Projects: Brief description of what's shown.
- **D-18:** Semantic HTML priority — Rely on semantic elements (nav, main, section, h1-h6) as foundation, add ARIA only where semantics aren't clear

### Claude's Discretion

- Exact font weight values and line-height adjustments within the refinement guideline
- Specific spacing values (px/rem) for the increased whitespace rhythm
- Implementation approach for skip link (CSS vs JS, positioning)
- Exact contrast ratios above minimum (anything ≥ 4.5:1 for text, ≥ 3:1 for UI)
- aria-live region implementation details (assertive vs polite, debouncing)

</decisions>

<canonical_refs>
## Canonical References

No external specs — requirements are fully captured in decisions above.

**WCAG 2.1 AA References (external):**
- Color contrast: 4.5:1 for normal text, 3:1 for large text and UI components
- Keyboard accessibility: All functionality available via keyboard
- Focus visible: Focus indicator must be visible

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **Header.tsx** — Already uses semantic HTML (`<header>`, `<nav>`), IntersectionObserver for active section tracking, aria-labels on buttons
- **Section.tsx** — Component for semantic sections, likely uses `<section>` tag with id props
- **globals.css** — Has smooth scroll behavior, scroll-padding-top (needs adjustment for bug fix), theme transition config
- **Tailwind config** — Uses darkMode: 'class' strategy, ready for color palette shift to slate-* scale
- **Inter + Roboto Mono fonts** — Already loaded via next/font, good foundation for typography refinement

### Established Patterns

- **Dark mode** — next-themes with class strategy, 150ms transitions on color properties only
- **Responsive design** — Mobile-first with lg: breakpoint patterns (h-14 mobile, h-20 desktop for header)
- **Navigation** — Hash-based smooth scroll with IntersectionObserver for active state tracking
- **Color system** — Currently uses gray-* scale, needs shift to slate-* for cooler tone

### Integration Points

- **Header height** — Main content padding must account for h-14 (mobile) and h-20 (desktop) sticky header
- **IntersectionObserver config** — In Header.tsx useEffect, currently uses rootMargin: '-20% 0px -80% 0px'
- **Section backgrounds** — Section.tsx likely has `alternate` prop for background color toggling
- **Theme transitions** — globals.css already has transition config, may need focus ring exception (instant, not animated)
- **Translation system** — next-intl for all content, contact info updates need translation file changes

</code_context>

<specifics>
## Specific Ideas

- **Stripe/Vercel reference** — "Lots of whitespace, simple color palette (grays + one accent), understated elegance"
- **Contact info** — Specific email format: emanuel.pereyra77@gmail.com (note @gmail.com, not <at>)
- **Social profiles** — LinkedIn: emap77 (not full URL path), Twitter: emapereyra77, Instagram: emanuel.pereyra77
- **Light mode sections** — "gray one should be darker but compliant" → gray-50 for subtle differentiation like Stripe

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. All bugs and polish items fit accessibility & quality domain.

</deferred>

---

*Phase: 09-accessibility-quality*
*Context gathered: 2026-03-31*
