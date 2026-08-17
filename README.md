# kanavsinglaa.github.io

Personal portfolio — designed as a short research paper: an abstract, an
interactive figure, and tables of shipped work.

`fig. 01` is a hand-rolled 3D neural network on a `<canvas>` (no charting
library): input layer = signals, hidden layers = skills, output layer =
measured results. Drag to rotate; "run forward pass" animates activation
through the network while a time-to-first-token counter runs 218 ms → 22 ms.

## Stack

- [Vite](https://vitejs.dev) + React 18 — no other runtime dependencies
- IBM Plex Mono + STIX Two Text (Google Fonts)
- Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Deploy

Pushing to `main` triggers the Pages workflow. One-time setup: in the repo's
GitHub settings, set **Settings → Pages → Source** to **GitHub Actions**.

## Content

All resume-derived content lives in [src/data.js](src/data.js). The
downloadable resume is [public/resume.pdf](public/resume.pdf).
