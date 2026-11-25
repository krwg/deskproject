# Contributing

Thanks for taking an interest in **THE DESK PROJECT**.

This repo is primarily a personal archive. Useful contributions are welcome: bug fixes, accessibility, docs, and pipeline improvements.

## Setup

```bash
npm install
npm run dev
```

Site base path matches GitHub Pages (`/deskproject/`).

## Content

To add photos/sets, follow [`CONTENT.md`](CONTENT.md). Always run:

```bash
npm run images
npm run check:manifest
```

and commit both media and updated manifests.

## Checks before a PR

```bash
npm run lint
npm run check:manifest
npm run build
```

## Pull requests

- Keep PRs focused (one concern each).
- Describe what changed and how you verified it.
- Do not commit secrets (`.env`, tokens, private notes).
