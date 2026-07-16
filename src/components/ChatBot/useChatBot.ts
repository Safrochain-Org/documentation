import React from 'react';
import { searchDocs, KNOWN_SECTIONS } from './docSearchClient';

export type ChatSource = {
  title: string;
  path: string;
  excerpt: string;
};

export type ChatMessage = {
  id?: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: ChatSource[];
  isTyping?: boolean;
  choices?: string[];
};

type KnowledgeEntry = {
  title: string;
  path: string;
  summary: string;
  excerpt: string;
  tags: string[];
  quickSteps: string[];
};

const knowledgeBase: KnowledgeEntry[] = [
  {
    title: 'Introduction',
    path: '/intro',
    summary:
      'Start here for Safrochain basics, architecture, and the main documentation structure for networks, nodes, and CLI.',
    excerpt:
      'Safrochain is a Cosmos SDK Layer-1 blockchain built for fast, affordable mobile-first payments, IBC connectivity, and local-currency applications.',
    tags: ['intro', 'what is safrochain', 'safrochain', 'documentation', 'doc', 'overview'],
    quickSteps: [
      'Open the introduction page to understand the Safrochain mission and structure.',
      'Use the docs sidebar to jump to networks, run-a-node, CLI, or validators.',
    ],
  },
  {
    title: 'Testnet endpoints',
    path: '/networks/testnet-endpoints',
    summary:
      'Contains the current Safrochain testnet RPC and REST endpoints, plus explorer and network access references.',
    excerpt:
      'Use https://rpc.testnet.safrochain.com for the RPC endpoint and https://rest.testnet.safrochain.com for REST queries on testnet.',
    tags: ['testnet', 'rpc', 'rest', 'endpoint', 'endpoints', 'api', 'explorer', 'network'],
    quickSteps: [
      'Use the testnet RPC endpoint for wallet and node RPC connections.',
      'Use the REST endpoint for API queries and transaction broadcasting.',
    ],
  },
  {
    title: 'Join testnet',
    path: '/run-a-node/join-testnet',
    summary:
      'A practical guide to join Safrochain testnet by syncing a node and connecting to peers.',
    excerpt:
      'This page explains how to sync a node, choose the right peers, and use testnet configuration for Safrochain.',
    tags: ['join testnet', 'join-testnet', 'sync', 'peer', 'testnet', 'node', 'run a node', 'nœud', 'rejoindre'],
    quickSteps: [
      'Follow the join testnet guide to configure your node for Safrochain testnet.',
      'Choose local sync or statesync depending on your environment.',
    ],
  },
  {
    title: 'Run a node overview',
    path: '/run-a-node/overview',
    summary:
      'Explains the Safrochain node lifecycle, required hardware, and the key run-a-node documents.',
    excerpt:
      'The node overview page is the starting point for installing, operating, and upgrading a Safrochain validator or full node.',
    tags: ['run a node', 'node', 'hardware', 'snapshot', 'statesync', 'upgrade', 'validator', 'full node'],
    quickSteps: [
      'Read the node overview before installing or joining testnet.',
      'Continue to install, local testnet, or snapshots as needed.',
    ],
  },
  {
    title: 'CLI reference',
    path: '/cli/overview',
    summary:
      'Contains the Safrochain CLI reference and links to command examples for keys, bank, staking, governance, query, and tx.',
    excerpt:
      'Use the CLI reference page to find the correct safrochaind commands for transactions, account queries, staking, and governance.',
    tags: ['cli', 'command', 'safrochaind', 'tx', 'query', 'staking', 'governance', 'bank', 'balance', 'commande'],
    quickSteps: [
      'Open the CLI reference to locate the exact command for your task.',
      'Use the example command syntax to avoid typos and wrong flags.',
    ],
  },
  {
    title: 'Chain registry',
    path: '/networks/chain-registry',
    summary:
      'Lists the official Safrochain chain registry entry and the expected network configuration for ecosystem tooling.',
    excerpt:
      'The chain registry page is the source of truth for relayer setup, chain IDs, and trusted endpoint metadata.',
    tags: ['chain registry', 'chain-registry', 'registry', 'ibc', 'relayer', 'chain', 'metadata'],
    quickSteps: [
      'Use the chain registry page to verify Safrochain chain IDs and endpoints.',
      'Download the registry entry for relayers or wallet integrations.',
    ],
  },
];

const fallbackResponse: ChatMessage = {
  id: 'fallback',
  role: 'assistant',
  text: 'Aucune correspondance exacte trouve dans la documentation locale Vous pouvez poser d autres questions similaires ou revenir si besoin',
  sources: [
    {
      title: 'Introduction',
      path: '/intro',
      excerpt: 'Start here for Safrochain basics and the main documentation areas for networks nodes and CLI',
    },
  ],
};

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

function scoreEntry(query: string, entry: KnowledgeEntry): number {
  return entry.tags.reduce((score, tag) => {
    if (query.includes(tag)) {
      return score + 2;
    }
    return score;
  }, 0);
}

function findBestEntry(query: string): KnowledgeEntry | null {
  const normalized = normalize(query);
  const scored = knowledgeBase
    .map(entry => ({ entry, score: scoreEntry(normalized, entry) }))
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0 || scored[0].score === 0) {
    return null;
  }
  return scored[0].entry;
}

function buildAssistantMessage(userText: string): ChatMessage {
  // Deprecated: replaced by async doc search in sendMessage
  return fallbackResponse;
}

const initialMessage: ChatMessage = {
  id: 'initial',
  role: 'assistant',
  text: 'Bonjour je suis l assistant documentaire Safrochain posez votre question sur les endpoints testnet node CLI ou registry',
  sources: [
    {
      title: 'Introduction',
      path: '/intro',
      excerpt: 'Start here for Safrochain basics and discover the docs sections for networks nodes and CLI',
    },
  ],
};

export default function useChatBot() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([initialMessage]);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [typingPending, setTypingPending] = React.useState<{
    id: string;
    text: string;
    sources?: ChatSource[];
    choices?: string[];
  } | null>(null);
  const timeoutRef = React.useRef<number | null>(null);
  const intervalRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!typingPending) {
      return undefined;
    }

    const tokens = typingPending.text.split(/(\s+)/);
    let index = 0;

    intervalRef.current = window.setInterval(() => {
      setMessages(prev =>
        prev.map(msg => {
          if (msg.id !== typingPending.id) {
            return msg;
          }

          const nextText = msg.text + tokens[index];
          const finished = index >= tokens.length - 1;

          return {
            ...msg,
            text: nextText,
            sources: finished ? typingPending.sources : msg.sources,
            choices: finished ? typingPending.choices : msg.choices,
            isTyping: !finished,
          };
        }),
      );

      index += 1;

      if (index >= tokens.length) {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        setTypingPending(null);
        setIsLoading(false);
      }
    }, 32);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [typingPending]);

  function resetChat() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    setMessages([initialMessage]);
    setInputValue('');
    setTypingPending(null);
    setIsLoading(false);
  }

  function sendMessage(text: string) {
    if (!text.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      role: 'user',
      text,
    };

    const assistantPlaceholder: ChatMessage = {
      id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      role: 'assistant',
      text: '',
      isTyping: true,
    };

    setMessages(prev => [...prev, userMessage, assistantPlaceholder]);
    setInputValue('');
    setIsLoading(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    // Async search and reply
    (async () => {
      try {
        const normalized = text.trim().toLowerCase();
        // If the user explicitly selected a known section (via choice buttons),
        // treat it as a section selection and return the top page from that section.
        if (KNOWN_SECTIONS.includes(normalized)) {
          const res = await searchDocs(normalized, 5);
          if (res.results && res.results.length > 0) {
            const best = res.results[0];
            const lines = [] as string[];
            const displayName = normalized.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            lines.push(`You chose ${displayName}`);
            lines.push(`Relevant page ${best.title}`);
            if (best.excerpt) lines.push(best.excerpt);
            lines.push(`Path ${best.path}`);
            lines.push(`Vous pouvez poser d autres questions similaires ou revenir si besoin`);

            setTypingPending({ id: assistantPlaceholder.id!, text: lines.join('\n'), sources: res.results.slice(0, 4).map(r => ({ title: r.title, path: r.path, excerpt: r.excerpt })) });
            return;
          }
        }

        const res = await searchDocs(text, 5);

        if (res.ambiguous && res.topSections && res.topSections.length > 0) {
          const question = `Choisissez ${res.topSections.join(' ou ')}`;
          const sources = res.results.slice(0, 6).map(r => ({ title: r.title, path: r.path, excerpt: r.excerpt }));
          const closing = `Vous pouvez poser d autres questions similaires ou revenir si besoin`;
          setTypingPending({ id: assistantPlaceholder.id!, text: `${question}\n${closing}`, sources });
          return;
        }

        if (res.results && res.results.length > 0) {
          const best = res.results[0];
          const lines = [] as string[];
          lines.push(`Relevant page ${best.title}`);
          if (best.excerpt) lines.push(best.excerpt);
          lines.push(`Path ${best.path}`);
          lines.push(`Vous pouvez poser d autres questions similaires ou revenir si besoin`);

          setTypingPending({ id: assistantPlaceholder.id!, text: lines.join('\n'), sources: res.results.slice(0, 4).map(r => ({ title: r.title, path: r.path, excerpt: r.excerpt })) });
          return;
        }

        // fallback
        setTypingPending({ id: assistantPlaceholder.id!, text: fallbackResponse.text, sources: fallbackResponse.sources });
      } catch (e) {
        setTypingPending({ id: assistantPlaceholder.id!, text: fallbackResponse.text, sources: fallbackResponse.sources });
      }
    })();
  }

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    resetChat,
    isLoading,
  };
}
