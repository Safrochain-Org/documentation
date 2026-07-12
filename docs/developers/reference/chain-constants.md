---
title: Chain constants
description: "Safrochain testnet and mainnet chain IDs, denoms, bech32 prefix, and gas prices for app developers."
sidebar_position: 1
---

Copy these into app config and wallet chain JSON.

## Testnet

| Field | Value |
| --- | --- |
| Chain ID | `safro-testnet-1` |
| Base denom | `usaf` |
| Display | SAF (6 decimals) |
| 1 SAF | `1_000_000 usaf` |
| Bech32 prefix | `addr_safro` |
| Coin type (SLIP-44) | `118` |
| Typical gas price | `0.05 usaf` per gas unit |

## Local devnet

| Field | Value |
| --- | --- |
| Chain ID | `safro-devnet-1` |
| RPC | `http://127.0.0.1:26657` |
| REST | `http://127.0.0.1:1317` |
| Gas price | `0.05 usaf` typical |

Details: [Local devnet endpoints](/networks/local-devnet-endpoints). Bootstrap: [Run a local devnet](/run-a-node/local-devnet).

## Mainnet

| Field | Value |
| --- | --- |
| Chain ID | `safrochain-1` |
| Base denom | `usaf` |
| Bech32 prefix | `addr_safro` |
| Gas price step (Keplr) | low `0.05`, average `0.0625`, high `0.075` usaf |

Mainnet endpoints: [mainnet endpoints](/networks/mainnet-endpoints).

## Module links

| Topic | Infra doc |
| --- | --- |
| Global minimum fees | [globalfee](/modules/globalfee) |
| Registry metadata | [chain-registry](/networks/chain-registry) |

## Related

- [Endpoints](./endpoints)
- [Testnet setup](../get-started/testnet-setup)
