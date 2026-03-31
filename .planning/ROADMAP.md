# Roadmap: Professional Portfolio Website

**Project:** Professional Portfolio Website
**Created:** 2026-03-20
**Granularity:** Fine (9 phases)
**Coverage:** 41/41 v1 requirements mapped

## Phases

- [x] **Phase 1: Project Setup & Foundation** - Next.js 16 App Router project with TypeScript, Tailwind CSS, and optimized asset loading (completed 2026-03-20)
- [x] **Phase 2: Layout & Navigation** - Single-page layout with sticky navigation and smooth scroll behavior (completed 2026-03-20)
- [ ] **Phase 3: Theme System** - Dark/light mode toggle with persistence and system preference detection
- [ ] **Phase 4: Internationalization** - Bilingual support with URL-based locale switching (EN/ES)
- [ ] **Phase 5: Core Content Sections** - About, Skills, and Contact sections with placeholder content
- [ ] **Phase 6: Experience Timeline** - Work history timeline with responsive design
- [ ] **Phase 7: Portfolio Showcase** - Project showcase section with descriptions and links
- [ ] **Phase 8: Performance Optimization** - Bundle size optimization and Core Web Vitals targets
- [ ] **Phase 9: Accessibility & Quality** - Professional polish with keyboard navigation and WCAG AA compliance

## Phase Details

### Phase 1: Project Setup & Foundation
**Goal**: Development environment is ready with optimized Next.js infrastructure for building the portfolio site

**Depends on**: Nothing (first phase)

**Requirements**: PERF-01, PERF-02

**Success Criteria** (what must be TRUE):
1. Developer can run `npm run dev` and see Next.js app at localhost:3000
2. Images use Next.js Image component by default (no raw img tags)
3. Fonts are loaded via next/font without external requests
4. TypeScript compiles without errors in strict mode
5. Tailwind CSS utilities are available and purge is configured

**Plans:** 1/1 plans complete

Plans:
- [x] 01-01-PLAN.md — Initialize Next.js project with dependencies, i18n routing, font/image optimization, and dev tooling

---

### Phase 2: Layout & Navigation
**Goal**: Users can navigate the single-page portfolio smoothly with a professional sticky header

**Depends on**: Phase 1

**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04

**Success Criteria** (what must be TRUE):
1. User sees a single-page layout with semantic HTML sections (About, Experience, Skills, Portfolio, Contact)
2. Navigation bar remains visible at top while scrolling through all sections
3. User can click navigation links to smoothly scroll to target sections
4. Layout adapts responsively on mobile (320px), tablet (768px), and desktop (1440px) viewports
5. Section IDs match navigation anchor targets for reliable scroll behavior

**Plans:** 1/1 plans complete

Plans:
- [x] 02-01-PLAN.md — Build single-page layout with sticky header, mobile drawer, semantic sections, and smooth scroll

---

### Phase 3: Theme System
**Goal**: Users can switch between light and dark modes with their preference persisted across visits

**Depends on**: Phase 2

**Requirements**: THEME-01, THEME-02, THEME-03, THEME-04, THEME-05

**Success Criteria** (what must be TRUE):
1. User can toggle between light and dark themes using a control in the navigation
2. Selected theme persists when user closes browser and returns to site
3. Theme is detected from system preferences on first visit (prefers-color-scheme)
4. Theme changes apply instantly without page reload or flash of unstyled content
5. All content sections (text, backgrounds, borders) adapt to selected theme

**Plans:** 1 plan

Plans:
- [x] 03-01-PLAN.md — Theme infrastructure, toggle component, and Header/MobileDrawer integration with next-themes

---

### Phase 4: Internationalization
**Goal**: Users can switch between English and Spanish with URL-based language routing

**Depends on**: Phase 2

**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06

**Success Criteria** (what must be TRUE):
1. User can switch between English and Spanish using language switcher in navigation
2. URL reflects current language with /en/ or /es/ path segments
3. All content sections display in the selected language (About, Experience, Skills, Portfolio, Contact)
4. User can share URL and recipient sees same language
5. Browser language preference is detected on first visit to set initial language
6. Switching languages preserves scroll position in current section

**Plans:** 2 plans

Plans:
- [x] 04-01-PLAN.md — LanguageSwitcher component, navigation wrapper, translation files, Header/MobileDrawer integration
- [x] 04-02-PLAN.md — Gap closure: fix dark mode flash and scroll position loss on language switch

---

### Phase 5: Core Content Sections
**Goal**: Users can read professional bio, view skills, and find contact information

**Depends on**: Phase 3, Phase 4

**Requirements**: ABOUT-01, ABOUT-02, SKILL-01, SKILL-02, SKILL-03, CONT-01, CONT-02, CONT-03, CONT-04

**Success Criteria** (what must be TRUE):
1. User can read professional introduction and background in About section
2. User understands professional expertise and 19+ years experience from About content
3. User can view tech stack and skills organized by categories (e.g., Frontend, Backend, Cloud)
4. Skills display years of experience or proficiency level for each technology area
5. User can find contact email address in Contact section
6. User can click LinkedIn and GitHub profile links that open in new tabs
7. All social profile links are functional and open correct destinations

**Plans:** 2 plans

Plans:
- [x] 05-01-PLAN.md — Populate translation files (EN/ES) with real bio, categorized skills data, and contact information
- [x] 05-02-PLAN.md — Implement About two-column layout, Skills badge display, and Contact section with social links

---

### Phase 6: Experience Timeline
**Goal**: Users can view 19+ years of work history in a chronological timeline format

**Depends on**: Phase 5

**Requirements**: EXP-01, EXP-02, EXP-03, EXP-04

**Success Criteria** (what must be TRUE):
1. User can view work history in chronological timeline visualization (most recent first)
2. Each timeline entry shows company name, job title, date range, and key achievements
3. Timeline displays roles and achievements for each position clearly
4. Timeline adapts responsively: vertical single-column on mobile, enhanced layout on desktop
5. User can scan 19 years of experience quickly without overwhelming visual complexity

**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md — Initialize Next.js project with dependencies, i18n routing, font/image optimization, and dev tooling

---

### Phase 7: Portfolio Showcase
**Goal**: Users can view professional projects with descriptions and access links

**Depends on**: Phase 5

**Requirements**: PORT-01, PORT-02, PORT-03

**Success Criteria** (what must be TRUE):
1. User can view showcase of 4 professional projects in Portfolio section
2. Each project card displays title, description, and technologies used
3. User can click project links to access live demos or repositories where available
4. Project cards are visually consistent and professionally styled
5. Portfolio section works on mobile and desktop with responsive grid layout

**Plans:** 2 plans

Plans:
- [x] 07-01-PLAN.md — Translation data and Portfolio components (ProjectGrid + ProjectCard) with responsive grid and conditional action buttons
- [x] 07-02-PLAN.md — Page integration and responsive/dark mode/bilingual verification


---

### Phase 8: Performance Optimization
**Goal**: Site loads fast and meets Core Web Vitals thresholds for professional credibility

**Depends on**: Phase 7

**Requirements**: PERF-03, PERF-04, PERF-05

**Success Criteria** (what must be TRUE):
1. Initial JavaScript bundle size is under 150KB (verified with webpack-bundle-analyzer)
2. First Contentful Paint occurs under 1.5 seconds on 3G connection
3. Page becomes fully interactive within 3 seconds (Time to Interactive)
4. No layout shift occurs during page load (CLS < 0.1)
5. Production build deploys successfully to Vercel with automatic optimization

**Plans:** 1 plan

Plans:
- [x] 08-01-PLAN.md — Bundle analyzer, dynamic imports, skeleton placeholders, and web vitals measurement

---

### Phase 9: Accessibility & Quality
**Goal**: Site meets professional standards with keyboard navigation and WCAG AA compliance

**Depends on**: Phase 8

**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05

**Success Criteria** (what must be TRUE):
1. Site displays modern corporate aesthetic that conveys senior-level professionalism
2. Typography is clear and readable across mobile, tablet, and desktop devices
3. Color contrast meets WCAG AA standards (4.5:1 for text) in both light and dark themes
4. User can navigate all sections and interactive elements using only keyboard (Tab key)
5. Focus indicators are visible on all interactive elements (navigation links, theme toggle, language switcher)
6. Screen reader announces section changes when navigating via smooth scroll

**Plans:** 3 plans

Plans:
- [x] 09-01-PLAN.md — Fix critical bugs (header overlap, Contact detection, updated contact info with social links)
- [x] 09-02-PLAN.md — Visual design polish (slate color palette, refined typography, generous whitespace)
- [x] 09-03-PLAN.md — Accessibility implementation (WCAG AA contrast, keyboard navigation, screen reader support)

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Setup & Foundation | 1/1 | Complete   | 2026-03-20 |
| 2. Layout & Navigation | 1/1 | Complete    | 2026-03-20 |
| 3. Theme System | 0/1 | Planning | - |
| 4. Internationalization | 1/2 | Executing | - |
| 5. Core Content Sections | 0/2 | Planning | - |
| 6. Experience Timeline | 0/? | Not started | - |
| 7. Portfolio Showcase | 0/2 | Planning | - |
| 8. Performance Optimization | 0/1 | Planning | - |
| 9. Accessibility & Quality | 0/3 | Planning | - |

---
*Roadmap created: 2026-03-20*
*Last updated: 2026-03-31*
