type DocEntry = { title: string; path: string; section: string; excerpt: string };

let cachedIndex: DocEntry[] | null = null;

const SECTION_KEYWORDS: Record<string, string[]> = {
  networks: ['endpoint', 'rpc', 'rest', 'grpc', 'mainnet', 'testnet', 'chain-registry', 'chain registry', 'endpoint'],
  validators: ['validator', 'stake', 'staking', 'slashing', 'jail', 'unjail', 'commission', 'consensus key', 'operator key', 'validator key', 'key management'],
  cli: ['keys', 'tx', 'query', 'bank', 'staking', 'gov', 'authz', 'feegrant', 'ibc-transfer', 'wasm', 'safrochaind'],
  'run-a-node': ['install', 'run', 'node', 'sync', 'statesync', 'snapshots', 'join testnet'],
  ibc: ['ibc', 'relayer', 'hermes', 'ibc-transfer'],
  'getting-started': ['getting started', 'quickstart', 'quick links', 'what is'],
  protocol: ['tokenomics', 'governance', 'foundation'],
  resources: ['faq', 'whitepaper', 'brand', 'assets'],
  intro: ['intro', 'overview'],
};

export const KNOWN_SECTIONS = Object.keys(SECTION_KEYWORDS);

async function loadIndex(): Promise<DocEntry[]> {
  if (cachedIndex) return cachedIndex;
  try {
    const res = await fetch('/doc-index.json');
    const j = await res.json();
    cachedIndex = j.entries as DocEntry[];
    return cachedIndex;
  } catch (e) {
    cachedIndex = [];
    return cachedIndex;
  }
}

function chooseSection(query: string): { ambiguous: boolean; top: string[] } | null {
  const q = query.toLowerCase();
  const scores: Record<string, number> = {};
  for (const [section, kws] of Object.entries(SECTION_KEYWORDS)) {
    for (const kw of kws) {
      if (q.includes(kw)) scores[section] = (scores[section] || 0) + 1;
    }
  }
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return null;
  if (entries.length > 1 && entries[0][1] === entries[1][1]) return { ambiguous: true, top: [entries[0][0], entries[1][0]] };
  if (entries[0][1] <= 1 && entries.length > 1) return { ambiguous: true, top: entries.slice(0, 2).map(e => e[0]) };
  return { ambiguous: false, top: [entries[0][0]] };
}

function scoreEntry(query: string, entry: DocEntry): number {
  const q = query.toLowerCase();
  let score = 0;
  if (entry.section && q.includes(entry.section)) score += 3;
  if (entry.title && q.includes(entry.title.toLowerCase())) score += 5;
  const tokens = q.split(/\s+/).filter(Boolean);
  for (const t of tokens) {
    if (entry.title.toLowerCase().includes(t)) score += 3;
    if (entry.excerpt.toLowerCase().includes(t)) score += 2;
  }
  return score;
}

export async function searchDocs(query: string, topN = 5): Promise<{ ambiguous?: boolean; topSections?: string[]; results: DocEntry[] }>{
  const idx = await loadIndex();
  if (!idx || idx.length === 0) return { results: [] };
  const sectionRes = chooseSection(query);
  let candidateSet = idx;
  if (sectionRes && !sectionRes.ambiguous) {
    candidateSet = idx.filter(e => e.section === sectionRes.top[0]);
  }

  const scored = candidateSet
    .map(e => ({ e, score: scoreEntry(query, e) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(x => x.e);

  if (sectionRes && sectionRes.ambiguous) {
    // return top results across both sections
    const combinedResults: DocEntry[] = [];
    for (const s of sectionRes.top) {
      combinedResults.push(...idx.filter(e => e.section === s).map(e => ({ e, score: scoreEntry(query, e) })).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map(x => x.e));
    }
    return { ambiguous: true, topSections: sectionRes.top, results: combinedResults };
  }

  if (!sectionRes && scored.length === 0) {
    // broaden search across all entries
    const allScored = idx
      .map(e => ({ e, score: scoreEntry(query, e) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)
      .map(x => x.e);
    return { results: allScored };
  }

  return { results: scored };
}
