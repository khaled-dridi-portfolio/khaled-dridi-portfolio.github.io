import { test, expect } from '@playwright/test';

for (const path of ['/', '/freelance/', '/job/', '/gamedev/', '/projects/', '/projects/fx-full/', '/projects/fx-minimal/', '/projects/fx-full/?from=gamedev']) {
  test(`no horizontal scroll at phone width: ${path}`, async ({ page }) => {
    await page.goto(path);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
}
