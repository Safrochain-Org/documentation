const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.resolve(__dirname, '..', 'docs');

// Simple routing keywords mapped to sections (from routing_policy)
const SECTION_KEYWORDS = {
  'networks': ['endpoint', 'rpc', 'rest', 'gprc', 'grpc', 'mainnet', 'testnet', 'chain registry', 'chain-registry', 'endpoint'],
  'validators': ['validator', 'stake', 'staking', 'slashing', 'jail', 'unjail', 'commission', 'consensus key', 'operator key', 'validator key'],
  'cli': ['keys', 'tx', 'query', 'bank', 'staking', 'gov', 'authz', 'feegrant', 'ibc-transfer', 'wasm', 'safrochaind'],
  'run-a-node': ['install', 'run', 'node', 'sync', 'statesync', 'snapshots'],
  'ibc': ['ibc', 'relayer', 'hermes', 'ibc-transfer'],
  'getting-started': ['getting started', 'quickstart', 'quick links', 'what is'],
  'protocol': ['tokenomics', 'governance', 'foundation'],
  'resources': ['faq', 'whitepaper', 'brand', 'assets'],
  'intro': ['intro', 'overview']
};

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

function chooseSection(query) {
  const q = query.toLowerCase();
  const scores = {};
  for (const [section, kws] of Object.entries(SECTION_KEYWORDS)) {
    for (const kw of kws) {
      if (q.includes(kw)) scores[section] = (scores[section] || 0) + 1;
    }
  }
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return null;
  // If top two sections have close scores, consider ambiguous
  if (entries.length > 1 && entries[0][1] === entries[1][1]) {
    return { ambiguous: true, top: [entries[0][0], entries[1][0]] };
  }
  // If top score is low (1) and there are multiple candidates, mark ambiguous
  if (entries[0][1] <= 1 && entries.length > 1) {
    return { ambiguous: true, top: entries.slice(0, 2).map(e => e[0]) };
  }
  return { ambiguous: false, top: [entries[0][0]] };
}

function searchFiles(files, query, topN = 5) {
  const q = query.toLowerCase();
  const results = [];
  for (const file of files) {
    let content = '';
    try { content = fs.readFileSync(file, 'utf8'); } catch (e) { continue; }
    const lower = content.toLowerCase();
    const count = (lower.match(new RegExp(query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi')) || []).length;
    const hits = (lower.match(new RegExp('(.{0,80}' + query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '.{0,80})', 'gi')) || []);
    // fallback: count keyword occurrences of words in query
    const tokens = q.split(/\s+/).filter(Boolean);
    let tokenScore = 0;
    for (const t of tokens) tokenScore += (lower.match(new RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')) || []).length;
    const score = count * 5 + tokenScore;
    if (score > 0) results.push({ file, score, count, hits });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, topN);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node scripts/doc_search.js "your query"');
    process.exit(2);
  }
  const query = args.join(' ');
  const sectionRes = chooseSection(query);
  if (!sectionRes) console.log('No strong section match; searching all docs');
  else if (sectionRes.ambiguous) console.log('Ambiguous query — top sections:', sectionRes.top.join(', '));
  else console.log('Best matched section:', sectionRes.top[0]);

  const files = collectMarkdownFiles(DOCS_ROOT);
  let searchFilesList = files;
  if (sectionRes && !sectionRes.ambiguous) {
    const section = sectionRes.top[0];
    const sectionDir = path.join(DOCS_ROOT, section);
    if (fs.existsSync(sectionDir)) {
      const secFiles = collectMarkdownFiles(sectionDir);
      if (secFiles.length > 0) searchFilesList = secFiles;
    }
  }

  const results = searchFiles(searchFilesList, query);
  function printResultList(list) {
    if (!list || list.length === 0) return;
    for (const r of list) {
      console.log('\nConsulted:', path.relative(process.cwd(), r.file));
      console.log('Score:', r.score, 'Matches:', r.count);
      console.log('Snippet:', (r.hits && r.hits[0]) ? r.hits[0].replace(/\n/g, ' ') : '[no snippet]');
    }
  }

  if (results.length === 0) {
    console.log('No results found in target section. Broadening search across docs...');
    const allResults = searchFiles(files, query);
    if (allResults.length === 0) { console.log('No matches found in docs for query.'); return; }
    printResultList(allResults);
    return;
  }

  // If ambiguous (two candidate sections), search both and ask a short clarifying question
  if (sectionRes && sectionRes.ambiguous) {
    console.log('\nThe query looks ambiguous. Do you mean:', sectionRes.top.join(' or '), '?');
    // Search in each top section and print best hit per section
    for (const s of sectionRes.top) {
      const sectionDir = path.join(DOCS_ROOT, s);
      if (!fs.existsSync(sectionDir)) continue;
      const secFiles = collectMarkdownFiles(sectionDir);
      const secResults = searchFiles(secFiles, query, 3);
      console.log('\nTop results in section', s + ':');
      printResultList(secResults);
    }
    return;
  }

  printResultList(results);
}

main();
