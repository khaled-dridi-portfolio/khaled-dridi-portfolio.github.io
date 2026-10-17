---
name: check-site
description: Use when you need to see the portfolio working in a real browser — after any visual, layout, video or content change, before telling the owner something works, or when the owner asks to run/test/see the site. Covers building, the single preview server, Chrome DevTools MCP checks at desktop and phone width, and cleaning up the browser.
---

# Check the site in the browser

## 1. Serve the real build

```bash
npx astro preview stop        # only one preview may run; tests also need it stopped
npx astro build
npx astro preview --port 4321 # run in background; then poll with curl until 200
```

Port 4321 is the one the owner opens. Leave it running at the end (the owner tests there).

## 2. Browser hygiene (global rule)

- `list_pages` first and reuse the blank tab; never open extra windows.
- Desktop: `resize_page` 1440×900. Phone: `emulate` viewport `390x844x2,mobile,touch`.
  Emulation only lasts until the window closes — the owner once thought a phone-sized window was a
  config change; it was this emulation.
- When done, kill the automation Chrome (command line contains
  `chrome-devtools-mcp\chrome-profile`, no `--type=`) with `taskkill /PID <pid> /T /F`, and confirm
  none is left. Never touch the owner's own Chrome.

## 3. What to check (evaluate_script returns facts; screenshots show look)

- No horizontal scroll: `scrollWidth - clientWidth === 0`, at 390, 360 and 320 px for header changes.
- Videos: `!v.paused`, `v.muted`, `v.videoWidth/videoHeight` match the poster; height ≤ 80vh.
- Hover clips: dispatch `mouseenter` on the card, then `!video.paused` (opacity needs a real hover,
  so the screenshot still shows the cover — that's expected).
- Images: scroll the gallery into view first (lazy loading); then `img.complete && naturalWidth > 0`.
  Full-page screenshots don't scroll, so blank tiles there are lazy images, not bugs.
- First-visit hint: clear it with `initScript: try { localStorage.removeItem('viewHintSeen') } catch (e) {}`.
- Check both views: `/` (Normal) and `/gamedev/` (game theme), and light/dark if colours changed.

## 4. Report

Say what you saw (numbers from evaluate_script, what the screenshot shows). If something couldn't
be checked, say so. Then close the browser as in step 2.
