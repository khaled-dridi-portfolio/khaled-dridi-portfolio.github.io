import { test, expect } from '@playwright/test';

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('JS-only controls are hidden on preset pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-scheme-toggle]')).toBeHidden();
    await expect(page.locator('#contact [data-copy]')).toBeHidden();
    await expect(page.locator('#contact [data-contact="email"]')).toBeVisible();
  });

  test('facade play buttons are hidden and the fallback links are shown', async ({ page }) => {
    await page.goto('/projects/fx-full/');
    await expect(page.locator('[data-facade-load]')).toHaveCount(2);
    for (const btn of await page.locator('[data-facade-load]').all()) await expect(btn).toBeHidden();
    await expect(page.locator('.facade__fallback').first()).toBeVisible();
  });
});

test('with JavaScript the controls are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-scheme-toggle]')).toBeVisible();
  await expect(page.locator('#contact [data-copy]')).toBeVisible();
});
