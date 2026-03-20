# Phase 2: Layout & Navigation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-20
**Phase:** 02-layout-navigation
**Areas discussed:** Navigation structure & sticky behavior, Smooth scroll implementation, Section layout & spacing, Mobile responsiveness strategy

---

## Navigation structure & sticky behavior

### How should the navigation bar appear on desktop?

| Option | Description | Selected |
|--------|-------------|----------|
| Full horizontal nav with all links visible | Logo/name on left, nav links (About, Experience, Skills, Portfolio, Contact) in center or right, language/theme toggles on far right. Clean corporate look. | |
| Minimal nav with abbreviated links | Compact design with icons or short labels, saves vertical space, modern minimalist aesthetic. | ✓ |
| Split nav (logo left, links right) | Logo/name anchored left, navigation links grouped right with toggles. Common portfolio pattern. | |

**User's choice:** Minimal nav with abbreviated links

---

### How should mobile navigation work?

| Option | Description | Selected |
|--------|-------------|----------|
| Hamburger menu with slide-out drawer | Classic mobile pattern. Menu icon triggers full-screen or partial overlay with links. Familiar UX for mobile users. | ✓ |
| Bottom navigation bar | Fixed bottom bar with icon navigation. Modern mobile-first pattern, thumb-friendly on large phones. | |
| Collapsible header that shows on scroll up | Nav hides on scroll down, reappears on scroll up. Maximizes screen real estate for content. | |

**User's choice:** Hamburger menu with slide-out drawer

---

### Should the sticky nav show which section is active?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, highlight active section as user scrolls | Underline, color change, or background highlight on the nav link for the section currently in viewport. Helps users track position. | |
| No active state, keep it simple | All nav links look the same. User clicks to navigate, but no visual feedback for scroll position. | |
| Subtle indicator (dot or line) | Minimal visual cue like a small dot or thin underline. Less prominent than full highlighting. | ✓ |

**User's choice:** Subtle indicator (dot or line)

---

### Where should language and theme toggles appear in the nav?

| Option | Description | Selected |
|--------|-------------|----------|
| Right side of nav bar (desktop), top of drawer (mobile) | Conventional placement. Easy to find, doesn't interfere with section links. | ✓ |
| Far right corner always, separate from nav links | Isolated in corner, visually distinct from content navigation. Works on both desktop and mobile. | |
| You decide | Claude can choose the best UX pattern based on the overall nav design. | |

**User's choice:** Right side of nav bar (desktop), top of drawer (mobile)

---

## Smooth scroll implementation

### How should smooth scrolling be implemented?

| Option | Description | Selected |
|--------|-------------|----------|
| Native CSS scroll-behavior: smooth (Recommended) | Zero JavaScript, works out of the box, browser-native performance. Accessible by default. Limited customization but simple and fast. | ✓ |
| JavaScript scroll library (e.g., react-scroll) | More control over animation duration, easing, callbacks. Adds bundle size but provides advanced features like scroll spy. | |
| You decide | Claude picks based on accessibility and performance needs. | |

**User's choice:** Native CSS scroll-behavior: smooth

---

### Should scroll offset account for the sticky header height?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, sections should scroll to below the nav (Recommended) | Prevents content from being hidden behind sticky header. Better UX but requires calculating nav height. | |
| No, scroll to exact section top | Simpler implementation. Content might be partially hidden behind nav. | |
| Dynamic offset based on viewport | Different offsets for mobile vs desktop based on nav height variations. | ✓ |

**User's choice:** Dynamic offset based on viewport

---

### How should keyboard navigation work with smooth scroll?

| Option | Description | Selected |
|--------|-------------|----------|
| Standard tab navigation, Enter activates scroll | Accessible pattern. User tabs through nav links, presses Enter to trigger smooth scroll to section. | ✓ |
| Tab + instant scroll (no smooth scroll for keyboard) | Keyboard users skip animation, get instant navigation. Can be less disorienting for screen reader users. | |
| You decide | Claude chooses based on accessibility best practices. | |

**User's choice:** Standard tab navigation, Enter activates scroll

---

### Should clicking nav links close the mobile drawer automatically?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, close drawer after clicking link (Recommended) | User sees the scrolling animation happen, then drawer closes. Standard mobile UX pattern. | ✓ |
| No, leave drawer open | User manually closes drawer. Allows quick navigation between multiple sections. | |
| Close immediately on mobile, smooth scroll on desktop | Different behavior per device. Mobile drawer closes fast, desktop shows animation. | |

**User's choice:** Yes, close drawer after clicking link

---

## Section layout & spacing

### Should sections be full-height (viewport) or content-based?

| Option | Description | Selected |
|--------|-------------|----------|
| Content-based height (Recommended) | Each section takes only the space it needs. More natural for varying content amounts (About might be short, Experience long). | ✓ |
| Full viewport height for all sections | Every section fills the screen. Creates consistent rhythm but might have awkward whitespace for short content. | |
| Hybrid: first section full-height, rest content-based | Hero/intro section fills screen, subsequent sections sized to content. Common portfolio pattern. | |

**User's choice:** Content-based height

---

### How should sections be visually separated?

| Option | Description | Selected |
|--------|-------------|----------|
| Alternating background colors (light/dark theme) | Subtle background alternation (e.g., white/gray-50 in light mode). Clear visual boundaries without explicit dividers. | ✓ |
| Horizontal border lines between sections | Thin border or divider line. More explicit separation. | |
| Whitespace only, no visual dividers | Let padding/margin create breathing room. Minimal, clean look. | |

**User's choice:** Alternating background colors

---

### What vertical spacing system should sections use?

| Option | Description | Selected |
|--------|-------------|----------|
| Consistent padding (e.g., py-16 desktop, py-12 mobile) | Same padding for all sections. Predictable, easy to maintain. Tailwind spacing scale. | ✓ |
| Variable padding based on content density | Larger sections get more padding, shorter sections get less. More design work but better rhythm. | |
| You decide | Claude chooses based on the modern corporate aesthetic from PROJECT.md. | |

**User's choice:** Consistent padding

---

### Should there be a container max-width for section content?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, use max-width constraint (e.g., max-w-7xl, Recommended) | Content centered with max-width on ultra-wide screens. Better readability, professional look. Tailwind has max-w-* utilities. | ✓ |
| Full-width sections, no container | Content spans entire viewport width. More dramatic on large screens but can hurt readability. | |
| Variable: some sections full-width, others contained | Hero/Portfolio might be full-width, About/Experience contained. More complex but adds visual variety. | |

**User's choice:** Yes, use max-width constraint

---

## Mobile responsiveness strategy

### How should breakpoints be organized?

| Option | Description | Selected |
|--------|-------------|----------|
| Mobile-first with Tailwind defaults (sm:768px, lg:1024px, xl:1280px) | Standard Tailwind breakpoints. Mobile base styles, progressively enhance for larger screens. Industry standard approach. | ✓ |
| Custom breakpoints matching requirements (320px, 768px, 1440px) | Exact breakpoints from NAV-04 requirement. More precise but requires Tailwind config customization. | |
| Simplified: mobile (<768px) and desktop (>=768px) | Two breakpoints only. Simpler maintenance, tablet inherits desktop layout. | |

**User's choice:** Mobile-first with Tailwind defaults

---

### How should horizontal padding scale across devices?

| Option | Description | Selected |
|--------|-------------|----------|
| Scaled padding (px-4 mobile, px-8 tablet, px-12 desktop) | Proportional padding that grows with screen size. More breathing room on larger screens. | ✓ |
| Consistent relative padding (px-6 or 5% viewport width) | Same proportion across all devices. Simpler, more predictable. | |
| You decide | Claude chooses based on the modern corporate aesthetic. | |

**User's choice:** Scaled padding

---

### Should font sizes scale responsively?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, use responsive text utilities (text-2xl sm:text-3xl lg:text-4xl) | Headings and body text scale with viewport. Better readability on large screens, prevents tiny text on mobile. | ✓ |
| Fixed sizes, rely on browser zoom | Simpler CSS, browser handles scaling. Users can zoom if needed. | |
| Fluid typography with clamp() | CSS clamp() for smooth scaling between min/max sizes. Modern approach but less explicit than Tailwind utilities. | |

**User's choice:** Yes, use responsive text utilities

---

### How should the nav bar height change across devices?

| Option | Description | Selected |
|--------|-------------|----------|
| Taller on desktop (h-16 or h-20), shorter on mobile (h-14) | More visual weight on desktop, compact on mobile to save screen space. Common pattern. | ✓ |
| Consistent height across all devices | Simpler implementation, predictable layout calculations for scroll offset. | |
| You decide | Claude picks based on mobile UX best practices. | |

**User's choice:** Taller on desktop, shorter on mobile

---

## Claude's Discretion

- Exact icon choices for abbreviated nav links
- Hamburger menu animation style
- Precise color values for alternating backgrounds (within theme constraints)
- Drawer slide-out animation implementation
- Focus indicator styling (as long as WCAG AA compliant)

## Additional Notes

**Project tooling preference:** User specified using Bun as package manager instead of npm during discussion. This preference applies project-wide, not just to Phase 2.
