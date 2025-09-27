// audit-links.mjs
// Crawl built HTML under docs/, extract <a href>, and classify issues
// Usage: node scripts/audit-links.mjs [--external]

import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const OUT = path.join(ROOT, 'docs');
const CHECK_EXTERNAL = process.argv.includes('--external');

function getProjectBase() {
  // Try to read astro.config.mjs for base: '/empowernow_info/'
  const cfgPath = path.join(ROOT, 'site', 'astro.config.mjs');
  try {
    const src = fs.readFileSync(cfgPath, 'utf8');
    const m = src.match(/base:\s*'([^']+)'/);
    if (m && m[1]) return m[1];
  } catch {}
  return '/';
}
const PROJECT_BASE = getProjectBase();

function stripBase(p) {
  if (PROJECT_BASE !== '/' && p.startsWith(PROJECT_BASE)) return p.slice(PROJECT_BASE.length - 1); // keep leading '/'
  return p;
}

function walk(dir, visit) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, visit);
    else if (e.isFile() && e.name.endsWith('.html')) visit(p);
  }
}

function extractLinks(html) {
  const links = [];
  const re = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) links.push(m[1]);
  return links;
}

function normalize(href) {
  try {
    const u = new URL(href, 'https://example.local');
    return { path: u.pathname, search: u.search, hash: u.hash, isExternal: /^(https?:)?\/\//.test(href) };
  } catch {
    return { path: href, isExternal: /^(https?:)?\/\//.test(href) };
  }
}

async function probeExternal(url) {
  if (!CHECK_EXTERNAL) return { ok: true, skipped: true };
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

function existsPath(p) {
  // Consider /path/, /path/index.html, /path.html
  const abs = path.join(OUT, p.replace(/^\//, ''));
  if (fs.existsSync(abs)) return true;
  if (fs.existsSync(abs + '/index.html')) return true;
  if (fs.existsSync(abs + '.html')) return true;
  return false;
}

function classifyInternal(p) {
  const local = stripBase(p);
  if (existsPath(local)) return null;
  const parts = local.split('/').filter(Boolean);
  return parts.length === 0 ? 'root-missing' : fs.existsSync(path.join(OUT, parts[0])) ? 'subpath-missing' : 'top-level-missing';
}

async function main() {
  const issues = [];
  walk(OUT, (file) => {
    const html = fs.readFileSync(file, 'utf8');
    const links = extractLinks(html);
    for (const href of links) {
      const { path: pth, isExternal } = normalize(href);
      if (isExternal) continue;
      const cause = classifyInternal(pth);
      if (cause) issues.push({ from: file.replace(ROOT + path.sep, ''), href: href, cause });
    }
  });
  const rows = [['from','href','cause']].concat(issues.map(i => [i.from, i.href, i.cause]));
  const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(',')).join('\n');
  const outFile = path.join(ROOT, 'link-audit.csv');
  fs.writeFileSync(outFile, csv);
  console.log(`Base path: ${PROJECT_BASE} — Wrote ${issues.length} issues to ${outFile}`);
}

main();
