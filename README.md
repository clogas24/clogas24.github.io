# clogas24.github.io

Carson Logas's personal portfolio site: [carsonlogas.com](https://clogas24.github.io/). React
+ Vite, built as a multi-page app (one static HTML output per route, no client-side router) and
deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) on every push to
`main`.

## Structure

- `index.html` + `src/pages/Home.jsx` — homepage: about, experience, featured projects,
  computer vision series, skills, and contact.
- `src/entry-*.jsx` — one Vite entry per page, each mounting its page component into `#root`.
- `src/components/` — shared UI: header, footer, tech-tag pills, GitHub icon, scroll-reveal,
  and the animated hero stat counters.
- `public/css/style.css` — the single stylesheet for the whole site.
- `public/` — everything else served at a fixed URL: the favicon/headshot, and each project's
  images and PDFs.
- `k-anonymity-vs-differential-privacy/` — Data Anonymization final project:
  K-anonymity vs. differential privacy compared head-to-head on three datasets.
- `realtime-file-sync/` — Computer Networks final project: a multi-client file
  sync server built on raw TCP sockets.
- `c-compiler/` — Compiler Construction project: a Flex/Bison lexer/parser that
  type-checks a C subset and emits ILOC-style IR.
- `computer-vision/Project0`–`Project4` — CS 581 computer vision project series
  (Fashion-MNIST classifier, camera geometry/edge detection, homography-based AR,
  object detection, and diffusion denoising), each a write-up with its PDF report
  embedded at the bottom.

## Local dev

```
npm install
npm run dev            # Vite dev server
npm run build           # production build to dist/
npm run preview         # serve the production build locally
```
