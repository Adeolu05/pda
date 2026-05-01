import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'pda-asset-fetch' } }, (r) => {
        let d = '';
        r.on('data', (c) => (d += c));
        r.on('end', () => resolve(d));
      })
      .on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const f = fs.createWriteStream(dest);
    https
      .get(url, { headers: { 'User-Agent': 'pda-asset-fetch' } }, (r) => {
        r.pipe(f);
        f.on('finish', () => f.close(resolve));
      })
      .on('error', reject);
  });
}

const jobs = [
  ['https://lms-pdf-downloader.vercel.app', 'public/images/work/lms-pdf-downloader.jpg'],
  ['https://jumpa-homepage.vercel.app', 'public/images/work/jumpa-homepage.jpg'],
  ['https://celebration-house.vercel.app', 'public/images/work/celebration-house.jpg'],
  // Dami: hero asset is manual public/images/work/dami-olatunji.png (damiolatunji.com)
];

for (const [page, rel] of jobs) {
  const dest = path.join(root, rel);
  const raw = dest.replace(/\.jpg$/, '-raw.png');
  const api = `https://api.microlink.io/?url=${encodeURIComponent(page)}&screenshot=true`;
  const body = await get(api);
  const j = JSON.parse(body);
  const u = j.data?.screenshot?.url;
  if (!u) {
    console.error('skip', page, j.status, j.message);
    continue;
  }
  await download(u, raw);
  execSync(
    `python -c "from PIL import Image; im=Image.open(r'${dest.replace(/\\/g, '/').replace(/\.jpg$/, '-raw.png')}').convert('RGB'); im.thumbnail((1800,1800)); im.save(r'${dest.replace(/\\/g, '/')}', quality=88, optimize=True)"`,
    { stdio: 'inherit' }
  );
  fs.unlinkSync(raw);
  console.log('ok', rel);
}
