// Screenshots the top of each preset page at 1200x630 into public/og/<key>.png.
// Run with `npm run og` (builds first, then serves dist/ from a tiny static server).
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from '@playwright/test';

const DIST = 'dist';
const OUT = 'public/og';
const PORT = 4410;
const PAGES = { default: '/', freelance: '/freelance/', job: '/job/', gamedev: '/gamedev/' };
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf',
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = normalize(join(DIST, urlPath));
    if (!file.startsWith(normalize(DIST))) throw new Error('outside dist');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end('not found');
  }
});

await new Promise((resolve) => server.listen(PORT, resolve));
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'dark' });
  for (const [key, path] of Object.entries(PAGES)) {
    await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${OUT}/${key}.png` });
    console.log(`wrote ${OUT}/${key}.png`);
  }
} finally {
  await browser.close();
  server.close();
}
