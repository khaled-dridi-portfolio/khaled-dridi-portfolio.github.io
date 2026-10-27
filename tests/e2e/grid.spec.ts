import { test, expect } from '@playwright/test';

const cards = '#projects [data-project-card]';

test('home grid shows published projects and hides drafts', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(cards)).toHaveCount(5);
  await expect(page.locator('#projects')).not.toContainText('Draft Fixture');
});

test('parts of another project get their own card, saying what they belong to', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(`${cards}[data-id="fx-part-a"] [data-parent]`)).toHaveText(/^Part of Full Fixture Game/);
  await expect(page.locator(`${cards}[data-id="fx-full"] [data-parent]`)).toHaveCount(0);
});

test('normal view lists other projects before games; game view leads with the featured game', async ({ page }) => {
  await page.goto('/');
  const order = await page.locator(cards).evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.id));
  expect(order).toEqual(['fx-badvideo', 'fx-minimal', 'fx-full', 'fx-part-b', 'fx-part-a']);
  await page.goto('/gamedev/');
  await expect(page.locator(cards).first()).toHaveAttribute('data-id', 'fx-full');
});

test('category chips filter the grid', async ({ page }) => {
  await page.goto('/');
  await page.locator('#projects [data-filter="web"]').click();
  await expect(page.locator(`${cards}:visible`)).toHaveCount(1);
  await expect(page.locator(`${cards}[data-id="fx-minimal"]`)).toBeVisible();
  await expect(page.locator('#projects [data-filter="web"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#projects [data-filter="all"]').click();
  await expect(page.locator(`${cards}:visible`)).toHaveCount(5);
});

test('full card shows logo, accent colour, info line and features', async ({ page }) => {
  await page.goto('/');
  const card = page.locator(`${cards}[data-id="fx-full"]`);
  await expect(card.locator('[data-project-logo]')).toHaveCount(1);
  await expect(card).toHaveAttribute('style', /--project-accent:\s*#ff3b5c/);
  await expect(card.locator('.project-meta')).toContainText('Solo developer');
  await expect(card.locator('.project-meta')).toContainText('Freelance');
  await expect(card.locator('.project-meta')).not.toContainText('2025');
  await expect(card).toContainText('Online multiplayer');
});

test('project without logo or cover shows the initial-letter fallback', async ({ page }) => {
  await page.goto('/');
  const card = page.locator(`${cards}[data-id="fx-minimal"]`);
  await expect(card.locator('[data-project-logo-fallback]')).toHaveText('M');
  const broken = await page.locator('#projects img').evaluateAll((imgs) =>
    (imgs as HTMLImageElement[]).filter((i) => i.complete && i.naturalWidth === 0).length,
  );
  expect(broken).toBe(0);
});

test('card links to its detail page carrying the preset', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(`${cards}[data-id="fx-full"] .project-card__link`)).toHaveAttribute('href', '/projects/fx-full/?from=default');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('all cards visible and filter chips hidden', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(`${cards}:visible`)).toHaveCount(5);
    await expect(page.locator('#projects .filter-chips')).toBeHidden();
  });
});

test('vertical covers are shown whole over a blurred backdrop', async ({ page }) => {
  await page.goto('/');
  const media = page.locator(`${cards}[data-id="fx-part-a"] .project-card__media`);
  await expect(media).toHaveClass(/project-card__media--portrait/);
  await expect(media.locator('[data-card-backdrop]')).toHaveCount(1);
  await expect(media.locator('.project-card__cover')).toHaveCSS('object-fit', 'contain');
  await expect(media.locator('.project-card__preview')).toHaveCSS('object-fit', 'contain');
  const wide = page.locator(`${cards}[data-id="fx-full"] .project-card__media`);
  await expect(wide).not.toHaveClass(/project-card__media--portrait/);
  await expect(wide.locator('[data-card-backdrop]')).toHaveCount(0);
});

for (const path of ['/', '/projects/']) {
  test(`hovering a card plays its preview clip: ${path}`, async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { played: string[] }).played = [];
      HTMLMediaElement.prototype.play = function () {
        (window as unknown as { played: string[] }).played.push(this.getAttribute('src') ?? '');
        return Promise.resolve();
      };
    });
    await page.goto(path);
    await page.locator('[data-project-card][data-id="fx-part-a"]').first().hover();
    await expect.poll(() => page.evaluate(() => (window as unknown as { played: string[] }).played)).toContain('/projects/fx-part-a/reel.mp4');
  });
}
