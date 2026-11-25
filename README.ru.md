<p align="center">
  <img src="public/favicon.svg" width="56" height="56" alt="THE DESK PROJECT" />
</p>

<h1 align="center">THE DESK PROJECT</h1>

<p align="center">
  <a href="README.md">English</a>
</p>

<p align="center">
  <strong>Цифровой архив эволюции моего рабочего места.</strong><br/>
  Фото · короткие лупы · таймлайн · X-Ray стол<br/>
  by <a href="https://krwg.github.io/krwg/">krwg</a>
</p>

<p align="center">
  <a href="https://krwg.github.io/deskproject/"><img src="https://img.shields.io/badge/live-krwg.github.io%2Fdeskproject-111111?style=for-the-badge&labelColor=080808" alt="Live site" /></a>
  <img src="https://img.shields.io/badge/version-1.1.0-eaeae8?style=for-the-badge&labelColor=080808" alt="Version 1.1.0" />
  <img src="https://img.shields.io/badge/license-Apache%202.0-3a3a3a?style=for-the-badge&labelColor=080808" alt="Apache 2.0" />
</p>

---

## Что это

Не шаблон и не starter kit. В репозитории — **мой** стол: как выглядел, как менялся и как выглядит сейчас.

Сайт собран как небольшой технический музей: швейцарская типографика, монохромные обложки, которые открываются в цвет, тема Light / Dark / System. Сеты — хронологические папки. Слева старые, справа новые.

**Сайт → [krwg.github.io/deskproject](https://krwg.github.io/deskproject/)**

Добавление контента: [`CONTENT.md`](CONTENT.md) (EN) и кратко [`public/images/sets/README.md`](public/images/sets/README.md).

---

## Карта архива

```mermaid
flowchart LR
  H[Home] --> CS[Current Setup strip]
  H --> XR[X-Ray WebGL desk]
  H --> HB[Hero slideshow]
  E[Evolution] --> TL[Horizontal timeline]
  TL --> LB[Set album / lightbox]
  G[Gallery] --> WALL[Equal 4:3 cover wall]
  WALL --> LB
  A[About] --> VH[Version history]
  H --> NOTES[Giscus per page]
  E --> NOTES
  G --> NOTES
  A --> NOTES
```

| Раздел | Что внутри |
|--------|------------|
| **Home** | Полноэкранный hero с обложками, полоса Current Setup, заметка о проекте, интерактивный **X-Ray** |
| **Evolution** | Таймлайн — карточки сверху/снизу оси, **OPEN SET** открывает альбом |
| **Gallery** | Сетка обложек **4:3**; клик по сету — кадры и короткие видеолупы |
| **About** | Statement, структура, история версий |
| **Comments** | Giscus на каждой странице — отдельный Discussion на роут (`page-home`, `page-gallery`, …) |

Отдельной страницы Hardware нет. Старые URL `/hardware` ведут на Home.

---

## Стол в X-Ray

Секция **03** на Home — живая WebGL-пластина. Тёмная тема: белые рёбра на чёрном. Светлая: чёрные на белом.

Пропорции реальные — стол, тумба, корпус с кулерами, монитор + саундбар, клавиатура и мышь с зазором к сидящему, рука микрофона, кресло. Drag — орбита. Scroll — зум (скролл страницы над пластиной заблокирован). Three.js подгружается только при монтировании секции.

---

## Порядок архива

```
01  →  самый старый
…
NN  →  самый новый
```

- **Gallery / Evolution** — все сеты с медиа, по хронологии
- **Current Setup (Home)** — самые новые сеты горизонтальной полосой
- **Hero** — слайдшоу выбранных обложек (crossfade + лёгкий Ken Burns)

Обложка всегда ведёт: сетка сета → один кадр. На стене обложки монохромные; lightbox — «тёмная комната» (читается в обеих темах).

Шаринговые URL сетов: `/gallery/44` (закрытие → `/gallery`).

---

## Медиа и производительность

Пайплайн (`npm run images`) собирает WebP и thumbs. Для видео нужен **ffmpeg** в PATH: пишутся короткие `*-loop5.mp4` (сайт не должен отдавать сырые `.MOV` с телефона). В UI:

- `loading="lazy"` / `decoding="async"`
- `srcSet` thumb + full где есть
- `content-visibility` на кадрах
- отложенный чанк Three.js для X-Ray

Это помогает при росте числа сетов, но не заменяет замер LCP/CLS на реальном устройстве после крупных добавлений.

`sets.manifest.json` грузится отдельным ассетом (не вшит в основной JS), чтобы critical bundle не раздувался вместе с архивом.

Перед коммитом контента:

```bash
npm run images
npm run check:manifest
```

---

## Версия 1.1.0

На базе публичного архива 1.0:

- Vite + React SPA на GitHub Pages
- Папочные сеты с автоподхватом после image pipeline
- WebP / thumbs, короткие muted video loops
- Home hero + Current Setup + X-Ray
- Light / Dark / System
- Язык интерфейса EN / RU (переключатель в шапке)
- Evolution с OPEN SET
- Gallery + SetLightbox
- About + version history
- Giscus на каждой странице (свой тред на роут)
- Мобильная вёрстка без ломки десктопной композиции
- Maintenance: единая версия, EN gallery sort, docs/CI/UX follow-ups
- Deep-link `/gallery/:setId`, отдельный fetch манифеста, a11y lightbox

---

## Стек

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-111111?style=for-the-badge&logoColor=white" alt="Lenis" />
</p>

Деплой: `main` → `gh-pages` через GitHub Actions.

---

## Автор

**krwg** — [krwg.github.io/krwg](https://krwg.github.io/krwg/)

Репозиторий показывает сайт и стол. Фото и имя остаются за автором.

---

## Лицензия

Apache License 2.0 — см. [LICENSE](LICENSE).
