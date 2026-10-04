export function initGalleries(): void {
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((gallery) => {
    const items = [...gallery.querySelectorAll<HTMLAnchorElement>('[data-gallery-item]')];
    const dialog = gallery.querySelector<HTMLDialogElement>('[data-lightbox]');
    if (!dialog || items.length === 0) return;
    const img = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]')!;
    const count = dialog.querySelector<HTMLElement>('[data-lightbox-count]')!;
    const prev = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]')!;
    const next = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]')!;
    prev.hidden = next.hidden = items.length < 2;
    let index = 0;

    const show = (i: number) => {
      index = (i + items.length) % items.length;
      img.src = items[index].href;
      img.alt = items[index].querySelector('img')?.alt ?? '';
      count.textContent = `${index + 1} / ${items.length}`;
    };

    items.forEach((a, i) =>
      a.addEventListener('click', (e) => {
        e.preventDefault();
        show(i);
        dialog.showModal();
      }),
    );
    prev.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });

    // Swipe on touch screens; a swipe must not also count as a backdrop click.
    let startX: number | null = null;
    let swiped = false;
    dialog.addEventListener('pointerdown', (e) => {
      startX = e.clientX;
      swiped = false;
    });
    dialog.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) {
        swiped = true;
        show(index + (dx < 0 ? 1 : -1));
      }
    });
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog && !swiped) dialog.close();
    });
  });
}
