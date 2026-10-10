# HAVEN Motors — Design Studio v2

An independent concept studio for two proposed cars: the P1 Core and P1R Founder's Series.

## Running locally

`python -m http.server 8000` and open `http://localhost:8000`

## Functionality

- Responsive cinematic vehicle showcase; accessible menu and skip navigation
- Interactive P1 concept configurator with editable trim and upgrade pricing, saves selections locally
- Lightbox gallery with concept art, alternate boards and engineering imagery
- Local downloadable PDF and PowerPoint investor and manufacturing pitch decks
- Motion respects reduced-motion preference; no reservations or payments accepted

## Deploy

A push to `main` triggers `.github/workflows/pages.yml`. Existing GitHub Pages URL: https://mrperkins.github.io/haven-concept/

## Disclosures and constraints

HAVEN is exploratory. Pricing and performance numbers are targets, not offers. Vehicle CAD, certifications, OEM licenses, manufacturing supply commitments and trademark clearance are unverified. Source images include AI renderings; other stock photos have credits and are third-party-hosted.

## Publishing QA

Run `node scripts/validate-site.mjs`, verify Pages workflow, then test browser presentation on desktop/tablet/mobile and inspect the interactive configurator. The repository's first version used SVG placeholders; v2 upgrades to original HAVEN concept renders and PDF/PPTX decks.
