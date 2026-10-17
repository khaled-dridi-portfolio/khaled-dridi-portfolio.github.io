// Converts an image (PNG/JPG/frame grab) to WebP for the site.
// Usage: node scripts/to-webp.mjs <input> <output.webp> [maxWidth]
// Never enlarges; prints the result size so you can check it.
import sharp from 'sharp';

const [src, out, maxWidth] = process.argv.slice(2);
if (!src || !out) {
  console.error('Usage: node scripts/to-webp.mjs <input> <output.webp> [maxWidth]');
  process.exit(1);
}
let img = sharp(src);
if (maxWidth) img = img.resize({ width: Number(maxWidth), withoutEnlargement: true });
const info = await img.webp({ quality: 85 }).toFile(out);
console.log(`${out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
