import type { VersionHistoryEntry } from '@/types'

export const versionHistory: VersionHistoryEntry[] = [
  {
    id: 'v1-0',
    date: '2026-11',
    type: 'other',
    title: '[1.0] Public archive',
    description:
      'First public release of THE DESK PROJECT / krwg. A small museum site that follows how a personal desk changed over time — photos, short clips, and a few interactive plates.',
    relatedSetIds: [],
  },
  {
    id: 'v1-0-spa',
    date: '2026-11',
    type: 'other',
    title: 'Site foundation',
    description:
      'React + Vite SPA for GitHub Pages. Manrope and JetBrains Mono, Lenis scrolling, GSAP motion. Routes for Home, Evolution, Gallery, and About.',
  },
  {
    id: 'v1-0-sets',
    date: '2026-11',
    type: 'layout-changed',
    title: 'Folder sets 01–60',
    description:
      'Each set lives in public/images/sets/NN. After npm run images the site picks up covers and clarifying shots automatically. Meta titles stay optional in sets.meta.ts.',
  },
  {
    id: 'v1-0-media',
    date: '2026-11',
    type: 'other',
    title: 'Media pipeline',
    description:
      'Sharp builds WebP and thumbs. Covers stay monochrome on the wall; the lightbox opens in color. Videos play as short muted loops.',
  },
  {
    id: 'v1-0-home',
    date: '2026-11',
    type: 'layout-changed',
    title: 'Home',
    description:
      'Full-bleed hero, a horizontal Current Setup strip of the newest sets, a short project note, then the X-Ray desk plate and links into the rest of the archive.',
  },
  {
    id: 'v1-0-xray',
    date: '2026-11',
    type: 'layout-changed',
    title: 'X-Ray desk',
    description:
      'WebGL wireframe of the measured workstation — desk, monitor stack, soundbar, keyboard and mouse with a clear gap, case with coolers, mic arm, chair. Drag to orbit, scroll to zoom without moving the page.',
  },
  {
    id: 'v1-0-gallery',
    date: '2026-11',
    type: 'layout-changed',
    title: 'Gallery',
    description:
      'Equal 4:3 tiles, hairline borders. Opening a set shows the full album, then a single-frame viewer.',
  },
  {
    id: 'v1-0-evolution',
    date: '2026-11',
    type: 'layout-changed',
    title: 'Evolution',
    description:
      'Horizontal timeline of every set with media. Cards sit above and below the axis. OPEN SET opens that album.',
  },
  {
    id: 'v1-0-about',
    date: '2026-11',
    type: 'other',
    title: 'About and notes',
    description:
      'Project statement, structure list, version history on an X-ray parts field, and optional Giscus comments when env keys are set.',
  },
  {
    id: 'v1-0-mobile',
    date: '2026-11',
    type: 'layout-changed',
    title: 'Mobile layout',
    description:
      'Phone breakpoints for hero, header menu, strips, gallery, timeline, lightbox, and X-Ray. Desktop composition left as-is.',
  },
]
