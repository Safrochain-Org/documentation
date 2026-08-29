import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
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
    component: ComponentCreator('/', 'd0c'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '14a'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '3d1'),
            routes: [
              {
                path: '/cli/ask-me',
                component: ComponentCreator('/cli/ask-me', 'f36'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/bank',
                component: ComponentCreator('/cli/bank', 'e1f'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/governance',
                component: ComponentCreator('/cli/governance', '6a3'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/keys',
                component: ComponentCreator('/cli/keys', '5ee'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/overview',
                component: ComponentCreator('/cli/overview', 'ab7'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/query',
                component: ComponentCreator('/cli/query', '066'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/staking',
                component: ComponentCreator('/cli/staking', 'a02'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/cli/tx',
                component: ComponentCreator('/cli/tx', '957'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/developers/get-started/choose-your-stack',
                component: ComponentCreator('/developers/get-started/choose-your-stack', '691'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/get-started/first-transaction',
                component: ComponentCreator('/developers/get-started/first-transaction', 'de1'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/get-started/local-devnet',
                component: ComponentCreator('/developers/get-started/local-devnet', '9be'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/get-started/testnet-setup',
                component: ComponentCreator('/developers/get-started/testnet-setup', '487'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/integrations/ibc-transfers',
                component: ComponentCreator('/developers/integrations/ibc-transfers', '397'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/integrations/payments-flow',
                component: ComponentCreator('/developers/integrations/payments-flow', 'd33'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/integrations/token-factory',
                component: ComponentCreator('/developers/integrations/token-factory', '41d'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/mobile/flutter',
                component: ComponentCreator('/developers/mobile/flutter', 'abd'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/mobile/keys-and-ux',
                component: ComponentCreator('/developers/mobile/keys-and-ux', '8ef'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/mobile/react-native',
                component: ComponentCreator('/developers/mobile/react-native', '1c2'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/reference/chain-constants',
                component: ComponentCreator('/developers/reference/chain-constants', 'b8f'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/reference/endpoints',
                component: ComponentCreator('/developers/reference/endpoints', '516'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/reference/events-and-websockets',
                component: ComponentCreator('/developers/reference/events-and-websockets', '578'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/safhandle',
                component: ComponentCreator('/developers/safhandle', '15f'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/safhandle/manage',
                component: ComponentCreator('/developers/safhandle/manage', 'da5'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/safhandle/register',
                component: ComponentCreator('/developers/safhandle/register', 'ea2'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/safhandle/resolve',
                component: ComponentCreator('/developers/safhandle/resolve', '396'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/build-in-rust',
                component: ComponentCreator('/developers/smart-contracts/build-in-rust', '3eb'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/deploy-and-manage',
                component: ComponentCreator('/developers/smart-contracts/deploy-and-manage', '4c9'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/interact-from-apps',
                component: ComponentCreator('/developers/smart-contracts/interact-from-apps', 'a8b'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/local-dev-and-testing',
                component: ComponentCreator('/developers/smart-contracts/local-dev-and-testing', '9ea'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/smart-contracts/overview',
                component: ComponentCreator('/developers/smart-contracts/overview', 'd74'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/start-here',
                component: ComponentCreator('/developers/start-here', '0dd'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/transactions/broadcast-modes',
                component: ComponentCreator('/developers/transactions/broadcast-modes', '742'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/transactions/signing-overview',
                component: ComponentCreator('/developers/transactions/signing-overview', '180'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/transactions/simulate-gas-fees',
                component: ComponentCreator('/developers/transactions/simulate-gas-fees', '18e'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/wallets/connect-browser-wallets',
                component: ComponentCreator('/developers/wallets/connect-browser-wallets', '1d6'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/wallets/cosmos-kit',
                component: ComponentCreator('/developers/wallets/cosmos-kit', '96c'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/wallets/supported-wallets',
                component: ComponentCreator('/developers/wallets/supported-wallets', '5f7'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/web/cosmjs',
                component: ComponentCreator('/developers/web/cosmjs', 'ae2'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/developers/web/query-chain',
                component: ComponentCreator('/developers/web/query-chain', '915'),
                exact: true,
                sidebar: "developersSidebar"
              },
              {
                path: '/getting-started/quick-links',
                component: ComponentCreator('/getting-started/quick-links', 'c68'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/getting-started/what-is-safrochain',
                component: ComponentCreator('/getting-started/what-is-safrochain', 'b86'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/ibc/channels',
                component: ComponentCreator('/ibc/channels', '3dd'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/ibc/hermes-setup',
                component: ComponentCreator('/ibc/hermes-setup', 'b3c'),
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
                component: ComponentCreator('/intro', 'e3a'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/auth',
                component: ComponentCreator('/modules/auth', '9c5'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/authz',
                component: ComponentCreator('/modules/authz', 'bbc'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/bank',
                component: ComponentCreator('/modules/bank', 'd44'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/clock',
                component: ComponentCreator('/modules/clock', '398'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/consensus',
                component: ComponentCreator('/modules/consensus', 'ad2'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/crisis',
                component: ComponentCreator('/modules/crisis', '1cf'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/cw-hooks',
                component: ComponentCreator('/modules/cw-hooks', '2fc'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/distribution',
                component: ComponentCreator('/modules/distribution', '905'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/drip',
                component: ComponentCreator('/modules/drip', '65b'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/evidence',
                component: ComponentCreator('/modules/evidence', '6e2'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/feegrant',
                component: ComponentCreator('/modules/feegrant', '95b'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/feepay',
                component: ComponentCreator('/modules/feepay', '272'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/feeshare',
                component: ComponentCreator('/modules/feeshare', '8eb'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/globalfee',
                component: ComponentCreator('/modules/globalfee', '9d9'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/gov',
                component: ComponentCreator('/modules/gov', '7a1'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/ibc-core',
                component: ComponentCreator('/modules/ibc-core', 'f03'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/ibc-fee',
                component: ComponentCreator('/modules/ibc-fee', 'efd'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/ibc-hooks',
                component: ComponentCreator('/modules/ibc-hooks', 'a67'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/ibc-transfer-app',
                component: ComponentCreator('/modules/ibc-transfer-app', 'c5c'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/interchain-accounts',
                component: ComponentCreator('/modules/interchain-accounts', 'f69'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/interchain-query',
                component: ComponentCreator('/modules/interchain-query', '46f'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/mint',
                component: ComponentCreator('/modules/mint', '50b'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/nft',
                component: ComponentCreator('/modules/nft', 'a75'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/overview',
                component: ComponentCreator('/modules/overview', 'b63'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/params',
                component: ComponentCreator('/modules/params', 'b84'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/slashing',
                component: ComponentCreator('/modules/slashing', '7c3'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/staking',
                component: ComponentCreator('/modules/staking', '3ff'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/tokenfactory',
                component: ComponentCreator('/modules/tokenfactory', '07b'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/upgrade',
                component: ComponentCreator('/modules/upgrade', '955'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/vesting',
                component: ComponentCreator('/modules/vesting', 'b39'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/modules/wasm',
                component: ComponentCreator('/modules/wasm', '1c4'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/networks/chain-registry',
                component: ComponentCreator('/networks/chain-registry', '25f'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/networks/local-devnet-endpoints',
                component: ComponentCreator('/networks/local-devnet-endpoints', 'e8b'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/networks/mainnet-endpoints',
                component: ComponentCreator('/networks/mainnet-endpoints', '1e4'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/networks/testnet-endpoints',
                component: ComponentCreator('/networks/testnet-endpoints', '556'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/protocol/foundation',
                component: ComponentCreator('/protocol/foundation', 'fc7'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/protocol/governance',
                component: ComponentCreator('/protocol/governance', '28a'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/protocol/tokenomics',
                component: ComponentCreator('/protocol/tokenomics', 'd20'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/resources/brand-assets',
                component: ComponentCreator('/resources/brand-assets', '802'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/resources/faq',
                component: ComponentCreator('/resources/faq', 'b35'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/resources/whitepaper',
                component: ComponentCreator('/resources/whitepaper', '9f7'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/hardware',
                component: ComponentCreator('/run-a-node/hardware', '094'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/install',
                component: ComponentCreator('/run-a-node/install', 'a2c'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/join-mainnet',
                component: ComponentCreator('/run-a-node/join-mainnet', 'e04'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/join-testnet',
                component: ComponentCreator('/run-a-node/join-testnet', '980'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/local-devnet',
                component: ComponentCreator('/run-a-node/local-devnet', '5cd'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/local-testnet',
                component: ComponentCreator('/run-a-node/local-testnet', '7a6'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/overview',
                component: ComponentCreator('/run-a-node/overview', '531'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/snapshots',
                component: ComponentCreator('/run-a-node/snapshots', 'f3d'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/statesync',
                component: ComponentCreator('/run-a-node/statesync', '7b3'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/run-a-node/upgrades',
                component: ComponentCreator('/run-a-node/upgrades', '85d'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/alerting',
                component: ComponentCreator('/validators/alerting', '681'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/become-a-validator',
                component: ComponentCreator('/validators/become-a-validator', '16e'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/disaster-recovery',
                component: ComponentCreator('/validators/disaster-recovery', '305'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/key-management',
                component: ComponentCreator('/validators/key-management', '8c7'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/monitoring',
                component: ComponentCreator('/validators/monitoring', '583'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/operations',
                component: ComponentCreator('/validators/operations', '46e'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/overview',
                component: ComponentCreator('/validators/overview', '051'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/remote-signing',
                component: ComponentCreator('/validators/remote-signing', '99d'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/security',
                component: ComponentCreator('/validators/security', '147'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/sentry-architecture',
                component: ComponentCreator('/validators/sentry-architecture', '59b'),
                exact: true,
                sidebar: "infraSidebar"
              },
              {
                path: '/validators/slashing',
                component: ComponentCreator('/validators/slashing', '309'),
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
