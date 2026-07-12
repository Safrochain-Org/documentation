---
title: Local devnet endpoints
description: "localhost RPC, REST, and wallet JSON for safro-devnet-1 when running safrochaind locally."
sidebar_position: 5
---

Use these values when `safrochaind` runs on your machine. Setup: [Run a local devnet](/run-a-node/local-devnet).

:::warning Local only
These URLs work on **your computer only**. Do not publish them as public network endpoints.
:::

## Network constants

| Field | Value |
| --- | --- |
| Chain ID | `safro-devnet-1` |
| Base denom | `usaf` |
| Bech32 prefix | `addr_safro` |
| Coin type | `118` |
| Min gas price | `0.05 usaf` (set in `app.toml` when using bootstrap script) |

## Endpoints

| Service | URL |
| --- | --- |
| RPC | `http://127.0.0.1:26657` |
| REST (LCD) | `http://127.0.0.1:1317` |
| gRPC | `localhost:9090` |
| WebSocket | `ws://127.0.0.1:26657/websocket` |
| P2P | `tcp://127.0.0.1:26656` |

## Health check

```bash
curl -s http://127.0.0.1:26657/status | jq '.result.sync_info | {latest_block_height, catching_up}'
curl -s http://127.0.0.1:1317/cosmos/bank/v1beta1/supply | jq '.supply'
```

## Wallet connection (Keplr / Leap)

Add as a custom chain in your extension:

```json
{
  "chainId": "safro-devnet-1",
  "chainName": "Safrochain Local Devnet",
  "rpc": "http://127.0.0.1:26657",
  "rest": "http://127.0.0.1:1317",
  "stakeCurrency": { "coinDenom": "SAF", "coinMinimalDenom": "usaf", "coinDecimals": 6 },
  "bech32Config": {
    "bech32PrefixAccAddr": "addr_safro",
    "bech32PrefixAccPub": "addr_safropub",
    "bech32PrefixValAddr": "addr_safrovaloper",
    "bech32PrefixValPub": "addr_safrovaloperpub",
    "bech32PrefixConsAddr": "addr_safrovalcons",
    "bech32PrefixConsPub": "addr_safrovalconspub"
  },
  "currencies": [{ "coinDenom": "SAF", "coinMinimalDenom": "usaf", "coinDecimals": 6 }],
  "feeCurrencies": [
    {
      "coinDenom": "SAF",
      "coinMinimalDenom": "usaf",
      "coinDecimals": 6,
      "gasPriceStep": { "low": 0.05, "average": 0.0625, "high": 0.075 }
    }
  ],
  "coinType": 118
}
```

Import the `dev` key from the bootstrap script (`keyring-backend test`) or create a new key and fund it via genesis edit.

## CosmJS constants

```ts
export const RPC = 'http://127.0.0.1:26657';
export const REST = 'http://127.0.0.1:1317';
export const CHAIN_ID = 'safro-devnet-1';
export const DENOM = 'usaf';
```

## Related

- [Developers: local devnet](/developers/get-started/local-devnet)
- [Public testnet endpoints](./testnet-endpoints)
