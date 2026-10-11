# HAVEN SUV — sliced concept image assets

20 individual WebP files extracted from the 2026-10-11 HAVEN Core / Reserve concept comparison board. **These are concept-art crops, not finalized independent model renders.**

## Exterior — Core
`core/exterior-hero.webp`, `core/exterior-front.webp`, `core/exterior-side.webp`, `core/exterior-rear.webp`

## Exterior — Reserve
`reserve/exterior-hero.webp`, `reserve/exterior-front.webp`, `reserve/exterior-side.webp`, `reserve/exterior-rear.webp`

## Cabin
`core/interior-cockpit.webp`, `core/interior-second-row.webp`, `reserve/interior-cockpit.webp`, `reserve/interior-second-row.webp`

## Individual feature visuals
`features/occupant-monitoring.webp`, `features/rear-entertainment.webp`, `features/hidden-cooler.webp`, `features/integrated-vacuum.webp`, `features/smart-glass-roof.webp`, `features/guardian-security.webp`, `features/pilot-assist.webp`, `features/safety-cell.webp`

## Usage notes
- Keep Core and Reserve separate: they represent different vehicle lines.
- Hero crops are around 530–560 px wide and may retain lettering at the edge from the board. Use at moderate render sizes or as composition references; replace with dedicated high-res renders later.
- Angle crops (199–355 px wide) and feature crops (~160–215 px wide) are thumbnails; **do not enlarge them to full-screen hero assets**.
- A crop from a composite is not a physically consistent multi-angle 3D vehicle asset. Do not treat design details as finalized.
- Feature imagery is illustrative; crash protection, child-presence safety, and security options require independent engineering validation.
- `manifest.json` records per-asset pixel dimensions, the exact original source crop rectangle, and SHA-256 hashes for QA and future replacement.
- Current site assets at the parent `assets/` root remain untouched. This folder is an additional asset bank, not a site-wide design replacement.