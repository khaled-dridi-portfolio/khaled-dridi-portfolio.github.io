import { test, expect } from '@playwright/test';

const normal = '[data-view-switch] [data-view="clean"]';
const game = '[data-view-switch] [data-view="game"]';
const hint = '[data-view-hint]';

test('home: Normal is active and Game dev goes to /gamedev/', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(normal)).toHaveAttribute('aria-current', 'page');
  await expect(page.locator(game)).not.toHaveAttribute('aria-current');
  await page.locator(game).click();
  await expect(page).toHaveURL(/\/gamedev\/$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'game');
  await expect(page.locator(game)).toHaveAttribute('aria-current', 'page');
  await page.locator(normal).click();
  await expect(page).toHaveURL(/localhost:\d+\/$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clean');
});

test('freelance and job pages count as Normal', async ({ page }) => {
  await page.goto('/freelance/');
  await expect(page.locator(normal)).toHaveAttribute('aria-current', 'page');
  await expect(page.locator(normal)).toHaveAttribute('href', '/freelance/');
  await expect(page.locator(game)).toHaveAttribute('href', '/gamedev/');
});

test('project page switches view in place', async ({ page }) => {
  await page.goto('/projects/fx-full/');
  await expect(page.locator(normal)).toHaveAttribute('aria-current', 'page');
  await expect(page.locator(game)).toHaveAttribute('href', '/projects/fx-full/?from=gamedev');
  await page.locator(game).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'game');
  await expect(page.locator(game)).toHaveAttribute('aria-current', 'page');
  await expect(page.locator(normal)).toHaveAttribute('href', '/projects/fx-full/');
});

test('project page keeps a clean preset on "Normal"', async ({ page }) => {
  await page.goto('/projects/fx-full/?from=freelance');
  await expect(page.locator(normal)).toHaveAttribute('href', '/projects/fx-full/?from=freelance');
});

test('first-time hint shows once and can be dismissed', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(hint)).toBeVisible();
  await expect(page.locator(`${hint} a`)).toHaveAttribute('href', '/gamedev/');
  await page.locator('[data-view-hint-close]').click();
  await expect(page.locator(hint)).toBeHidden();
  await page.goto('/');
  await expect(page.locator(hint)).toBeHidden();
});

test('hint is not shown in the game view', async ({ page }) => {
  await page.goto('/gamedev/');
  await expect(page.locator(hint)).toBeHidden();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('switch links still work and no hint shows', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(game)).toHaveAttribute('href', '/gamedev/');
    await expect(page.locator(hint)).toBeHidden();
  });
});
