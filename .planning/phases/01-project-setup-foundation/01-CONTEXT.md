# Phase 1: Project Setup & Foundation - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Initialize Next.js 16 project with TypeScript, Tailwind CSS, and optimized asset loading. Establish development environment with proper i18n routing structure, linting, formatting, and bundle analysis. This phase addresses PERF-01 (image optimization via next/image) and PERF-02 (font optimization via next/font).

</domain>

<decisions>
## Implementation Decisions

### Development Tooling
- ESLint: Use Next.js defaults (`next/core-web-vitals` preset)
- Prettier: Auto-format on save enabled
- Git hooks: Husky + lint-staged for pre-commit lint and format checks
- Bundle analysis: webpack-bundle-analyzer runs on every build, warns if bundle >150KB

### Project Structure
- i18n routing: `app/[lang]/` dynamic route with middleware for locale detection
- Components: Flat `components/` directory (no ui/ split)
- Path aliases: Configure `@/*` to map to project root (e.g., `@/components`, `@/lib`)
- Global styles: `app/globals.css` (Next.js convention, imports Tailwind directives)

### TypeScript & Tailwind (Claude's Discretion)
- TypeScript strictness level
- Tailwind color palette (beyond defaults)
- Font pairing (Inter + Roboto Mono suggested in research)
- Spacing scale configuration

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Research Findings
- `.planning/research/STACK.md` — Verified stack: Next.js 16, React 19, Tailwind 4.2, next-intl, next-themes
- `.planning/research/PITFALLS.md` — Critical pitfalls: unoptimized images, font loading issues, bilingual URL structure
- `.planning/research/ARCHITECTURE.md` — Next.js App Router patterns, i18n routing requirements

### Project Requirements
- `.planning/PROJECT.md` — Tech stack constraints, modern corporate aesthetic, performance expectations
- `.planning/REQUIREMENTS.md` — PERF-01 (next/image), PERF-02 (next/font)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None (greenfield project)

### Established Patterns
- None (first phase)

### Integration Points
- This phase creates the foundation that all subsequent phases build upon
- `app/[lang]/` routing structure must be in place before Phase 2 (Layout & Navigation)
- Tailwind configuration affects Phase 3 (Theme System) dark mode setup

</code_context>

<specifics>
## Specific Ideas

- Research emphasized: i18n routing with `[lang]` dynamic segments prevents costly retrofit later
- Bundle analysis on every build catches performance regressions early (research identified >150KB as warning threshold)
- Path aliases (`@/*`) improve import readability and prevent deep relative paths

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-project-setup-foundation*
*Context gathered: 2026-03-20*
