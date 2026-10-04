import { t } from '../i18n';

const startTime = (el: HTMLElement) => (el.dataset.start ? Date.parse(el.dataset.start) : 0);

export function initCatalog(): void {
  const root = document.querySelector<HTMLElement>('[data-catalog]');
  const list = root?.querySelector<HTMLElement>('[data-catalog-list]');
  const controls = root?.querySelector<HTMLElement>('[data-catalog-controls]');
  if (!root || !list || !controls) return;
  controls.hidden = false;

  const cards = [...list.querySelectorAll<HTMLElement>('[data-project-card]')];
  const chips = [...controls.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const techSelect = controls.querySelector<HTMLSelectElement>('[data-tech-filter]')!;
  const sortSelect = controls.querySelector<HTMLSelectElement>('[data-sort]')!;
  const count = controls.querySelector<HTMLElement>('[data-count]')!;
  const noMatch = root.querySelector<HTMLElement>('[data-no-match]')!;
  let category = 'all';

  const apply = () => {
    const tech = techSelect.value;
    const direction = sortSelect.value === 'oldest' ? 1 : -1;
    const sorted = [...cards].sort((a, b) => direction * (startTime(a) - startTime(b)));
    let visible = 0;
    for (const card of sorted) {
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const matchesTech = !tech || (card.dataset.tags ?? '').split('|').includes(tech);
      card.hidden = !(matchesCategory && matchesTech);
      if (!card.hidden) visible++;
      list.append(card);
    }
    count.textContent = t.projects.count(visible);
    noMatch.hidden = visible > 0;
  };

  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      category = chip.dataset.filter ?? 'all';
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      apply();
    }),
  );
  techSelect.addEventListener('change', apply);
  sortSelect.addEventListener('change', apply);
}
