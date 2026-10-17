import { test, expect } from '@playwright/test';
import { missingPublishedFields } from '../../src/lib/schema-rules';

test('drafts may omit every optional field', () => {
  expect(missingPublishedFields({ draft: true })).toEqual([]);
});

test('published projects must have summary, type, role and tags', () => {
  expect(missingPublishedFields({ draft: false, tags: [] })).toEqual(['summary', 'type', 'role', 'tags']);
});

test('empty strings count as missing', () => {
  expect(missingPublishedFields({ draft: false, summary: '', type: 'personal', role: 'Dev', startDate: new Date(), tags: ['Unity'] })).toEqual(['summary']);
});

test('a complete published project passes', () => {
  expect(missingPublishedFields({ draft: false, summary: 'x', type: 'personal', role: 'Dev', startDate: new Date(), tags: ['Unity'] })).toEqual([]);
});

test('startDate is optional: an undated project can be published', () => {
  expect(missingPublishedFields({ draft: false, summary: 'x', type: 'personal', role: 'Dev', tags: ['Unity'] })).toEqual([]);
});
