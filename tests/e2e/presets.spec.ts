import { test, expect } from '@playwright/test';
import { PRESETS } from '../../src/config/presets';

for (const preset of Object.values(PRESETS)) {
  test(`${preset.path} renders the ${preset.key} preset`, async ({ page }) => {
    await page.goto(preset.path);
    await expect(page.locator('html')).toHaveAttribute('data-theme', preset.theme);
    await expect(page.locator('.hero__headline')).toHaveText(preset.headline);
    await expect(page.locator('[data-primary-cta]')).toHaveText(preset.primaryCta.label);
    await expect(page.locator('[data-primary-cta]')).toHaveAttribute('href', preset.primaryCta.href);
    const order = await page.locator('main [data-section]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.section));
    expect(order).toEqual([...preset.sections]);
  });

  test(`${preset.path} has its own SEO tags`, async ({ page }) => {
    await page.goto(preset.path);
    await expect(page).toHaveTitle(preset.seo.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', preset.seo.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://khaled-dridi.github.io${preset.path}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `https://khaled-dridi.github.io/og/${preset.key}.png`);
  });
}

test('gamedev shows only game/simulation projects and hides the QA role', async ({ page }) => {
  await page.goto('/gamedev/');
  const ids = await page.locator('#projects [data-project-card]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.id));
  expect(ids).toEqual(['fx-full']);
  await expect(page.locator('#experience')).not.toContainText('MassAnalytics');
  await page.goto('/');
  await expect(page.locator('#experience')).toContainText('MassAnalytics');
});

test('job primary CTA downloads the CV', async ({ page }) => {
  await page.goto('/job/');
  await expect(page.locator('[data-primary-cta]')).toHaveAttribute('download', '');
});

test('freelance secondary CTA opens Upwork in a new tab', async ({ page }) => {
  await page.goto('/freelance/');
  const cta = page.locator('[data-secondary-cta]');
  await expect(cta).toHaveAttribute('href', 'https://www.upwork.com/freelancers/~0114fd2a77f167c7ee');
  await expect(cta).toHaveAttribute('target', '_blank');
});

test('preset cards and header links carry the preset', async ({ page }) => {
  await page.goto('/gamedev/');
  await expect(page.locator('#projects .project-card__link').first()).toHaveAttribute('href', '/projects/fx-full/?from=gamedev');
  await expect(page.locator('.site-nav a[href^="/projects/"]')).toHaveAttribute('href', '/projects/?from=gamedev');
});
