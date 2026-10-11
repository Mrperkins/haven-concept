# HAVEN Motors — Design Studio v2

An independent concept studio for two proposed cars: the P1 Core and P1R Founder's Series.

## Running locally

`python -m http.server 8000` and open `http://localhost:8000`

## Functionality

- Cinematic, scroll-driven showcase: animated hero with light sweep and drifting dust, scroll-linked manifesto text, stacking full-screen vehicle panels with count-up specs
- Animated OpenArchitecture diagram (rotating orbits, drawn spokes) with keyboard-accessible tabs
- Interactive cabin hotspots over the P1 interior render
- Pinned horizontal-scroll design-studio gallery with lightbox (native swipe scroll on mobile)
- P1 configurator: live exterior paint recolor, accent-light glow, priced upgrades, saved locally, copy-build
- Scroll-drawn roadmap timeline; PDF and PowerPoint investor and manufacturing decks
- SpaceX/Tesla-style tech layer: boot sequence, HUD corner brackets with mission clock and telemetry ticker, side section rail, outlined parallax type, cursor ring, film grain
- Dimension viewer: P1 / P1R side, front, rear and cutaway views cropped from the design-board renders (`assets/haven-views/`), with a sweep reveal and counting dimension lines
- SUV lineup (Core / Reserve) with front/side/rear and cabin views, framed in HUD cards. Source crops are low-res, so shown small; board text was inpainted from the two hero crops as `*-clean.webp` copies
- Respects `prefers-reduced-motion`; no reservations or payments accepted

Files: `index.html`, `css/site.css`, `js/site.js` (no build step, no dependencies besides the Inter web font).

## Deploy

A push to `main` triggers `.github/workflows/pages.yml`. Existing GitHub Pages URL: https://mrperkins.github.io/haven-concept/

## Disclosures and constraints

HAVEN is exploratory. Pricing and performance numbers are targets, not offers. Vehicle CAD, certifications, OEM licenses, manufacturing supply commitments and trademark clearance are unverified. Source images include AI renderings; other stock photos have credits and are third-party-hosted.

## Publishing QA

Run `node scripts/validate-site.mjs`, verify Pages workflow, then test browser presentation on desktop/tablet/mobile and inspect the interactive configurator. The repository's first version used SVG placeholders; v2 upgrades to original HAVEN concept renders and PDF/PPTX decks.

## HAVEN vehicle commercialization program

The first 90 days of Core and Reserve SUV feasibility work are documented under [`program/`](program/README.md). The public-facing program overview lives at [`program/`](program/index.html). The product specification, regulatory risk register, partner RFI, customer discovery plan and decision log are **working hypotheses**, not validated automotive claims or supplier quotations. 
