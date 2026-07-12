---
title: Chain registry
description: Cosmos chain-registry style descriptor for Safrochain mainnet and testnet.
sidebar_position: 4
---

These descriptors follow the [`cosmos/chain-registry`](https://github.com/cosmos/chain-registry)
schema so that wallets, explorers, and relayers can auto-configure.

## Mainnet: `safrochain-1` (live: launched 2026-06-25)

**PR-ready bundle:** [`chain-registry/safrochain/`](https://github.com/Safrochain-Org/safrochain-node/tree/main/chain-registry/safrochain) at repo root
(includes `chain.json`, `assetlist.json`, `versions.json`, `images/`, and
[`_IBC/`](https://github.com/Safrochain-Org/safrochain-node/tree/main/chain-registry/_IBC) channel files). Copy into a fork of
[`cosmos/chain-registry`](https://github.com/cosmos/chain-registry).

Review fixes vs earlier drafts:

| Issue | Resolution |
| --- | --- |
| Binary URL 404 | Omit `codebase.binaries` until `v0.2.2` release assets are published on GitHub |
| `TBD_seed_node_id` | Use live IDs below (40-char hex) |
| Seed port `26656` | Use **`26666`** / **`26670`** (not default CometBFT 26656) |

```json
{
  "$schema": "../chain.schema.json",
  "chain_name": "safrochain",
  "status": "live",
  "network_type": "mainnet",
  "website": "https://safrochain.com",
  "pretty_name": "Safrochain",
  "chain_id": "safrochain-1",
  "bech32_prefix": "addr_safro",
  "bech32_config": {
    "bech32PrefixAccAddr": "addr_safro",
    "bech32PrefixAccPub": "addr_safropub",
    "bech32PrefixValAddr": "addr_safrovaloper",
    "bech32PrefixValPub": "addr_safrovaloperpub",
    "bech32PrefixConsAddr": "addr_safrovalcons",
    "bech32PrefixConsPub": "addr_safrovalconspub"
  },
  "daemon_name": "safrochaind",
  "node_home": "$HOME/.safrochain",
  "key_algos": ["secp256k1"],
  "slip44": 118,
  "fees": {
    "fee_tokens": [
      {
        "denom": "usaf",
        "fixed_min_gas_price": 0.05,
        "low_gas_price": 0.05,
        "average_gas_price": 0.0625,
        "high_gas_price": 0.075
      }
    ]
  },
  "staking": { "staking_tokens": [{ "denom": "usaf" }] },
  "codebase": {
    "git_repo": "https://github.com/Safrochain-Org/safrochain-node",
    "recommended_version": "v0.2.2",
    "compatible_versions": ["v0.2.2"],
    "tag": "v0.2.2",
    "sdk": { "type": "cosmos", "version": "0.50.14" },
    "consensus": { "type": "cometbft", "version": "0.38.21" },
    "ibc": { "type": "go", "version": "8.7.0", "ics_enabled": ["ics20-1", "ics27-1"] },
    "genesis": {
      "genesis_url": "https://raw.githubusercontent.com/Safrochain-Org/mainnet-genesis/main/genesis.json"
    }
  },
  "peers": {
    "seeds": [
      { "id": "bc772fdc9749e6dfd200a9428f07d86fe4fd34ec", "address": "seed.safrochain.network:26666",  "provider": "Safrochain Foundation" },
      { "id": "d323d296ba55e89fb6ce1a724f8da1740bd8cbb0", "address": "seed2.safrochain.network:26670", "provider": "Safrochain Foundation" }
    ],
    "persistent_peers": []
  },
  "apis": {
    "rpc":  [
      { "address": "https://rpc.safrochain.network", "provider": "Safrochain Foundation" },
      { "address": "https://rpc1.safrochain.network", "provider": "Safrochain Foundation" },
      { "address": "https://rpc2.safrochain.network", "provider": "Safrochain Foundation", "archive": true }
    ],
    "rest": [
      { "address": "https://api.safrochain.network", "provider": "Safrochain Foundation" },
      { "address": "https://api1.safrochain.network", "provider": "Safrochain Foundation" },
      { "address": "https://api2.safrochain.network", "provider": "Safrochain Foundation", "archive": true }
    ],
    "grpc": [
      { "address": "https://grpc.safrochain.network:443", "provider": "Safrochain Foundation" },
      { "address": "https://grpc1.safrochain.network:443", "provider": "Safrochain Foundation" },
      { "address": "https://grpc2.safrochain.network:443", "provider": "Safrochain Foundation", "archive": true }
    ],
    "grpc-web": [
      { "address": "https://grpc-web.safrochain.network", "provider": "Safrochain Foundation" }
    ],
    "wss": [
      { "address": "wss://rpc.safrochain.network/websocket", "provider": "Safrochain Foundation" }
    ]
  },
  "explorers": [
    {
      "kind": "safroexplorer",
      "url": "https://explorer.safrochain.com/",
      "tx_page": "https://explorer.safrochain.com/tx/${txHash}",
      "account_page": "https://explorer.safrochain.com/address/${accountAddress}"
    }
  ]
}
```

IBC channel metadata lives in separate `_IBC/` files (not inline in `chain.json`):

- `_IBC/safrochain-noble.json`: `channel-0` ↔ `channel-581`
- `_IBC/safrochain-osmosis.json`: `channel-1` ↔ `channel-110497`

## Testnet: `safro-testnet-1` (live)

```json
{
  "chain_name": "safrochaintestnet",
  "status": "live",
  "network_type": "testnet",
  "pretty_name": "Safrochain Testnet",
  "chain_id": "safro-testnet-1",
  "bech32_prefix": "addr_safro",
  "daemon_name": "safrochaind",
  "slip44": 118,
  "fees": {
    "fee_tokens": [
      {
        "denom": "usaf",
        "fixed_min_gas_price": 0.05,
        "low_gas_price": 0.05,
        "average_gas_price": 0.0625,
        "high_gas_price": 0.075
      }
    ]
  },
  "staking": { "staking_tokens": [{ "denom": "usaf" }] },
  "codebase": {
    "git_repo": "https://github.com/Safrochain-Org/safrochain-node",
    "recommended_version": "v0.1.0",
    "compatible_versions": ["v0.1.0"],
    "cosmos_sdk_version": "0.50",
    "consensus": { "type": "cometbft", "version": "0.38" },
    "genesis": {
      "genesis_url": "https://raw.githubusercontent.com/Safrochain-Org/genesis/main/genesis-testnet.json"
    }
  },
  "apis": {
    "rpc":  [{ "address": "https://rpc.testnet.safrochain.com",  "provider": "Safrochain Foundation" }],
    "rest": [{ "address": "https://rest.testnet.safrochain.com", "provider": "Safrochain Foundation" }],
    "grpc": [{ "address": "grpc.testnet.safrochain.com:443",     "provider": "Safrochain Foundation" }]
  },
  "faucets": [{ "url": "https://faucet.safrochain.com/" }],
  "explorers": [{ "kind": "safroexplorer", "url": "https://explorer.safrochain.com/" }]
}
```

## `assetlist.json` (mainnet)

```json
{
  "chain_name": "safrochain",
  "assets": [
    {
      "description": "The native staking, governance, and fee token of Safrochain, a mobile-first mobile-money-powered blockchain connecting mobile wallets to on-chain finance and interoperable digital rails.",
      "denom_units": [
        { "denom": "usaf", "exponent": 0 },
        { "denom": "saf",  "exponent": 6 }
      ],
      "base": "usaf",
      "name": "Safrochain",
      "display": "saf",
      "symbol": "SAF",
      "coingecko_id": "",
      "logo_URIs": {
        "png": "https://safrochain.com/safcoin.png",
        "svg": "https://safrochain.com/svg/safohcian_logo_white.svg"
      }
    },
    {
      "description": "Circle USDC bridged from Noble over IBC channel-0.",
      "denom_units": [
        { "denom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5", "exponent": 0, "aliases": ["uusdc"] },
        { "denom": "USDC", "exponent": 6 }
      ],
      "base": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
      "name": "USD Coin (Noble)",
      "display": "USDC",
      "symbol": "USDC",
      "traces": [
        {
          "type": "ibc",
          "counterparty": { "chain_name": "noble", "base_denom": "uusdc", "channel_id": "channel-581" },
          "chain": { "channel_id": "channel-0", "path": "transfer/channel-0/uusdc" }
        }
      ],
      "logo_URIs": { "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg" }
    },
    {
      "description": "Osmosis OSMO bridged over IBC channel-1.",
      "denom_units": [
        { "denom": "ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B", "exponent": 0, "aliases": ["uosmo"] },
        { "denom": "OSMO", "exponent": 6 }
      ],
      "base": "ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B",
      "name": "Osmosis",
      "display": "OSMO",
      "symbol": "OSMO",
      "traces": [
        {
          "type": "ibc",
          "counterparty": { "chain_name": "osmosis", "base_denom": "uosmo", "channel_id": "channel-110497" },
          "chain": { "channel_id": "channel-1", "path": "transfer/channel-1/uosmo" }
        }
      ],
      "logo_URIs": { "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png" }
    }
  ]
}
```

SAF on counterparty chains (for wallet/explorer asset lists on Noble and Osmosis):

| Chain | IBC denom | Trace |
| --- | --- | --- |
| Noble | `ibc/416D906365215CB6641B38CCDAA01385AA4B20E5E8EF2D65702A1B3F383FBBA2` | `transfer/channel-581/usaf` |
| Osmosis | `ibc/DBAA4846F611A7603EFCE6F9F46F4F561D48B1F492A576022F000614A17089CE` | `transfer/channel-110497/usaf` |

Full channel topology: [IBC channels](../ibc/channels).

## SLIP-44 / HD path

Safrochain uses **`coin_type = 118`** (Cosmos), so wallet derivation paths are:

```text
m/44'/118'/0'/0/0
```

This is compatible with Keplr, Leap, Cosmostation, Ledger Cosmos app, and any
CosmJS-based wallet.
