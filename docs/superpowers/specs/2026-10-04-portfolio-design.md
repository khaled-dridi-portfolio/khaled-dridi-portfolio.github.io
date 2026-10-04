# Portfolio Website — Design Spec

**Date:** 2026-10-04
**Owner:** Mohamed Khaled Dridi
**Status:** Draft for review

## 1. Purpose

A personal portfolio site Khaled can send to prospective clients (freelance) and employers (full-time). It showcases game dev (2D/3D), web, and app work. The same codebase serves several **presets** — versions of the site tuned to the audience of the link being sent.

Success criteria:
- Khaled can send a preset link (`/freelance`, `/job`, `/gamedev`, `/`) and each reads as purpose-built for that audience.
- Adding a project = adding one Markdown file + its media folder, then pushing. No code changes.
- Projects can be prepared as hidden drafts and published one at a time as Khaled revives them and captures screenshots/videos.
- Fast on mobile; deploys automatically to GitHub Pages.

## 2. Decisions (agreed during brainstorming)

| Topic | Decision |
|---|---|
| Personalization | 4 presets now; designed so per-person links (`?for=<id>` with custom greeting/note) can be added later without restructuring |
| Hosting | GitHub Pages, repo `khaled-dridi.github.io` on GitHub account `Khaled-Dridi`, deployed by GitHub Actions on push to `main` |
| Content editing | Markdown files in the repo (no CMS/admin in v1) |
| Framework | Astro (static output) |
| Visual style | Two themes: **clean** (default, freelance, job) and **game** (gamedev) |
| Language | English only in v1; all UI strings centralized in `src/i18n/en.ts` so French can be added later (Arabic/RTL would be a separate effort) |
| Personal logo | None — header shows name as text |
| Project branding | Every project may have its own logo/icon, accent color and title font; shown on **all** presets |
| Phone number | Not shown on the site; only inside the downloadable CV |

## 3. Owner profile (source: `Mohamed_Khaled_Dridi_CV (3).pdf`, plus owner's corrections)

- **Name:** Mohamed Khaled Dridi
- **Title:** Software Engineer
- **Education:** Engineering Degree in Software Engineering — Mediterranean Institute of Technology (MEDTECH), graduated **July 2026**. (CV still says "student / Present"; the site uses the graduated status.) Mohamed Dachraoui High School — Tunisian baccalaureate, July 2021.
- **Contact (public):** mohamedkhaled.dridi2@gmail.com · LinkedIn `mohamed-khaled-dridi` · Upwork profile (exact URL to be confirmed by owner before launch).
- **Experience:**
  - Renske — Multiplayer Unity Developer, Sep 2024 – Present
  - MassAnalytics — QA / Automation Intern, Jul 2024 – Sep 2024
  - HSTECH — Game Developer / Software Engineer Intern, May 2023 – Aug 2023
  - SMU Medtech University — Bootcamp Instructor, Unity & Game Development, Jul 2025 – Aug 2025
  - IEEE RAS, SMU — Technical Trainer, Jul 2022 – Mar 2023
- **Projects in CV (created as drafts):** 2D Story Game; Robotic Arm with 2D Inverse Kinematics Simulation; PGard Simulator (Enova Robotics, Unreal Engine + OpenCV); Partagi (Flutter + Django sports booking app).
- **Skills:** C#, Python, Java, C, JavaScript, SQL, MongoDB · Unity (2D/3D), gameplay systems, animation, Photon networking · Flutter, Django, React, REST APIs, Docker · Git, Figma, Jira, Selenium, Blender, Fusion 360 · English & French (bilingual), Arabic (native).
- **Achievements:** Two-time Best Project Winner — Fondation SMU · Upwork Rising Talent badge, 0% client dissatisfaction.
- **Hackathons:** Game Development Hackathons (2×), Blockchain Hackathon, App Development Hackathon.

## 4. Architecture

```
/
├── src/
│   ├── assets/projects/<slug>/   logo, cover, gallery images (optimized at build)
│   ├── content/
│   │   ├── projects/          one .md per project
│   │   └── experience/        one entry per role
│   ├── content.config.ts      collection schemas (validated at build)
│   ├── config/
│   │   ├── site.ts            name, title, email, LinkedIn, Upwork, CV path
│   │   └── presets.ts         preset definitions (see §5)
│   ├── i18n/en.ts             all UI strings
│   ├── components/            Hero, ProjectGrid, ProjectCard, ProjectFilters, Skills,
│   │                          Experience, Education, Achievements, Contact, Lightbox,
│   │                          VideoEmbed, ProjectLogo, Header, Footer
│   ├── layouts/BaseLayout.astro   <head>, SEO/OG tags, theme attribute
│   ├── styles/                tokens + theme-clean.css + theme-game.css
│   └── pages/
│       ├── index.astro        default preset
│       ├── freelance.astro
│       ├── job.astro
│       ├── gamedev.astro
│       ├── projects/index.astro   full project list with filters
│       └── projects/[slug].astro  generated detail pages
├── public/
│   ├── cv/Mohamed_Khaled_Dridi_CV.pdf
│   └── projects/<slug>/       preview clips, local videos, WebGL builds
├── tests/                     Playwright tests
└── .github/workflows/deploy.yml
```

The four preset pages are thin: each renders the same `PresetPage` component with a different preset key. Units are independent — components receive data via props and never read preset config directly, except `PresetPage`, which resolves the preset and passes values down.

## 5. Presets

Defined in `src/config/presets.ts`. Each preset:

```ts
{
  key: "freelance",
  theme: "clean" | "game",
  seo: { title, description, ogImage },
  headline: string,
  subline: string,
  primaryCta: { label, href },
  secondaryCta?: { label, href },
  projectCategories: Category[],   // which categories appear
  projectOrder: string[],          // slugs pinned first; others follow by date desc
  sections: SectionKey[],          // which sections render, in order
}
```

Initial presets:

| Key | Path | Theme | Headline | Categories | Primary CTA | Section order |
|---|---|---|---|---|---|---|
| default | `/` | clean | "Software engineer — games, web & apps" | all | Get in touch | hero, projects, skills, experience, education, achievements, contact |
| freelance | `/freelance` | clean | "I build your game, website or app — start to finish" (subline: Upwork Rising Talent · 0% client dissatisfaction) | all | Start a project | hero, projects, skills, achievements, experience, contact |
| job | `/job` | clean | "Software engineer — open to full-time roles" | all | Download CV | hero, experience, projects, skills, education, achievements, contact |
| gamedev | `/gamedev` | game | "Game developer — 2D & 3D" | game, simulation | Let's make a game | hero, projects, skills, experience, achievements, contact |

Experience entries carry an optional `presets` list (or `hideOn` list) so roles can be hidden per preset (e.g. QA/Automation hidden on `/gamedev`).

**Future per-person links:** a later `recipients` config (`id → { preset, greeting, note }`) read client-side from `?for=<id>` will overlay a greeting on top of the preset. v1 does not implement this but keeps preset resolution by key so it can be layered on.

## 6. Themes

- Implemented with CSS custom properties and a `data-theme="clean|game"` attribute on `<html>`. Components are shared; no duplicated markup.
- **Clean:** modern, one accent color, light/dark following `prefers-color-scheme` with a manual toggle. Background in dark mode is a deep navy-black (reference portfolio measured `rgb(15,19,25)`); headline may use a cyan→pink gradient.
- **Game:** always dark; pixel/HUD display font for headings; project cards as "level select" tiles with hover glow; subtle scanline/particle hero background; skills shown as an "inventory" grid.
- All motion respects `prefers-reduced-motion`.

## 7. Projects

### Content schema (frontmatter, validated at build)

| Field | Required | Notes |
|---|---|---|
| title | yes | |
| summary | yes | one line, used on cards |
| category | yes | `game` \| `web` \| `app` \| `simulation` |
| type | yes | `freelance` \| `client` \| `personal` \| `academic` \| `hackathon` \| `internship` |
| role | yes | e.g. "Solo developer" |
| client | no | |
| startDate / endDate | yes / no | endDate absent = ongoing |
| tags | yes | tech stack, shown as icons/chips |
| features | no | short feature chips |
| logo | no | project icon/logo; fallback = initial letter on accent color |
| accentColor | no | hex; fallback = theme accent |
| titleFont | no | used by game theme only; clean theme uses its own heading font |
| cover | no | fallback = logo/placeholder |
| gallery | no | list of images |
| video | no | YouTube URL or local file path |
| previewClip | no | short muted .mp4/.webm for hover loop |
| playEmbed | no | itch.io iframe URL or local WebGL build path |
| links | no | `{ live, github, itch, store }` |
| featured | no | default false |
| draft | no | default false; drafts excluded from all pages and generated routes |

Body: Markdown story — problem, what was built, challenges, results.

### Grid (preset pages and `/projects`)
- Category filter chips limited to the preset's categories.
- Card: logo/cover, title (accent color; custom font on game theme), info line `role | type | dates`, summary, feature chips, tech tags. Hover preview loop on desktop when `previewClip` exists.
- Featured projects render larger, first.
- `/projects` additionally has a tech filter, newest/oldest sort, and project count.

### Detail page (`/projects/<slug>`)
- Header: logo, title, role, client, dates, tags, link buttons for links present.
- Hero media (video if present, else cover), Markdown story, gallery with fullscreen lightbox (keyboard + swipe), optional play embed, prev/next navigation.
- Theme follows the preset the visitor came from (passed via `?from=<preset>`; default clean).

### Media
- Long videos: YouTube (unlisted OK), embedded with click-to-load facade so nothing loads from YouTube until clicked.
- Short preview clips: small local files in `public/projects/<slug>/`. GitHub rejects files over 100 MB, so full-length videos are not stored in the repo.
- Images (logo, cover, gallery): live next to the content in `src/assets/projects/<slug>/` and are referenced from frontmatter by relative path, so Astro's image pipeline can resize/convert them at build. Owner workflow stays "drop files in the project's folder". Video/preview clips and WebGL builds live in `public/projects/<slug>/` (served as-is). The exact Astro API for image fields in content schemas will be confirmed against the installed Astro version's docs during planning.

### Initial content
The four CV projects are created as `draft: true` entries with text from the CV and placeholder media. Owner fills in media and flips `draft` to publish.

## 8. Other sections

- **Skills:** grouped cards with icons (Languages / Game Dev / Web & Mobile / Tools / Spoken languages).
- **Experience:** timeline from the experience collection.
- **Education:** MEDTECH (July 2026) and high school.
- **Achievements & hackathons.**
- **CV download:** `public/cv/Mohamed_Khaled_Dridi_CV.pdf`.
- **Contact (v1):** email button + copy-to-clipboard, LinkedIn, Upwork (prominent on `/freelance`). No contact form in v1.

## 9. SEO & sharing
Each preset sets its own `<title>`, meta description, and Open Graph/Twitter image so shared links preview with the preset's headline. Project pages get their own title/description/cover as OG image.

## 10. Deployment
- New public GitHub repo `khaled-dridi.github.io` under account `Khaled-Dridi`.
- GitHub Actions workflow builds Astro and deploys to GitHub Pages on push to `main`.
- Custom domain can be attached later (CNAME) without code changes.

## 11. Testing & verification
- `astro check` passes; production build succeeds with no errors.
- Playwright tests:
  - each preset path renders its headline, correct `data-theme`, correct primary CTA;
  - `/gamedev` shows only game/simulation projects;
  - draft projects do not appear in any grid and their detail routes are not generated;
  - a published sample project's detail page renders title, links, gallery.
- Visual check: screenshots of each preset at desktop (1440px) and phone (390px) widths, shared with owner.
- Lighthouse audit (performance, accessibility, SEO) on the default preset.

## 12. Out of scope for v1 (planned later)
- Per-person links (`?for=`) with custom greeting/note
- French translation (and possibly Arabic/RTL)
- Contact form (needs a third-party form service)
- Admin panel / CMS
- Custom domain

## 13. Open items for the owner
- Exact Upwork profile URL.
- For each project when revived: logo, cover, screenshots, video link, description, links.
- Optional: profile photo (hero), preferred accent color.
