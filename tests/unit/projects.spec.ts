import { test, expect } from '@playwright/test';
import { selectForPreset, publishedProjects, allTags, formatDateRange, type ProjectLike } from '../../src/lib/projects';

const p = (id: string, category: ProjectLike['data']['category'], start: string | undefined, extra: Partial<ProjectLike['data']> = {}): ProjectLike => ({
  id,
  data: { category, startDate: start ? new Date(start) : undefined, featured: false, draft: false, tags: [], ...extra },
});

test('publishedProjects drops drafts and sorts newest first', () => {
  const list = [p('old', 'game', '2022-01-01'), p('draft', 'game', '2025-01-01', { draft: true }), p('new', 'web', '2024-01-01')];
  expect(publishedProjects(list).map((x) => x.id)).toEqual(['new', 'old']);
});

test('projects without a start date sort last', () => {
  expect(publishedProjects([p('none', 'game', undefined), p('dated', 'game', '2020-01-01')]).map((x) => x.id)).toEqual(['dated', 'none']);
});

test('selectForPreset filters by category', () => {
  const list = [p('g', 'game', '2024-01-01'), p('w', 'web', '2024-02-01'), p('s', 'simulation', '2023-01-01')];
  expect(selectForPreset(list, { categories: ['game', 'simulation'], order: [] }).map((x) => x.id)).toEqual(['g', 's']);
});

test('pinned ids come first in the given order, unknown ids are ignored', () => {
  const list = [p('a', 'game', '2024-01-01'), p('b', 'game', '2023-01-01'), p('c', 'game', '2022-01-01')];
  expect(selectForPreset(list, { categories: ['game'], order: ['c', 'missing', 'b'] }).map((x) => x.id)).toEqual(['c', 'b', 'a']);
});

test('featured projects come before the rest, each group newest first', () => {
  const list = [p('a', 'game', '2024-01-01'), p('f-old', 'game', '2020-01-01', { featured: true }), p('f-new', 'game', '2021-01-01', { featured: true })];
  expect(selectForPreset(list, { categories: ['game'], order: [] }).map((x) => x.id)).toEqual(['f-new', 'f-old', 'a']);
});

test('pinned drafts stay hidden', () => {
  const list = [p('d', 'game', '2024-01-01', { draft: true }), p('a', 'game', '2023-01-01')];
  expect(selectForPreset(list, { categories: ['game'], order: ['d'] }).map((x) => x.id)).toEqual(['a']);
});

test('allTags is deduplicated and sorted', () => {
  expect(allTags([p('a', 'game', undefined, { tags: ['Unity', 'C#'] }), p('b', 'web', undefined, { tags: ['Django', 'Unity'] })])).toEqual(['C#', 'Django', 'Unity']);
});

test('formatDateRange', () => {
  expect(formatDateRange(new Date('2024-03-01'), undefined, 'Present')).toBe('Mar 2024 – Present');
  expect(formatDateRange(new Date('2024-03-01'), new Date('2024-06-01'), 'Present')).toBe('Mar 2024 – Jun 2024');
  expect(formatDateRange(new Date('2024-03-01'), new Date('2024-03-20'), 'Present')).toBe('Mar 2024');
  expect(formatDateRange(undefined, undefined, 'Present')).toBe('');
});
