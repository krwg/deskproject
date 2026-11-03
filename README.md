# THE DESK PROJECT

A quiet archive of one desk.

Photographs, short loops, and a few interactive plates — arranged like a small technical museum. Built by [krwg](https://krwg.github.io/krwg/).

**Live:** [krwg.github.io/deskproject](https://krwg.github.io/deskproject/)

---

## What’s inside

- **Home** — full-bleed hero, current setup strip, project note, and an X-Ray wireframe of the workstation you can orbit.
- **Evolution** — horizontal timeline of every set that has media. Open any entry into its album.
- **Gallery** — equal tiles, filters, fullscreen inspection.
- **About** — statement, structure, version history, optional field notes via Giscus.

Sets are numbered folders. Older on the left, newer on the right. The site reads the disk; you mostly add photos.

---

## Add photos

```
public/images/sets/01/
public/images/sets/02/
…
public/images/sets/60/
```

Inside a folder:

| File | Role |
|------|------|
| `main.jpg` / `main.png` / `main.mp4` | Cover |
| anything else | Clarifying frames and clips |

Optional hero background:

```
public/images/home/main.jpg
```

Optional titles and dates: `src/data/sets.meta.ts`

After dropping files:

```bash
npm run images
npm run dev
```

More detail: [CONTENT.md](CONTENT.md)

---

## Run locally

```bash
npm install
npm run images
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

---

## Stack

React, TypeScript, Vite, GSAP, Lenis, Three.js (X-Ray plate), Sharp (image pipeline). Deployed with GitHub Pages from `main`.

---

## Comments (optional)

Copy `.env.example` to `.env` and fill Giscus keys from [giscus.app](https://giscus.app). Without them the About page shows a short setup note instead of a thread.

---

## License

Personal archive. Photos and name remain with the author unless stated otherwise.
