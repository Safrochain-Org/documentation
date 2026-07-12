---
title: Testnet setup
description: "Fund a testnet wallet, pick RPC/REST endpoints, and verify connectivity before building on safro-testnet-1."
sidebar_position: 2
---

Use **testnet** (`safro-testnet-1`) for shared examples, or **[local devnet](./local-devnet)** (`safro-devnet-1`) on your machine.

## Checklist

1. Install a wallet or generate a dev key (see [Wallets](../wallets/supported-wallets))
2. Copy [network constants](../reference/chain-constants)
3. Fund the address from the [faucet](https://faucet.safrochain.com/)
4. Verify RPC and REST respond
5. Send a [first transaction](./first-transaction)

## Network

| Field | Value |
| --- | --- |
| Chain ID | `safro-testnet-1` |
| Denom | `usaf` |
| Prefix | `addr_safro` |
| Min gas price | `0.05 usaf` per gas unit |

Full endpoint table: [Testnet endpoints](/networks/testnet-endpoints).

## Verify connectivity

```bash
RPC="https://rpc.testnet.safrochain.com"
REST="https://rest.testnet.safrochain.com"

curl -s "$RPC/status" | jq '.result.sync_info.latest_block_height'
curl -s "$REST/cosmos/bank/v1beta1/supply" | jq '.supply[0]'
```

## Fund your address

1. Create or import a wallet with prefix `addr_safro`
2. Open [faucet.safrochain.com](https://faucet.safrochain.com/)
3. Paste your address (must start with `addr_safro`)

Discord faucet: see [Testnet endpoints](/networks/testnet-endpoints#faucet-discord-faucet-bot).

## Wallet registration (Keplr / Leap)

If using a browser wallet, register the chain using the JSON block in [Testnet endpoints: Wallet connection](/networks/testnet-endpoints#wallet-connection-keplr--leap).

Or use [Cosmos Kit](../wallets/cosmos-kit) to register Safrochain in your React app.

## Next

- [First transaction](./first-transaction)
- [Endpoints reference](../reference/endpoints)
