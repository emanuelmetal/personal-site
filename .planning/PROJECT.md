# Professional Portfolio Website

## What This Is

A single-page personal portfolio website for a seasoned Software Engineer with 19 years of experience. The site showcases work history in a timeline format and professional portfolio projects, targeting recruiters and potential customers. Features bilingual support (English/Spanish), light/dark mode, and smooth scroll navigation with a sticky header. The design aesthetic is modern corporate—polished and professional to appeal to enterprise recruiters.

## Core Value

Recruiters and customers can immediately understand who I am, what I've built, and how to reach me—all in a clean, professional single-page experience.

## Requirements

### Validated

- [x] Single-page layout with smooth scroll navigation — Validated in Phase 2: Layout & Navigation
- [x] Sticky navigation bar that scrolls to sections — Validated in Phase 2: Layout & Navigation
- [x] Five main sections: About, Experience, Skills, Portfolio, Contact — Validated in Phase 2: Layout & Navigation
- [x] Responsive design for desktop, tablet, and mobile — Validated in Phase 2: Layout & Navigation
- [x] Light and dark mode toggle — Validated in Phase 3: Theme System
- [x] Theme preference persists across visits — Validated in Phase 3: Theme System

### Active

- [ ] Work history presented as chronological timeline with key roles and achievements
- [ ] Portfolio section showcasing professional work projects
- [ ] Internationalization support (English and Spanish)
- [ ] Language switcher in navigation
- [ ] Modern corporate design aesthetic (polished, professional)
- [ ] Placeholder content for initial build (real content added later)
- [ ] Optimized for Vercel/Netlify deployment

### Out of Scope

- Blog or content management system — Single page only, no dynamic content
- Contact form with backend — Simple mailto or external service links sufficient
- Animations or complex interactions — Keep it professional and straightforward
- Custom CMS — Content hardcoded or in config files, not database-driven
- Multi-page navigation — Everything on one scrollable page

## Context

- 19 years of software engineering experience to showcase
- Target audience: enterprise recruiters (FAANG-level expectations) and potential customers
- Need to convey senior-level professionalism through design
- Content will be added incrementally (start with placeholders)
- Site represents career identity, so design quality matters for first impressions

## Constraints

- **Tech Stack**: Next.js, React, Tailwind CSS — Modern React ecosystem preferred
- **Languages**: English and Spanish support required from launch
- **Design**: Modern corporate aesthetic (not minimalist or overly technical)
- **Deployment**: Must work seamlessly on Vercel/Netlify free tier
- **Performance**: Fast load times expected for portfolio site

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-page design with sticky nav | Simplifies navigation, common portfolio pattern | ✓ Complete (Phase 2) |
| Timeline format for work history | 19 years of experience needs chronological structure | — Pending |
| Placeholder content first | Decouple site building from content writing | — Pending |
| Next.js + Tailwind | Modern stack, great DX, Vercel-optimized | ✓ Complete (Phase 1) |
| Modern corporate aesthetic | Appeals to enterprise recruiters, shows professionalism | — Pending |
| Minimal desktop nav with mobile hamburger | Saves vertical space, familiar mobile UX | ✓ Complete (Phase 2) |
| Native CSS smooth scroll | Zero JavaScript, browser-native performance | ✓ Complete (Phase 2) |
| Content-based section heights | Natural for varying content amounts | ✓ Complete (Phase 2) |
| Three-state theme system (light/dark/system) | Respects user preference and system settings, WCAG AA compliant | ✓ Complete (Phase 3) |

---
*Last updated: 2026-03-23 after Phase 3 completion*

**Current State:** Phase 3 complete — Theme system implemented with three-state toggle (light/dark/system), localStorage persistence, system preference detection, FOUC prevention, and smooth transitions. Site now fully supports both light and dark modes across all components.
