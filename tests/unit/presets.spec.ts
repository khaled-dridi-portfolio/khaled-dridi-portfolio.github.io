import { test, expect } from '@playwright/test';
import { PRESETS, getPreset, PRESET_THEMES, PRESET_PATHS } from '../../src/config/presets';
import { PRESET_KEYS } from '../../src/lib/types';
import { site } from '../../src/config/site';

test('one preset per key, key matches record key', () => {
  expect(Object.keys(PRESETS).sort()).toEqual([...PRESET_KEYS].sort());
  for (const [k, p] of Object.entries(PRESETS)) expect(p.key).toBe(k);
});

test('paths: default is "/", others "/<key>/"', () => {
  expect(PRESETS.default.path).toBe('/');
  for (const k of ['freelance', 'job', 'gamedev'] as const) expect(PRESETS[k].path).toBe(`/${k}/`);
});

test('every preset starts with hero, includes projects and contact, no duplicates', () => {
  for (const p of Object.values(PRESETS)) {
    expect(p.sections[0]).toBe('hero');
    expect(p.sections).toContain('projects');
    expect(p.sections).toContain('contact');
    expect(new Set(p.sections).size).toBe(p.sections.length);
  }
});

test('section orders match the spec', () => {
  expect(PRESETS.default.sections).toEqual(['hero', 'projects', 'skills', 'experience', 'education', 'achievements', 'contact']);
  expect(PRESETS.freelance.sections).toEqual(['hero', 'projects', 'skills', 'achievements', 'experience', 'contact']);
  expect(PRESETS.job.sections).toEqual(['hero', 'experience', 'projects', 'skills', 'education', 'achievements', 'contact']);
  expect(PRESETS.gamedev.sections).toEqual(['hero', 'projects', 'skills', 'experience', 'achievements', 'contact']);
});

test('gamedev uses the game theme and only game/simulation projects', () => {
  expect(PRESETS.gamedev.theme).toBe('game');
  expect([...PRESETS.gamedev.projectCategories]).toEqual(['game', 'simulation']);
  for (const k of ['default', 'freelance', 'job'] as const) expect(PRESETS[k].theme).toBe('clean');
});

test('job primary CTA downloads the CV; freelance links to Upwork', () => {
  expect(PRESETS.job.primaryCta).toMatchObject({ href: site.cv, download: true });
  expect(PRESETS.freelance.secondaryCta?.href).toBe(site.upwork);
});

test('getPreset falls back to default for unknown or prototype keys', () => {
  expect(getPreset('job').key).toBe('job');
  for (const k of [null, undefined, '', 'nope', 'constructor', '__proto__', 'toString']) expect(getPreset(k).key).toBe('default');
});

test('theme and path maps cover every preset', () => {
  expect(PRESET_THEMES).toEqual({ default: 'clean', freelance: 'clean', job: 'clean', gamedev: 'game' });
  expect(PRESET_PATHS).toEqual({ default: '/', freelance: '/freelance/', job: '/job/', gamedev: '/gamedev/' });
});
