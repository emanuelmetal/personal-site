# Domain Pitfalls: Professional Portfolio Websites

**Domain:** Single-page professional portfolio for senior engineers
**Researched:** 2026-03-20
**Confidence:** HIGH (official Next.js docs) / MEDIUM (portfolio-specific patterns)

## Critical Pitfalls

Mistakes that cause rewrites, major performance issues, or destroy professional credibility.

### Pitfall 1: Unoptimized Images Destroying Performance
**What goes wrong:** Using raw `<img>` tags or improperly configured Next.js Image components causes massive LCP scores (>4s), making site feel slow and unprofessional to recruiters.

**Why it happens:** Developers hardcode images in Markdown or skip Next.js Image optimization to avoid configuration complexity.

**Consequences:**
- Largest Contentful Paint (LCP) > 4 seconds (failing Core Web Vitals)
- Portfolio photos/project screenshots load at full resolution (2-5MB each)
- Mobile users on slow connections see broken layouts
- Recruiters bounce before content loads
- Google ranking penalized

**Prevention:**
```tsx
// ❌ WRONG: Raw img tags
<img src="/portfolio-project.png" alt="Project" />

// ✅ CORRECT: Next.js Image with explicit dimensions
import Image from 'next/image'

<Image
  src="/portfolio-project.png"
  alt="Project screenshot"
  width={800}
  height={600}
  priority={false} // Only true for above-fold hero image
  placeholder="blur" // If using static imports
/>
```

**Additional requirements:**
- Configure `remotePatterns` in `next.config.js` for external images (GitHub, CDNs)
- Use `priority={true}` ONLY for hero/above-fold image
- Provide explicit `width` and `height` to prevent layout shift
- Use WebP/AVIF formats (Next.js handles automatically)

**Detection:**
- Lighthouse score < 90 on Performance
- LCP metric > 2.5s in PageSpeed Insights
- Network tab shows images >500KB loading

**Phase to address:** Phase 1 (Foundation) - Set up image optimization from start

**Sources:**
- Next.js Image Component Docs (official, HIGH confidence)
- Web.dev Core Web Vitals (official, HIGH confidence)

---

### Pitfall 2: Font Loading Causing Layout Shift (CLS)
**What goes wrong:** Using external Google Fonts via `<link>` tag or forgetting to preload custom fonts causes text to "flash" (FOIT/FOUT) and elements to shift position, breaking professional appearance.

**Why it happens:** Developers add fonts the old way (link in HTML head) instead of using Next.js font optimization.

**Consequences:**
- Cumulative Layout Shift (CLS) > 0.1 (failing Core Web Vitals)
- Text briefly invisible or changes font mid-load
- Navigation jumps around during initial load
- Looks unprofessional/unpolished to recruiters
- Privacy issue: Google Fonts makes external requests (tracking)

**Prevention:**
```tsx
// ❌ WRONG: External font loading in HTML head
<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />

// ✅ CORRECT: next/font with automatic optimization
// app/layout.tsx or pages/_app.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent invisible text
  variable: '--font-inter'
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})

// Apply globally
<html className={`${inter.variable} ${robotoMono.variable}`}>
```

**Key points:**
- Next.js self-hosts Google Fonts (no external requests)
- Fonts are automatically subset and optimized
- Use `display: 'swap'` to prevent invisible text
- Use variable fonts when available for better performance
- For non-variable fonts, specify `weight` explicitly

**Detection:**
- Text flashes or changes appearance during load
- Lighthouse flags CLS > 0.1
- DevTools Performance tab shows font requests blocking render

**Phase to address:** Phase 1 (Foundation) - Configure from start to avoid rewrite

**Sources:**
- Next.js Font Optimization Docs (official, HIGH confidence)
- Web.dev CLS Guide (official, HIGH confidence)

---

### Pitfall 3: Bilingual Implementation Without URL Structure
**What goes wrong:** Storing language preference only in localStorage or state means URLs aren't shareable, search engines can't index both languages, and deep links break when switching languages.

**Why it happens:** Developers think client-side language switching is simpler than routing.

**Consequences:**
- Can't share English vs Spanish version via URL
- SEO: Google only indexes one language version
- Browser back button breaks language switching
- Social media shares always show default language
- Recruiters from Spanish-speaking regions never see Spanish content

**Prevention:**
```tsx
// ❌ WRONG: Language in localStorage only
const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')

// ✅ CORRECT: Language in URL path with proxy redirection
// File structure:
// app/[lang]/layout.tsx
// app/[lang]/page.tsx

// proxy.js - Auto-detect and redirect to locale
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request) {
  let languages = new Negotiator({
    headers: { 'accept-language': request.headers.get('accept-language') }
  }).languages()
  let locales = ['en', 'es']
  let defaultLocale = 'en'
  return match(languages, locales, defaultLocale)
}

export function proxy(request) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = ['en', 'es'].some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}
```

**Additional requirements:**
- Generate static paths for both locales with `generateStaticParams`
- Use `<html lang={lang}>` for accessibility and SEO
- Implement `hreflang` meta tags for SEO
- Language switcher changes URL path, not just state

**Detection:**
- Changing language doesn't change URL
- Sharing link doesn't preserve language choice
- Google Search Console only shows one language indexed

**Phase to address:** Phase 1 (Foundation) - Routing structure must be right from start

**Sources:**
- Next.js Internationalization Guide (official, HIGH confidence)

---

### Pitfall 4: Missing Focus Management in Smooth Scroll Navigation
**What goes wrong:** Clicking sticky nav links scrolls smoothly but doesn't move keyboard focus, breaking accessibility for screen reader users and keyboard navigation.

**Why it happens:** CSS `scroll-behavior: smooth` handles visual scroll but doesn't update focus or announce content changes.

**Consequences:**
- Screen reader users can't navigate site effectively
- Keyboard users press Tab and focus jumps to wrong section
- Fails WCAG 2.1 Level AA standards (2.4.3 Focus Order)
- Enterprise recruiters may reject candidate for accessibility ignorance
- Legal risk for companies requiring ADA/Section 508 compliance

**Prevention:**
```tsx
// ❌ WRONG: Only smooth scroll, no focus management
<a href="#experience" className="scroll-smooth">Experience</a>

// ✅ CORRECT: Manage focus and announce to screen readers
function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId)
  if (!section) return

  // Scroll visually
  section.scrollIntoView({ behavior: 'smooth', block: 'start' })

  // Move focus for keyboard users
  section.setAttribute('tabindex', '-1')
  section.focus({ preventScroll: true }) // Already scrolled

  // Announce to screen readers
  section.setAttribute('aria-live', 'polite')
  section.setAttribute('aria-atomic', 'true')
}

// In component:
<nav role="navigation" aria-label="Main navigation">
  <button onClick={() => scrollToSection('experience')}>
    Experience
  </button>
</nav>

<section id="experience" tabIndex={-1}>
  <h2>Experience</h2>
  {/* content */}
</section>
```

**ARIA requirements for single-page nav:**
- Use `<nav role="navigation">` with `aria-label`
- Main content sections need `tabindex="-1"` for programmatic focus
- Update `aria-current="page"` on active nav link
- Use `role="region"` with `aria-labelledby` for major sections

**Detection:**
- Tab key navigation jumps unexpectedly after clicking nav links
- Screen reader doesn't announce section changes
- Lighthouse Accessibility score flags focus management
- axe DevTools shows keyboard trap issues

**Phase to address:** Phase 2 (Navigation) - When implementing sticky nav and smooth scroll

**Sources:**
- MDN ARIA Techniques (official, HIGH confidence)
- Next.js official docs for scroll behavior

---

### Pitfall 5: Over-Bundling Heavy Libraries for Simple Features
**What goes wrong:** Installing large animation libraries (Framer Motion, GSAP), icon packs (entire FontAwesome), or utility libraries (Lodash, Moment.js) when only using 1-2 features, bloating JavaScript bundle to >500KB.

**Why it happens:** npm install is easy; developers don't check bundle size until production.

**Consequences:**
- First Load JS > 200KB (Next.js warns at 150KB)
- Time to Interactive (TTI) > 5 seconds on mobile
- Recruiter on mobile connection abandons site
- Failed performance audits
- Vercel bandwidth limits exceeded

**Prevention:**
```tsx
// ❌ WRONG: Import entire library
import _ from 'lodash' // +70KB
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // +200KB
import { motion } from 'framer-motion' // +60KB for simple fades

// ✅ CORRECT: Use lighter alternatives or tree-shakeable imports
import debounce from 'lodash-es/debounce' // Tree-shakeable
// OR better: use native browser APIs
const debounce = (fn, delay) => { /* 5 lines of code */ }

// Icons: Use heroicons (designed for React, tiny bundle)
import { EnvelopeIcon } from '@heroicons/react/24/outline' // <1KB per icon

// Animations: Use CSS or lightweight library
// CSS transitions for simple fades (0KB JS)
// Or react-spring for complex animations (smaller than Framer Motion)
```

**Lazy loading strategy:**
```tsx
// Lazy load heavy components that aren't immediately visible
import dynamic from 'next/dynamic'

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Don't SSR if not needed above fold
})
```

**Bundle analysis:**
```bash
# Add to package.json
"scripts": {
  "analyze": "ANALYZE=true next build"
}

# Install analyzer
npm install @next/bundle-analyzer

# Check output in .next/analyze/
```

**Detection:**
- `next build` output shows warnings about bundle size
- Lighthouse Performance score < 90
- Network tab shows >200KB JavaScript loaded initially

**Phase to address:** Phase 1 (Foundation) - Set bundle analyzer and limits from start

**Sources:**
- Next.js Lazy Loading Documentation (official, HIGH confidence)
- Bundle size limits from Next.js build warnings (official)

---

## Moderate Pitfalls

Mistakes that hurt UX or slow down development but don't require rewrites.

### Pitfall 6: Not Preloading Critical Resources
**What goes wrong:** Hero images, critical fonts, or above-fold content load late because browser doesn't know they're important.

**Why it happens:** Developers don't differentiate critical vs lazy-loadable resources.

**Consequences:**
- Hero image loads 1-2 seconds after text
- "Flash of Invisible Text" on load
- Poor first impression for recruiters

**Prevention:**
```tsx
// Hero image only: priority={true}
<Image
  src="/hero-photo.jpg"
  priority={true} // Adds <link rel="preload">
  alt="Professional headshot"
/>

// Everything else: priority={false} (default)
```

**Phase to address:** Phase 1 (Foundation) - During initial image setup

---

### Pitfall 7: Dark Mode Flash (FOUC)
**What goes wrong:** Page loads in light mode for 100ms before switching to dark mode if that's user's preference, causing jarring flash.

**Why it happens:** Theme preference read from localStorage after React hydration.

**Consequences:**
- Poor UX for users with dark mode preference
- Looks unpolished/amateur
- Accessibility issue for users with light sensitivity

**Prevention:**
```tsx
// Add blocking script in <head> BEFORE content renders
// pages/_document.tsx or app/layout.tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        const theme = localStorage.getItem('theme') ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.classList.add(theme);
      })();
    `,
  }}
/>
```

**Alternative:** Use `next-themes` library which handles this correctly.

**Detection:**
- Visual flash when loading site in dark mode preference
- User complaints about theme not persisting

**Phase to address:** Phase 1 (Foundation) - When implementing dark mode toggle

---

### Pitfall 8: Generic Timeline Implementation Without Responsive Breakpoints
**What goes wrong:** Vertical timeline with left/right alternating entries looks great on desktop but breaks on mobile with cut-off content or overlapping elements.

**Why it happens:** Developers design for desktop first, forget mobile constraint of single column.

**Consequences:**
- Timeline unreadable on mobile (50%+ of recruiter traffic)
- Horizontal scrolling required to see dates
- Professional experience hidden or truncated

**Prevention:**
```tsx
// Tailwind responsive timeline structure
<div className="relative">
  {/* Desktop: center line with alternating sides */}
  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300" />

  {/* Mobile: left line with all content on right */}
  <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />

  {experiences.map((exp, idx) => (
    <div
      key={exp.id}
      className={`
        relative mb-8
        md:w-1/2 md:pr-8
        ${idx % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'}
      `}
    >
      {/* Content */}
    </div>
  ))}
</div>
```

**Testing requirement:**
- Test on actual mobile device (not just browser DevTools)
- Verify dates/titles don't overlap timeline dots
- Check RTL languages if supporting internationalization

**Phase to address:** Phase 2 (Content Structure) - When building timeline component

---

### Pitfall 9: Missing Metadata for Social Sharing
**What goes wrong:** Sharing portfolio link on LinkedIn/Twitter shows generic "localhost" or blank preview instead of professional card with photo and description.

**Why it happens:** Developers forget Open Graph and Twitter Card meta tags.

**Consequences:**
- Unprofessional appearance when sharing in job applications
- Lower click-through rate on social shares
- Missed opportunity for first impression

**Prevention:**
```tsx
// app/layout.tsx or pages/_app.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'John Doe - Senior Software Engineer',
  description: '19 years building scalable systems. Expert in React, Node.js, AWS.',
  openGraph: {
    title: 'John Doe - Senior Software Engineer',
    description: '19 years building scalable systems',
    url: 'https://johndoe.com',
    siteName: 'John Doe Portfolio',
    images: [
      {
        url: 'https://johndoe.com/og-image.jpg', // 1200x630px
        width: 1200,
        height: 630,
        alt: 'John Doe professional headshot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Doe - Senior Software Engineer',
    description: '19 years building scalable systems',
    images: ['https://johndoe.com/og-image.jpg'],
  },
}
```

**Testing:**
- Use LinkedIn Post Inspector
- Use Twitter Card Validator
- Test both English and Spanish URLs

**Phase to address:** Phase 1 (Foundation) - Add during initial setup

---

### Pitfall 10: Tailwind Production Build Bloat
**What goes wrong:** Development Tailwind includes all utility classes (~3MB CSS), and production build doesn't purge unused classes properly, shipping 500KB+ CSS.

**Why it happens:** Incorrect `content` configuration in `tailwind.config.js` or dynamic class names.

**Consequences:**
- Massive CSS bundle size
- Slow initial page load
- Poor Lighthouse scores

**Prevention:**
```js
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ... rest of config
}

// ❌ WRONG: Dynamic class names not detected by purge
<div className={`text-${color}-500`}> // Won't be included in production

// ✅ CORRECT: Full class names
<div className={color === 'blue' ? 'text-blue-500' : 'text-red-500'}>
```

**Verification:**
```bash
npm run build
# Check output: "First Load JS shared by all" should be <100KB CSS
```

**Phase to address:** Phase 1 (Foundation) - Configure correctly from start

---

## Minor Pitfalls

Mistakes that are easily fixed but commonly overlooked.

### Pitfall 11: Hardcoded Placeholder Lorem Ipsum in Production
**What goes wrong:** Deploying to production with "Lorem ipsum dolor sit amet" placeholder text.

**Why it happens:** Decoupling site building from content creation, then forgetting to add real content.

**Consequences:**
- Extremely unprofessional
- Recruiters immediately close tab
- Wasted opportunity

**Prevention:**
- Use realistic placeholder text: "[Your role at Company X]" not "Lorem ipsum"
- Add TODO comments that fail builds:
```tsx
// TODO_CONTENT: Add real job description here
{process.env.NODE_ENV === 'production' && content.includes('TODO_CONTENT')
  ? throw new Error('Remove placeholders before production')
  : null}
```
- Create `content.config.ts` with all text, review before deploy

**Phase to address:** Phase 4 (Content) - Before production deployment

---

### Pitfall 12: No Skip Navigation Link
**What goes wrong:** Keyboard users must tab through entire sticky navigation (5+ links) to reach main content on every section scroll.

**Why it happens:** Skip links are invisible, so developers forget them.

**Consequences:**
- Poor accessibility (WCAG 2.4.1 Bypass Blocks)
- Frustrating for keyboard-only users
- May fail accessibility audits

**Prevention:**
```tsx
// Add skip link as first element in body
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
>
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {/* Page content */}
</main>
```

**Phase to address:** Phase 2 (Navigation) - When building sticky nav

---

### Pitfall 13: Console Errors in Production
**What goes wrong:** React hydration mismatches, key prop warnings, or error boundaries not catching errors show in browser console.

**Why it happens:** Developers ignore console warnings during development.

**Consequences:**
- Looks unprofessional if recruiter opens DevTools
- May indicate actual bugs
- SSR/CSR mismatches cause flashing content

**Prevention:**
- Fix all console errors before committing
- Add ESLint rule: `"no-console": ["error", { allow: ["warn", "error"] }]`
- Test with React StrictMode enabled
- Check console in production build locally before deploy

**Phase to address:** Continuous - enforce from Phase 1 onward

---

### Pitfall 14: Missing Alt Text on Portfolio Images
**What goes wrong:** Portfolio project screenshots use empty `alt=""` or generic "Screenshot" alt text.

**Why it happens:** Developers rush through accessibility requirements.

**Consequences:**
- Screen readers announce "image" with no context
- SEO: images don't rank in image search
- Fails accessibility audits

**Prevention:**
```tsx
// ❌ WRONG
<Image src="/project1.png" alt="Screenshot" />

// ✅ CORRECT: Descriptive alt text
<Image
  src="/project1.png"
  alt="Dashboard showing real-time analytics with line charts and KPI cards"
/>
```

**Phase to address:** Phase 3 (Portfolio Showcase) - When adding project images

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Foundation (Phase 1) | Unoptimized images, font loading, bundle size | Set up next/font, Image component, bundle analyzer from day 1 |
| Internationalization (Phase 1) | URL structure without locale paths | Use `[lang]` dynamic route from start, don't retrofit later |
| Navigation (Phase 2) | Focus management, smooth scroll accessibility | Implement focus management with scroll behavior |
| Timeline (Phase 2) | Desktop-only responsive design | Design mobile-first, enhance for desktop |
| Portfolio Showcase (Phase 3) | Missing image optimization, alt text | Use Image component checklist, audit alt text |
| Dark Mode (Phase 1/2) | FOUC flash on load | Add blocking script in document head |
| Content (Phase 4) | Placeholder text in production | Content review checklist before deploy |
| Deployment | Missing metadata, social sharing | Add Open Graph tags to layout |

---

## Sources

**HIGH confidence (official documentation):**
- Next.js Image Optimization: https://nextjs.org/docs/pages/api-reference/components/image
- Next.js Font Optimization: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
- Next.js Lazy Loading: https://nextjs.org/docs/app/guides/lazy-loading
- Next.js Internationalization: https://nextjs.org/docs/app/guides/internationalization
- MDN ARIA Techniques: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques

**MEDIUM confidence (portfolio domain patterns):**
- Timeline responsive design (common pattern observed, not from specific source)
- Bundle size thresholds from Next.js build warnings
- Social media preview requirements (LinkedIn, Twitter documentation)
- Accessibility requirements for single-page navigation (WCAG 2.1 guidelines)

**Areas needing phase-specific validation:**
- Specific animation library choices (may need research in Phase 3)
- Timeline component library vs custom (research in Phase 2)
- Internationalization library choice (next-intl vs alternatives, Phase 1 research)
