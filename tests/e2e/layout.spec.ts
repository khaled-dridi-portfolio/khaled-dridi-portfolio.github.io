import { test, expect } from '@playwright/test';

test('home uses the clean theme and a resolved colour scheme', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clean');
  await expect(page.locator('html')).toHaveAttribute('data-scheme', /^(light|dark)$/);
});

test.describe('system prefers light', () => {
  test.use({ colorScheme: 'light' });
  test('first visit follows the system preference', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-scheme', 'light');
  });
});

test('toggle switches scheme and persists across reload', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const before = await html.getAttribute('data-scheme');
  const after = before === 'dark' ? 'light' : 'dark';
  await page.locator('[data-scheme-toggle]').click();
  await expect(html).toHaveAttribute('data-scheme', after);
  await page.reload();
  await expect(html).toHaveAttribute('data-scheme', after);
});

test('page works when storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('storage blocked');
      },
    });
  });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-scheme', /^(light|dark)$/);
  await page.locator('[data-scheme-toggle]').click();
  expect(errors).toEqual([]);
});

test('header shows the name and a CV download', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-header__name')).toHaveText('Mohamed Khaled Dridi');
  await expect(page.locator('.site-header a[download]')).toHaveAttribute('href', '/cv/Mohamed_Khaled_Dridi_CV.pdf');
});

test('CV file is served as a PDF', async ({ request }) => {
  const res = await request.get('/cv/Mohamed_Khaled_Dridi_CV.pdf');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('pdf');
});
