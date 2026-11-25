# Content guide

How to add desk sets to this archive.

## Layout

```
public/images/sets/
  01/          oldest
  …
  NN/          newest
```

Each numbered folder is one set. Empty folders are ignored until they contain media.

## Drop files

Put originals in the set folder:

```
44/main.jpg
44/photo_2026-11-26_00-18-25.jpg
44/clip.mp4          # optional
```

- Prefer a file named `main.*` as the cover (otherwise the first sorted file is used).
- Photos: `.jpg` / `.jpeg` / `.png` / `.webp`
- Video: `.mp4` / `.webm` / `.mov` (ffmpeg recommended for loops/thumbs)
- Skip committing only-derived names like `*-thumb.webp` by hand — the pipeline writes those.

Short note in Russian: see `public/images/sets/README.md`.

## Build derivatives + manifests

```bash
npm run images
```

This will:

1. Write WebP + thumbnails (when `sharp` works)
2. Optionally trim video loops (when `ffmpeg` is on PATH)
3. Refresh `src/data/sets.manifest.json` and `src/data/home.manifest.json`

Commit **both** the media under `public/images/sets/NN/` **and** the updated manifests. Deploy does not run `images` for you.

Check that folders and the manifest still match:

```bash
npm run check:manifest
```

## Optional titles / captions

Defaults are `Entry NN`. Override in `src/data/sets.meta.ts`:

```ts
export const setsMetaOverrides = {
  '44': {
    title: 'Winter desk',
    caption: 'Cable tidy + monitor arm',
  },
}
```

Dates usually come from filenames (`photo_YYYY-MM-DD_…`) or EXIF; you can also set `date` in the meta override.

## Where sets show up

After `npm run images` + deploy:

| Surface | Rule |
|--------|------|
| Gallery / Evolution | Every set that has media |
| Current Setup (Home) | Newest sets |
| Hero slideshow | Curated IDs in `src/data/home.ts` |

## Local preview

```bash
npm install
npm run images    # if you added files
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/deskproject/` when `base` is set).
