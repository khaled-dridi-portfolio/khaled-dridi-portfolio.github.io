---
name: add-project
description: Use when the owner has put files in project-assets/inbox/ (images, logos, videos, screenshots of an old portfolio page) or asks to add/update a project, game or its media on the portfolio. Covers inspecting the media, editing videos, grabbing stills, converting to WebP, writing the project file and filing the originals.
---

# Add a project (or new media) from the inbox

Work through these in order. Look at everything before deciding anything.

## 1. See what arrived

```bash
ls -la project-assets/inbox
FF="$(python -c 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())')"
"$FF" -hide_banner -i "<file>" 2>&1 | grep -E "Duration|Stream"   # size, length, audio
```

- Read every image with the Read tool. For each video, copy it to the scratchpad under a simple
  name (filenames often contain emoji) and make a contact sheet, then Read it:
  `"$FF" -y -i in.mp4 -vf "fps=1/2,scale=400:-2,tile=5x6:padding=4" -frames:v 1 sheet.jpg`
- A screenshot of the owner's old portfolio page holds the text: title, role, type, dates,
  description, key features, tech icons. Copy text exactly. Don't guess unclear icons — ask.
- Check whether the project already exists (`src/content/projects/`, often as a CV-based draft) and
  update it rather than creating a duplicate.

## 2. Flag before using

Tell the owner (don't silently publish) when media shows: faces of other people, money/prize or bank
screens, personal data, editor/debug overlays, likely press photos, or the old text says sharing
media is prohibited. Recommend, don't block — it's their call.

## 3. Edit videos

- Pick the best video by actually comparing: resolution (≥720p for the page; 360p looks blurry full
  width), content (real gameplay beats promo text), length.
- Editor recordings: find the viewport with a full-res frame, `crop=w:h:x:y` below any warning text.
- Highlight reel ~30–40 s from the best-lit segments:
  `trim=a:b,setpts=PTS-STARTPTS,<crop>,fade=in:st=0:d=0.4,fade=out:st=<len-0.4>:d=0.4` per segment,
  then `concat=n=N:v=1:a=0`; encode `-c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart`.
  Add `eq=gamma=1.15` if very dark. Drop audio unless it matters (`-an`).
- Card hover clip when the page video is YouTube or long: 15–20 s, no audio, crf 26 (~0.5 MB).
- Already-good MP4: just remux `-c copy -movflags +faststart`.
- Watch the result's contact sheet before using it.

## 4. Stills and images

- Grab frames at exact times (`-ss T -i in.mp4 -frames:v 1 x.png`), review them stacked
  (`xstack`/`hstack`), skip blurry, dark, mid-transition or face-showing frames.
- Convert everything shown on pages to WebP: `node scripts/to-webp.mjs in.png out.webp [maxWidth]`
  (covers ≤1920 wide). Logos stay small; if dark on transparent, set `logoBackground: "#ffffff"`.
- Layout: `src/assets/projects/<id>/{logo,cover,poster,screenshot-N}.webp`,
  `public/projects/<id>/{reel,preview,promo}.mp4`.

## 5. Project file

`src/content/projects/<id>.md` — see README for every field. Usually: title, category, summary, type,
role, client, startDate/endDate, tags, features, logo, cover, video (local path or YouTube URL),
`videoPoster` if the video's shape differs from the cover, `previewClip`, gallery + `galleryAlt`
(real descriptions of each image), `parent` for a game in a collection. Check a YouTube link works:
`curl -s "https://www.youtube.com/oembed?url=<url>&format=json"`.

## 6. File the originals

Move inbox files to `project-assets/<id>/` and append to its `notes.md`: source of each site file,
the exact cuts/crops used, open questions. Leave only `README.md` in the inbox.

## 7. Verify

`npx astro check`, `npx astro preview stop` → `npm test` → `npx astro build` → restart preview on 4321,
then the `check-site` skill on the new page (video plays, poster, gallery loads, phone width).
Report what was used, what was skipped and why, and every flag from step 2. Don't commit unless asked.
