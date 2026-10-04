# Mohamed Khaled Dridi — Portfolio

Live: https://khaled-dridi.github.io/

| Link | Audience |
|---|---|
| `/` | General |
| `/freelance/` | Freelance clients |
| `/job/` | Recruiters / full-time roles |
| `/gamedev/` | Game studios and game clients (game theme) |

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm test           # unit + browser tests (builds a fixture site into dist-test/)
npm run check      # type check
```

Stop any running `astro preview` before `npm test` (`npx astro preview stop`) — Astro allows only one preview server at a time.

## Add or publish a project

1. Create `src/content/projects/<project-id>.md` (the file name becomes the URL: `/projects/<project-id>/`).
2. Put images in `src/assets/projects/<project-id>/` and reference them relative to the Markdown file, e.g. `../../assets/projects/<project-id>/cover.png`.
3. Put preview clips and local videos in `public/projects/<project-id>/` and reference them from the site root, e.g. `/projects/<project-id>/preview.mp4`. Put a WebGL build in a **`play/` subfolder** (`public/projects/<project-id>/play/index.html` → `playEmbed: /projects/<project-id>/play/`) — a build's `index.html` placed directly in `public/projects/<project-id>/` would collide with the generated project page.
4. Long videos: upload to YouTube (unlisted is fine) and paste the link in `video`.
5. Keep `draft: true` until it's ready. When you set `draft: false`, the build requires `summary`, `type`, `role`, `startDate` and at least one `tags` entry — the error message names any missing field.
6. Commit and push to `main`. GitHub Actions deploys in about a minute.

In YAML lists written as `[a, b]`, quote any item that contains a comma: `["Fire, human & face detection"]`.

```md
---
title: My Game
category: game            # game | web | app | simulation
summary: One line shown on the card.
type: freelance           # freelance | client | personal | academic | hackathon | internship
role: Solo developer
client: Acme              # optional
startDate: 2025-01-01
endDate: 2025-04-01       # omit if ongoing
tags: [Unity, C#]
features: [Online multiplayer, Level editor]
logo: ../../assets/projects/my-game/logo.png
accentColor: "#ff3b5c"
titleFont: orbitron       # pixelify-sans | orbitron | titan-one | saira-stencil-one | fredoka | press-start-2p (game theme only)
cover: ../../assets/projects/my-game/cover.png
gallery:
  - ../../assets/projects/my-game/1.png
video: https://youtu.be/XXXXXXXXXXX
previewClip: /projects/my-game/preview.mp4
playEmbed: https://itch.io/embed-upload/XXXXXXX
links:
  live: https://...
  github: https://...
  itch: https://...
  store: https://...
featured: true
draft: false
---
The story: the problem, what you built, challenges, results.
```

## Change a preset

Edit `src/config/presets.ts`: headline, buttons, stats, which project categories show, pinned project order (`projectOrder`), and section order. Hide an experience entry on a preset with `hideOn: [gamedev]` in its file under `src/content/experience/`.

## Regenerate link-preview images

```bash
npm run og
```
