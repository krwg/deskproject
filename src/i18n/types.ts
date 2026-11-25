export type Locale = 'en' | 'ru'

export const LOCALES: Locale[] = ['en', 'ru']

export const LOCALE_STORAGE_KEY = 'desk-locale'

export type Messages = {
  langName: string
  skipToContent: string
  nav: {
    home: string
    evolution: string
    gallery: string
    about: string
    primary: string
    mobile: string
    menu: string
    close: string
  }
  brand: {
    homeAria: string
  }
  theme: {
    title: string
    menuAria: string
    triggerAria: string
    light: string
    dark: string
    system: string
  }
  locale: {
    switchAria: string
  }
  site: {
    tagline: string
    shortTagline: string
    intro: string
    status: string
    configLabel: string
  }
  footer: {
    archiveLine: string
  }
  loading: {
    initializing: string
    status: string
    phases: [string, string, string]
  }
  hero: {
    enterEvolution: string
    openGallery: string
    scrollToArchive: string
  }
  home: {
    currentSetup: string
    dragScroll: string
    noHomeSets: string
    projectNote: string
    xrayTitle: string
    xrayLoading: string
    xrayBadge: string
    xrayNote: string
    xrayBlurb: string
    continueExploring: string
    openCta: string
    previewEvolution: string
    previewGallery: string
    previewAbout: string
  }
  evolution: {
    kicker: string
    title: string
    lead: string
    openSet: string
    openSetAria: string
    goToAria: string
    navAria: string
    previous: string
    next: string
    hint: string
  }
  gallery: {
    kicker: string
    title: string
    lead: string
    setsMedia: string
    sortAria: string
    sortMenu: string
    oldestFirst: string
    newestFirst: string
    empty: string
    mediaCount: string
  }
  lightbox: {
    galleryBack: string
    copyLink: string
    copied: string
    close: string
    cover: string
    photo: string
    video: string
    loop: string
    img: string
    previous: string
    next: string
    frames: string
    openFrame: string
  }
  about: {
    kicker: string
    title: string
    statement: string
    statementBody: string
    structure: string
    homeDesc: string
    evolutionDesc: string
    galleryDesc: string
    aboutDesc: string
    xrayDesc: string
    privacy: string
    privacyBody: string
    versions: string
    versionsAria: string
  }
  comments: {
    kicker: string
    title: string
    lead: string
    loading: string
    deferred: string
    notConfigured: string
    notConfiguredBody: string
    aria: string
  }
  media: {
    awaiting: string
    unassigned: string
  }
  set: {
    entry: string
    openAria: string
  }
  notFound: {
    kicker: string
    title: string
    lead: string
    recovery: string
    home: string
    gallery: string
    about: string
  }
  error: {
    kicker: string
    title: string
    lead: string
    reload: string
  }
  meta: {
    homeDesc: string
    evolutionTitle: string
    evolutionDesc: string
    galleryTitle: string
    galleryDesc: string
    aboutTitle: string
    aboutDesc: string
    notFoundTitle: string
    notFoundDesc: string
    setDesc: string
  }
  versions: Record<string, { title: string; description: string }>
}
