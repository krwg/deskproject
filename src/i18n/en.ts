import type { Messages } from './types'

export const en: Messages = {
  langName: 'English',
  skipToContent: 'Skip to content',
  nav: {
    home: 'HOME',
    evolution: 'EVOLUTION',
    gallery: 'GALLERY',
    about: 'ABOUT',
    primary: 'Primary',
    mobile: 'Mobile',
    menu: 'MENU',
    close: 'CLOSE',
  },
  brand: {
    homeAria: 'THE DESK PROJECT home',
  },
  theme: {
    title: 'Theme',
    menuAria: 'Theme',
    triggerAria: 'Theme: {pref}. Open theme menu',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  locale: {
    switchAria: 'Language',
  },
  site: {
    tagline: 'A DIGITAL ARCHIVE OF MY WORKSPACE EVOLUTION.',
    shortTagline: 'A DIGITAL ARCHIVE OF MY WORKSPACE.',
    intro:
      'This project documents the evolution of my personal workspace — from a simple laptop setup to a fully developed workstation.',
    status: 'ACTIVE',
    configLabel: 'CURRENT CONFIGURATION',
  },
  footer: {
    archiveLine: 'ARCHIVE {from}–{to} · {sets} SETS · VERSION [{version}]',
  },
  loading: {
    initializing: 'INITIALIZING ARCHIVE',
    status: 'LOADING ARCHIVE',
    phases: [
      'INDEXING SETS...',
      'INITIALIZING INTERFACE...',
      'PREPARING ARCHIVE...',
    ],
  },
  hero: {
    enterEvolution: 'ENTER EVOLUTION',
    openGallery: 'OPEN GALLERY',
    scrollToArchive: 'SCROLL TO ARCHIVE',
  },
  home: {
    currentSetup: 'CURRENT SETUP',
    dragScroll: 'DRAG / SCROLL →',
    noHomeSets:
      'NO HOME SETS YET — drop media into public/images/sets/NN/ then run npm run images',
    projectNote: 'PROJECT NOTE / 02',
    xrayTitle: 'X-RAY',
    xrayLoading: 'LOADING…',
    xrayBadge: 'LIVE WEBGL',
    xrayNote: 'NOTE',
    xrayBlurb:
      'Measured desk schematic in X-ray wireframe. Drag to orbit, scroll to zoom — page scroll stays locked while the pointer is over the plate.',
    continueExploring: 'CONTINUE EXPLORING',
    openCta: 'OPEN →',
    previewEvolution:
      'Interactive horizontal timeline of the workspace as it changed over time.',
    previewGallery:
      'Equal 4:3 cover wall — open a set for clarifying frames and short loops.',
    previewAbout: 'Project statement, version history, and field notes.',
  },
  evolution: {
    kicker: 'EVOLUTION',
    title: 'WORKSPACE TIMELINE',
    lead: 'Horizontal museum timeline. Cards sit above and below the axis — open a set from the cover or OPEN SET.',
    openSet: 'OPEN SET →',
    openSetAria: 'Open {label}',
    goToAria: 'Go to {label}',
    navAria: 'Timeline navigation',
    previous: 'Previous',
    next: 'Next',
    hint: 'ENTRY {current} / {total} / DRAG / SWIPE',
  },
  gallery: {
    kicker: 'GALLERY',
    title: 'PHOTOGRAPHIC ARCHIVE',
    lead: 'Covers only. Click a set to open clarifying frames and short loops — each folder is one specimen in the chronological hall.',
    setsMedia: 'SETS {sets} / MEDIA {media}',
    sortAria: 'Sort: {label}',
    sortMenu: 'Sort',
    oldestFirst: 'Oldest first',
    newestFirst: 'Newest first',
    empty:
      'NO SETS YET — DROP MEDIA INTO public/images/sets/NN/ THEN RUN npm run images',
    mediaCount: '{count} MEDIA',
  },
  lightbox: {
    galleryBack: '← GALLERY',
    copyLink: 'COPY LINK',
    copied: 'COPIED',
    close: 'CLOSE / ESC',
    cover: 'COVER',
    photo: 'PHOTO',
    video: 'VIDEO',
    loop: ' / LOOP',
    img: 'IMG {n}',
    previous: 'Previous',
    next: 'Next',
    frames: 'Frames',
    openFrame: 'Open {n}',
  },
  about: {
    kicker: 'ABOUT',
    title: 'PROJECT INFO',
    statement: 'STATEMENT',
    statementBody:
      'is a digital archive of personal workspace evolution — photographs and interactive documentation presented as a technical museum.',
    structure: 'ARCHIVE STRUCTURE',
    homeDesc: 'Current setup',
    evolutionDesc: 'Timeline',
    galleryDesc: 'Photo archive',
    aboutDesc: 'Info & notes',
    xrayDesc: 'Spatial desk on Home',
    privacy: 'PRIVACY',
    privacyBody:
      'No product analytics or trackers. Theme and language preferences are stored in your browser (localStorage). Comments use Giscus / GitHub Discussions — signing in happens on GitHub’s side when you choose to post.',
    versions: 'VERSION HISTORY [{version}]',
    versionsAria: 'Version history',
  },
  comments: {
    kicker: 'FIELD NOTES',
    title: 'COMMENTS',
    lead: 'Public log via GitHub Discussions — one thread per page. Sign in with GitHub to leave a note.',
    loading: 'Loading comments…',
    deferred: 'Comments load when this section is near the viewport.',
    notConfigured: 'GISCUS NOT CONFIGURED',
    notConfiguredBody:
      'Add VITE_GISCUS_REPO, VITE_GISCUS_REPO_ID, VITE_GISCUS_CATEGORY, VITE_GISCUS_CATEGORY_ID from giscus.app to enable comments.',
    aria: 'Archive comments',
  },
  media: {
    awaiting: 'AWAITING ASSET',
    unassigned: 'UNASSIGNED',
  },
  set: {
    entry: 'Entry {id}',
    openAria: 'Open set {folder}: {title}',
  },
  notFound: {
    kicker: '404',
    title: 'Path not in the archive',
    lead: 'This URL is not part of {title}. The specimen may have moved, or the link is incomplete.',
    recovery: 'Recovery',
    home: 'Home',
    gallery: 'Gallery',
    about: 'About',
  },
  error: {
    kicker: 'RUNTIME FAULT',
    title: 'Something failed to render',
    lead: '{title} hit an unexpected error. You can reload the archive home without losing the rest of the project.',
    reload: 'Reload home',
  },
  meta: {
    homeDesc:
      'A digital archive of workspace evolution — photographs, timeline, and interactive desk documentation.',
    evolutionTitle: 'Evolution',
    evolutionDesc:
      'Chronological timeline of workspace changes — setups, gear, and layout shifts.',
    galleryTitle: 'Gallery',
    galleryDesc:
      'Photographic archive of desk setups. Open a set for clarifying frames and short loops.',
    aboutTitle: 'About',
    aboutDesc: 'Project info, version history, and notes for THE DESK PROJECT / krwg.',
    notFoundTitle: 'Not found',
    notFoundDesc: 'This path is not part of the THE DESK PROJECT archive.',
    setDesc: 'Set {id} in the THE DESK PROJECT photographic archive.',
  },
  versions: {
    'v1-1-0': {
      title: '[1.1.0] Maintenance',
      description:
        'Version strings unified to 1.1.0. English gallery sort labels. Follow-up work on set deep links, docs, CI checks, and archive UX.',
    },
    'v1-0': {
      title: '[1.0] Public archive',
      description:
        'First public release of THE DESK PROJECT / krwg. A small museum site that follows how a personal desk changed over time — photos, short clips, and a few interactive plates.',
    },
    'v1-0-spa': {
      title: 'Site foundation',
      description:
        'React + Vite SPA for GitHub Pages. Manrope and JetBrains Mono, Lenis scrolling, GSAP motion. Routes for Home, Evolution, Gallery, and About.',
    },
    'v1-0-sets': {
      title: 'Folder sets 01–60',
      description:
        'Each set lives in public/images/sets/NN. After npm run images the site picks up covers and clarifying shots automatically. Meta titles stay optional in sets.meta.ts.',
    },
    'v1-0-media': {
      title: 'Media pipeline',
      description:
        'Sharp builds WebP and thumbs. Covers stay monochrome on the wall; the lightbox opens in color. Videos play as short muted loops.',
    },
    'v1-0-home': {
      title: 'Home',
      description:
        'Full-bleed hero, a horizontal Current Setup strip of the newest sets, a short project note, then the X-Ray desk plate and links into the rest of the archive.',
    },
    'v1-0-xray': {
      title: 'X-Ray desk',
      description:
        'WebGL wireframe of the measured workstation — desk, monitor stack, soundbar, keyboard and mouse with a clear gap, case with coolers, mic arm, chair. Drag to orbit, scroll to zoom without moving the page.',
    },
    'v1-0-gallery': {
      title: 'Gallery',
      description:
        'Equal 4:3 tiles, hairline borders. Opening a set shows the full album, then a single-frame viewer.',
    },
    'v1-0-evolution': {
      title: 'Evolution',
      description:
        'Horizontal timeline of every set with media. Cards sit above and below the axis. OPEN SET opens that album.',
    },
    'v1-0-about': {
      title: 'About and notes',
      description:
        'Project statement, structure list, version history on an X-ray parts field, and optional Giscus comments when env keys are set.',
    },
    'v1-0-mobile': {
      title: 'Mobile layout',
      description:
        'Phone breakpoints for hero, header menu, strips, gallery, timeline, lightbox, and X-Ray. Desktop composition left as-is.',
    },
  },
}
