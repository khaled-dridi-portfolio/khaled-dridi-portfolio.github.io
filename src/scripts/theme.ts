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

// Keep in sync with tests/e2e/view-switch.spec.ts.
const VIEW_HINT_KEY = 'viewHintSeen';

function markHintSeen(): void {
  try {
    localStorage.setItem(VIEW_HINT_KEY, '1');
  } catch {
    // Storage blocked: the hint may show again on the next visit.
  }
}

/** Marks the active Normal / Game dev option, and shows first-time visitors a one-off hint about the game view. */
export function initViewSwitch(): void {
  const root = document.documentElement;
  const theme = root.dataset.theme;
  const from = root.dataset.from;
  const themes = JSON.parse(root.dataset.presetThemes ?? '{}') as Record<string, string>;

  document.querySelectorAll<HTMLAnchorElement>('[data-view-switch] [data-view]').forEach((a) => {
    if (a.dataset.view === theme) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
    // On project pages, "Normal" keeps a clean preset the visitor came from (e.g. ?from=freelance).
    if (a.dataset.keepCleanFrom !== undefined && from && themes[from] === 'clean') {
      const url = new URL(a.getAttribute('href') ?? '', location.href);
      url.searchParams.set('from', from);
      a.setAttribute('href', url.pathname + url.search);
    }
    a.addEventListener('click', markHintSeen);
  });

  const hint = document.querySelector<HTMLElement>('[data-view-hint]');
  if (!hint || theme === 'game') return;
  let seen = false;
  try {
    seen = localStorage.getItem(VIEW_HINT_KEY) === '1';
  } catch {
    seen = true; // Can't remember a dismissal, so don't risk showing it on every page.
  }
  if (seen) return;
  hint.hidden = false;
  markHintSeen(); // Shown once: the next page won't show it again.
  hint.querySelector('[data-view-hint-link]')?.addEventListener('click', markHintSeen);
  hint.querySelector('[data-view-hint-close]')?.addEventListener('click', () => {
    hint.hidden = true;
  });
}
