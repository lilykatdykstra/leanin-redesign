# Lean In Connect — Redesign Prototype

## Overview

A high-fidelity static prototype redesigning the core Lean In community product — the screens where women find Circles, Networks, Groups, and resources. Built to test a warmer visual identity and cleaner information architecture before any engineering work begins.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home feed — posts, suggested circles, upcoming events, right-rail widgets |
| `explore.html` | Unified community browser — discover and filter Circles, Networks, and Groups in one view; includes a "My Communities" tab |
| `resources.html` | Resource library with search bar and category filters (Leadership, Career Growth, Research, Toolkits) |
| `explainer.html` | Plain-language explainer for what Circles, Networks, and Groups are, with CTAs linking to explore.html |
| `rationale.html` | Design rationale and decision log with before/after comparisons |
| `circles.html` | Legacy Circles browse page (superseded by explore.html) |
| `networks.html` | Legacy Networks browse page (superseded by explore.html) |

## Design Decisions

- **Warm neutral palette** (`#F5F0EB` background, `#FDFAF7` cards) instead of stark white — reduces visual harshness and feels more personal for a community product
- **Libre Baskerville for headings** — brings editorial warmth that contrasts the utility of Inter for body copy, signaling this is a human community, not a SaaS tool
- **Deep nav (`#2C1810`)** — grounds the top bar, makes the logo pop, and creates clear visual separation from content without competing with page actions
- **Unified explore page** — merging Circles, Networks, and Groups into one filterable view reduces navigation decisions and surfaces community types users might not know exist

## The Stack

- HTML
- CSS (custom properties, no framework)
- Vanilla JavaScript (tab switching, category filtering, search)

## How to Run

Open `index.html` in any browser. No build step required.

## Live Link

[https://lilykatdykstra.github.io/leanin-redesign](https://lilykatdykstra.github.io/leanin-redesign)

## What I'd Build Next

- **Real search** — connect the search bar to a backend or JSON data file so results are dynamic, not just text-match filtering of visible DOM elements
- **Member profiles** — clicking a Circle member or Network leader should open a lightweight profile card showing their role, bio, and mutual connections
- **Circle application flow** — the "Request to Join" button should trigger a short form (a few questions about goals and availability) so Circle leads can evaluate fit before accepting
