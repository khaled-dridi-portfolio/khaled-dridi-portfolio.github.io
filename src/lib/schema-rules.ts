export const REQUIRED_WHEN_PUBLISHED = ['summary', 'type', 'role'] as const;

/** Fields a project must have once `draft` is false. Drafts may be incomplete. */
export function missingPublishedFields(data: Record<string, unknown>): string[] {
  if (data.draft === true) return [];
  const missing: string[] = REQUIRED_WHEN_PUBLISHED.filter((k) => data[k] === undefined || data[k] === '');
  if (!Array.isArray(data.tags) || data.tags.length === 0) missing.push('tags');
  return missing;
}
