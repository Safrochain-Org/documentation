---
title: RPC, REST, and broadcast
description: "Low-level HTTP primitives for Safrochain testnet: RPC status, REST queries, and CLI broadcast."
sidebar_position: 2
---

Canonical URLs: [testnet endpoints](/networks/testnet-endpoints), [mainnet endpoints](/networks/mainnet-endpoints).

## Network constants (testnet)

| Field | Value |
| --- | --- |
| Chain ID | `safro-testnet-1` |
| Base denom | `usaf` |
| Bech32 prefix | `addr_safro` |

## Query via RPC

```bash
RPC="https://rpc.testnet.safrochain.com"

curl -s "$RPC/status" | jq '.result.sync_info | {latest_block_height, catching_up}'
curl -s "$RPC/block?height=1" | jq '.result.block.header | {chain_id, height, time}'
```

## Query via REST

```bash
REST="https://rest.testnet.safrochain.com"

curl -s "$REST/cosmos/staking/v1beta1/validators" | jq '.validators | length'
curl -s "$REST/cosmos/bank/v1beta1/supply" | jq '.supply[0:3]'
```

Pagination:

```bash
curl -s "$REST/cosmos/staking/v1beta1/validators?pagination.limit=50" \
  | jq '{count: (.validators|length), next_key: .pagination.next_key}'
```

## Broadcast (CLI dev path)

```bash
safrochaind keys add dev --keyring-backend file
ADDR=$(safrochaind keys show dev -a --keyring-backend file)

safrochaind tx bank send dev "$ADDR" 1usaf \
  --chain-id safro-testnet-1 \
  --node https://rpc.testnet.safrochain.com:443 \
  --gas auto --gas-adjustment 1.3 \
  --gas-prices 0.05usaf \
  --keyring-backend file \
  --yes
```

Fund via [faucet](https://faucet.safrochain.com/).

## Next

- [Events and WebSockets](./events-and-websockets)
- [First transaction](../get-started/first-transaction)
