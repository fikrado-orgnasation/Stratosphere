<div align="center">

# Stratosphere Aeronautics

### School of Theoretical Knowledge Instruction (TKI) · Hargeisa, Somaliland

![Stratosphere Aeronautics Logo](./public/logo-removebg-preview.png)

**Precision in theory. Excellence in flight.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r186-000000?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org)

</div>

---

An ICAO-aligned theoretical knowledge instruction school in Hargeisa, Somaliland.
Students register for a single subject or build a complete theory programme, taught
privately and one to one by ERNAM-trained instructors.

This repository holds the school's public website — a React single-page application
covering the ten-subject syllabus, registration, books, careers, student life, and contact.

## About the site

**The syllabus.** All ten theoretical knowledge subjects are published and browsable,
each with its own detail page covering topics, assessment, and contact:

Air Law · Principles of Flight · Meteorology · Navigation and Flight Planning ·
Aircraft General Knowledge · Human Performance · Radio Communications ·
ATC and AIM · Safety Management Systems · Language Proficiency

**Registration.** Students pick a subject (single or full PPL/CPL theory package) and
enquire directly. The flow hands off to WhatsApp with a pre-filled message to the
admissions desk, so every enquiry reaches a real registrar in Hargeisa within 24 hours.

**Content.** The ten-school library and study packs, the four-stage student journey,
career pathways, a student-life photo gallery, and full contact details.

**Design.** A clean modern school identity — navy, aviation blue and amber — with
aviation photography throughout and an animated **Three.js 3D background** (an
atmospheric particle field of gold and blue flight motes, navigation rings and flight
vectors) behind the hero and every page banner. Glassmorphism panels, a simple sticky
header, and a green WhatsApp chat button fixed to every page. Hand-written CSS with
custom properties, no utility framework. Responsive and keyboard accessible, with
reduced-motion support.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript 5.5 |
| Build | Vite 5 |
| Routing | react-router-dom 7 |
| Icons | lucide-react |
| 3D background | Three.js (WebGL) |
| Styling | Hand-written CSS, custom properties |
| Linting | ESLint 9, typescript-eslint |

## Getting started

**Requirements:** Node.js 20+ and npm 10+.

```bash
git clone https://github.com/fikrado-orgnasation/Stratosphere.git
cd Stratosphere
npm install
npm run dev
```

The dev server starts on [http://localhost:5173](http://localhost:5173) and hot-reloads
on save. Vite falls back to the next free port if 5173 is taken.

## Project structure

```
.
├── public/                  # Static assets (logos)
├── src/
│   ├── components/
│   │   ├── Shell.tsx        # Layout: header, nav, footer, WhatsApp button, inquiry form
│   │   └── CinematicAtmosphere.tsx  # Three.js animated 3D aviation background
│   ├── data/
│   │   └── site.ts          # All content: subjects, fleet, books, contact
│   ├── pages/               # One file per route
│   ├── App.tsx              # Routes and per-page document metadata
│   ├── index.css            # The full design system
│   └── main.tsx             # Entry point
├── index.html
└── vite.config.ts
```

Most copy edits are a one-file job: `src/data/site.ts` holds the subjects, books,
contact details, and accreditations as typed data.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check without emitting |
| `npm run lint` | Run ESLint |

## Deployment

The build output is a static bundle in `dist/` — host it on any static platform
(Vercel, Netlify, Cloudflare Pages, GitHub Pages) with the build command `npm run
build` and the output directory `dist`.

The site is an SPA with client-side routing. Configure your host to rewrite unknown
paths to `/index.html` so deep links like `/training/3` resolve correctly.

## Contributing

```bash
git checkout -b your-branch
# make changes
npm run typecheck && npm run lint && npm run build
git commit -m "Describe your change"
git push origin your-branch
```

Please run typecheck, lint, and build before opening a pull request.

## Standards and affiliations

- **ICAO** — International Civil Aviation Organization
- **ERNAM** — Regional School of Air Navigation and Management
- **ASECNA** — Agency for Aerial Navigation Safety
- **ICAO WACAF** — regional office partner

## Contact

**Stratosphere Aeronautics**
Bahsane Building, 2nd Floor, Room 213
Western entrance, facing west · Opposite the former National Cinema
Hargeisa, Somaliland

- **Phone:** +252 63 4482830 · +252 65 4482830 · +252 63 3347512
- **Email:** info@stratosphereaeronautics.com
- **WhatsApp:** [wa.me/252634482830](https://wa.me/252634482830)

---

<div align="center">

© 2026 Stratosphere Aeronautics. All rights reserved.

</div>
