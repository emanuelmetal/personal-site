# Technology Stack

**Project:** Professional Portfolio Website
**Researched:** 2026-03-20
**Overall Confidence:** HIGH (core stack verified with official docs)

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Next.js** | 16.x (App Router) | React framework | Industry standard for modern React apps. Built-in optimizations (images, fonts), excellent Vercel deployment, SSG for fast portfolio loading. App Router provides better data fetching and layouts. **[HIGH confidence - verified from nextjs.org]** |
| **React** | 19.x | UI library | Required by Next.js 16. Server Components reduce client JS bundle. **[HIGH confidence]** |
| **TypeScript** | 5.6+ | Type safety | Standard for professional projects. Catches errors at build time, improves DX with autocomplete. **[HIGH confidence]** |

### Styling & UI

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Tailwind CSS** | 4.2+ | Utility-first CSS | Modern standard for fast UI development. Dark mode built-in, responsive utilities, small production bundle (<10kB). v4.2 adds P3 wide gamut colors and container queries. **[HIGH confidence - verified from tailwindcss.com]** |
| **clsx** | 2.1+ | Conditional classes | Lightweight utility for dynamic className construction with Tailwind. **[MEDIUM confidence]** |
| **tailwind-merge** | 2.5+ | Class deduplication | Prevents Tailwind class conflicts when composing components. **[MEDIUM confidence]** |

### Internationalization (i18n)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **next-intl** | 3.24+ | i18n for Next.js | Recommended in Next.js docs. Type-safe translations, app router support, automatic locale routing, smaller bundle than alternatives. Better DX than manual dictionary approach. **[HIGH confidence - recommended by Next.js official docs]** |

**Alternative (lighter):** Manual dictionary approach with `getDictionary()` pattern (shown in Next.js docs) if you want zero dependencies. Trade-off: More boilerplate but full control.

### Theme Management

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **next-themes** | 0.4+ | Dark/light mode | De facto standard for theme switching in Next.js. Prevents flash on load, syncs with system preferences, persists choice. Works seamlessly with Tailwind's `dark:` prefix. **[HIGH confidence - community standard]** |

**Alternative:** Tailwind's built-in dark mode with localStorage management. Trade-off: More code but one less dependency.

### Animation & Interactions

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Framer Motion** | 11.x | Smooth animations | Industry standard for React animations. Scroll-triggered animations for timeline, smooth page transitions. Production-tested, declarative API. **[HIGH confidence]** |

**Alternative:** CSS-only animations with Tailwind. Trade-off: Lighter but less sophisticated scroll interactions for timeline.

### Form & Contact

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **React Hook Form** | 7.54+ | Form handling | Lightweight, uncontrolled forms with validation. Standard for professional forms. **[MEDIUM confidence]** |
| **Zod** | 3.24+ | Schema validation | Type-safe validation that works with TypeScript. Pairs well with React Hook Form via `@hookform/resolvers`. **[MEDIUM confidence]** |

**Note:** Project scope mentions "mailto or external service links sufficient" - these are optional if contact form is deferred.

### Icons

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Lucide React** | 0.468+ | Icon library | Modern, tree-shakeable, consistent design. 1000+ icons. Better than react-icons for bundle size. **[MEDIUM confidence]** |

**Alternative:** Heroicons (Tailwind team's library). Trade-off: Smaller set but official Tailwind recommendation.

### Deployment & Performance

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Vercel** | - | Hosting platform | Native Next.js support (same team), automatic deployments, edge CDN, zero config. Free tier sufficient for portfolio. **[HIGH confidence]** |
| **Sharp** | Auto | Image optimization | Next.js uses Sharp automatically for `next/image` optimization. No manual install needed in Vercel. **[HIGH confidence]** |

### Development Tools

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **ESLint** | 9.x | Linting | Next.js includes config. Add `eslint-config-prettier` to avoid conflicts. **[HIGH confidence]** |
| **Prettier** | 3.x | Code formatting | Standard formatter. Add `prettier-plugin-tailwindcss` for class sorting. **[HIGH confidence]** |
| **@types/node** | 22.x | Node types | Required for TypeScript in Next.js config. **[HIGH confidence]** |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| **Framework** | Next.js 16 | Astro | Astro is excellent for static sites, but Next.js better fits React ecosystem preference and provides easier interactivity if needed later. |
| **Styling** | Tailwind CSS | CSS Modules | Tailwind's utility-first approach is faster for one-off components like portfolio sections. Dark mode easier. |
| **i18n** | next-intl | next-international | next-intl has better docs, more active maintenance, recommended by Next.js team. |
| **Theme** | next-themes | Manual implementation | next-themes prevents flash-of-unstyled-content automatically, handles edge cases. |
| **Animation** | Framer Motion | react-spring | Framer Motion has simpler API for scroll-triggered animations needed for timeline. |
| **Icons** | Lucide React | react-icons | Lucide is more modern, smaller bundle, consistent design system. |

## Anti-Patterns to Avoid

| Don't Use | Why Not | Use Instead |
|-----------|---------|-------------|
| **Pages Router** | App Router is the future of Next.js, better data fetching, layouts | App Router |
| **styled-components / Emotion** | Runtime CSS-in-JS hurts performance, not needed with Tailwind | Tailwind CSS |
| **i18next** | Overkill for two languages, larger bundle, more config | next-intl or manual dictionaries |
| **Create React App** | Deprecated, no longer maintained | Next.js |
| **React Router** | Not needed, Next.js has built-in routing | Next.js file-based routing |
| **Global CSS files** | Hard to maintain, specificity issues | Tailwind utilities + CSS modules for edge cases |

## Installation Commands

### Initial Setup

```bash
# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest personal-site \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack

cd personal-site
```

### Core Dependencies

```bash
# Internationalization
npm install next-intl

# Theme management
npm install next-themes

# Animation
npm install framer-motion

# Utilities
npm install clsx tailwind-merge

# Icons
npm install lucide-react

# Forms (if implementing contact form)
npm install react-hook-form zod @hookform/resolvers
```

### Development Dependencies

```bash
# Prettier with Tailwind plugin
npm install -D prettier prettier-plugin-tailwindcss

# ESLint config for Prettier compatibility
npm install -D eslint-config-prettier

# TypeScript types
npm install -D @types/node
```

## Version Rationale

- **Next.js 16.x**: Latest stable (verified March 2026), includes Turbopack, React Server Components, improved middleware
- **React 19.x**: Required for Next.js 16 features
- **Tailwind 4.2+**: Latest major version with P3 colors, container queries, logical properties
- **TypeScript 5.6+**: Current stable with improved type inference
- **next-intl 3.24+**: Latest with Next.js 16 App Router support
- **next-themes 0.4+**: Latest stable with App Router support
- **Framer Motion 11.x**: Latest major version with layout animations

## Configuration Notes

### Tailwind Dark Mode

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Required for next-themes
  // ...
}
```

### Next.js i18n Setup

```js
// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  // Next.js config
});
```

### TypeScript Configuration

```json
// tsconfig.json (Next.js default with path aliases)
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Deployment Checklist

- [ ] Environment: Vercel (recommended) or Netlify
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Node version: 20.x or later
- [ ] Environment variables: None required for basic setup
- [ ] Analytics: Optional - Vercel Analytics (free tier)
- [ ] Image optimization: Automatic with `next/image`

## Performance Targets

| Metric | Target | How |
|--------|--------|-----|
| **First Contentful Paint** | < 1.5s | Static generation with Next.js SSG |
| **Time to Interactive** | < 3s | Minimal client JS, React Server Components |
| **Bundle Size** | < 100kB initial JS | Code splitting, server components |
| **CSS Bundle** | < 10kB | Tailwind purges unused styles |
| **Lighthouse Score** | 95+ | Next.js optimizations + proper image handling |

## Tech Stack Summary

```
Frontend:     Next.js 16 (App Router) + React 19 + TypeScript
Styling:      Tailwind CSS 4.2 + clsx + tailwind-merge
i18n:         next-intl (English/Spanish)
Theme:        next-themes (dark/light mode)
Animation:    Framer Motion (timeline, interactions)
Icons:        Lucide React
Forms:        React Hook Form + Zod (if needed)
Deployment:   Vercel (primary) or Netlify
Tooling:      ESLint + Prettier + Turbopack
```

## Sources

### Verified (HIGH Confidence)
- Next.js 16 features: https://nextjs.org (accessed 2026-03-20)
- Tailwind CSS 4.2 features: https://tailwindcss.com (accessed 2026-03-20)
- Next.js i18n documentation: https://nextjs.org/docs/app/guides/internationalization (accessed 2026-03-20)
- Next.js recommends next-intl: Official docs list (verified 2026-03-20)

### Community Standard (MEDIUM-HIGH Confidence)
- next-themes: De facto standard for Next.js theme switching (community consensus)
- Framer Motion: Industry standard for React animations (widespread adoption)
- Lucide React: Modern replacement for Feather Icons (growing adoption)

### Based on Experience (MEDIUM Confidence)
- React Hook Form + Zod: Standard pairing for type-safe forms in TypeScript projects
- clsx + tailwind-merge: Common pattern for conditional Tailwind classes
- Prettier + ESLint configs: Standard development setup

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Core Stack (Next.js, React, Tailwind) | **HIGH** | Verified from official documentation (2026-03-20) |
| i18n (next-intl) | **HIGH** | Recommended in Next.js official docs |
| Theme (next-themes) | **HIGH** | Community standard, widely adopted |
| Animation (Framer Motion) | **MEDIUM-HIGH** | Industry standard but not verified against current version |
| Supporting libs (forms, icons) | **MEDIUM** | Based on community patterns, not critical path |
| Deployment (Vercel) | **HIGH** | Official Next.js platform, well documented |

## Notes for Roadmap

1. **Core stack is stable** - Next.js 16 + Tailwind 4.2 are production-ready, well-documented
2. **i18n should be built-in from start** - Harder to retrofit, affects routing structure
3. **Theme system can be added early** - Simple integration with Tailwind, minimal complexity
4. **Animation is enhancement** - Can be added after core layout, not blocking
5. **Forms are optional** - Project mentions "mailto sufficient", defer if needed
6. **No CMS needed** - Content in JSON/dictionaries as specified in project scope

## Open Questions

- **Analytics**: Not specified in requirements. Recommend lightweight solution (Vercel Analytics or Plausible).
- **SEO metadata**: Required for recruiter discoverability. Next.js Metadata API built-in.
- **Performance monitoring**: Vercel provides basic monitoring on free tier.
- **A/B testing**: Not required for portfolio, skip unless specified later.
