import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Never hit real third-party hosts from tests.
  await page.route(/youtube(-nocookie)?\.com|itch\.io/, (route) => route.abort());
});

test('full project page renders header, links, tags and story', async ({ page }) => {
  await page.goto('/projects/fx-full/');
  await expect(page.locator('h1')).toContainText('Full Fixture Game');
  await expect(page.locator('[data-link]')).toHaveCount(3);
  await expect(page.locator('[data-link="github"]')).toHaveAttribute('href', 'https://github.com/example/fixture');
  await expect(page.locator('[data-link="itch"]')).toHaveText('Play on itch.io');
  await expect(page.locator('.project-page__client')).toContainText('Fixture Client');
  await expect(page.locator('.prose')).toContainText('fixture story');
  await expect(page.locator('.prose strong')).toHaveText('bold');
});

test('video loads only after clicking play', async ({ page }) => {
  await page.goto('/projects/fx-full/');
  const facade = page.locator('[data-facade="video"]');
  await expect(facade.locator('iframe')).toHaveCount(0);
  await facade.locator('[data-facade-load]').click();
  await expect(page.locator('[data-facade="video"] iframe')).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0');
});

test('keyboard focus moves into the embed after it loads', async ({ page }) => {
  await page.goto('/projects/fx-full/');
  await page.locator('[data-facade="video"] [data-facade-load]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-facade="video"] iframe')).toHaveCount(1);
  expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('IFRAME');
});

test('initial-letter fallback is readable (contrast ≥ 4.5:1)', async ({ page }) => {
  for (const path of ['/projects/fx-minimal/', '/projects/fx-minimal/?from=gamedev']) {
    await page.goto(path);
    const ratio = await page.locator('[data-project-logo-fallback]').evaluate((el) => {
      const s = getComputedStyle(el);
      const rgb = (c: string) => (c.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
      const lum = ([r, g, b]: number[]) => {
        const f = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const [a, b] = [lum(rgb(s.color)), lum(rgb(s.backgroundColor))];
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    });
    expect(ratio, path).toBeGreaterThanOrEqual(4.5);
  }
});

test('play-in-browser embed loads only after clicking', async ({ page }) => {
  await page.goto('/projects/fx-full/');
  const facade = page.locator('[data-facade="play"]');
  await expect(facade.locator('iframe')).toHaveCount(0);
  await facade.locator('[data-facade-load]').click();
  await expect(page.locator('[data-facade="play"] iframe')).toHaveAttribute('src', 'https://itch.io/embed-upload/1234567');
});

test('gallery lightbox opens, navigates with keys and closes', async ({ page }) => {
  await page.goto('/projects/fx-full/');
  await expect(page.locator('[data-gallery-item]')).toHaveCount(2);
  await page.locator('[data-gallery-item]').first().click();
  const dialog = page.locator('dialog[data-lightbox]');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-lightbox-count]')).toHaveText('1 / 2');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-lightbox-count]')).toHaveText('2 / 2');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-lightbox-count]')).toHaveText('1 / 2');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('?from=gamedev applies the game theme and keeps the preset in links', async ({ page }) => {
  await page.goto('/projects/fx-full/?from=gamedev');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'game');
  await expect(page.locator('.back-link')).toHaveAttribute('href', '/gamedev/#projects');
  await expect(page.locator('.prev-next a[rel="next"]')).toHaveAttribute('href', '/projects/fx-badvideo/?from=gamedev');
});

test('missing, unknown or hostile ?from falls back to the clean theme', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const from of ['', 'nope', 'constructor', '__proto__', 'toString']) {
    await page.goto(`/projects/fx-full/?from=${from}`);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'clean');
  }
  await page.goto('/projects/fx-full/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clean');
  await expect(page.locator('.back-link')).toHaveAttribute('href', '/#projects');
  expect(errors).toEqual([]);
});

test('minimal project renders without any media', async ({ page }) => {
  await page.goto('/projects/fx-minimal/');
  await expect(page.locator('h1')).toHaveText('Minimal Web Fixture');
  await expect(page.locator('[data-facade]')).toHaveCount(0);
  await expect(page.locator('[data-gallery]')).toHaveCount(0);
  await expect(page.locator('[data-link]')).toHaveCount(0);
  await expect(page.locator('[data-project-logo-fallback]')).toHaveText('M');
  const broken = await page.locator('main img').evaluateAll((imgs) =>
    (imgs as HTMLImageElement[]).filter((i) => i.complete && i.naturalWidth === 0).length,
  );
  expect(broken).toBe(0);
});

test('unsupported video link is ignored safely', async ({ page }) => {
  await page.goto('/projects/fx-badvideo/');
  await expect(page.locator('h1')).toHaveText('Unsupported Video Fixture');
  await expect(page.locator('[data-facade]')).toHaveCount(0);
  await expect(page.locator('main iframe, main video')).toHaveCount(0);
});

test('draft projects have no page', async ({ request }) => {
  expect((await request.get('/projects/fx-draft/')).status()).toBe(404);
});

test('og:image uses the cover when present, default otherwise', async ({ page }) => {
  await page.goto('/projects/fx-full/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\/khaled-dridi\.github\.io\/_astro\/.+\.jpg$/);
  await page.goto('/projects/fx-minimal/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://khaled-dridi.github.io/og/default.png');
});

test('og:image uses shareImage instead of a portrait cover', async ({ page }) => {
  await page.goto('/projects/fx-part-a/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/_astro\/cover\.[^/]+\.jpg$/);
});

test('parent project lists its parts, linking with the preset', async ({ page }) => {
  await page.goto('/projects/fx-full/?from=gamedev');
  const links = page.locator('[data-subprojects] .subproject__link');
  await expect(links).toHaveText(['Part A Fixture', 'Part B Fixture']);
  await expect(links.first()).toHaveAttribute('href', '/projects/fx-part-a/?from=gamedev');
});

test('part page says which project it belongs to', async ({ page }) => {
  await page.goto('/projects/fx-part-a/?from=gamedev');
  await expect(page.locator('.back-link')).toHaveAttribute('href', '/gamedev/#projects');
  await expect(page.locator('.project-page__client a')).toHaveAttribute('href', '/projects/fx-full/?from=gamedev');
  await expect(page.locator('[data-subprojects]')).toHaveCount(0);
});

test('local video autoplays muted, with a poster and its real size', async ({ page }) => {
  await page.goto('/projects/fx-part-a/');
  const video = page.locator('main video.video-file');
  await expect(video).toHaveAttribute('preload', 'metadata');
  await expect(video).toHaveAttribute('playsinline', '');
  await expect(video).toHaveAttribute('width', '720');
  await expect(video).toHaveAttribute('height', '1280');
  await expect(video).toHaveAttribute('data-orientation', 'portrait');
  await expect(video).toHaveAttribute('poster', /^\/_astro\/.+/);
  await expect(video).toHaveJSProperty('muted', true);
  const box = await video.boundingBox();
  expect(box!.height).toBeLessThanOrEqual(900 * 0.8 + 1);
});

test('gallery uses the given alt text and keeps each image shape', async ({ page }) => {
  await page.goto('/projects/fx-part-a/');
  const imgs = page.locator('[data-gallery-item] img');
  await expect(imgs.first()).toHaveAttribute('alt', 'Tall fixture screenshot');
  await expect(imgs.nth(1)).toHaveAttribute('alt', 'Part A Fixture — screenshot 2');
  const ratios = await imgs.evaluateAll((els) => els.map((e) => e.getBoundingClientRect()).map((r) => r.width / r.height));
  expect(ratios[0]).toBeCloseTo(720 / 1280, 1);
  expect(ratios[1]).toBeCloseTo(1280 / 720, 1);
});

test('no autoplay for visitors who ask for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects/fx-part-a/');
  await expect(page.locator('main video.video-file')).toHaveJSProperty('muted', false);
});
