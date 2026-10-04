import { test, expect } from '@playwright/test';

test('home renders every section', async ({ page }) => {
  await page.goto('/');
  for (const key of ['hero', 'projects', 'skills', 'experience', 'education', 'achievements', 'contact']) {
    await expect(page.locator(`section#${key}[data-section="${key}"]`)).toHaveCount(1);
  }
});

test('hero shows headline, name and CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero__headline')).toHaveText('Software engineer — games, web & apps');
  await expect(page.locator('.hero__name')).toHaveText('Mohamed Khaled Dridi');
  await expect(page.locator('[data-primary-cta]')).toHaveAttribute('href', '#contact');
  await expect(page.locator('[data-avatar-placeholder]')).toHaveText('KD');
});

test('experience lists CV roles newest first with dates', async ({ page }) => {
  await page.goto('/');
  const items = page.locator('#experience [data-experience]');
  await expect(items).toHaveCount(5);
  await expect(items.first()).toContainText('Bootcamp Instructor');
  await expect(page.locator('#experience [data-experience="renske"]')).toContainText('Sep 2024 – Present');
});

test('skills, education and achievements come from the CV', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#skills')).toContainText('Photon Networking');
  await expect(page.locator('#skills')).toContainText('Arabic · Native');
  await expect(page.locator('#education')).toContainText('Mediterranean Institute of Technology (MEDTECH)');
  await expect(page.locator('#education')).toContainText('Graduated July 2026');
  await expect(page.locator('#achievements')).toContainText('Upwork Rising Talent');
  await expect(page.locator('#achievements')).toContainText('Blockchain Hackathon');
});

test('contact links point to the right places', async ({ page }) => {
  await page.goto('/');
  const c = page.locator('#contact');
  await expect(c.locator('[data-contact="email"]')).toHaveAttribute('href', 'mailto:mohamedkhaled.dridi2@gmail.com');
  await expect(c.locator('[data-contact="phone"]')).toHaveAttribute('href', 'tel:+21690161543');
  await expect(c.locator('[data-contact="linkedin"]')).toHaveAttribute('href', 'https://www.linkedin.com/in/mohamed-khaled-dridi-607ba9271/');
  await expect(c.locator('[data-contact="upwork"]')).toHaveAttribute('href', 'https://www.upwork.com/freelancers/~0114fd2a77f167c7ee');
  await expect(c.locator('[data-contact="cv"]')).toHaveAttribute('href', '/cv/Mohamed_Khaled_Dridi_CV.pdf');
});

test.describe('clipboard', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });
  test('copy button copies the email and confirms', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#contact [data-copy]');
    await btn.click();
    await expect(btn).toHaveText('Copied!');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('mohamedkhaled.dridi2@gmail.com');
  });
});
