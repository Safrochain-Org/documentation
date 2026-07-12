---
title: Safrochain IBC overview
description: "How Safrochain participates in the Cosmos IBC ecosystem: clients, connections, channels, packets, and supported tokens for cross-chain transfers."
sidebar_position: 1
keywords:
  - IBC
  - Inter-Blockchain Communication
  - ibc-go
  - Cosmos IBC
  - IBC channels
  - cross-chain transfers
  - relayer
  - Safrochain IBC
  - ICS-20
---

Safrochain is built on Cosmos SDK 0.50 with the **`ibc-go`** module enabled,
which means every Safrochain validator is also an IBC participant from
genesis. Out of the box you get:

- **ICS-20 fungible token transfers**: send `SAF` to any IBC-enabled chain
  and receive any IBC token in return (denominated as `ibc/<hash>`).
- **ICS-27 interchain accounts (ICA)**: controllers on other chains can
  open accounts on Safrochain and submit txs as if they were native.
- **ICS-29 fee middleware**: relayer incentivisation built into the chain.
- **ICS-721 NFT transfers**: interchain NFT moves once a counterparty wires
  it up.

Mainnet (`safrochain-1`) has **live** ICS-20 channels to **Noble** and
**Osmosis**. See the full registry in [Channels](./channels).

| Path | Safrochain channel | Counterparty channel | Tokens |
| --- | --- | --- | --- |
| Safrochain ↔ Noble | `channel-0` | `channel-581` | USDC in, SAF out |
| Safrochain ↔ Osmosis | `channel-1` | `channel-110497` | OSMO in, SAF out |

## Why a chain operator runs a relayer

IBC is **permissionless**: anyone can run a relayer between two chains. In
practice the foundation runs at least one Hermes relayer per priority
counterparty so that:

- Token transfers in/out of Safrochain don't depend on third-party uptime
- The foundation can pay relayer fees in `SAF` via the `ibcfee` middleware
  when fee channels are registered
- Channel handshake bugs and timeout issues get caught fast (alert
  pipeline)

Independent operators are very welcome to relay the same open channels; the
more redundancy, the healthier the network. See [Join as a relayer](./channels#join-as-a-relayer).

## Relayer choices

| Relayer | Language | Status | Recommended for |
| --- | --- | --- | --- |
| **Hermes** (`ibc-relayer-cli`) | Rust | mature | foundation default, see [Hermes setup](./hermes-setup) |
| **`go-relayer`** (`rly`) | Go | mature | Cosmos-native operators familiar with Go tooling |
| **`hermes-rs`** (lite) | Rust | new | embedded / single-channel use-cases |

We document the **Hermes** flow in detail because that is what the
foundation runs. The `rly` flow follows the same chain-config + start-up
pattern.

## Address format on counterparties

When you send `SAF` from Safrochain over IBC, the voucher hash depends on
the **counterparty channel id** (not the Safrochain channel id):

| Destination | Safrochain channel | Trace on destination | IBC denom on destination |
| --- | --- | --- | --- |
| Noble | `channel-0` | `transfer/channel-581/usaf` | `ibc/416D906365215CB6641B38CCDAA01385AA4B20E5E8EF2D65702A1B3F383FBBA2` |
| Osmosis | `channel-1` | `transfer/channel-110497/usaf` | `ibc/DBAA4846F611A7603EFCE6F9F46F4F561D48B1F492A576022F000614A17089CE` |

Compute any IBC denom locally:

```bash
echo -n "transfer/<counterparty-channel>/<base-denom>" | shasum -a 256
# IBC denom = "ibc/" + that hex (uppercased)
```

Inbound tokens on Safrochain use the Safrochain channel in the trace, e.g.
OSMO arrives as `transfer/channel-1/uosmo` →
`ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B`.

## Fees

ICS-29 fee middleware is enabled on-chain. A relayer can attach `recv_fee`,
`ack_fee`, and `timeout_fee` to each packet and be paid from a fee escrow on
the source chain. No fee-enabled channels are registered yet on mainnet; the
foundation relayer currently clears packets without ICS-29 incentives.

## Health monitoring

Hermes ships a Prometheus-compatible metrics endpoint (defaults to
`http://localhost:3001/metrics`). Useful series to graph or alert on:

- `ibc_relayer_packets_relayed_total` (5 m / 1 h rate per channel)
- pending acknowledgements per channel
- relayer wallet balance per chain (alert when below ~5 SAF / equivalent on
  the counterparty chain)
- channel handshake failures

## Where to next

- [Hermes setup](./hermes-setup): full config template, systemd unit,
  health checks.
- [Channels](./channels): canonical channel registry with live IDs and IBC denoms.
