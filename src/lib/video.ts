export type VideoSource = { kind: 'youtube'; id: string } | { kind: 'file'; src: string };

const YT_ID = /^[A-Za-z0-9_-]{11}$/;
const YT_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com']);

/** Accepts a YouTube URL or a local path starting with "/". Anything else returns null. */
export function parseVideo(value: string | undefined): VideoSource | null {
  if (!value) return null;
  if (value.startsWith('/')) return { kind: 'file', src: value };
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  let id: string | null = null;
  if (url.hostname === 'youtu.be') {
    id = url.pathname.slice(1).split('/')[0] ?? null;
  } else if (YT_HOSTS.has(url.hostname)) {
    if (url.pathname === '/watch') id = url.searchParams.get('v');
    else id = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ?? null;
  }
  return id && YT_ID.test(id) ? { kind: 'youtube', id } : null;
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}
