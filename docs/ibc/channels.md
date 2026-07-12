---
title: Channels
description: "Canonical IBC channel registry for Safrochain mainnet (safrochain-1): live Noble and Osmosis paths."
sidebar_position: 3
---

:::info Mainnet IBC is live
ICS-20 transfer channels to **Noble** and **Osmosis** are **OPEN** on `safrochain-1`.
All identifiers below were verified on-chain (2026-06-25). Independent relayers
can relay the same paths: see [Join as a relayer](#join-as-a-relayer).
:::

## Mainnet: `safrochain-1`

### Topology summary

| Counterparty | Safrochain client | Safrochain connection | Safrochain channel | Counterparty client | Counterparty connection | Counterparty channel | State |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Noble (`noble-1`) | `07-tendermint-0` | `connection-0` | `channel-0` | `07-tendermint-224` | `connection-210` | `channel-581` | OPEN |
| Osmosis (`osmosis-1`) | `07-tendermint-1` | `connection-1` | `channel-1` | `07-tendermint-3719` | `connection-11075` | `channel-110497` | OPEN |

Both channels use port **`transfer`**, ordering **`ORDER_UNORDERED`**, and version **`ics20-1`**.

ICS-20 transfer is enabled (`send_enabled=true`, `receive_enabled=true`). ICS-29
fee channels are not registered yet (`ibc-fee channels` returns an empty list).

### ICS-20 transfer channels

| Counterparty | Port | Channel (Safrochain) | Channel (counterparty) | Escrow (Safrochain) | Foundation relayer | Primary use |
| --- | --- | --- | --- | --- | --- | --- |
| Noble (`noble-1`) | `transfer` | `channel-0` | `channel-581` | `addr_safro1a53udazy8ayufvy0s434pfwjcedzqv34wqrjq7` | yes | USDC in/out, SAF → Noble |
| Osmosis (`osmosis-1`) | `transfer` | `channel-1` | `channel-110497` | `addr_safro1kq2rzz6fq2q7fsu75a9g7cpzjeanmk68sfygsy` | yes | OSMO in/out, SAF → Osmosis DEX |

### Public endpoints for relayers

Use stable RPC + gRPC on **both** sides of each path. Examples below are
community-operated; any equivalent endpoint works if it supports IBC queries.

| Chain | Chain ID | RPC | gRPC |
| --- | --- | --- | --- |
| Safrochain | `safrochain-1` | `https://rpc1.safrochain.network:443` | `https://grpc1.safrochain.network:443` |
| Noble | `noble-1` | `https://noble-rpc.polkachu.com:443` | `https://noble-grpc.polkachu.com:443` |
| Osmosis | `osmosis-1` | `https://rpc.osmosis.zone:443` | `https://grpc.osmosis.zone:443` |

Full Safrochain endpoint list: [Mainnet endpoints](../networks/mainnet-endpoints).

### Verify on-chain (Safrochain)

```bash
NODE="https://rpc1.safrochain.network:443"

# Clients tracking counterparties
safrochaind q ibc client states --node "$NODE" -o json \
  | jq '.client_states[] | select(.client_id | startswith("07-tendermint")) | {client_id, chain_id: .client_state.chain_id}'

# Connections
safrochaind q ibc connection end connection-0 --node "$NODE" -o json | jq '.connection.counterparty'
safrochaind q ibc connection end connection-1 --node "$NODE" -o json | jq '.connection.counterparty'

# Channels
safrochaind q ibc channel end transfer channel-0 --node "$NODE" -o json | jq '.channel'
safrochaind q ibc channel end transfer channel-1 --node "$NODE" -o json | jq '.channel'

# Escrow accounts (SAF locked when bridging out)
safrochaind q ibc-transfer escrow-address transfer channel-0 --node "$NODE"
safrochaind q ibc-transfer escrow-address transfer channel-1 --node "$NODE"

# Inbound IBC denoms registered on Safrochain
safrochaind q ibc-transfer denom-traces --node "$NODE" -o json | jq '.denom_traces'
```

### Relayed token registry

Each row lists the **full denom trace** (`path` + `base_denom`) used to compute
the `ibc/<hash>` voucher on the destination chain.

#### USDC (Noble → Safrochain)

| Field | Value |
| --- | --- |
| Symbol | `USDC` |
| Source chain | `noble-1` |
| Base denom | `uusdc` (6 decimals) |
| Safrochain channel | `channel-0` |
| Noble channel | `channel-581` |
| Trace on Safrochain | `transfer/channel-0/uusdc` |
| IBC denom on Safrochain | `ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5` |

```bash
safrochaind q ibc-transfer denom-trace 8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5 \
  --node https://rpc1.safrochain.network:443

echo -n "transfer/channel-0/uusdc" | shasum -a 256
# 8e27ba2d5493af5636760e354e46004562c46ab7ec0cc4c1ca14e9e20e2545b5
```

#### OSMO (Osmosis → Safrochain)

| Field | Value |
| --- | --- |
| Symbol | `OSMO` |
| Source chain | `osmosis-1` |
| Base denom | `uosmo` (6 decimals) |
| Safrochain channel | `channel-1` |
| Osmosis channel | `channel-110497` |
| Trace on Safrochain | `transfer/channel-1/uosmo` |
| IBC denom on Safrochain | `ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B` |

```bash
safrochaind q ibc-transfer denom-trace 0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B \
  --node https://rpc1.safrochain.network:443

echo -n "transfer/channel-1/uosmo" | shasum -a 256
# 0471f1c4e7afd3f07702bef6dc365268d64570f7c1fdc98ea6098dd6de59817b
```

#### SAF (Safrochain → Noble)

| Field | Value |
| --- | --- |
| Symbol | `SAF` |
| Source chain | `safrochain-1` |
| Base denom | `usaf` (6 decimals) |
| Safrochain channel | `channel-0` |
| Noble channel | `channel-581` |
| Trace on Noble | `transfer/channel-581/usaf` |
| IBC denom on Noble | `ibc/416D906365215CB6641B38CCDAA01385AA4B20E5E8EF2D65702A1B3F383FBBA2` |

```bash
nobled q ibc-transfer denom-trace 416D906365215CB6641B38CCDAA01385AA4B20E5E8EF2D65702A1B3F383FBBA2 \
  --node https://noble-rpc.polkachu.com:443

echo -n "transfer/channel-581/usaf" | shasum -a 256
# 416d906365215cb6641b38ccdaa01385aa4b20e5e8ef2d65702a1b3f383fbba2
```

Send from Safrochain:

```bash
safrochaind tx ibc-transfer transfer transfer channel-0 \
  <noble-bech32-recipient> 1000000usaf \
  --from <sender> --chain-id safrochain-1 \
  --node https://rpc1.safrochain.network:443 \
  --gas auto --gas-adjustment 1.3 --gas-prices 0.05usaf -y
```

#### SAF (Safrochain → Osmosis)

| Field | Value |
| --- | --- |
| Symbol | `SAF` |
| Source chain | `safrochain-1` |
| Base denom | `usaf` (6 decimals) |
| Safrochain channel | `channel-1` |
| Osmosis channel | `channel-110497` |
| Trace on Osmosis | `transfer/channel-110497/usaf` |
| IBC denom on Osmosis | `ibc/DBAA4846F611A7603EFCE6F9F46F4F561D48B1F492A576022F000614A17089CE` |

```bash
osmosisd q ibc-transfer denom-trace DBAA4846F611A7603EFCE6F9F46F4F561D48B1F492A576022F000614A17089CE \
  --node https://rpc.osmosis.zone:443

echo -n "transfer/channel-110497/usaf" | shasum -a 256
# dbaa4846f611a7603efce6f9f46f4f561d48b1f492a576022f000614a17089ce
```

Send from Safrochain:

```bash
safrochaind tx ibc-transfer transfer transfer channel-1 \
  <osmosis-bech32-recipient> 1000000usaf \
  --from <sender> --chain-id safrochain-1 \
  --node https://rpc1.safrochain.network:443 \
  --gas auto --gas-adjustment 1.3 --gas-prices 0.05usaf -y
```

#### USDC (Noble → Osmosis, transit: not a direct Safrochain hop)

The Foundation relayer also clears Noble↔Osmosis USDC for users who route
liquidity through Osmosis. This path does **not** use Safrochain channels.

| Field | Value |
| --- | --- |
| Symbol | `USDC` |
| Base denom | `uusdc` on `noble-1` |
| Noble channel | `channel-1` |
| Osmosis channel | `channel-750` |
| Trace on Osmosis | `transfer/channel-750/uusdc` |
| IBC denom on Osmosis | `ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4` |

### Foundation relayer

The Safrochain Foundation runs Hermes on `safro-relayer-1` for:

| Path | Status |
| --- | --- |
| `safrochain-1` ↔ `noble-1` (`channel-0` ↔ `channel-581`) | live |
| `safrochain-1` ↔ `osmosis-1` (`channel-1` ↔ `channel-110497`) | live |
| `noble-1` ↔ `osmosis-1` (USDC transit) | live |

Telemetry and wallet provisioning live in the private operator repo. Relay
keys are never committed to source control.

### Join as a relayer

Channels are already open: **do not** run `hermes create channel` unless you
are opening a **new** counterparty. To relay an existing path:

1. Install Hermes: see [Hermes setup](./hermes-setup).
2. Configure `safrochain-1` plus the counterparty (`noble-1` or `osmosis-1`).
3. Import a funded key on **each** chain (fee token: `usaf`, `uusdc`/`ustake` on Noble, `uosmo` on Osmosis).
4. Run `hermes config validate` and `hermes health-check`.
5. Start Hermes: it discovers open channels and clears packets automatically.

Minimal Hermes path filter (optional, in `config.toml`):

```toml
[[chains]]
id = 'safrochain-1'
# ... rpc_addr, grpc_addr, key_name, gas_price ...

[[chains]]
id = 'noble-1'
# ... rpc_addr, grpc_addr, key_name, gas_price ...

# After both chains are configured:
# hermes start --chains safrochain-1,noble-1
```

Coordinate in Discord `#ibc-relayers` before duplicating foundation paths so
we can share monitoring and upgrade windows.

### ICS-27 (interchain accounts)

| Controller chain | Host port | Status |
| --- | --- | --- |
| Cosmos Hub | `icahost` | enabled at genesis |
| Osmosis | `icahost` | enabled at genesis |
| Neutron | `icahost` | enabled at genesis |

### ICS-721 (NFT transfers)

ICS-721 will be enabled in a post-launch upgrade once a counterparty wires
in the matching `nft-transfer` module. Track progress in
[Governance](../protocol/governance).

## Testnet: `safro-testnet-1`

The testnet runs the same `ibc-go` module set as mainnet but does not
participate in cross-chain testnet relays today. To test IBC end-to-end,
connect two of your **own** local chains using [Hermes setup](./hermes-setup).

## Operator coordination

If you relay one of the paths above, coordinate via Discord `#ibc-relayers`.
We track:

- Which operator runs which channel pair (redundancy is healthy)
- ICS-29 fee escrow funding when fee channels are enabled
- Trusting period vs unbonding period drift (avoids `client expired`)
- Joint upgrade windows so a chain upgrade does not trip your relayer

## Updating this page

This file is canonical. When a channel opens or changes, submit a PR to
[`Docs/docs/ibc/channels.md`](https://github.com/Safrochain-Org/safrochain-node/blob/main/Docs/docs/ibc/channels.md)
along with the [chain registry](../networks/chain-registry) update.
