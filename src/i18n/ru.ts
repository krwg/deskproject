import type { Messages } from './types'

export const ru: Messages = {
  langName: 'Русский',
  skipToContent: 'К содержимому',
  nav: {
    home: 'ГЛАВНАЯ',
    evolution: 'ЭВОЛЮЦИЯ',
    gallery: 'ГАЛЕРЕЯ',
    about: 'О ПРОЕКТЕ',
    primary: 'Основная навигация',
    mobile: 'Мобильная навигация',
    menu: 'МЕНЮ',
    close: 'ЗАКРЫТЬ',
  },
  brand: {
    homeAria: 'THE DESK PROJECT — на главную',
  },
  theme: {
    title: 'Тема',
    menuAria: 'Тема',
    triggerAria: 'Тема: {pref}. Открыть меню темы',
    light: 'Светлая',
    dark: 'Тёмная',
    system: 'Системная',
  },
  locale: {
    switchAria: 'Язык',
  },
  site: {
    tagline: 'ЦИФРОВОЙ АРХИВ ЭВОЛЮЦИИ МОЕГО РАБОЧЕГО МЕСТА.',
    shortTagline: 'ЦИФРОВОЙ АРХИВ МОЕГО РАБОЧЕГО МЕСТА.',
    intro:
      'Этот проект документирует эволюцию моего личного рабочего пространства — от простого ноутбука до собранной рабочей станции.',
    status: 'АКТИВЕН',
    configLabel: 'ТЕКУЩАЯ КОНФИГУРАЦИЯ',
  },
  footer: {
    archiveLine: 'АРХИВ {from}–{to} · {sets} СЕТОВ · ВЕРСИЯ [{version}]',
  },
  loading: {
    initializing: 'ИНИЦИАЛИЗАЦИЯ АРХИВА',
    status: 'ЗАГРУЗКА АРХИВА',
    phases: [
      'ИНДЕКСАЦИЯ СЕТОВ...',
      'ИНИЦИАЛИЗАЦИЯ ИНТЕРФЕЙСА...',
      'ПОДГОТОВКА АРХИВА...',
    ],
  },
  hero: {
    enterEvolution: 'ОТКРЫТЬ ЭВОЛЮЦИЮ',
    openGallery: 'ОТКРЫТЬ ГАЛЕРЕЮ',
    scrollToArchive: 'К АРХИВУ',
  },
  home: {
    currentSetup: 'ТЕКУЩИЙ СЕТАП',
    dragScroll: 'ТЯНИ / СКРОЛЛ →',
    noHomeSets:
      'ПОКА НЕТ СЕТОВ ДЛЯ HOME — положи медиа в public/images/sets/NN/ и запусти npm run images',
    projectNote: 'ЗАМЕТКА ПРОЕКТА / 02',
    xrayTitle: 'X-RAY',
    xrayLoading: 'ЗАГРУЗКА…',
    xrayBadge: 'LIVE WEBGL',
    xrayNote: 'ЗАМЕТКА',
    xrayBlurb:
      'Схематичный стол в рентген-каркасе. Тяни, чтобы вращать, скролль для зума — пока курсор над пластиной, страница не скроллится.',
    continueExploring: 'ПРОДОЛЖИТЬ',
    openCta: 'ОТКРЫТЬ →',
    previewEvolution:
      'Горизонтальный таймлайн рабочего места — как оно менялось со временем.',
    previewGallery:
      'Стена обложек 4:3 — открой сет для уточняющих кадров и коротких лупов.',
    previewAbout: 'Описание проекта, история версий и полевые заметки.',
  },
  evolution: {
    kicker: 'ЭВОЛЮЦИЯ',
    title: 'ТАЙМЛАЙН РАБОЧЕГО МЕСТА',
    lead: 'Горизонтальный музейный таймлайн. Карточки сверху и снизу оси — открой сет с обложки или через ОТКРЫТЬ СЕТ.',
    openSet: 'ОТКРЫТЬ СЕТ →',
    openSetAria: 'Открыть {label}',
    goToAria: 'Перейти к {label}',
    navAria: 'Навигация по таймлайну',
    previous: 'Назад',
    next: 'Вперёд',
    hint: 'ЗАПИСЬ {current} / {total} / ТЯНИ / СВАЙП',
  },
  gallery: {
    kicker: 'ГАЛЕРЕЯ',
    title: 'ФОТОАРХИВ',
    lead: 'Только обложки. Кликни сет, чтобы открыть уточняющие кадры и короткие лупы — каждая папка один экземпляр в хронологическом зале.',
    setsMedia: 'СЕТЫ {sets} / МЕДИА {media}',
    sortAria: 'Сортировка: {label}',
    sortMenu: 'Сортировка',
    oldestFirst: 'Сначала старые',
    newestFirst: 'Сначала новые',
    empty:
      'ПОКА НЕТ СЕТОВ — ПОЛОЖИ МЕДИА В public/images/sets/NN/ И ЗАПУСТИ npm run images',
    mediaCount: '{count} МЕДИА',
  },
  lightbox: {
    galleryBack: '← ГАЛЕРЕЯ',
    copyLink: 'КОПИРОВАТЬ ССЫЛКУ',
    copied: 'СКОПИРОВАНО',
    close: 'ЗАКРЫТЬ / ESC',
    cover: 'ОБЛОЖКА',
    photo: 'ФОТО',
    video: 'ВИДЕО',
    loop: ' / ЛУП',
    img: 'КАДР {n}',
    previous: 'Назад',
    next: 'Вперёд',
    frames: 'Кадры',
    openFrame: 'Открыть {n}',
  },
  about: {
    kicker: 'О ПРОЕКТЕ',
    title: 'ИНФО ПРОЕКТА',
    statement: 'ЗАЯВЛЕНИЕ',
    statementBody:
      '— цифровой архив эволюции личного рабочего пространства: фотографии и интерактивная документация в формате технического музея.',
    structure: 'СТРУКТУРА АРХИВА',
    homeDesc: 'Текущий сетап',
    evolutionDesc: 'Таймлайн',
    galleryDesc: 'Фотоархив',
    aboutDesc: 'Инфо и заметки',
    xrayDesc: 'Пространственный стол на главной',
    privacy: 'ПРИВАТНОСТЬ',
    privacyBody:
      'Нет продуктовой аналитики и трекеров. Тема и язык хранятся в браузере (localStorage). Комментарии — через Giscus / GitHub Discussions: вход на стороне GitHub, если решишь написать.',
    versions: 'ИСТОРИЯ ВЕРСИЙ [{version}]',
    versionsAria: 'История версий',
  },
  comments: {
    kicker: 'ПОЛЕВЫЕ ЗАМЕТКИ',
    title: 'КОММЕНТАРИИ',
    lead: 'Публичный лог через GitHub Discussions — один тред на страницу. Войди через GitHub, чтобы оставить заметку.',
    loading: 'Загрузка комментариев…',
    deferred: 'Комментарии подгрузятся, когда блок окажется рядом с экраном.',
    notConfigured: 'GISCUS НЕ НАСТРОЕН',
    notConfiguredBody:
      'Добавь VITE_GISCUS_REPO, VITE_GISCUS_REPO_ID, VITE_GISCUS_CATEGORY, VITE_GISCUS_CATEGORY_ID с giscus.app, чтобы включить комментарии.',
    aria: 'Комментарии архива',
  },
  media: {
    awaiting: 'ЖДЁМ ФАЙЛ',
    unassigned: 'НЕ НАЗНАЧЕНО',
  },
  set: {
    entry: 'Запись {id}',
    openAria: 'Открыть сет {folder}: {title}',
  },
  notFound: {
    kicker: '404',
    title: 'Пути нет в архиве',
    lead: 'Этот URL не входит в {title}. Экземпляр мог переехать, или ссылка неполная.',
    recovery: 'Куда дальше',
    home: 'Главная',
    gallery: 'Галерея',
    about: 'О проекте',
  },
  error: {
    kicker: 'СБОЙ РЕНДЕРА',
    title: 'Что-то не отрисовалось',
    lead: 'В {title} произошла неожиданная ошибка. Можно перезагрузить главную архива — остальной проект на месте.',
    reload: 'На главную',
  },
  meta: {
    homeDesc:
      'Цифровой архив эволюции рабочего места — фотографии, таймлайн и интерактивная документация стола.',
    evolutionTitle: 'Эволюция',
    evolutionDesc:
      'Хронологический таймлайн изменений рабочего места — сетапы, железо и раскладка.',
    galleryTitle: 'Галерея',
    galleryDesc:
      'Фотоархив сетапов. Открой сет для уточняющих кадров и коротких лупов.',
    aboutTitle: 'О проекте',
    aboutDesc: 'Инфо проекта, история версий и заметки THE DESK PROJECT / krwg.',
    notFoundTitle: 'Не найдено',
    notFoundDesc: 'Этот путь не входит в архив THE DESK PROJECT.',
    setDesc: 'Сет {id} в фотоархиве THE DESK PROJECT.',
  },
  versions: {
    'v1-1-0': {
      title: '[1.1.0] Обслуживание',
      description:
        'Версии сведены к 1.1.0. Английские подписи сортировки галереи. Дальше — deep links сетов, доки, CI и UX архива.',
    },
    'v1-0': {
      title: '[1.0] Публичный архив',
      description:
        'Первый публичный релиз THE DESK PROJECT / krwg. Небольшой музейный сайт о том, как менялся личный стол — фото, короткие клипы и несколько интерактивных пластин.',
    },
    'v1-0-spa': {
      title: 'Основа сайта',
      description:
        'React + Vite SPA для GitHub Pages. Manrope и JetBrains Mono, Lenis, GSAP. Маршруты Home, Evolution, Gallery и About.',
    },
    'v1-0-sets': {
      title: 'Папки сетов 01–60',
      description:
        'Каждый сет живёт в public/images/sets/NN. После npm run images сайт сам подхватывает обложки и уточняющие кадры. Заголовки в sets.meta.ts по желанию.',
    },
    'v1-0-media': {
      title: 'Медиа-пайплайн',
      description:
        'Sharp собирает WebP и thumbs. На стене обложки монохром; в lightbox — цвет. Видео — короткие mute-лупы.',
    },
    'v1-0-home': {
      title: 'Home',
      description:
        'Полноэкранный hero, горизонтальная лента Current Setup из свежих сетов, короткая заметка, затем X-Ray стол и ссылки в остальной архив.',
    },
    'v1-0-xray': {
      title: 'X-Ray стол',
      description:
        'WebGL-каркас обмеренной станции — стол, мониторы, саундбар, клавиатура и мышь с зазором, корпус с кулерами, стойка микрофона, кресло. Вращение и зум без скролла страницы.',
    },
    'v1-0-gallery': {
      title: 'Галерея',
      description:
        'Одинаковые плитки 4:3, тонкие рамки. Открытие сета показывает альбом, затем просмотр кадра.',
    },
    'v1-0-evolution': {
      title: 'Эволюция',
      description:
        'Горизонтальный таймлайн всех сетов с медиа. Карточки сверху и снизу оси. ОТКРЫТЬ СЕТ ведёт в альбом.',
    },
    'v1-0-about': {
      title: 'About и заметки',
      description:
        'Заявление проекта, структура, история версий на поле X-ray и опциональные комментарии Giscus при настроенных ключах.',
    },
    'v1-0-mobile': {
      title: 'Мобильная вёрстка',
      description:
        'Брейкпоинты для hero, меню, лент, галереи, таймлайна, lightbox и X-Ray. Десктопная композиция без ломки.',
    },
  },
}
