#!/usr/bin/env node
/* ============================================================
   scripts/optimize-images.mjs
   Generates AVIF/WebP/optimized-PNG variants of the large
   thumbnail images used across the project grid (the
   Gemini_Generated_Image_*.png set plus administracao.png and
   Moliceiros.png). Originals are left untouched on disk.

   Output: assets/images/optimized/<name>.avif|.webp|.png

   Usage: node scripts/optimize-images.mjs
   (or: npm run optimize-images)
   Requires the "sharp" devDependency (npm install).
   ============================================================ */

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'assets', 'images');
const OUT_DIR = path.join(SRC_DIR, 'optimized');

// Largest width these images are ever actually displayed at
// (pcard-media / sel-media grid cells), doubled for retina.
const MAX_WIDTH = 1200;

const TARGETS = [
  'administracao.png',
  'Moliceiros.png',
  'Gemini_Generated_Image_1kncdt1kncdt1knc.png',
  'Gemini_Generated_Image_28ar0l28ar0l28ar.png',
  'Gemini_Generated_Image_3mdbq3mdbq3mdbq3.png',
  'Gemini_Generated_Image_9zw4419zw4419zw4.png',
  'Gemini_Generated_Image_k0aatfk0aatfk0aa.png',
  'Gemini_Generated_Image_m8wgm8m8wgm8m8wg.png',
  'Gemini_Generated_Image_m9e7dgm9e7dgm9e7.png',
  'Gemini_Generated_Image_nf5j9znf5j9znf5j.png',
  'Gemini_Generated_Image_sejtdysejtdysejt.png',
  'Gemini_Generated_Image_ywoxlkywoxlkywox.png'
];

function fmtKB(bytes) { return (bytes / 1024).toFixed(0) + ' KB'; }

async function optimizeOne(filename) {
  const srcPath = path.join(SRC_DIR, filename);
  const base = filename.replace(/\.png$/i, '');
  const srcStat = await stat(srcPath);
  const srcImg = sharp(srcPath);
  const meta = await srcImg.metadata();
  const targetWidth = Math.min(meta.width || MAX_WIDTH, MAX_WIDTH);

  const avifPath = path.join(OUT_DIR, `${base}.avif`);
  const webpPath = path.join(OUT_DIR, `${base}.webp`);
  const pngPath = path.join(OUT_DIR, `${base}.png`);

  const resized = () => sharp(srcPath).resize({ width: targetWidth, withoutEnlargement: true });

  await resized().avif({ quality: 55 }).toFile(avifPath);
  await resized().webp({ quality: 82 }).toFile(webpPath);
  await resized().png({ quality: 82, compressionLevel: 9 }).toFile(pngPath);

  const [avifStat, webpStat, pngStat] = await Promise.all([stat(avifPath), stat(webpPath), stat(pngPath)]);

  return {
    filename,
    originalWidth: meta.width, originalHeight: meta.height,
    newWidth: targetWidth,
    originalBytes: srcStat.size,
    avifBytes: avifStat.size,
    webpBytes: webpStat.size,
    pngBytes: pngStat.size
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const results = [];
  for (const filename of TARGETS) {
    try {
      const r = await optimizeOne(filename);
      results.push(r);
      console.log(`✓ ${filename}  ${fmtKB(r.originalBytes)} -> avif ${fmtKB(r.avifBytes)} / webp ${fmtKB(r.webpBytes)} / png ${fmtKB(r.pngBytes)}`);
    } catch (err) {
      console.error(`✗ ${filename}: ${err.message}`);
    }
  }

  const totalOriginal = results.reduce((s, r) => s + r.originalBytes, 0);
  const totalBestCase = results.reduce((s, r) => s + r.avifBytes, 0); // what ships if AVIF is used
  const totalWebp = results.reduce((s, r) => s + r.webpBytes, 0);

  console.log('\n--- summary ---');
  console.log(`Images processed: ${results.length}/${TARGETS.length}`);
  console.log(`Original total:   ${fmtKB(totalOriginal)}`);
  console.log(`AVIF total:       ${fmtKB(totalBestCase)}  (${(100 - totalBestCase / totalOriginal * 100).toFixed(1)}% smaller)`);
  console.log(`WebP total:       ${fmtKB(totalWebp)}  (${(100 - totalWebp / totalOriginal * 100).toFixed(1)}% smaller)`);
  console.log(`\nOriginal PNGs were left untouched in ${SRC_DIR}.`);
  console.log(`Optimized variants written to ${OUT_DIR}.`);
}

main();
