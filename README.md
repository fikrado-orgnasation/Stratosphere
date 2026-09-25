<div align="center">

# Stratosphere Aeronautics

### School of Theoretical Knowledge Instruction (TKI) · Hargeisa, Somaliland

![Stratosphere Aeronautics Logo](./public/logo-removebg-preview.png)

**Precision in theory. Excellence in flight.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![License](https://img.shields.io/badge/license-private-blue?style=flat-square)](./LICENSE)

</div>

---

An ICAO-aligned theoretical knowledge instruction school in Hargeisa, Somaliland.
Students register for a single subject or build a complete theory programme, taught
privately and one to one by ERNAM-trained instructors.

This repository holds the school's public website — a React single-page application
covering the ten-subject syllabus, registration, books, careers, and contact.

## Contents

- [About the site](#about-the-site)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Standards and affiliations](#standards-and-affiliations)
- [Contact](#contact)
- [License](#license)

## About the site

**The syllabus.** All ten theoretical knowledge subjects are published and browsable,
each with its own detail page covering topics, assessment, and hours:

Air Law · Principles of Flight · Meteorology · Navigation and Flight Planning ·
Aircraft General Knowledge · Human Performance · Radio Communications ·
ATC and AIM · Safety Management Systems · Language Proficiency

**Registration.** Students pick a subject and register directly. With no backend
configured the flow hands off to WhatsApp; with `VITE_SUPABASE_URL` set it posts to a
Supabase edge function instead, so enquiries are stored as well as sent.

**Content.** Books and study packs held at the school, the four-stage student
journey, career routes, and contact details.

**Design.** The visual language is borrowed from the instrument panel and the nav
log — an amber-lit control face, a persistent instrument rail, and a syllabus set as
a reference table on chart paper. Hand-written CSS with custom properties, no
utility framework. Responsive and keyboard accessible, with reduced-motion support.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 + TypeScript 5.5 |
| Build | Vite 5 |
| Routing | react-router-dom 7 |
| Icons | lucide-react |
| Styling | Hand-written CSS, custom properties |
| Backend | Supabase edge function (Deno) + Postgres migration |
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

## Environment variables

All optional — the site runs fully without them.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | No | Supabase project URL. When set, the contact form POSTs to the `send-contact-inquiry` edge function. When unset, it falls back to WhatsApp. |

Copy `.env.example` to `.env.local` and set the value:

```bash
cp .env.example .env.local
```

Never commit `.env.local` — it is already git-ignored.

## Project structure

```
.
├── public/                  # Static assets (logos)
├── src/
│   ├── components/
│   │   └── Shell.tsx        # Layout, nav, footer, inquiry form
│   ├── data/
│   │   └── site.ts          # All content: subjects, fleet, books, contact
│   ├── pages/               # One file per route
│   ├── App.tsx              # Routes and per-page document metadata
│   ├── index.css            # The full design system
│   └── main.tsx             # Entry point
├── supabase/
│   ├── functions/           # send-contact-inquiry edge function
│   └── migrations/          # Postgres schema
├── index.html
└── vite.config.ts
```

Most copy edits are a one-file job: `src/data/site.ts` holds the subjects, books,
contact details, and accreditations as typed data.

## Scripts

| Command | Description |
| --- | --- |
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

Deploy the Supabase edge function with:

```bash
supabase functions deploy send-contact-inquiry
```

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
