const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.resolve(__dirname, '..', 'docs');
const OUT_FILE = path.resolve(__dirname, '..', 'static', 'doc-index.json');

function collectMarkdownFiles(dir) {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMarkdownFiles(full));
    } else if (/\.mdx?$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function extractTitleAndExcerpt(file) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/).slice(0, 40);
  // Try frontmatter title
  for (const l of lines) {
    const m = l.match(/^title:\s*(?:"([^"]+)"|'([^']+)'|(.+))$/i);
    if (m) return { title: (m[1] || m[2] || m[3]).trim() };
  }
  // Fallback: first markdown heading
  for (const l of lines) {
    const m = l.match(/^#\s+(.+)/);
    if (m) return { title: m[1].trim() };
  }
  // Else use filename
  return { title: path.basename(file).replace(/\.mdx?$/, '') };
}

function buildIndex() {
  const files = collectMarkdownFiles(DOCS_ROOT);
  const index = files.map(f => {
    const rel = path.relative(DOCS_ROOT, f).replace(/\\/g, '/');
    const route = '/' + rel.replace(/\.mdx?$/, '');
    const { title } = extractTitleAndExcerpt(f);
    const content = fs.readFileSync(f, 'utf8');
    const excerpt = content.split(/\r?\n/).slice(0, 8).join(' ').replace(/\s+/g, ' ').trim();
    const section = rel.split('/')[0] || 'intro';
    return { title, path: route, section, excerpt };
  });
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), entries: index }, null, 2));
  console.log('Wrote', OUT_FILE, 'with', index.length, 'entries');
}

buildIndex();
