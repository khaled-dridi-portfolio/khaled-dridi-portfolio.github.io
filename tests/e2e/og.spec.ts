import { test, expect } from '@playwright/test';
import { PRESET_KEYS } from '../../src/lib/types';

for (const key of PRESET_KEYS) {
  test(`og image exists for ${key}`, async ({ request }) => {
    const res = await request.get(`/og/${key}.png`);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/png');
  });
}
