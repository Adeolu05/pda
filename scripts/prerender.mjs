// Build step: put the rendered page into dist/index.html so crawlers, link previews
// and visitors get the full content before JavaScript runs, and write a static dist/404.html.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');
const { renderApp, renderNotFound } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const mount = '<div id="root"></div>';
if (!template.includes(mount)) throw new Error('prerender: #root mount point not found in dist/index.html');

const appHtml = renderApp();
if (appHtml.length < 5000) throw new Error('prerender: rendered page looks too small, refusing to ship it');
await writeFile(path.join(dist, 'index.html'), template.replace(mount, `<div id="root">${appHtml}</div>`));

// 404 page: same styles, no app script (nothing to hydrate), not indexed.
const notFound = template
    .replace(mount, `<div id="root">${renderNotFound()}</div>`)
    .replace(/<script type="module"[^>]*><\/script>\s*/g, '')
    .replace(/<link rel="modulepreload"[^>]*>\s*/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/, '')
    .replace(/<title>[^<]*<\/title>/, '<title>Page not found | David Peluola</title>')
    .replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex">')
    .replace(/\s*<link rel="canonical"[^>]*>/, '');
await writeFile(path.join(dist, '404.html'), notFound);

await rm(serverDir, { recursive: true, force: true });
console.log(`prerender: index.html (${(appHtml.length / 1024).toFixed(1)} KiB of markup) and 404.html written`);
