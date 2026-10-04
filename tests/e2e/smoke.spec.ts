import { test, expect } from '@playwright/test';

test('home page responds and is titled with the owner name', async ({ page }) => {
  const res = await page.goto('/');
  expect(res?.status()).toBe(200);
  await expect(page).toHaveTitle(/Mohamed Khaled Dridi/);
});
