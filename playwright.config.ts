import { defineConfig, devices } from '@playwright/test';

const PORT = 4400;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: 'line',
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: `npx astro build --outDir dist-test && npx astro preview --outDir dist-test --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    env: { ...(process.env as Record<string, string>), PORTFOLIO_FIXTURES: '1' },
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [
    { name: 'unit', testMatch: /unit[\/].*\.spec\.ts$/ },
    {
      name: 'desktop',
      testMatch: /e2e[\/].*\.spec\.ts$/,
      testIgnore: /responsive\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      testMatch: /responsive\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, hasTouch: true },
    },
  ],
});
