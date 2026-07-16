import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/chat',
    component: ComponentCreator('/chat', '4b9'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '7fc'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'b60'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '28e'),
            routes: [
              {
                path: '/cli/ask-me',
                component: ComponentCreator('/cli/ask-me', 'c8a'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/bank',
                component: ComponentCreator('/cli/bank', '822'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/governance',
                component: ComponentCreator('/cli/governance', 'a27'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/keys',
                component: ComponentCreator('/cli/keys', 'f28'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/overview',
                component: ComponentCreator('/cli/overview', '58b'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/query',
                component: ComponentCreator('/cli/query', '524'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/staking',
                component: ComponentCreator('/cli/staking', '27c'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/tx',
                component: ComponentCreator('/cli/tx', 'df0'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/developers/get-started/choose-your-stack',
                component: ComponentCreator('/developers/get-started/choose-your-stack', '197'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/get-started/first-transaction',
                component: ComponentCreator('/developers/get-started/first-transaction', 'e2b'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/get-started/local-devnet',
                component: ComponentCreator('/developers/get-started/local-devnet', 'd01'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/get-started/testnet-setup',
                component: ComponentCreator('/developers/get-started/testnet-setup', 'c45'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/integrations/ibc-transfers',
                component: ComponentCreator('/developers/integrations/ibc-transfers', '1f6'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/integrations/payments-flow',
                component: ComponentCreator('/developers/integrations/payments-flow', '4ad'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/integrations/token-factory',
                component: ComponentCreator('/developers/integrations/token-factory', '53e'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/mobile/flutter',
                component: ComponentCreator('/developers/mobile/flutter', '376'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/mobile/keys-and-ux',
                component: ComponentCreator('/developers/mobile/keys-and-ux', '0bc'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/mobile/react-native',
                component: ComponentCreator('/developers/mobile/react-native', '3a1'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/reference/chain-constants',
                component: ComponentCreator('/developers/reference/chain-constants', 'cd1'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/reference/endpoints',
                component: ComponentCreator('/developers/reference/endpoints', '088'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/reference/events-and-websockets',
                component: ComponentCreator('/developers/reference/events-and-websockets', '215'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/safhandle',
                component: ComponentCreator('/developers/safhandle', 'ab6'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/safhandle/manage',
                component: ComponentCreator('/developers/safhandle/manage', '85c'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/safhandle/register',
                component: ComponentCreator('/developers/safhandle/register', '5d5'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/safhandle/resolve',
                component: ComponentCreator('/developers/safhandle/resolve', '3dc'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/build-in-rust',
                component: ComponentCreator('/developers/smart-contracts/build-in-rust', '78f'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/deploy-and-manage',
                component: ComponentCreator('/developers/smart-contracts/deploy-and-manage', '938'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/interact-from-apps',
                component: ComponentCreator('/developers/smart-contracts/interact-from-apps', '4f2'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/local-dev-and-testing',
                component: ComponentCreator('/developers/smart-contracts/local-dev-and-testing', '4ea'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/overview',
                component: ComponentCreator('/developers/smart-contracts/overview', '035'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/start-here',
                component: ComponentCreator('/developers/start-here', 'f51'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/transactions/broadcast-modes',
                component: ComponentCreator('/developers/transactions/broadcast-modes', '421'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/transactions/signing-overview',
                component: ComponentCreator('/developers/transactions/signing-overview', '2a9'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/transactions/simulate-gas-fees',
                component: ComponentCreator('/developers/transactions/simulate-gas-fees', '9f2'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/wallets/connect-browser-wallets',
                component: ComponentCreator('/developers/wallets/connect-browser-wallets', '76b'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/wallets/cosmos-kit',
                component: ComponentCreator('/developers/wallets/cosmos-kit', '12a'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/wallets/supported-wallets',
                component: ComponentCreator('/developers/wallets/supported-wallets', '6b6'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/web/cosmjs',
                component: ComponentCreator('/developers/web/cosmjs', '210'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/web/query-chain',
                component: ComponentCreator('/developers/web/query-chain', '2a5'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/getting-started/quick-links',
                component: ComponentCreator('/getting-started/quick-links', 'b4f'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/getting-started/what-is-safrochain',
                component: ComponentCreator('/getting-started/what-is-safrochain', '2cc'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/ibc/channels',
                component: ComponentCreator('/ibc/channels', '6f9'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/ibc/hermes-setup',
                component: ComponentCreator('/ibc/hermes-setup', 'c8c'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/ibc/overview',
                component: ComponentCreator('/ibc/overview', 'a99'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/intro',
                component: ComponentCreator('/intro', '0bc'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/auth',
                component: ComponentCreator('/modules/auth', '4dd'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/authz',
                component: ComponentCreator('/modules/authz', '7e2'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/bank',
                component: ComponentCreator('/modules/bank', 'dad'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/clock',
                component: ComponentCreator('/modules/clock', '24d'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/consensus',
                component: ComponentCreator('/modules/consensus', 'd81'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/crisis',
                component: ComponentCreator('/modules/crisis', '24c'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/cw-hooks',
                component: ComponentCreator('/modules/cw-hooks', 'eb8'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/distribution',
                component: ComponentCreator('/modules/distribution', 'aa4'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/drip',
                component: ComponentCreator('/modules/drip', 'db9'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/evidence',
                component: ComponentCreator('/modules/evidence', '29c'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/feegrant',
                component: ComponentCreator('/modules/feegrant', 'e60'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/feepay',
                component: ComponentCreator('/modules/feepay', 'eab'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/feeshare',
                component: ComponentCreator('/modules/feeshare', '2e4'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/globalfee',
                component: ComponentCreator('/modules/globalfee', '916'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/gov',
                component: ComponentCreator('/modules/gov', '127'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/ibc-core',
                component: ComponentCreator('/modules/ibc-core', '548'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/ibc-fee',
                component: ComponentCreator('/modules/ibc-fee', 'ec6'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/ibc-hooks',
                component: ComponentCreator('/modules/ibc-hooks', '579'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/ibc-transfer-app',
                component: ComponentCreator('/modules/ibc-transfer-app', 'bb3'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/interchain-accounts',
                component: ComponentCreator('/modules/interchain-accounts', 'ed4'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/interchain-query',
                component: ComponentCreator('/modules/interchain-query', '2cb'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/mint',
                component: ComponentCreator('/modules/mint', 'b41'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/nft',
                component: ComponentCreator('/modules/nft', 'd44'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/overview',
                component: ComponentCreator('/modules/overview', 'c56'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/params',
                component: ComponentCreator('/modules/params', '788'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/slashing',
                component: ComponentCreator('/modules/slashing', '930'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/staking',
                component: ComponentCreator('/modules/staking', '68e'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/tokenfactory',
                component: ComponentCreator('/modules/tokenfactory', 'ff2'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/upgrade',
                component: ComponentCreator('/modules/upgrade', '8bb'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/vesting',
                component: ComponentCreator('/modules/vesting', 'eda'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/wasm',
                component: ComponentCreator('/modules/wasm', 'b2c'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/networks/chain-registry',
                component: ComponentCreator('/networks/chain-registry', 'f54'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/networks/local-devnet-endpoints',
                component: ComponentCreator('/networks/local-devnet-endpoints', '6c6'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/networks/mainnet-endpoints',
                component: ComponentCreator('/networks/mainnet-endpoints', 'ab2'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/networks/testnet-endpoints',
                component: ComponentCreator('/networks/testnet-endpoints', 'dfc'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/protocol/foundation',
                component: ComponentCreator('/protocol/foundation', '999'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/protocol/governance',
                component: ComponentCreator('/protocol/governance', 'a77'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/protocol/tokenomics',
                component: ComponentCreator('/protocol/tokenomics', '7d1'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/resources/brand-assets',
                component: ComponentCreator('/resources/brand-assets', '5b9'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/resources/faq',
                component: ComponentCreator('/resources/faq', 'dfa'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/resources/whitepaper',
                component: ComponentCreator('/resources/whitepaper', '09c'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/hardware',
                component: ComponentCreator('/run-a-node/hardware', '708'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/install',
                component: ComponentCreator('/run-a-node/install', '27a'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/join-mainnet',
                component: ComponentCreator('/run-a-node/join-mainnet', 'ecb'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/join-testnet',
                component: ComponentCreator('/run-a-node/join-testnet', '0c7'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/local-devnet',
                component: ComponentCreator('/run-a-node/local-devnet', '1d4'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/local-testnet',
                component: ComponentCreator('/run-a-node/local-testnet', 'e16'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/overview',
                component: ComponentCreator('/run-a-node/overview', '06a'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/snapshots',
                component: ComponentCreator('/run-a-node/snapshots', '66a'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/statesync',
                component: ComponentCreator('/run-a-node/statesync', 'c6f'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/upgrades',
                component: ComponentCreator('/run-a-node/upgrades', '174'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/alerting',
                component: ComponentCreator('/validators/alerting', '0f0'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/become-a-validator',
                component: ComponentCreator('/validators/become-a-validator', 'cfb'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/disaster-recovery',
                component: ComponentCreator('/validators/disaster-recovery', '69e'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/key-management',
                component: ComponentCreator('/validators/key-management', '53e'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/monitoring',
                component: ComponentCreator('/validators/monitoring', '20c'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/operations',
                component: ComponentCreator('/validators/operations', '2aa'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/overview',
                component: ComponentCreator('/validators/overview', '101'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/remote-signing',
                component: ComponentCreator('/validators/remote-signing', 'a78'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/security',
                component: ComponentCreator('/validators/security', '915'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/sentry-architecture',
                component: ComponentCreator('/validators/sentry-architecture', '0d5'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/slashing',
                component: ComponentCreator('/validators/slashing', '479'),
                exact: true,
                sidebar: "infraSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
