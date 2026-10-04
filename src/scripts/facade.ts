export function initFacades(): void {
  document.querySelectorAll<HTMLElement>('[data-facade]').forEach((el) => {
    el.querySelector('[data-facade-load]')?.addEventListener(
      'click',
      () => {
        const iframe = document.createElement('iframe');
        iframe.src = el.dataset.embed ?? '';
        iframe.title = el.dataset.title ?? '';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        el.replaceChildren(iframe);
        el.classList.add('is-loaded');
      },
      { once: true },
    );
  });
}
