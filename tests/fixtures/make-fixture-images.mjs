// Generates solid-colour PNGs used only by test fixtures. Run: node tests/fixtures/make-fixture-images.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync, crc32 } from 'node:zlib';

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body) >>> 0);
  return Buffer.concat([len, body, crc]);
}

function png(width, height, [r, g, b]) {
  const row = Buffer.alloc(1 + width * 3);
  for (let x = 0; x < width; x++) row.set([r, g, b], 1 + x * 3);
  const raw = Buffer.concat(Array.from({ length: height }, () => row));
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.set([8, 2, 0, 0, 0], 8);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const dir = 'src/assets/fixtures/fx-full';
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/logo.png`, png(256, 256, [255, 59, 92]));
writeFileSync(`${dir}/cover.png`, png(1280, 720, [34, 211, 238]));
writeFileSync(`${dir}/shot-1.png`, png(1280, 720, [57, 255, 136]));
writeFileSync(`${dir}/shot-2.png`, png(1280, 720, [236, 72, 153]));
writeFileSync(`${dir}/tall.png`, png(720, 1280, [250, 204, 21]));
console.log('fixture images written to', dir);
