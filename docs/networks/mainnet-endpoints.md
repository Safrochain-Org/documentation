---
title: Safrochain mainnet endpoints (RPC, REST, gRPC)
description: Public RPC, REST (LCD), gRPC, gRPC-Web, P2P seeds, status, and Grafana endpoints for safrochain-1.
sidebar_position: 1
keywords:
  - Safrochain mainnet
  - safrochain-1
  - public RPC
  - REST API
  - LCD
  - gRPC
  - gRPC-Web
  - P2P seeds
  - chain endpoints
  - Cosmos RPC
---

:::info Mainnet is live
`safrochain-1` is producing blocks (genesis time `2026-06-25T10:00:00Z`).
All endpoints below are served by the Safrochain Foundation infrastructure.
:::

## Network versions

| Network | Chain ID | safrochain-node tag | Go |
| --- | --- | --- | --- |
| Mainnet | `safrochain-1` | `v0.2.2` | `1.25.8` |
| Testnet | `safro-testnet-1` | `release/v0.1.0` | `1.23.9` |

After building [`safrochaind` from source](../run-a-node/install) at tag **`v0.2.2`**, `make install` and `safrochaind version --long` report **Cosmos SDK v0.50.14**, **CometBFT v0.38.21**, and **Go go1.25.8** (OS/arch varies, e.g. `darwin/arm64` on Apple Silicon or `linux/amd64` on typical servers).

## Chain identity

| Field | Value |
| --- | --- |
| Chain ID | `safrochain-1` |
| Base denom | `usaf` |
| Display denom | `SAF` |
| Conversion | `1 SAF = 1_000_000 usaf` |
| Total supply | `1,000,000,000 SAF` (fixed) |
| Bech32 prefix | `addr_safro` |
| Minimum gas price | `0.05 usaf/gas` (chain-wide via [`globalfee`](../modules/globalfee)) |
| Validators at block 1 | **4**: Ubuntu + Kilimanjaro (SF Foundation, 50k SAF / 8 % each), HusoNode + Winnode (community, 10k SAF / 10 % each) |
| Total bonded at block 1 | 120,000 SAF |

## Genesis

| Field | Value |
| --- | --- |
| Repository | [`Safrochain-Org/mainnet-genesis`](https://github.com/Safrochain-Org/mainnet-genesis) |
| Raw URL | `https://raw.githubusercontent.com/Safrochain-Org/mainnet-genesis/main/genesis.json` |
| Launch SHA-256 | `c05ac5aec1918df9edb257e8e0eea184d73edc51370eb4aa9f0b4f0aad615c4d` |
| Genesis time | `2026-06-25T10:00:00Z` |
| Initial height | `1` |
| File size | 27,596 bytes (≈ 27 KB) |
| Binary | `safrochaind v0.2.2` (Cosmos SDK 0.50.14, CometBFT 0.38.21) |

## RPC (CometBFT JSON-RPC over HTTPS)

| Name | Endpoint | Role |
| --- | --- | --- |
| `rpc1` | [https://rpc1.safrochain.network](https://rpc1.safrochain.network) | primary public RPC |
| `rpc2` | [https://rpc2.safrochain.network](https://rpc2.safrochain.network) | secondary public RPC (archive) |
| `rpc`  | [https://rpc.safrochain.network](https://rpc.safrochain.network) | aggregated alias (round-robins between rpc1/rpc2) |

Common paths:

```bash
curl -s https://rpc.safrochain.network/status | jq .result.sync_info.latest_block_height
curl -s https://rpc.safrochain.network/net_info
curl -s https://rpc.safrochain.network/health
curl -s 'https://rpc.safrochain.network/block?height=1'
# WebSocket
wscat -c wss://rpc.safrochain.network/websocket
```

Unsafe CometBFT methods (`unsafe_dial_seeds`, `unsafe_flush_mempool`, etc.) are
blocked by the public proxy.

## REST / LCD (Cosmos SDK API over HTTPS)

| Name | Endpoint | Role |
| --- | --- | --- |
| `api1` | [https://api1.safrochain.network](https://api1.safrochain.network) | primary REST/LCD |
| `api2` | [https://api2.safrochain.network](https://api2.safrochain.network) | secondary REST/LCD (archive) |
| `api`  | [https://api.safrochain.network](https://api.safrochain.network) | aggregated alias |

Examples:

```bash
curl -s https://api.safrochain.network/cosmos/base/tendermint/v1beta1/node_info
curl -s https://api.safrochain.network/cosmos/base/tendermint/v1beta1/syncing
curl -s https://api.safrochain.network/cosmos/staking/v1beta1/validators
curl -s https://api.safrochain.network/cosmos/bank/v1beta1/supply
```

## gRPC (HTTP/2) and gRPC-Web

| Name | Endpoint | Notes |
| --- | --- | --- |
| `grpc1` | [https://grpc1.safrochain.network](https://grpc1.safrochain.network) | primary gRPC (HTTP/2, TLS required) |
| `grpc2` | [https://grpc2.safrochain.network](https://grpc2.safrochain.network) | secondary gRPC (HTTP/2, TLS required) |
| `grpc`  | [https://grpc.safrochain.network](https://grpc.safrochain.network) | aggregated alias |
| `grpc-web` | [https://grpc-web.safrochain.network](https://grpc-web.safrochain.network) | browser-friendly gRPC-Web (CosmJS) |

```bash
grpcurl grpc.safrochain.network:443 \
  cosmos.staking.v1beta1.Query/Validators
```

## P2P seeds (CometBFT P2P over TCP)

| Name | Node ID @ endpoint | Purpose |
| --- | --- | --- |
| `seed`  | `bc772fdc9749e6dfd200a9428f07d86fe4fd34ec@seed.safrochain.network:26666`  | primary public seed/sentry |
| `seed2` | `d323d296ba55e89fb6ce1a724f8da1740bd8cbb0@seed2.safrochain.network:26670` | secondary public seed/sentry |

Drop-in `[p2p]` block for `config.toml`:

```toml
seeds = "bc772fdc9749e6dfd200a9428f07d86fe4fd34ec@seed.safrochain.network:26666,d323d296ba55e89fb6ce1a724f8da1740bd8cbb0@seed2.safrochain.network:26670"
persistent_peers = ""
```

The two seeds are enough to bootstrap. Once your node connects and `pex`
populates its address book, it discovers and dials further peers
automatically.

Validators **never** accept inbound public P2P; only the public seed nodes
listed above are reachable from the open internet. The public RPC nodes
(`rpc1`, `rpc2`) are fronted by Cloudflare, so only their HTTPS RPC port
443 is reachable: their CometBFT P2P sockets are intentionally not
exposed publicly.

## Status page

| Name | Endpoint | Access |
| --- | --- | --- |
| `status` | [https://status.safrochain.network](https://status.safrochain.network) | public (read-only) |

## TLS, CORS, and rate limits

- All public endpoints terminate TLS via Let's Encrypt with HSTS, modern
  ciphers, and per-IP rate limits.
- CORS is open on RPC/REST so that browser wallets (Keplr, Leap) can use the
  endpoints directly.
- Unsafe CometBFT JSON-RPC methods (`unsafe_dial_seeds`, `unsafe_flush_mempool`,
  `dial_peers`, `dial_seeds`, …) are blocked at the public proxy.

## Snapshots (optional, post-launch)

| Name | Endpoint | Purpose |
| --- | --- | --- |
| `snapshots` | [https://snapshots.safrochain.network](https://snapshots.safrochain.network) | downloadable snapshot artifacts |

Snapshots come with a manifest (`height` + `sha256`). Archive snapshots come
from `rpc2` and grow over time.

## What is **not** public

Anything not listed above (validator P2P, internal signing, monitoring
exporters, admin SSH, …) is intentionally firewalled off and is **not**
something you should ever depend on as an external user.
