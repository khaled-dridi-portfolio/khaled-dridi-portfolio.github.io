/**
 * Starts local videos as soon as the page opens. Browsers only allow autoplay without sound,
 * so the video starts muted and the visitor turns the sound on with the controls.
 * Skipped for visitors who ask for reduced motion.
 */
export function autoplayVideos(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]').forEach((video) => {
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked (e.g. data saver): the poster and controls stay, the visitor presses play.
    });
  });
}
