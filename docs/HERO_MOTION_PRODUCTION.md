# HAVEN cinematic hero — editable production handoff

## Creative direction
- Hero subject: **HAVEN P1**, based on `assets/p1-hero.webp`, a concept rendering.
- Original camera intent: restrained cinematic lateral dolly over a stationary vehicle, dark automotive studio, warm metallic highlights, six seconds.
- AI motion source: Higgsfield Grok Video 1.5, generation job `57267c17-7b73-4a05-b313-b53b31ee52bb`.
- No production vehicle was filmed. AI may infer geometry outside the supplied reference.
- Generated video is a **rendered clip**, not an editable native Blender / After Effects / Premiere scene.

## Editable components
- **Camera/compositing direction**: video can be replaced by any approved 5–8 second H.264 loop.
- **Hero motion layers**: `css/hero-cinema.css` contains separate film, image, lighting sweep, gradient, type, scene marker, motion control layers.
- **Timing & playback**: `js/hero-cinema.js`, independently editable with video lifecycle, motion preferences, fallback, and visibility handling.
- **Copy**: `index.html` retains accessible HTML CTA buttons, disclosures, headings and metadata.
- **No video fallback**: `assets/p1-hero.webp`; visible on slow connections, unsupported browser, reduced-motion setting, Data Saver and video errors.

## Shot timeline for a future After Effects / Shot-Composer project
| Time (sec) | Motion | Grade and optics |
| --- | --- | --- |
| 0–1 | Start framing on P1 front three-quarter | Deep charcoal / warm rim |
| 1–4 | Slow lateral dolly with subtle push | Reveal side lines, no car displacement |
| 4–6 | Settle on badge / roof shoulder | Soft bronze softbox reflections |
| Continuous | Title, gradients, CTA stay in live HTML/CSS | Respect WCAG and contrast |

To retain editing beyond the browser, assemble original media as layers in After Effects or DaVinci Resolve, export film-only footage without burned-in typography, and replace `assets/haven-hero-motion.mp4` with the export. Keep project source files alongside the media master and the brand asset manifest. Native timeline project files were not created by this browser-based integration.

## Optimization and QA
Suggested encode: `ffmpeg -i source.mp4 -an -vf "scale=-2:720" -c:v libx264 -preset medium -crf 29 -movflags +faststart assets/haven-hero-motion.mp4`.
Validate with `node scripts/validate-site.mjs` and mobile/desktop browser passes. Never substitute a paint-colour video as proof of real dynamic vehicle configuration; paint swatches are implemented in `js/site.js`.
