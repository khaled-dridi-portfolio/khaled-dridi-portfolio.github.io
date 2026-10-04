import { test, expect } from '@playwright/test';
import { parseVideo, youtubeEmbedUrl, youtubeWatchUrl } from '../../src/lib/video';

const ID = 'dQw4w9WgXcQ';

test('recognises common YouTube URL shapes', () => {
  for (const url of [
    `https://www.youtube.com/watch?v=${ID}`,
    `https://youtube.com/watch?v=${ID}&t=10s`,
    `https://m.youtube.com/watch?v=${ID}`,
    `https://youtu.be/${ID}`,
    `https://youtu.be/${ID}?si=abc`,
    `https://www.youtube.com/embed/${ID}`,
    `https://www.youtube.com/shorts/${ID}`,
    `https://www.youtube-nocookie.com/embed/${ID}`,
  ]) {
    expect(parseVideo(url), url).toEqual({ kind: 'youtube', id: ID });
  }
});

test('local paths are files', () => {
  expect(parseVideo('/projects/demo/trailer.mp4')).toEqual({ kind: 'file', src: '/projects/demo/trailer.mp4' });
});

test('unsupported or malformed values return null', () => {
  for (const v of [undefined, '', 'https://vimeo.com/123456', 'not a url', 'https://www.youtube.com/watch?v=short', 'https://evil.com/watch?v=' + ID]) {
    expect(parseVideo(v), String(v)).toBeNull();
  }
});

test('embed and watch URLs', () => {
  expect(youtubeEmbedUrl(ID)).toBe(`https://www.youtube-nocookie.com/embed/${ID}?autoplay=1&rel=0`);
  expect(youtubeWatchUrl(ID)).toBe(`https://www.youtube.com/watch?v=${ID}`);
});
