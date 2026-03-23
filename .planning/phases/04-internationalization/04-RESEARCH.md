# Phase 4: Internationalization - Research

**Researched:** 2026-03-23
**Domain:** next-intl with Next.js App Router internationalization
**Confidence:** HIGH

## Summary

Phase 4 activates the i18n infrastructure already established in Phase 1. The core implementation involves creating a LanguageSwitcher component that uses next-intl's navigation APIs to switch between English and Spanish locales while preserving URL hash anchors for scroll position. The existing next-intl middleware already handles browser language detection and locale routing.

**Primary recommendation:** Use next-intl 4.8.3 navigation APIs (useRouter, usePathname) to implement client-side language switching, manually preserve hash fragments during navigation, and extend existing translation files with placeholder content structure.

**Key insight:** Phase 1 did the heavy lifting—routing infrastructure, middleware locale detection, and translation file scaffolding are complete. This phase only needs to: (1) create the switcher UI component, (2) handle hash preservation manually since next-intl doesn't preserve hashes automatically, and (3) structure translation content by section.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Language Switcher UI/UX:**
- **D-01:** Language switcher positioned in header right side (desktop), top of mobile drawer (mobile) — mirrors Phase 2 and Phase 3 toggle placement pattern
- **D-02:** Visual style uses text labels "EN / ES" (not flag icons, not full language names)
- **D-03:** Active language highlighted (bold/underline), inactive language grayed out — both visible simultaneously
- **D-04:** Order in navigation: ThemeToggle, then LanguageSwitcher (both in header right / drawer top)

**Content Translation Strategy:**
- **D-05:** Use placeholder keys for now — decouple site building from content writing, real content added in Phase 5+
- **D-06:** Translation files structured nested by section: `{ about: { heading: ..., bio: ... }, experience: { ... } }`
- **D-07:** All headings and labels in translation files (not hardcoded in JSX) — consistent i18n best practices
- **D-08:** Existing translations in messages/en.json and messages/es.json extended with section content keys

**URL and Navigation Behavior:**
- **D-09:** Scroll position preserved when switching languages (requirement I18N-06) — user on /en/#experience switches to /es/#experience and stays at same section
- **D-10:** Client-side navigation using Next.js router.push() — fast transition, no page reload, easy scroll preservation
- **D-11:** Language switches add to browser history (router.push not replace) — user can use back button to return to previous language

**Initial Language Detection:**
- **D-12:** First visit (no /en/ or /es/ in URL) detects browser language preference (navigator.language or Accept-Language) and redirects — requirement I18N-06
- **D-13:** Fallback to English if detected language doesn't match 'en' or 'es' locales
- **D-14:** URL is source of truth for current language (no localStorage or cookie persistence) — shareable URLs work perfectly, requirement I18N-05

### Claude's Discretion
- Exact spacing and padding for language switcher
- Hover/focus states for language links
- Transition animation duration when switching languages (if any)
- Fallback text for missing translation keys

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| I18N-01 | User can switch between English and Spanish languages | next-intl useRouter().replace() with locale parameter enables programmatic switching |
| I18N-02 | Language switcher is visible in navigation bar | Component integration pattern: LanguageSwitcher imported into Header (desktop right) and MobileDrawer (drawer top) |
| I18N-03 | URL reflects current language (/en/ or /es/ path) | Existing [lang] dynamic route + next-intl middleware handles URL structure automatically |
| I18N-04 | All content sections are translated | Translation files messages/en.json and messages/es.json extended with section-specific nested keys |
| I18N-05 | Language preference is shareable via URL | URL-as-source-of-truth (D-14): locale in path, no cookies/localStorage for persistence |
| I18N-06 | User's language selection is detected from browser preferences on first visit | Existing middleware uses @formatjs/intl-localematcher with Accept-Language header (already implemented in Phase 1) |

</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-intl | 4.8.3 | Internationalization for Next.js App Router | Official recommendation in Next.js docs, handles routing/middleware/translations, excellent TypeScript support |
| @formatjs/intl-localematcher | (transitive) | Browser language negotiation | Used by next-intl middleware for "best fit" locale matching from Accept-Language header |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/navigation | 16.2.0 | Client-side routing APIs | For reading current pathname in Client Components (usePathname, useRouter from next-intl wraps this) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-intl | next-international | next-intl has better App Router integration, more mature middleware, recommended by Next.js docs |
| next-intl | Manual i18n with Next.js primitives | Reinventing locale detection, routing, and translation loading—unnecessary complexity |
| Translation files (JSON) | Database-driven content | Overkill for static portfolio, adds backend complexity, JSON files are sufficient |

**Installation:**
Already installed in Phase 1. No new dependencies required.

**Version verification:**
```bash
npm view next-intl version
```
Verified 4.8.3 is current (published 2026-03-20). Project is on latest stable version.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/[lang]/          # Locale-aware routes (already exists)
├── components/
│   ├── Header.tsx       # Desktop nav (add LanguageSwitcher import)
│   ├── MobileDrawer.tsx # Mobile nav (add LanguageSwitcher import)
│   └── LanguageSwitcher.tsx  # NEW: Language toggle component
├── i18n/
│   ├── routing.ts       # Locale config (already exists)
│   └── navigation.ts    # NEW: next-intl navigation wrapper exports
├── middleware.ts        # Locale detection (already exists, may need tuning)
messages/
├── en.json             # English translations (extend with section content)
└── es.json             # Spanish translations (extend with section content)
```

### Pattern 1: Client-Side Language Switching
**What:** Use next-intl's navigation APIs to switch locales while preserving current page path and hash
**When to use:** Language switcher component in client components (Header, MobileDrawer)
**Example:**
```typescript
// Source: next-intl docs + Next.js i18n routing guide
'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.lang as string;

  const switchLanguage = (newLocale: string) => {
    // Get current hash before navigation
    const hash = window.location.hash;

    // Navigate to new locale with same path
    router.replace(pathname, { locale: newLocale });

    // Restore hash after navigation completes
    if (hash) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        window.location.hash = hash;
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div>
      <button onClick={() => switchLanguage('en')}>EN</button>
      <button onClick={() => switchLanguage('es')}>ES</button>
    </div>
  );
}
```

**Key insight:** next-intl's `router.replace()` does NOT preserve hash fragments automatically. Manual hash preservation is required using `window.location.hash` capture before navigation and restoration after.

### Pattern 2: Navigation Wrapper (createLocalizedNavigation)
**What:** Create typed navigation helpers that inject locale automatically
**When to use:** For reusable navigation hooks in Client Components
**Example:**
```typescript
// Source: next-intl routing documentation
// src/i18n/navigation.ts
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);
```

**Usage:** Import from `@/i18n/navigation` instead of `next/navigation` to get locale-aware navigation automatically.

### Pattern 3: Translation File Organization
**What:** Nested JSON structure organized by page section for scalability
**When to use:** All translation content, following decision D-06
**Example:**
```json
// Source: Project convention + next-intl best practices
{
  "metadata": {
    "title": "Emanuel Pereyra - Senior Software Engineer",
    "description": "19+ years building scalable systems."
  },
  "nav": {
    "about": "About",
    "experience": "Experience"
  },
  "about": {
    "heading": "About Me",
    "bio": "Senior engineer with 19+ years experience..."
  },
  "experience": {
    "heading": "Work Experience",
    "timeline": {
      "present": "Present"
    }
  }
}
```

**Consumption:**
```typescript
const t = useTranslations('about');
return <h2>{t('heading')}</h2>; // "About Me"
```

### Anti-Patterns to Avoid
- **Hardcoded strings in JSX:** All user-visible text must come from translation files (D-07)
- **Using router.push with full paths:** Use pathname-relative navigation to let next-intl handle locale injection
- **Storing locale preference in localStorage:** Breaks shareable URLs (D-14), contradicts requirement I18N-05
- **Using next/navigation directly:** Import from `@/i18n/navigation` wrapper instead for locale awareness

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale detection from Accept-Language | Custom header parsing | next-intl middleware with @formatjs/intl-localematcher | Handles edge cases (quality values, regional variants, fallbacks), "best fit" algorithm |
| Translation key management | Custom translation loader | next-intl useTranslations hook | Type-safe keys, namespace support, missing key detection, server/client compatibility |
| Locale-aware routing | Manual path rewriting | next-intl createLocalizedNavigation | Handles pathname translation, locale injection, static params generation |
| Language switcher state | Redux/Zustand for locale | URL [lang] param as source of truth | Simpler, shareable URLs, no hydration mismatches, meets requirement I18N-05 |

**Key insight:** next-intl already handles 90% of i18n complexity. The only custom code needed is: (1) LanguageSwitcher component UI, (2) manual hash preservation logic (not provided by library).

## Common Pitfalls

### Pitfall 1: Hash Fragments Lost on Language Switch
**What goes wrong:** User is viewing `/en/#experience`, switches to Spanish, ends up at `/es/` without hash—loses scroll position
**Why it happens:** next-intl's `router.replace()` does not preserve hash fragments automatically (Next.js limitation)
**How to avoid:** Capture `window.location.hash` before navigation, restore after `router.replace()` completes using `setTimeout`
**Warning signs:** Manual testing shows scroll jumps to top when switching languages

### Pitfall 2: Middleware Not Detecting Browser Language
**What goes wrong:** First-time visitor with Spanish browser sees English, not redirected to `/es/`
**Why it happens:** Middleware matcher excludes root path `/` or middleware not running on root route
**How to avoid:** Ensure middleware `config.matcher` includes `'/'` pattern: `['/', '/(en|es)/:path*']`
**Warning signs:** Direct navigation to `localhost:3000` doesn't redirect based on Accept-Language header

### Pitfall 3: Translation Key Mismatch Between Locales
**What goes wrong:** `t('about.bio')` works in English, throws error in Spanish because `es.json` has different key structure
**Why it happens:** Translation files edited independently, keys fall out of sync
**How to avoid:** Use same nested key structure in both `en.json` and `es.json`, validate with TypeScript using next-intl's type generation
**Warning signs:** Runtime errors "Missing message" only in one locale

### Pitfall 4: Hardcoded Locale in Components
**What goes wrong:** Component uses `useTranslations('en')` instead of reading from params, always shows English
**Why it happens:** Misunderstanding next-intl API—namespace parameter is section name, not locale
**How to avoid:** Never pass locale to `useTranslations`, it reads from NextIntlClientProvider context automatically
**Warning signs:** Both languages show same text (always English or always Spanish)

### Pitfall 5: Client Component Using getMessages
**What goes wrong:** `'use client'` component calls `getMessages()` directly, causes hydration error
**Why it happens:** `getMessages()` is a server-only API, Client Components must receive translations via context
**How to avoid:** Only call `getMessages()` in Server Components (layout/page), pass via NextIntlClientProvider, use `useTranslations()` in Client Components
**Warning signs:** Hydration mismatch errors, translations work in dev but fail in production

## Code Examples

Verified patterns from official sources:

### Language Switcher Component (Full Implementation)
```typescript
// Source: next-intl navigation docs + project decisions
'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.lang as string;

  const handleLanguageSwitch = (newLocale: 'en' | 'es') => {
    if (newLocale === currentLocale) return;

    // Capture current hash for scroll preservation (D-09)
    const hash = window.location.hash;

    // Client-side navigation with locale switch (D-10, D-11)
    router.push(pathname, { locale: newLocale });

    // Restore hash after navigation completes
    if (hash) {
      setTimeout(() => {
        window.location.hash = hash;
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => handleLanguageSwitch('en')}
        className={`
          ${currentLocale === 'en'
            ? 'font-bold text-gray-900 dark:text-white'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }
        `}
        aria-label="Switch to English"
        aria-current={currentLocale === 'en' ? 'true' : undefined}
      >
        EN
      </button>
      <span className="text-gray-400">/</span>
      <button
        onClick={() => handleLanguageSwitch('es')}
        className={`
          ${currentLocale === 'es'
            ? 'font-bold text-gray-900 dark:text-white'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }
        `}
        aria-label="Switch to Spanish"
        aria-current={currentLocale === 'es' ? 'true' : undefined}
      >
        ES
      </button>
    </div>
  );
}
```

### Navigation Wrapper Setup
```typescript
// Source: next-intl routing documentation
// src/i18n/navigation.ts
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);
```

### Integration into Header Component
```typescript
// Source: Existing Header.tsx + integration pattern
'use client';

import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher'; // NEW

export default function Header() {
  // ... existing code ...

  return (
    <header className="...">
      <div className="...">
        {/* Logo */}
        <div>EP</div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex">
          {/* ... nav items ... */}
        </nav>

        {/* Right side: Theme + Language + Mobile menu */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <ThemeToggle />
            <LanguageSwitcher /> {/* NEW - after ThemeToggle per D-04 */}
          </div>
          <button>{/* hamburger */}</button>
        </div>
      </div>
    </header>
  );
}
```

### Middleware Browser Detection (Already Exists)
```typescript
// Source: Verified in src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|es)/:path*'],
};
```

**Current behavior:** Middleware already handles requirement I18N-06 (browser preference detection). The `@formatjs/intl-localematcher` library inside next-intl parses Accept-Language header and redirects `/` to `/en/` or `/es/` based on best match.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router with next-i18next | App Router with next-intl | Next.js 13+ (2023) | Server Components support, simpler setup, no i18next dependency |
| Cookie-based locale persistence | URL-based locale (no cookies) | Modern i18n pattern (2024+) | Better shareability, no GDPR concerns, simpler implementation |
| Manual Accept-Language parsing | @formatjs/intl-localematcher | next-intl 3.0+ (2023) | "Best fit" algorithm handles regional variants better than "lookup" |
| router.push with full paths | next-intl navigation wrappers | next-intl 4.0+ (2024) | Type-safe, automatic locale injection, less error-prone |

**Deprecated/outdated:**
- **next-i18next:** For Pages Router only, not compatible with App Router Server Components
- **i18n.locales in next.config.js:** Removed in Next.js 13+, now handled by middleware and routing config
- **useTranslation (without 's'):** Old API, use `useTranslations` (plural) in next-intl

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected |
| Config file | None — see Wave 0 gaps |
| Quick run command | N/A — no tests exist yet |
| Full suite command | N/A — no tests exist yet |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| I18N-01 | Clicking EN/ES switches locale in URL | integration | `playwright test i18n/language-switcher.spec.ts -x` | ❌ Wave 0 |
| I18N-02 | LanguageSwitcher visible in Header and MobileDrawer | integration | `playwright test i18n/switcher-visibility.spec.ts -x` | ❌ Wave 0 |
| I18N-03 | URL shows /en/ or /es/ path segment | integration | `playwright test i18n/url-structure.spec.ts -x` | ❌ Wave 0 |
| I18N-04 | All sections display translated content | integration | `playwright test i18n/content-translation.spec.ts -x` | ❌ Wave 0 |
| I18N-05 | Shareable URL preserves language | integration | `playwright test i18n/url-shareability.spec.ts -x` | ❌ Wave 0 |
| I18N-06 | First visit detects browser language, switching preserves scroll | integration | `playwright test i18n/locale-detection-scroll.spec.ts -x` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** N/A until framework installed
- **Per wave merge:** Full suite green
- **Phase gate:** Full i18n test suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Install Playwright: `npm install -D @playwright/test` + `npx playwright install`
- [ ] Create `playwright.config.ts` with base URL and test directory
- [ ] Create test files listed above in `tests/i18n/` directory
- [ ] Add `test:i18n` script to `package.json`: `"test:i18n": "playwright test tests/i18n/"`

**Recommendation:** Playwright over Jest for i18n testing because navigation, URL changes, and browser language detection require real browser environment. Unit testing translation key presence could use Jest, but integration tests provide higher confidence.

## Open Questions

1. **Hash preservation timing**
   - What we know: `setTimeout(100ms)` is a common pattern for post-navigation DOM updates
   - What's unclear: Is 100ms sufficient for all scenarios? Could use `router.events` or `useEffect` watch instead?
   - Recommendation: Start with 100ms timeout (proven pattern), add `useEffect` watch on pathname if issues arise

2. **Middleware locale detection override**
   - What we know: Middleware uses Accept-Language header, follows next-intl default behavior
   - What's unclear: Does middleware support locale cookie override for returning users? (D-14 says URL is source of truth, but middleware may set cookie)
   - Recommendation: Verify middleware doesn't set locale cookie; if it does, disable via `localeDetection: false` in routing config if conflicts with D-14

3. **Missing translation key behavior**
   - What we know: next-intl can show key path or fallback message for missing translations
   - What's unclear: What should fallback behavior be during placeholder content phase?
   - Recommendation: Configure `defaultTranslationValues` in NextIntlClientProvider to show English as fallback, or show key path in development only

## Sources

### Primary (HIGH confidence)
- next-intl routing docs (https://next-intl.dev/docs/routing) - Navigation API patterns
- next-intl middleware docs (https://next-intl.dev/docs/routing/middleware) - Locale detection with Accept-Language
- Next.js internationalization guide (https://nextjs.org/docs/app/building-your-application/routing/internationalization) - Official App Router i18n patterns
- Verified package.json: next-intl 4.8.3 (current stable)
- Verified existing code: middleware, routing config, translation files, Header/MobileDrawer structure

### Secondary (MEDIUM confidence)
- next-intl navigation docs (https://next-intl.dev/docs/routing/navigation) - useRouter API with locale switching, Link component behavior

### Tertiary (LOW confidence)
- None — all findings verified against official docs or existing code

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - next-intl is installed, verified version current, official Next.js recommendation
- Architecture: HIGH - Existing Phase 1 code reviewed, patterns extracted from official docs, decisions from CONTEXT.md constrain approach
- Pitfalls: HIGH - Hash preservation gap documented in official docs (not automatic), middleware matcher common mistake, translation sync issues are industry-standard i18n pitfall

**Research date:** 2026-03-23
**Valid until:** 2026-04-23 (30 days - stable domain, next-intl 4.x API stable)
