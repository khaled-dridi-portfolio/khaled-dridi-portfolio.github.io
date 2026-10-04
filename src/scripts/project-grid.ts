export function initCategoryFilters(): void {
  document.querySelectorAll<HTMLElement>('[data-project-grid]').forEach((grid) => {
    const group = grid.querySelector<HTMLElement>('.filter-chips');
    if (!group) return;
    group.hidden = false;
    const chips = group.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const cards = grid.querySelectorAll<HTMLElement>('[data-project-card]');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        cards.forEach((card) => {
          card.hidden = filter !== 'all' && card.dataset.category !== filter;
        });
      });
    });
  });
}

export function initPreviewClips(): void {
  if (!matchMedia('(hover: hover)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll<HTMLVideoElement>('video[data-preview-clip]').forEach((video) => {
    const card = video.closest<HTMLElement>('[data-project-card]');
    if (!card) return;
    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {
        /* autoplay refused or file missing: keep the still image */
      });
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}
