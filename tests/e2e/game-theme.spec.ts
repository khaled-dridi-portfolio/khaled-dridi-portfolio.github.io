import { test, expect } from '@playwright/test';

const titleFont = (page: import('@playwright/test').Page) =>
  page.locator('#projects [data-project-card][data-id="fx-full"] .project-card__title').evaluate((el) => getComputedStyle(el).fontFamily);

test('gamedev: no scheme toggle, HUD stats, animated scanlines, custom title font', async ({ page }) => {
  await page.goto('/gamedev/');
  await expect(page.locator('[data-scheme-toggle]')).toBeHidden();
  await expect(page.locator('.hero__stats')).toContainText('Unity since');
  await expect(page.locator('.hero__stats')).toContainText('2023');
  expect(await page.locator('[data-hero-bg]').evaluate((el) => getComputedStyle(el).animationName)).toBe('scan');
  expect(await titleFont(page)).toContain('Orbitron');
});

test('clean theme ignores the custom title font', async ({ page }) => {
  await page.goto('/');
  expect(await titleFont(page)).not.toContain('Orbitron');
  expect(await page.locator('[data-hero-bg]').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('game animations are disabled', async ({ page }) => {
    await page.goto('/gamedev/');
    expect(await page.locator('[data-hero-bg]').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  });
});
