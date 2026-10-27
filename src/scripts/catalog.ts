import { t } from '../i18n';

export function initCatalog(): void {
  const root = document.querySelector<HTMLElement>('[data-catalog]');
  const list = root?.querySelector<HTMLElement>('[data-catalog-list]');
  const controls = root?.querySelector<HTMLElement>('[data-catalog-controls]');
  if (!root || !list || !controls) return;
  controls.hidden = false;

  const cards = [...list.querySelectorAll<HTMLElement>('[data-project-card]')];
  const chips = [...controls.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const techSelect = controls.querySelector<HTMLSelectElement>('[data-tech-filter]')!;
  const count = controls.querySelector<HTMLElement>('[data-count]')!;
  const noMatch = root.querySelector<HTMLElement>('[data-no-match]')!;
  let category = 'all';

  const apply = () => {
    const tech = techSelect.value;
    let visible = 0;
    for (const card of cards) {
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const matchesTech = !tech || (card.dataset.tags ?? '').split('|').includes(tech);
      card.hidden = !(matchesCategory && matchesTech);
      if (!card.hidden) visible++;
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
}
