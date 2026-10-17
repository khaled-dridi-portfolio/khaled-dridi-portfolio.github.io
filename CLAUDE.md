# Portfolio — notes for Claude

Mohamed Khaled Dridi's portfolio. Astro 7 static site, deployed to GitHub Pages by
`.github/workflows/` on push to `main`. Work happens on `feat/portfolio`. Never commit or push
unless the owner asks. The README has the full owner guide (frontmatter fields, presets).

## Commands

- `npm run dev` — dev server. `npx astro build` then `npx astro preview --port 4321` — what the owner tests.
- `npm test` — Playwright (unit + e2e, builds `dist-test/` with `PORTFOLIO_FIXTURES=1`).
- `npx astro check` — types.
- **Only one `astro preview` can run at a time.** Before `npm test`, run `npx astro preview stop`;
  afterwards rebuild and restart the owner's preview on 4321 if it was running.

## How the site is put together

- Projects: `src/content/projects/<id>.md` (id = URL `/projects/<id>/`). Schema in `src/content.config.ts`.
  `draft: false` requires summary, type, role, tags (startDate optional — undated projects sort last).
- Images: `src/assets/projects/<id>/` (WebP). Videos/clips: `public/projects/<id>/` (MP4, H.264, `+faststart`).
- Fields added this project (all optional): `parent` (game belongs to a collection, e.g. `plavox`;
  still gets its own card, shows "Part of …"), `galleryAlt` (alt per gallery image), `logoBackground`
  (tile behind a hard-to-see logo), `videoPoster` (poster when the video's shape differs from `cover`),
  `shareImage` (wide og:image instead of a portrait cover).
- Local `video` autoplays muted (`src/scripts/autoplay.ts`); `previewClip` plays on card hover.
- Portrait covers render whole over a blurred backdrop in cards (`project-card__media--portrait`).
- Presets: `/`, `/freelance/`, `/job/`, `/gamedev/` (`src/config/presets.ts`). Header has a
  Normal | 🎮 Game dev switch and a one-off first-visit hint (`initViewSwitch` in `src/scripts/theme.ts`).
- Link previews (og:image) must stay PNG/JPG — not every app reads WebP. Per-project ones are JPG 1.91:1.
- Tests load **only** `src/content/fixtures/` — real projects never change test expectations.

## Raw media workflow

- The owner pastes files into `project-assets/inbox/` (git-ignored). Use the `add-project` skill.
- Originals end up in `project-assets/<id>/` with a `notes.md`; the inbox is left empty.
- ffmpeg is not on PATH; it comes with Python's `imageio_ffmpeg`:
  `python -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"`.
- To check the site in Chrome, use the `check-site` skill.

## Content rules from the owner

- Only use text the owner gave (MD files, screenshots, CV). Don't invent features, numbers or tech.
  If a tech icon or fact can't be identified, leave it out and ask.
- If the owner says something was left out on purpose (e.g. games without media), don't add or mention it.
- Flag before publishing: media the owner may not have rights to (press photos, client media marked
  "do not share"), people's faces, money/prize screens, personal data in recordings.
