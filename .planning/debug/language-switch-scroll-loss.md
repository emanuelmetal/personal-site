---
status: diagnosed
trigger: "Investigate why scroll position is lost when switching languages."
created: 2026-03-23T00:00:00Z
updated: 2026-03-23T00:06:00Z
---

## Current Focus

hypothesis: CONFIRMED - router.push receives pathname without hash, causing navigation to root
test: Verified through code analysis that usePathname() excludes hash and router.push doesn't receive it
expecting: Hash needs to be appended to the pathname string passed to router.push
next_action: Document root cause and fix approach

## Symptoms

expected: When switching languages while viewing a section (e.g., #experience), user should remain at that section in the new language
actual: Navigation restarts to the root (top of page) when language is switched
errors: None reported
reproduction:
1. Navigate to a section (e.g., #experience, #skills)
2. Switch language using LanguageSwitcher
3. Observe page scrolls to top instead of preserving section
started: Phase 04 internationalization implementation

## Eliminated

## Evidence

- timestamp: 2026-03-23T00:01:00Z
  checked: LanguageSwitcher.tsx lines 14-29
  found: Hash preservation logic captures hash BEFORE router.push (line 17), then sets hash + scrollIntoView AFTER router.push in 150ms timeout (lines 20-28)
  implication: Timing-based approach relies on page being ready after 150ms - may not be sufficient for navigation completion

- timestamp: 2026-03-23T00:02:00Z
  checked: router.push implementation from next-intl/navigation
  found: Using next-intl's createNavigation wrapper around Next.js router (src/i18n/navigation.ts lines 4-5)
  implication: router.push is asynchronous navigation, but code doesn't wait for navigation completion before attempting scroll

- timestamp: 2026-03-23T00:03:00Z
  checked: Layout component (src/app/[lang]/layout.tsx)
  found: Full page re-render on locale change - entire layout component re-mounts with new lang parameter (line 38)
  implication: Navigation causes complete remount, hash may be lost during middleware/routing before setTimeout fires

- timestamp: 2026-03-23T00:04:00Z
  checked: Flow analysis of LanguageSwitcher.tsx lines 17-28
  found: Critical issue - hash is captured (line 17), then router.push(pathname, { locale: newLocale }) is called WITHOUT the hash (line 18). The pathname variable from usePathname() returns the path without hash fragments.
  implication: router.push navigates to /es/ or /en/ WITHOUT the hash, causing immediate loss. setTimeout tries to restore it, but by then the navigation has already scrolled to top.

- timestamp: 2026-03-23T00:05:00Z
  checked: next-intl router.push signature (node_modules/next-intl/dist/types/navigation/react-client/createNavigation.d.ts line 320)
  found: router.push accepts href as string or object with pathname. Hash fragments are part of URL, not pathname. usePathname() hook returns pathname only (line 317), excluding hash.
  implication: Confirmed - pathname passed to router.push does not include hash, and there's no separate parameter to pass hash fragments in the options object.

## Resolution

root_cause: Hash fragment is not included in pathname when calling router.push. The usePathname() hook returns only the pathname portion of the URL (e.g., "/"), excluding the hash fragment (e.g., "#experience"). When router.push(pathname, { locale: newLocale }) is called on line 18 of LanguageSwitcher.tsx, it navigates to the new locale without the hash, causing the page to scroll to the top. The subsequent setTimeout attempt to restore the hash (lines 20-28) happens after navigation has already completed and scrolled to top, making it ineffective at preserving scroll position.

fix: Include the hash in the pathname passed to router.push. Change line 17-18 from:
```typescript
const hash = window.location.hash;
router.push(pathname, { locale: newLocale });
```
to:
```typescript
const hash = window.location.hash;
router.push(`${pathname}${hash}`, { locale: newLocale });
```
This ensures the navigation target includes the hash fragment, allowing Next.js to handle the scroll position automatically. The setTimeout block (lines 20-28) can potentially be removed as well, since the hash will be part of the URL from the start.

verification: After fix, test by:
1. Navigate to a section (e.g., click on Experience to get #experience in URL)
2. Switch language
3. Verify page remains at the Experience section instead of scrolling to top
4. Test with all hash sections (#experience, #skills, #projects, etc.)
5. Test switching between EN and ES in both directions

files_changed: ["/Users/emanuelpereyra/gitRepos/own/personal-site/src/components/LanguageSwitcher.tsx"]
