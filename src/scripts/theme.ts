// Keep the storage key in sync with the inline script in BaseLayout.astro.
const SCHEME_KEY = 'scheme';

function storeScheme(value: string): void {
  try {
    localStorage.setItem(SCHEME_KEY, value);
  } catch {
    // Storage blocked (private mode, disabled cookies): the choice just won't persist.
  }
}

export function initThemeToggle(): void {
  const root = document.documentElement;
  document.querySelectorAll<HTMLButtonElement>('[data-scheme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = root.dataset.scheme === 'light' ? 'dark' : 'light';
      root.dataset.scheme = next;
      storeScheme(next);
    });
  });
}

/** Points "home" links at the preset the visitor came from and carries ?from= onto project links. */
export function applyFromPreset(): void {
  const root = document.documentElement;
  const from = root.dataset.from;
  if (!from) return;
  const paths = JSON.parse(root.dataset.presetPaths ?? '{}') as Record<string, string>;
  if (!Object.hasOwn(paths, from)) return;
  const home = paths[from];
  document.querySelectorAll<HTMLAnchorElement>('a[data-preset-home]').forEach((a) => {
    a.setAttribute('href', home + (a.dataset.hash ?? ''));
  });
  document.querySelectorAll<HTMLAnchorElement>('a[data-keep-from]').forEach((a) => {
    const url = new URL(a.getAttribute('href') ?? '', location.href);
    url.searchParams.set('from', from);
    a.setAttribute('href', url.pathname + url.search + url.hash);
  });
}
