// Copy the public site into dist for static hosting. No dependencies or bundler.
import { mkdir, readdir, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const originIndex = process.argv.indexOf('--origin');
if (originIndex !== -1) {
  const base = new URL(process.argv[originIndex + 1]);
  if (!['https:', 'http:'].includes(base.protocol)) throw new Error('Provide a valid HTTP or HTTPS site address.');
  if (!base.pathname.endsWith('/')) base.pathname += '/';
  for (const filename of ['index.html','quotes.html','project.html','machine.html','about.html']) {
    let html = await readFile(path.join(root, filename), 'utf8');
    // Replace only this script's metadata block, leaving hand-written HTML intact.
    html = html.replace(/\n  <!-- Social preview -->[\s\S]*?<!-- End social preview -->\n/g, '\n');
    const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
    const title = html.match(/<title>([^<]+)<\/title>/)[1];
    const url = new URL(filename === 'index.html' ? './' : filename, base).href;
    const tags = `\n  <!-- Social preview -->\n  <meta property="og:title" content="${title}">\n  <meta property="og:description" content="${description}">\n  <meta property="og:type" content="website">\n  <meta property="og:url" content="${url}">\n  <meta property="og:image" content="${new URL('images/og-image.jpg', base).href}">\n  <meta name="twitter:card" content="summary_large_image">\n  <!-- End social preview -->\n`;
    html = html.replace('</head>', tags + '</head>');
    await writeFile(path.join(root, filename), html);
  }
}
await mkdir(path.join(root, 'dist'), { recursive: true });
for (const entry of await readdir(root)) {
  if (/\.(html|css|js|png)$/.test(entry) || entry === '.nojekyll') {
    await copyFile(path.join(root, entry), path.join(root, 'dist', entry));
  }
}
await cp(path.join(root, 'images'), path.join(root, 'dist', 'images'), { recursive: true });
console.log('Static site prepared in dist.');
