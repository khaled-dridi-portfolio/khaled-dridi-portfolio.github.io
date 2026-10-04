import { test, expect } from '@playwright/test';

const cards = '#projects [data-project-card]';

test('home grid shows published projects and hides drafts', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(cards)).toHaveCount(3);
  await expect(page.locator('#projects')).not.toContainText('PGard Simulator');
  await expect(page.locator('#projects')).not.toContainText('Partagi');
});

test('featured project is first', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(cards).first()).toHaveAttribute('data-id', 'fx-full');
});

test('category chips filter the grid', async ({ page }) => {
  await page.goto('/');
  await page.locator('#projects [data-filter="web"]').click();
  await expect(page.locator(`${cards}:visible`)).toHaveCount(1);
  await expect(page.locator(`${cards}[data-id="fx-minimal"]`)).toBeVisible();
  await expect(page.locator('#projects [data-filter="web"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#projects [data-filter="all"]').click();
  await expect(page.locator(`${cards}:visible`)).toHaveCount(3);
});

test('full card shows logo, accent colour, info line and features', async ({ page }) => {
  await page.goto('/');
  const card = page.locator(`${cards}[data-id="fx-full"]`);
  await expect(card.locator('[data-project-logo]')).toHaveCount(1);
  await expect(card).toHaveAttribute('style', /--project-accent:\s*#ff3b5c/);
  await expect(card.locator('.project-meta')).toContainText('Solo developer');
  await expect(card.locator('.project-meta')).toContainText('Freelance');
  await expect(card.locator('.project-meta')).toContainText('Jan 2025 – Jun 2025');
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
    await expect(page.locator(`${cards}:visible`)).toHaveCount(3);
    await expect(page.locator('#projects .filter-chips')).toBeHidden();
  });
});
