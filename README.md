<p align="center">
  <img src="public/favicon.svg" width="56" height="56" alt="THE DESK PROJECT" />
</p>

<h1 align="center">THE DESK PROJECT</h1>

<p align="center">
  <strong>A digital archive of my workspace evolution.</strong><br/>
  Photographs · short loops · timeline · X-Ray desk<br/>
  by <a href="https://krwg.github.io/krwg/">krwg</a>
</p>

<p align="center">
  <a href="https://krwg.github.io/deskproject/"><img src="https://img.shields.io/badge/live-krwg.github.io%2Fdeskproject-111111?style=for-the-badge&labelColor=080808" alt="Live site" /></a>
  <img src="https://img.shields.io/badge/version-1.0-eaeae8?style=for-the-badge&labelColor=080808" alt="Version 1.0" />
  <img src="https://img.shields.io/badge/license-Apache%202.0-3a3a3a?style=for-the-badge&labelColor=080808" alt="Apache 2.0" />
</p>

---

## What this is

Not a template. Not a starter kit. This repository hosts **my** desk — how it looked, how it changed, and how it looks now.

The site reads like a small technical museum: dark plate, Swiss type, monochrome covers that open into color. Sets are chronological folders. Oldest on the left. Newest on the right.

**Live site → [krwg.github.io/deskproject](https://krwg.github.io/deskproject/)**

---

## Map of the archive

```mermaid
flowchart LR
  H[Home] --> CS[Current Setup strip]
  H --> XR[X-Ray WebGL desk]
  E[Evolution] --> TL[Horizontal timeline]
  TL --> LB[Set album / lightbox]
  G[Gallery] --> WALL[4:3 cover wall]
  WALL --> LB
  A[About] --> VH[Version history]
  A --> NOTES[Field notes]
```

| Section | What you get |
|--------|----------------|
| **Home** | Full-bleed hero, newest sets as a drag strip, project note, interactive **X-Ray** wireframe of the measured workstation |
| **Evolution** | Museum timeline — cards above / below the axis, **OPEN SET** opens that album |
| **Gallery** | Equal 4:3 covers across the wall; click a set for clarifying frames and short video loops |
| **About** | Statement, structure, version history on an X-ray parts field, optional Giscus notes |

---

## The desk in X-Ray

Home section **03** is a live WebGL plate: white edges on black, same language as a blueprint.

Built to real proportions — desk, pedestal, case with coolers, monitor + soundbar, keyboard and mouse with a clear gap toward the sitter, mic arm, chair. Drag to orbit. Scroll to zoom (page scroll stays locked over the plate).

Reference aesthetic lives in `public/images/xray/`. The procedural mesh can later be swapped for a measured GLB without changing the camera language.

---

## How the archive is ordered

```
01  →  oldest
…
NN  →  newest
```

- **Gallery / Evolution** — every set that has media, chronological
- **Current Setup (Home)** — the newest sets, as a horizontal strip
- **Hero background** — dedicated home plate when present; otherwise falls back to a recent cover

Opening a cover always goes: set grid → single frame. Covers stay mono on the wall; the lightbox is color.

---

## Version 1.0

Public foundation of the project:

- Vite + React SPA on GitHub Pages
- Folder sets with automatic discovery after the image pipeline
- WebP / thumbs, short muted video loops
- Home hero + Current Setup + X-Ray
- Evolution timeline with OPEN SET
- Gallery wall + SetLightbox
- About + version history
- Mobile layout that leaves the desktop composition alone

---

## Stack

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Three.js-X--Ray-000000?style=flat-square&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-motion-88CE02?style=flat-square" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-scroll-111111?style=flat-square" alt="Lenis" />
</p>

Deployed from `main` → `gh-pages` via GitHub Actions.

---

## Author

**krwg** — [krwg.github.io/krwg](https://krwg.github.io/krwg/)

This repo exists to show the site and the desk. Photos and name stay with the author.

---

## License

Apache License 2.0 — see [LICENSE](LICENSE).
