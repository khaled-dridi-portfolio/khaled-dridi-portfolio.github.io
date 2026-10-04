import type { Category } from './types';

export interface ProjectLike {
  id: string;
  data: { category: Category; startDate?: Date; featured: boolean; draft: boolean; tags: string[] };
}

export function byNewest(a: ProjectLike, b: ProjectLike): number {
  return (b.data.startDate?.getTime() ?? 0) - (a.data.startDate?.getTime() ?? 0);
}

export function publishedProjects<T extends ProjectLike>(projects: T[]): T[] {
  return projects.filter((p) => !p.data.draft).sort(byNewest);
}

export function selectForPreset<T extends ProjectLike>(
  projects: T[],
  opts: { categories: readonly Category[]; order: readonly string[] },
): T[] {
  const visible = publishedProjects(projects).filter((p) => opts.categories.includes(p.data.category));
  const pinned = opts.order.flatMap((id) => visible.filter((p) => p.id === id));
  const rest = visible.filter((p) => !opts.order.includes(p.id));
  return [...pinned, ...rest.filter((p) => p.data.featured), ...rest.filter((p) => !p.data.featured)];
}

export function allTags(projects: ProjectLike[]): string[] {
  return [...new Set(projects.flatMap((p) => p.data.tags))].sort((a, b) => a.localeCompare(b));
}

const monthYear = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatDateRange(start: Date | undefined, end: Date | undefined, presentLabel: string): string {
  if (!start) return '';
  const s = monthYear.format(start);
  if (!end) return `${s} – ${presentLabel}`;
  const e = monthYear.format(end);
  return s === e ? s : `${s} – ${e}`;
}
