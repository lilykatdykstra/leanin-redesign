# Lean In Connect — Redesign Prototype

A working front-end prototype redesigning key experiences on Lean In's community platform, Connect.LeanIn.org.

**Live site:** https://lilykatdykstra.github.io/leanin-redesign

**GitHub:** https://github.com/lilykatdykstra/leanin-redesign

## Pages
- `index.html` — Redesigned home feed with post composer, feed filters, sidebar communities, right panel with upcoming Circle meeting and suggested connections
- `explore.html` — Unified Communities page merging Circles, Networks, and Groups with Discover and My Communities tabs, plus an explainer section at the bottom
- `resources.html` — Searchable resource library with category filters and article cards
- `rationale.html` — Full design rationale, audit findings, and process notes
- `style.css` — Shared styles across all pages

## Design Decisions
- **Unified Communities page:** The original platform separates Circles, Networks, and Groups into different navigation items with no explanation of the differences. As a new user I found this genuinely confusing. Merging them into one Explore page with a clear explainer at the bottom reduces cognitive load and lowers abandonment from users who don't know what they're joining.
- **Feed filters:** The original feed presents all content at equal weight with no way to narrow it. The All / My Circles / My Networks / Saved filter system puts the user in control of their feed immediately.
- **Warm color palette:** Cream backgrounds (#F5F0EB) and deep red accents (#C41E3A) over pure white — warmer on the eyes, more welcoming, and intentionally embraces the femininity of the brand rather than neutralizing it.
- **Navigation consolidation:** Reduced top-level nav to three items (Home, Communities, Resources) to eliminate the overwhelm of too many competing destinations.

## Tech Stack
HTML, CSS, vanilla JavaScript — no frameworks or build tools required.

## How to Run
Open `index.html` in any browser, or visit the live link above.

## What I'd Build Next
- An onboarding flow for new members that walks through what Circles, Networks, and Groups are and helps them join their first one
- Profile completion experience tied to community discovery
- Mobile-optimized interactions and gesture support

## AI Tools
I used Claude to synthesize my audit notes and design thinking into structured decisions, and Claude Code / Cursor to build the prototype. AI tooling let me scope and execute a more complete prototype in 3 hours than would otherwise have been possible. All design decisions, prompts, and judgment calls were mine.