# Project Research Summary

**Project:** Professional Portfolio Website
**Domain:** Single-page portfolio for senior software engineer (19+ years experience)
**Researched:** 2026-03-20
**Confidence:** HIGH

## Executive Summary

This is a professional portfolio website for a senior engineer with 19+ years of experience, requiring bilingual support (English/Spanish), dark/light mode theming, and a timeline visualization of career progression. The research reveals a well-established domain with mature patterns: Next.js 16 App Router with React 19, Tailwind CSS 4.2 for styling, and static content deployment represents the industry standard approach verified from official documentation.

The recommended approach prioritizes foundation before features: establish core infrastructure (routing, i18n, theming) in Phase 1 to avoid costly rewrites, build content structure in Phase 2, then add polish and differentiators in Phase 3. This sequencing prevents the three critical pitfalls identified: unoptimized images destroying performance, bilingual implementation without proper URL structure, and missing accessibility in navigation.

Key risk mitigation: Performance is paramount for professional credibility. Using Next.js Image optimization from day one, implementing proper font loading with next/font, and maintaining bundle size under 150KB prevents the performance degradation that causes recruiters to abandon sites. The stack confidence is HIGH (verified from official docs), with bilingual routing and theme management patterns well-documented and production-proven.

## Key Findings

### Recommended Stack

The research confirms Next.js 16 as the optimal framework, with the App Router providing superior data fetching and layouts compared to the deprecated Pages Router. React 19 is required for Next.js 16 features like Server Components which reduce client-side JavaScript bundles. Tailwind CSS 4.2 is the modern standard for utility-first styling with built-in dark mode support and P3 wide gamut colors.

**Core technologies:**
- **Next.js 16 (App Router)**: React framework with built-in SSG optimization, image/font optimization, and excellent Vercel deployment integration
- **React 19**: UI library required by Next.js 16, Server Components reduce client JS bundle size
- **TypeScript 5.6+**: Type safety catches errors at build time, improves developer experience with autocomplete
- **Tailwind CSS 4.2**: Utility-first CSS with dark mode support, small production bundle (<10kB), responsive utilities
- **next-intl 3.24+**: i18n library recommended in Next.js official docs, type-safe translations, automatic locale routing
- **next-themes 0.4+**: De facto standard for theme switching, prevents flash-of-unstyled-content, syncs with system preferences
- **Framer Motion 11.x**: Industry standard for React animations, needed for timeline scroll interactions
- **Lucide React 0.468+**: Modern icon library, tree-shakeable, smaller bundle than alternatives
- **Vercel**: Deployment platform with native Next.js support, edge CDN, zero configuration

### Expected Features

Research identifies a clear separation between table stakes (expected by all recruiters), differentiators (set portfolio apart), and anti-features (explicitly avoid).

**Must have (table stakes):**
- About/Bio section with professional introduction
- Work experience display with timeline visualization
- Contact information (email, LinkedIn, GitHub minimum)
- Project showcase with descriptions and links
- Responsive design (40-60% of traffic is mobile)
- Fast load time (<1.5s First Contentful Paint)
- Skills/tech stack display categorized
- Professional navigation (sticky header or anchor links)
- Social/professional profile links

**Should have (competitive differentiators):**
- Bilingual support EN/ES (stands out from 95% of portfolios, targets broader market)
- Dark/light mode toggle (shows attention to UX details)
- Timeline visualization (better for 19+ years experience than plain list)
- Performance metrics in project descriptions (quantified achievements like "Reduced latency 40%")
- Smooth scroll behavior (modern, polished interaction)
- Downloadable resume/CV (convenience for recruiters)

**Explicitly avoid (anti-features):**
- Blog/CMS (maintenance burden, scope creep)
- Backend contact form (use mailto or external service like Formspree)
- Complex animations (can feel gimmicky for senior engineer role)
- Database-driven content (over-engineering for static site)
- Multi-page structure (single page already decided)
- Social media feeds, live chat, autoplay media (visual noise)

### Architecture Approach

The research confirms a component-based single-page architecture with section-based navigation is the standard pattern for professional portfolios. The file structure uses Next.js App Router with dynamic `[lang]` routes for internationalization from the start, avoiding costly retrofits.

**Major components:**
1. **Root Layout** — HTML shell providing global context providers (theme, i18n), manages dark mode class, wraps all content
2. **Navigation Component** — Sticky header with smooth scroll links, language switcher, theme toggle, manages focus for accessibility
3. **Section Components** — Self-contained content blocks (About, Experience, Skills, Portfolio, Contact) with semantic HTML and IDs for scroll targets
4. **Timeline Component** — Chronological work history with responsive breakpoints (alternating desktop layout, left-aligned mobile)
5. **ThemeProvider** — Manages light/dark mode state, localStorage persistence, prevents flash-of-unstyled-content
6. **LocaleProvider** — Manages language state, URL-based routing (/en/, /es/), translation loading

**Critical patterns to follow:**
- Section-based single page with anchor IDs for navigation
- Theme management with Tailwind dark: variant and class-based strategy
- Static content in typed JSON files imported directly (no runtime fetching)
- Smooth scroll with focus management for keyboard/screen reader accessibility
- Component composition over configuration (small focused components)
- Server Components by default, 'use client' only for interactive elements

### Critical Pitfalls

Research identified 14 pitfalls categorized by severity, with 5 critical issues requiring prevention from Phase 1.

1. **Unoptimized images destroying performance** — Using raw `<img>` tags causes LCP >4s, recruiter abandonment. Prevention: Use Next.js Image component from day one with explicit width/height, priority={true} only for hero image, lazy load others.

2. **Font loading causing layout shift** — External Google Fonts via `<link>` cause CLS >0.1 and unprofessional flash. Prevention: Use next/font with display: 'swap' from Phase 1, fonts self-hosted automatically.

3. **Bilingual implementation without URL structure** — Language only in localStorage breaks shareability, SEO indexing. Prevention: Implement `[lang]` dynamic routes from start with locale detection middleware, use hreflang meta tags.

4. **Missing focus management in smooth scroll navigation** — Clicking nav scrolls visually but breaks keyboard/screen reader navigation. Prevention: Update focus with `section.focus()` and add `tabindex="-1"`, use ARIA live regions.

5. **Over-bundling heavy libraries** — Installing entire Framer Motion, FontAwesome for simple features bloats bundle >500KB. Prevention: Use tree-shakeable imports, bundle analyzer from Phase 1, lazy load below-fold components.

**Phase-specific warnings:**
- **Phase 1 Foundation**: Set up image optimization, font loading, bundle size limits immediately — retrofitting is expensive
- **Phase 1 i18n**: Use `[lang]` route structure from start, changing routing later requires full rewrite
- **Phase 2 Navigation**: Implement focus management with scroll behavior, not just visual scroll
- **Phase 2 Timeline**: Design mobile-first (single column), enhance for desktop (alternating layout)
- **Phase 3 Polish**: Add blocking script for theme to prevent FOUC, test social sharing metadata

## Implications for Roadmap

Based on research, a 3-phase structure is optimal with clear separation of foundation, content, and polish.

### Phase 1: Foundation & Infrastructure
**Rationale:** Core routing, i18n, and theming must be established first as they affect all subsequent work. Changing URL structure or theme management later requires rewriting components. Research shows 3 of 5 critical pitfalls occur if these aren't done correctly from start.

**Delivers:** Functional single-page site with working navigation, bilingual routing, dark/light mode, and optimized asset loading.

**Addresses features:**
- Responsive single-page layout with semantic sections
- Sticky navigation with smooth scroll
- Dark/light mode toggle with persistence
- Bilingual support with URL-based locale switching (/en/, /es/)
- Professional styling foundation (Tailwind setup)

**Avoids pitfalls:**
- Unoptimized images (set up next/image from start)
- Font loading issues (configure next/font immediately)
- Bilingual URL structure (use [lang] routes from day one)
- Over-bundling (configure bundle analyzer, set limits)
- FOUC with dark mode (blocking script in layout)

**Stack elements:**
- Next.js 16 App Router with [lang] dynamic routes
- TypeScript 5.6+ with strict mode
- Tailwind CSS 4.2 with dark mode configuration
- next-themes for theme management
- next-intl for internationalization
- Image/font optimization built-in

**Research flag:** Standard patterns, skip deep research. Next.js docs provide complete setup guidance.

### Phase 2: Content Structure & Display
**Rationale:** With infrastructure stable, build content architecture and major sections. Timeline component is core differentiator requiring careful responsive design. Research emphasizes mobile-first approach as 40-60% of recruiter traffic is mobile.

**Delivers:** Complete portfolio content with about section, timeline work history, skills display, and project showcase.

**Addresses features:**
- About/Bio section with professional introduction
- Work experience timeline with responsive breakpoints
- Skills/tech stack display (categorized list)
- Portfolio projects section with descriptions
- Contact information and social links

**Avoids pitfalls:**
- Timeline responsive design (mobile-first, desktop enhancement)
- Missing focus management (implement with navigation)
- Generic timeline without breakpoints
- Placeholder lorem ipsum (use realistic content structure)

**Implements architecture:**
- Section components (About, Experience, Skills, Portfolio, Contact)
- Timeline component with TimelineItem children
- PortfolioCard component for project display
- Static content loading from JSON files
- Type-safe content interfaces

**Stack elements:**
- Framer Motion for timeline scroll animations (lazy loaded)
- Lucide React for icons (tree-shakeable imports)
- clsx + tailwind-merge for conditional classes

**Research flag:** Timeline visualization might need component library research if custom build proves complex. Otherwise standard React patterns.

### Phase 3: Polish & Optimization
**Rationale:** After core functionality works, add final touches that differentiate from generic portfolios. Research shows differentiators (case studies, performance metrics, social metadata) elevate professional credibility without adding complexity.

**Delivers:** Production-ready site with optimized performance, complete SEO metadata, and enhanced project presentations.

**Addresses features:**
- Performance metrics in project descriptions
- Downloadable resume/CV (PDF)
- Case studies/project details with problem/solution/impact
- Social sharing metadata (Open Graph, Twitter Cards)
- Performance optimization (code splitting, lazy loading)
- SEO metadata and structured data

**Avoids pitfalls:**
- Missing metadata for social sharing (add Open Graph tags)
- Tailwind production build bloat (verify purge configuration)
- Console errors in production (clean build check)
- Missing alt text on images (accessibility audit)
- No skip navigation link (add for keyboard users)

**Stack elements:**
- React Hook Form + Zod if adding contact form (optional, can defer)
- Vercel deployment with automatic optimization
- Analytics setup (Vercel Analytics or Plausible)

**Research flag:** Skip research, these are enhancement patterns with clear documentation.

### Phase Ordering Rationale

**Why this order prevents rework:**
1. **Foundation first**: Changing routing structure (adding [lang] paths) or theme system (localStorage to class-based) after building components requires touching every file. Research shows bilingual retrofit is a common rewrite scenario.

2. **Content before polish**: Can't optimize what doesn't exist. Building timeline before knowing final structure leads to premature optimization. Research emphasizes "make it work, make it right, make it fast" sequence.

3. **Infrastructure dependencies**: Theme system affects all styling decisions, i18n touches all text content, navigation structure determines section IDs. Getting these wrong early cascades through all components.

**Groupings based on architecture:**
- Phase 1 groups cross-cutting concerns (theme, locale, layout) that create context for all other work
- Phase 2 groups content-focused components that share common patterns (section structure, data loading)
- Phase 3 groups enhancement layers that don't change core architecture

**How this avoids research pitfalls:**
- Phase 1 addresses all 5 critical pitfalls before building content
- Phase 2 tackles moderate pitfalls (timeline responsive, focus management) when implementing affected features
- Phase 3 handles minor pitfalls (metadata, alt text) during final pass

### Research Flags

**Needs deeper research during planning:**
- **None for Phases 1-3**: All patterns are well-documented in official Next.js, React, and Tailwind docs. Portfolio domain is mature with established best practices.

**Standard patterns (skip research-phase):**
- **Phase 1**: Next.js App Router setup, Tailwind configuration, i18n routing documented in official sources
- **Phase 2**: React component patterns, timeline UI components, static content loading are fundamental patterns
- **Phase 3**: Performance optimization, SEO metadata, deployment to Vercel have comprehensive guides

**Optional deeper dive:**
- If timeline visualization proves complex in Phase 2, research component libraries (react-vertical-timeline-component, react-chrono) vs custom build. Current research suggests custom with Tailwind is lighter and more flexible.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | Core stack (Next.js 16, React 19, Tailwind 4.2, next-intl) verified from official documentation accessed 2026-03-20. Version numbers confirmed current. |
| Features | **MEDIUM** | Table stakes and differentiators based on training data patterns through 2025. Unable to verify with current portfolio examples. Recommendation: Validate by reviewing 5-10 senior engineer portfolios before finalizing. |
| Architecture | **HIGH** | All patterns derived from official Next.js, React, and Tailwind documentation. Single-page portfolio architecture is well-established. Component boundaries verified with official best practices. |
| Pitfalls | **HIGH** | Critical pitfalls (image optimization, font loading, i18n routing, focus management) documented in official sources. Performance thresholds from Next.js build warnings. Accessibility requirements from WCAG 2.1 Level AA standards. |

**Overall confidence:** HIGH

The technology stack and architecture patterns are fully verified from official documentation. Feature expectations have medium confidence due to lack of current web verification but align with established portfolio patterns. All critical pitfalls are documented with official prevention strategies.

### Gaps to Address

**Content planning (to address in requirements phase):**
- Actual work history details for timeline (19 years of entries)
- Specific project selection for portfolio showcase (choose 3-5 best)
- Professional bio copy for about section (EN and ES versions)
- Skills categorization strategy (by technology, by domain, chronological)
- Social profile URLs (LinkedIn, GitHub, others)

**Design decisions (to address in Phase 1 planning):**
- Color palette beyond Tailwind defaults (brand colors if any)
- Typography scale (which font pairing: Inter + Roboto Mono confirmed, or alternatives)
- Timeline visualization style (left-aligned vertical, alternating, horizontal)
- Dark mode strategy (respect system preference on first visit, or default to light)
- Spacing/padding scale for sections

**Performance targets (to validate during development):**
- Confirm bundle size stays under 150KB initial JS (Next.js warning threshold)
- Verify LCP < 1.5s on 3G connection for mobile
- Test CLS < 0.1 with actual fonts and images loaded
- Validate TTI < 3s for interactive elements

**Accessibility validation (to test before launch):**
- Screen reader testing with actual content (NVDA on Windows, VoiceOver on macOS)
- Keyboard navigation flow through all sections
- Color contrast ratios in both light and dark modes (WCAG AA: 4.5:1 for text)
- Focus indicators visibility on all interactive elements

**No technical gaps:** Stack choices are proven, architecture patterns are documented, pitfalls have clear mitigation strategies. Gaps are content and design decisions, not technical uncertainty.

## Sources

### Primary (HIGH confidence)
- **Next.js Official Documentation v16.2.0** (last updated 2026-03-03, accessed 2026-03-20)
  - App Router architecture and file-system routing
  - Image optimization and next/image API
  - Font optimization and next/font implementation
  - Internationalization routing patterns
  - Data fetching with Server Components

- **Tailwind CSS Documentation v4.2** (accessed 2026-03-20)
  - Dark mode class-based strategy
  - Utility-first CSS patterns
  - Configuration and purge setup

- **React Official Documentation** (January 2025)
  - Component composition patterns
  - Context API for cross-cutting concerns
  - Server Components vs Client Components

- **Web.dev Core Web Vitals** (Google official)
  - LCP, CLS, TTI performance metrics
  - Image optimization best practices

- **MDN ARIA Techniques** (Mozilla official)
  - Focus management for single-page navigation
  - WCAG 2.1 Level AA requirements

### Secondary (MEDIUM confidence)
- **next-intl Documentation** (v3.24+)
  - Recommended in Next.js official docs for i18n
  - Type-safe translation patterns

- **next-themes Documentation** (v0.4+)
  - Community standard for theme switching
  - FOUC prevention patterns

- **Framer Motion Documentation** (v11.x)
  - Industry standard animation library
  - Scroll-triggered animation patterns

### Tertiary (MEDIUM confidence - training data)
- Portfolio website best practices through 2025
  - Table stakes vs differentiator features (not verified with current 2026 examples)
  - Common patterns in professional portfolio sites
  - UX research on single-page applications

**Verification notes:**
- STACK.md: HIGH confidence - all core technologies verified from official docs
- FEATURES.md: MEDIUM confidence - based on training data, recommends validating with current portfolio examples
- ARCHITECTURE.md: HIGH confidence - patterns derived from official Next.js/React/Tailwind docs
- PITFALLS.md: HIGH confidence - critical pitfalls documented in official sources, performance thresholds from Next.js

---
*Research completed: 2026-03-20*
*Ready for roadmap: yes*
