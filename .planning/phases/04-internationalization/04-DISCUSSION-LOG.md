# Phase 4: Internationalization - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-23
**Phase:** 04-internationalization
**Areas discussed:** Language switcher UI/UX, Content translation strategy, URL and navigation behavior, Initial language detection

---

## Language Switcher UI/UX

### Switcher Position

| Option | Description | Selected |
|--------|-------------|----------|
| Header right side (desktop), drawer top (mobile) | Mirrors Phase 2 decision and Phase 3 theme toggle placement. Keeps UI consistent. Appears next to theme toggle. | ✓ |
| Header right side only (always visible) | Always accessible without opening drawer on mobile. Takes horizontal space on small screens alongside theme toggle. | |
| Footer | Common pattern for language selectors. Doesn't compete with primary navigation. Users expect it there. | |

**User's choice:** Header right side (desktop), drawer top (mobile) — Recommended

### Visual Style

| Option | Description | Selected |
|--------|-------------|----------|
| Flag icons (🇺🇸 🇪🇸) | Visual and space-efficient. Universally recognized. Works well at small sizes. | |
| Text labels (EN / ES) | Clear and accessible. No flag ambiguity (US vs UK for English, Spain vs Latin America). Compact. | ✓ |
| Full language names (English / Español) | Most explicit. Takes more horizontal space. Best for accessibility. | |

**User's choice:** Text labels (EN / ES) — Recommended

### Active Language Display

| Option | Description | Selected |
|--------|-------------|----------|
| Highlight active language | EN selected: EN bold/underline, ES grayed out. Clear visual state. Common pattern. | ✓ |
| Show only inactive language | EN page shows 'ES' button. Cleaner, saves space. User clicks to switch (like theme toggle cycles). | |
| Dropdown/select | Both options in a select menu. Scales better for 3+ languages. Overkill for just 2 languages. | |

**User's choice:** Highlight active language — Recommended

---

## Content Translation Strategy

### Placeholder vs Real Content

| Option | Description | Selected |
|--------|-------------|----------|
| Placeholder keys for now | Use translation keys like 'sections.about.heading' with generic placeholder text. Decouple site building from content writing. Real content added in Phase 5+. | ✓ |
| Real translated content immediately | Write actual bio, experience, skills content in both EN and ES now. More time upfront but site feels complete. | |
| Mix: Real for short content, placeholders for long | Real translations for nav/labels/titles. Placeholders for bio paragraphs and experience details. | |

**User's choice:** Placeholder keys for now — Recommended

### Translation File Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Nested by section | messages/en.json: { about: { heading: ..., bio: ... }, experience: { ... } }. Organized and scalable. | ✓ |
| Flat keys | messages/en.json: { 'about.heading': ..., 'about.bio': ... }. Simpler but harder to navigate for large files. | |
| Separate files per section | messages/en/about.json, messages/en/experience.json. Most organized but more files to manage. | |

**User's choice:** Nested by section — Recommended

### Section Headings

| Option | Description | Selected |
|--------|-------------|----------|
| All headings in translation files | 'About', 'Experience', 'Skills' all come from messages/[locale].json. Consistent with i18n best practices. | ✓ |
| Hardcode English, translate Spanish only | English strings stay in JSX, only Spanish in translation files. Less organized but faster. | |
| You decide | Let Claude choose the best approach | |

**User's choice:** All headings in translation files — Recommended

---

## URL and Navigation Behavior

### Scroll Position Preservation

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — preserve scroll position | User on /en/#experience switches to /es/#experience, stays at same section. Requirement I18N-06 explicitly requires this. | ✓ |
| No — scroll to top | Language switch always goes to top of page. Simpler but may disorient users deep in content. | |
| Preserve for section links, top for others | If user is on #experience, preserve. If on generic page, go to top. More complex logic. | |

**User's choice:** Yes — preserve scroll position — Recommended

### URL Change Mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| Client-side navigation with router.push | Fast transition using Next.js router. No page reload. URL changes immediately. Preserves scroll position easily. | ✓ |
| Full page reload with window.location | Simpler but slower. Full page refresh. Harder to preserve scroll position. | |
| You decide | Let Claude choose the best approach | |

**User's choice:** Client-side navigation with router.push — Recommended

### Browser History

| Option | Description | Selected |
|--------|-------------|----------|
| Add to history (can go back to previous language) | router.push() adds entry. User can use browser back button to return to previous language. Natural behavior. | ✓ |
| Replace history (no back to previous language) | router.replace() overwrites. Back button goes to page before language switch. Cleaner history. | |
| You decide | Let Claude choose the best approach | |

**User's choice:** Add to history (can go back to previous language) — Recommended

---

## Initial Language Detection

### First Visit Language

| Option | Description | Selected |
|--------|-------------|----------|
| Detect browser language preference | Use navigator.language or Accept-Language header. Requirement I18N-06 explicitly requires this. Redirect to /en/ or /es/ based on detection. | ✓ |
| Always default to English | Simpler, predictable. Ignores user's language preference. Not ideal for Spanish-speaking visitors. | |
| Show language selection page first | Landing page where user explicitly chooses. Extra step but no assumptions. | |

**User's choice:** Detect browser language preference — Recommended

### Unsupported Language Fallback

| Option | Description | Selected |
|--------|-------------|----------|
| Fall back to English | If detected language isn't 'en' or 'es', use 'en' as default. Standard fallback behavior. | ✓ |
| Fall back to Spanish | Use 'es' as fallback. Less common choice but valid if targeting Spanish-speaking audience primarily. | |
| Use language detection with regional variants | Accept 'es-*' variants (es-MX, es-AR) as Spanish. More flexible but adds complexity. | |

**User's choice:** Fall back to English — Recommended

### Language Preference Persistence

| Option | Description | Selected |
|--------|-------------|----------|
| URL is source of truth (no persistence) | Current language always from URL (/en/ or /es/). Shareable URLs work perfectly. User can bookmark. No cookies/storage needed. | ✓ |
| Store preference in localStorage | Remember user's choice for next visit. Redirect based on stored preference. May conflict with shared URLs. | |
| Store preference in cookie | Server can read preference for SSR. More complex setup. GDPR considerations. | |

**User's choice:** URL is source of truth (no persistence) — Recommended

---

## Claude's Discretion

- Exact spacing and padding for language switcher
- Hover/focus states for language links
- Transition animation duration when switching languages (if any)
- Fallback text for missing translation keys

## Deferred Ideas

None — all discussion remained within phase scope
