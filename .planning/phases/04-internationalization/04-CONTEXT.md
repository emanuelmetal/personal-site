# Phase 4: Internationalization - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Enable bilingual support (English/Spanish) with URL-based language routing. Users can switch languages using a switcher in the navigation, with the selected language reflected in the URL (/en/ or /es/). Content sections display in the selected language, URLs are shareable with language preserved, and browser language preference is detected on first visit.

</domain>

<decisions>
## Implementation Decisions

### Language Switcher UI/UX
- **D-01:** Language switcher positioned in header right side (desktop), top of mobile drawer (mobile) — mirrors Phase 2 and Phase 3 toggle placement pattern
- **D-02:** Visual style uses text labels "EN / ES" (not flag icons, not full language names)
- **D-03:** Active language highlighted (bold/underline), inactive language grayed out — both visible simultaneously
- **D-04:** Order in navigation: ThemeToggle, then LanguageSwitcher (both in header right / drawer top)

### Content Translation Strategy
- **D-05:** Use placeholder keys for now — decouple site building from content writing, real content added in Phase 5+
- **D-06:** Translation files structured nested by section: `{ about: { heading: ..., bio: ... }, experience: { ... } }`
- **D-07:** All headings and labels in translation files (not hardcoded in JSX) — consistent i18n best practices
- **D-08:** Existing translations in messages/en.json and messages/es.json extended with section content keys

### URL and Navigation Behavior
- **D-09:** Scroll position preserved when switching languages (requirement I18N-06) — user on /en/#experience switches to /es/#experience and stays at same section
- **D-10:** Client-side navigation using Next.js router.push() — fast transition, no page reload, easy scroll preservation
- **D-11:** Language switches add to browser history (router.push not replace) — user can use back button to return to previous language

### Initial Language Detection
- **D-12:** First visit (no /en/ or /es/ in URL) detects browser language preference (navigator.language or Accept-Language) and redirects — requirement I18N-06
- **D-13:** Fallback to English if detected language doesn't match 'en' or 'es' locales
- **D-14:** URL is source of truth for current language (no localStorage or cookie persistence) — shareable URLs work perfectly, requirement I18N-05

### Claude's Discretion
- Exact spacing and padding for language switcher
- Hover/focus states for language links
- Transition animation duration when switching languages (if any)
- Fallback text for missing translation keys

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Foundation
- `.planning/phases/01-project-setup-foundation/01-CONTEXT.md` — i18n routing structure with `[lang]` dynamic route, next-intl configured, translation files created
- `.planning/phases/02-layout-navigation/02-CONTEXT.md` — Header and MobileDrawer component structure, navigation patterns
- `.planning/phases/03-theme-system/03-CONTEXT.md` — ThemeToggle placement pattern (header right / drawer top)

### Existing Code
- `src/i18n/routing.ts` — next-intl routing config with 'en' and 'es' locales, defaultLocale: 'en'
- `src/app/[lang]/layout.tsx` — Root layout with NextIntlClientProvider, locale param handling
- `src/app/[lang]/page.tsx` — Homepage with locale-aware routing
- `messages/en.json` — Existing English translations (nav, theme, sections)
- `messages/es.json` — Existing Spanish translations (nav, theme, sections)
- `src/components/Header.tsx` — Navigation bar where LanguageSwitcher will be added
- `src/components/MobileDrawer.tsx` — Mobile drawer where LanguageSwitcher will appear
- `src/middleware.ts` — Next.js middleware (may need locale detection logic)

### Project Requirements
- `.planning/REQUIREMENTS.md` — I18N-01 (language switcher), I18N-02 (visible in nav), I18N-03 (URL reflects language), I18N-04 (all sections translated), I18N-05 (shareable URLs), I18N-06 (browser preference + scroll preservation)
- `.planning/PROJECT.md` — Bilingual support required from launch, target audience includes Spanish speakers

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **next-intl:** Already installed and configured (Phase 1), useTranslations hook available
- **routing config:** `src/i18n/routing.ts` defines locales ['en', 'es'] and defaultLocale 'en'
- **Translation files:** `messages/en.json` and `messages/es.json` with nav, theme, sections keys
- **useRouter hook:** Next.js navigation for client-side routing with locale awareness
- **usePathname hook:** Get current path for determining active language

### Established Patterns
- **Toggle placement:** ThemeToggle in header right side (desktop) + drawer top (mobile) — LanguageSwitcher follows same pattern (Phase 3)
- **Client components:** Header and MobileDrawer are 'use client' with useState/hooks — LanguageSwitcher follows same pattern
- **Locale in URL:** All routes structured as `/[lang]/...` with locale param (Phase 1)
- **Translation usage:** Components use `useTranslations('namespace')` hook, access keys via `t('key')`

### Integration Points
- LanguageSwitcher component created and imported into Header (desktop: right side before hamburger) and MobileDrawer (drawer header next to close button)
- Switcher uses useRouter() to navigate between /en/... and /es/... preserving current section hash
- Translation files extended with section content: about.heading, about.bio, experience.heading, etc.
- Middleware handles language detection on first visit (no /en/ or /es/ in URL) and redirects

</code_context>

<specifics>
## Specific Ideas

- Phase 1 already created the i18n infrastructure — this phase activates and exposes it to users
- Phase 2 decision: "Language and theme toggles positioned right side of nav bar (desktop), top of drawer (mobile)" — LanguageSwitcher placement is predetermined
- Scroll preservation (I18N-06) works by reading current section hash from URL (#experience), switching language (/en/#experience → /es/#experience), and using router.push with scroll: false then manually scrolling to element
- URL as source of truth (D-14) means no storage conflicts — shared links always work correctly (requirement I18N-05)
- Existing translations cover nav, theme, and section placeholders — this phase extends with content structure but keeps placeholder text (real content in Phase 5+)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-internationalization*
*Context gathered: 2026-03-23*
