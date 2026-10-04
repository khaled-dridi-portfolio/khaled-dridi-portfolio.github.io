export function initCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const original = btn.textContent;
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy ?? '';
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // Clipboard unavailable (insecure context or denied): open the mail client instead.
        window.location.href = `mailto:${value}`;
        return;
      }
      btn.textContent = btn.dataset.copiedLabel ?? original;
      setTimeout(() => {
        btn.textContent = original;
      }, 2000);
    });
  });
}
