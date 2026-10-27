import { test, expect } from '@playwright/test';

const list = '[data-catalog-list] [data-project-card]';
const ids = (page: import('@playwright/test').Page) =>
  page.locator(`${list}:visible`).evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.id));

test('lists every published project with a count', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.locator(list)).toHaveCount(5);
  await expect(page.locator('[data-count]')).toHaveText('5 projects');
  await expect(page.locator('[data-highlighted] [data-project-card][data-id="fx-full"]')).toHaveCount(1);
});

test('lists other projects before games, with no date sort', async ({ page }) => {
  await page.goto('/projects/');
  expect(await ids(page)).toEqual(['fx-badvideo', 'fx-minimal', 'fx-full', 'fx-part-b', 'fx-part-a']);
  await expect(page.locator('[data-sort]')).toHaveCount(0);
});

test('filters by technology and category, with a no-match message', async ({ page }) => {
  await page.goto('/projects/');
  await page.locator('[data-tech-filter]').selectOption('Django');
  expect(await ids(page)).toEqual(['fx-minimal']);
  await expect(page.locator('[data-count]')).toHaveText('1 project');
  await page.locator('[data-catalog] [data-filter="game"]').click();
  expect(await ids(page)).toEqual([]);
  await expect(page.locator('[data-count]')).toHaveText('0 projects');
  await expect(page.locator('[data-no-match]')).toBeVisible();
  await page.locator('[data-tech-filter]').selectOption('');
  expect(await ids(page)).toEqual(['fx-full', 'fx-part-b', 'fx-part-a']);
  await expect(page.locator('[data-no-match]')).toBeHidden();
});

test('?from=gamedev themes the page and carries into card links', async ({ page }) => {
  await page.goto('/projects/?from=gamedev');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'game');
  await expect(page.locator(`${list}[data-id="fx-full"] .project-card__link`)).toHaveAttribute('href', '/projects/fx-full/?from=gamedev');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('all projects visible and controls hidden', async ({ page }) => {
    await page.goto('/projects/');
    await expect(page.locator(`${list}:visible`)).toHaveCount(5);
    await expect(page.locator('[data-catalog-controls]')).toBeHidden();
  });
});
