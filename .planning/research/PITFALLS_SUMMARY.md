# Portfolio Website Pitfalls - Research Summary

**Project:** Professional Portfolio Website
**Research Date:** 2026-03-20
**Dimension:** Common Mistakes & Critical Pitfalls
**Overall Confidence:** HIGH

## Executive Summary

Professional portfolio websites for senior engineers face domain-specific pitfalls that can destroy credibility with recruiters. The most critical issues stem from Next.js optimization features (images, fonts) being skipped in favor of "simpler" approaches that cause catastrophic performance failures. Secondary pitfalls involve accessibility oversights that signal incompetence to enterprise recruiters requiring WCAG compliance.

Research focused on official Next.js documentation for technical accuracy (HIGH confidence) and common portfolio patterns observed in the industry (MEDIUM confidence).

## Critical Findings (5 pitfalls require immediate attention)

### 1. **Unoptimized Images** (Performance Killer)
- Using raw `<img>` tags instead of Next.js `<Image>` component
- Causes LCP > 4 seconds, failing Core Web Vitals
- **Prevention:** Use `next/image` with explicit dimensions from day 1
- **Phase:** Foundation (Phase 1)

### 2. **Font Loading Causing Layout Shift** (Professional Appearance)
- External Google Fonts via `<link>` instead of `next/font`
- Causes CLS > 0.1, text flashing during load
- **Prevention:** Use `next/font/google` with self-hosting
- **Phase:** Foundation (Phase 1)

### 3. **Bilingual Without URL Structure** (SEO & Shareability)
- Language stored in localStorage, not URL paths
- URLs not shareable, Google can't index both languages
- **Prevention:** Use `[lang]` dynamic routing with proxy redirection
- **Phase:** Foundation (Phase 1)

### 4. **Missing Focus Management** (Accessibility Failure)
- Smooth scroll without keyboard focus updates
- Screen readers can't navigate, fails WCAG 2.4.3
- **Prevention:** Programmatic focus management in scroll handlers
- **Phase:** Navigation (Phase 2)

### 5. **Over-Bundling Heavy Libraries** (Mobile Performance)
- Installing full libraries for 1-2 features (Framer Motion, FontAwesome)
- Bundle > 200KB, TTI > 5 seconds on mobile
- **Prevention:** Use tree-shakeable imports, lazy loading, lighter alternatives
- **Phase:** Foundation (Phase 1)

## Moderate Pitfalls (9 items)

These hurt UX or slow development but don't require rewrites:

- Not preloading critical resources (hero image)
- Dark mode flash (FOUC) on page load
- Timeline not responsive on mobile
- Missing social sharing metadata (Open Graph)
- Tailwind production build bloat

## Minor Pitfalls (5 items)

Easily fixed but commonly overlooked:

- Hardcoded Lorem Ipsum in production
- No skip navigation link
- Console errors in production
- Missing alt text on images

## Confidence Assessment

| Area | Level | Source |
|------|-------|--------|
| Next.js optimization (images, fonts, lazy loading) | **HIGH** | Official Next.js documentation (v16.2.0) |
| Internationalization patterns | **HIGH** | Official Next.js i18n guide |
| Accessibility (ARIA, focus management) | **HIGH** | MDN ARIA Techniques (official) |
| Portfolio-specific patterns (timeline, social sharing) | **MEDIUM** | Industry patterns, not from specific authoritative source |
| Bundle size thresholds | **MEDIUM** | Next.js build warnings, not official documentation |

## Roadmap Implications

### Phase 1 (Foundation) must address:
- Image optimization setup
- Font optimization setup
- URL-based internationalization routing
- Bundle analyzer and lazy loading strategy
- Dark mode without FOUC

**Why:** These are architectural decisions that are expensive to retrofit. Waiting until Phase 3 to fix image optimization means rebuilding all portfolio project pages.

### Phase 2 (Navigation) must address:
- Focus management for smooth scroll
- Skip navigation link
- Accessible ARIA patterns

**Why:** Navigation structure needs accessibility from the start. Adding focus management later requires touching every navigation interaction.

### Phase 3 (Portfolio Showcase) needs validation:
- Image alt text review checklist
- Responsive testing on actual mobile devices
- Performance audit with Lighthouse

### Phase 4 (Content) needs validation:
- Remove all placeholder text
- Social sharing metadata verification
- Bilingual content completeness check

## Open Questions / Gaps

1. **Timeline component library:** Should we research pre-built timeline libraries or build custom? (Phase 2 research flag)

2. **Animation library choice:** If animations needed beyond CSS transitions, which library? (Phase 3 research flag if animations required)

3. **Contact form implementation:** Out of scope per PROJECT.md, but if requirements change, research serverless form handlers (Phase X if added)

4. **Internationalization library:** Next.js i18n is manual; libraries like `next-intl` automate. Research in Phase 1 before implementing.

## Success Criteria

Portfolio is successful if:

- ✅ Lighthouse Performance score > 90
- ✅ Core Web Vitals all "Good" (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- ✅ Lighthouse Accessibility score = 100
- ✅ Both English and Spanish URLs indexed by Google
- ✅ LinkedIn/Twitter preview cards show correctly
- ✅ Works on mobile devices (actual testing, not just DevTools)
- ✅ No console errors in production
- ✅ Zero placeholder text in production

## Verification Strategy

Each phase should include:

1. **Automated checks:**
   - Lighthouse CI in GitHub Actions
   - Bundle size checks (fail build if > 150KB first load JS)
   - ESLint no-console rule
   - TypeScript strict mode

2. **Manual checks:**
   - Test on real mobile device (iPhone, Android)
   - Keyboard-only navigation test
   - Screen reader test (VoiceOver or NVDA)
   - Social media preview test (LinkedIn, Twitter)

3. **Production pre-flight:**
   - Content review checklist (no placeholders)
   - Both language versions tested
   - All images have proper alt text
   - Dark mode works without flash

---

**Next Steps for Orchestrator:**

This research should inform roadmap phase structure. Recommend:

1. **Phase 1** must include: Next.js Image/Font setup, i18n routing, bundle analyzer
2. **Phase 2** must include: Focus management, accessible navigation
3. **Phase 3** validation: Performance audit, responsive testing
4. **Phase 4** validation: Content review, social sharing test

**Research flags:**
- Phase 1: Internationalization library choice (next-intl vs manual vs alternatives)
- Phase 2: Timeline component approach (library vs custom)
