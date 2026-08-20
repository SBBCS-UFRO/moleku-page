# Moleku GitHub Pages build

## Structure

```text
moleku-strida-inspired/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   ├── moleku-icon.png
│   ├── moleku-wordmark-navy.png
│   ├── moleku-wordmark-white.png
│   ├── moleku-wordmark-original.png
│   ├── moleku-wordmark-orange-original.png
│   ├── moleku-logo-dark-banner.png
│   ├── biginelli_reaction.png
│   ├── gbb_reaction.png
│   └── gewald_reaction.png
├── site.webmanifest
├── robots.txt
└── .nojekyll
```

## Main design changes

- Fixed editorial navigation rail on desktop.
- Mobile replacement navigation.
- Full-screen black hero with an original animated luminous-ribbon canvas.
- Large Swiss/editorial typography.
- Project-like product capability panels.
- Reaction section using the real Biginelli / GBB / Gewald schemes.
- Orange research section using Moleku's supplied white logo variant.
- Platform-aware download section.
- Second, quieter animated canvas in the closing panel.
- Scroll-based active navigation and subtle reveal animations.
- No custom cursor, no aggressive parallax, no scroll hijacking.

## Download logic

The JavaScript:
- detects Windows / Linux / macOS / mobile;
- attempts Apple Silicon vs Intel detection when the browser exposes it;
- asks the user to choose on macOS when the browser does not expose CPU architecture reliably;
- queries the GitHub Releases API;
- prefers `.exe` / `.msi`, `.AppImage`, `.dmg` / `.pkg` assets when available;
- falls back to Moleku's current separate release tags.

## GitHub Pages

Copy the contents to `/docs` in the Moleku repository:

```text
Moleku/
└── docs/
    ├── index.html
    ├── css/
    ├── js/
    ├── assets/
    ├── site.webmanifest
    ├── robots.txt
    └── .nojekyll
```

Then:

1. GitHub repository → Settings → Pages
2. Build and deployment → Deploy from a branch
3. Branch `main`
4. Folder `/docs`

## Local preview

Run from the site directory:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Branding

The site uses the Moleku logos supplied in the conversation. Transparent navy and white wordmark assets were derived from those supplied files only to make them usable over different backgrounds.

## Suggested next improvement

Replace any conceptual product visual with a real current screenshot of the Moleku desktop interface once a final screenshot is available. The site architecture does not depend on that replacement.


## Refinement pass — 20 Aug 2026

Changes in this build:

- Product generation visual now uses the latest Moleku symbol supplied by the project.
- Removed the previous Moleku wordmark from the orange Research section.
- Research now uses four original line icons for Open Source, Methods, Citation and Quick Start.
- Removed the extra animated closing CTA after Downloads.
- Downloads now transition directly into the clean white Moleku footer.
- Footer includes `© 2026 SB²CS®` and `Powered by GitHub Pages & RAVEN | プログラム`.
- Increased descriptive/body text sizes throughout Product, Workflows, Research and Downloads.
- Optimized the hero canvas:
  - one animated canvas instead of two;
  - 30fps cap;
  - lower device-pixel ratio;
  - fewer paths;
  - no glow shadow calculation;
  - animation pauses automatically when the hero leaves the viewport.
- Reveal transitions were shortened and now use GPU-friendly `translate3d`.


## Critical hotfix

A JavaScript initialization error was introduced when the footer was simplified:
the old `#year` element was removed from HTML but `app.js` still attempted to set
`#year.textContent`. That exception stopped the entire script.

Symptoms were exactly:
- hero canvas missing;
- Product/Workflows/Research/Downloads content invisible;
- sidebar permanently highlighted on Home;
- platform/release detection not updating.

This build fixes the initialization error and adds progressive enhancement:
content is now visible by default even if JavaScript ever fails again.
The active sidebar has also been changed to a lighter RAF-throttled
viewport-center tracker.


## Final polish pass

- ADMET/Product card 03 adjusted to prevent title/visual overlap.
- Workflow reaction schemes replaced with sharper assets and converted to transparent navy line art.
- Research icon cards now show icons only on the left; the large statement and right-hand labels were enlarged.
- Download section typography increased again for stronger readability.


## Workflow-only correction

This build changes only the Reaction Workflows presentation:

- Biginelli, GBB and Gewald now use the exact high-resolution figures supplied by the user.
- No recoloring, thresholding or image conversion is applied.
- The chemical schemes are shown on white figure plates to preserve their original black line quality.
- The workflow rows allocate more horizontal space to the chemistry.
- All other sections remain unchanged from the polished build.


## Translation line-break hotfix

Fixed literal `<br>` appearing inside translated headings.

Cause:
- `heroTagline` and `workflowStatement` contain HTML line-break tags in the translation dictionary.
- Their elements used `data-i18n`, which is written with `textContent`.
- Therefore the browser displayed `<br>` as text instead of interpreting it as a line break.

Fix:
- Both elements now use `data-i18n-html`.
- The current page was checked so every referenced translation containing HTML uses the HTML translation path.


## Pipeline redesign

The former Reaction Workflows section has been replaced by an end-to-end Moleku pipeline.

The new section presents:
1. Load reagents
2. Select reaction system
3. Enumerate the library
4. Compute descriptors
5. Filter candidates
6. Analyze locally in ADMET
7. Export results

Biginelli, GBB and Gewald remain visible in a compact `Current reaction systems`
subsection, but the scientific reaction figures have been removed from the landing
page so they no longer conflict with the editorial design language.

The existing anchor remains `#workflows` for compatibility, while its visible
navigation label is now `Pipeline`.


## Core chemistry figure pass

Added the three reaction references back into the `Current reaction systems`
cards, but styled them to match the landing-page art direction:

- the original reaction figures are converted into transparent navy assets;
- the white background is removed so the chemistry can sit naturally inside the section;
- each scheme is placed inside a subtle off-white editorial plate with a light border;
- only the `Core chemistry` subsection was changed in this build.


## Feedback shortcut

Added a direct Feedback button beside Download and GitHub in the desktop sidebar:

`https://mlkfeed.framer.website/`

A matching Feedback entry was also added to the mobile navigation.


## Language selector flags

The ES / EN text toggle has been replaced by local SVG flags:

- Spain flag = switch to Spanish
- United Kingdom flag = switch to English

The flags are bundled locally under `/assets`, so they do not depend on emoji
rendering, external CDNs or operating-system fonts. Accessible `aria-label` and
`title` values are updated together with the selected target language.


## Compact platform-aware sidebar download

The narrow sidebar no longer displays long labels such as
`Download for Windows`.

Instead it displays the detected target directly:

- Windows → `Windows ↓`
- Linux → `Linux ↓`
- macOS Apple Silicon → `Apple Silicon ↓`
- macOS Intel → `Intel Mac ↓`
- macOS architecture unknown → `macOS ↓`
- mobile → `Downloads ↓`

The larger hero CTA keeps the descriptive label such as
`Download for Windows`. The sidebar button also receives a full accessible
`title` and `aria-label`.


## Platform-only sidebar button

The sidebar primary button now shows only the detected platform:

- Windows → `Windows ↓`
- Linux → `Linux ↓`
- macOS Apple Silicon → `Apple Silicon ↓`
- macOS Intel → `Intel Mac ↓`
- macOS architecture unknown → `macOS ↓`

The word `Download` / `Descargar` is not used inside the sidebar button.
The hero CTA still keeps the full descriptive download label.

CSS and JavaScript references include a cache-busting version query so a
previous GitHub Pages/browser cache is less likely to keep the old label.
