# Phase 7: Portfolio Showcase - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-28
**Phase:** 07-portfolio-showcase
**Areas discussed:** Project selection & content, Visual layout & card design, Project links & interactions, Content ordering & organization

---

## Project Selection & Content

### Number of Projects

| Option | Description | Selected |
|--------|-------------|----------|
| 3 projects | Focused showcase of your top 3 most impressive or recent projects. Easier to keep updated, highlights quality over quantity. | |
| 5 projects (Recommended) | Balanced portfolio showing range of skills and experience. Per requirements PORT-01, provides good variety without overwhelming. | Initially selected, changed to 4 |
| More than 5 | Comprehensive showcase. May need pagination or filtering in future phase. | |

**User's choice:** 5 projects (Recommended) → Changed to 4 projects during content gathering
**Notes:** User initially selected 5 projects but then decided to provide 4 projects instead, which was accepted.

---

### Card Content Details

| Option | Description | Selected |
|--------|-------------|----------|
| Title + Description + Tech stack (Recommended) | Matches requirement PORT-02. Clean and professional — project name, 2-3 sentence description, tech badges similar to Skills section. | ✓ |
| Title + Description + Tech stack + Achievements | Enhanced version with impact metrics or key achievements (e.g., 'Reduced load time by 40%'). More detail, but could feel dense. | |
| Minimal (Title + Description only) | Simplest approach. Tech stack could be inferred from description text, keeps cards very clean. | |

**User's choice:** Title + Description + Tech stack (Recommended)
**Notes:** Clean approach matching PORT-02 requirement, reuses badge pattern from Skills section.

---

### Content Source

| Option | Description | Selected |
|--------|-------------|----------|
| You'll provide project list now | Share the 5 projects you want showcased (names, descriptions, tech stacks, links) and we'll add them directly to translation files. | ✓ |
| Extract from GitHub repos (Recommended) | Parse your GitHub profile for pinned repos or most starred projects. Descriptions from README files, tech from repo languages. | |
| Mix of sources | Some from GitHub, some from work experience (LinkedIn mentions projects like 'Project N95', 'McAfee Active Response'), some custom. | |

**User's choice:** You'll provide project list now
**Notes:** User provided complete details for 4 projects:
1. Rocket Travel AAdvantage Client Integration (initially shared but moved to #2 in final order)
2. Agoda's white labeling themes
3. N95 Project
4. Alix Partners Corporate Survey

---

## Visual Layout & Card Design

### Grid Layout

| Option | Description | Selected |
|--------|-------------|----------|
| 2-column grid (desktop), 1-column (mobile) (Recommended) | Balanced layout showing 2 cards per row on desktop, stacking to single column on mobile. Consistent with responsive patterns from Skills section. | ✓ |
| 3-column grid (desktop), 1-column (mobile) | More compact, fits more above the fold. With 4 projects, would have 1 card on second row (asymmetric). | |
| Single column all screen sizes | Like Timeline component — vertical list on all devices. Larger cards with more breathing room, emphasizes each project equally. | |

**User's choice:** 2-column grid (desktop), 1-column (mobile) (Recommended)
**Notes:** Consistent with existing responsive patterns, works well with 4 projects (2 rows of 2).

---

### Card Visual Style

| Option | Description | Selected |
|--------|-------------|----------|
| Clean card with border (Recommended) | Subtle border with rounded corners, similar to Timeline cards. Professional and consistent with existing aesthetic. Hover effect lifts card slightly. | |
| Card with shadow | Material Design style with drop shadow instead of border. More visual depth, common in portfolio sites. | ✓ |
| Minimal (no border/shadow) | Just background color change on hover. Very clean and modern, lets content be the focus. | |

**User's choice:** Card with shadow
**Notes:** Material Design inspired shadow for visual depth while maintaining professional corporate aesthetic.

---

### Tech Stack Display

| Option | Description | Selected |
|--------|-------------|----------|
| Reuse Skills badge style (Recommended) | Same rounded badges with colors from Skills section. Consistent visual language, familiar pattern. Could use single neutral color for all portfolio badges. | ✓ |
| Simple text list | Comma-separated tech names in smaller gray text. More subtle, doesn't compete with project description. | |
| Icons + text | Technology logos/icons next to names (React icon, TypeScript icon, etc.). More visual but requires icon assets. | |

**User's choice:** Reuse Skills badge style (Recommended)
**Notes:** Reuses established badge pattern, decision made to use neutral color (not category colors) to distinguish from Skills section.

---

## Project Links & Interactions

### Link Button Types

| Option | Description | Selected |
|--------|-------------|----------|
| Show available links only (Recommended) | Display 'View Project' for live sites, 'View Code' for GitHub repos, or both when available. Projects without links show description only. Flexible and honest. | ✓ |
| Always show both buttons | Every card has 'View Project' and 'View Code' buttons. Disabled/hidden state when link not available. Consistent layout across all cards. | |
| Single 'Learn More' button | One button per card that links to either live site (priority) or GitHub repo. Simpler UI, less choice paralysis. | |

**User's choice:** Show available links only (Recommended)
**Notes:** Flexible approach — Agoda/Rocket/N95 show "View Project" only, Alix Partners shows "View Code" only.

---

### Button Styling

| Option | Description | Selected |
|--------|-------------|----------|
| Primary button style (Recommended) | Solid blue background with white text (matching email link in Contact section). Clear call-to-action, high visibility. | |
| Outline/ghost button | Border with colored text, transparent background. Lighter weight, less dominant than solid buttons. | ✓ |
| Icon + text link | Similar to social links in Contact section — icon with underlined text. More subtle, keeps focus on card content. | |

**User's choice:** Outline/ghost button
**Notes:** Lighter visual weight keeps focus on card content, professional appearance with colored border/text.

---

## Content Ordering & Organization

### Project Order

| Option | Description | Selected |
|--------|-------------|----------|
| Most recent first (Recommended) | Chronological order — Agoda white-labeling → Rocket Travel → N95 → Alix Partners. Shows current capabilities first, consistent with Timeline section approach. | ✓ |
| Most impressive first | Curated order based on impact/complexity. You decide which projects best represent your skills, regardless of date. | |
| As provided (keep current order) | Rocket Travel → Agoda → N95 → Alix Partners. The order you just shared. | |

**User's choice:** Most recent first (Recommended)
**Notes:** Reverse chronological order consistent with Experience Timeline section, shows current work first (Agoda integration most recent).

---

## Claude's Discretion

Areas where user delegated decisions to Claude:
- Exact shadow depth and blur values for project cards
- Button border color and hover state styling
- Specific neutral color choice for tech badges (gray-based within theme)
- Card internal padding and spacing hierarchy
- Grid gap size between cards
- Tech badge size and spacing within cards
- Handling of multiple demo URLs (Agoda project has 2 live URLs)

---

## Deferred Ideas

None — all discussion remained within Phase 7 scope (Portfolio Showcase section implementation).
