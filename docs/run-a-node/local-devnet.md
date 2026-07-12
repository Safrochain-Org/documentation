---
title: Local devnet
description: "Run safro-devnet-1 on localhost for wallet, CosmWasm, and SafHandle development without public testnet."
sidebar_position: 4
---

Run a **single-validator devnet** on your machine. Chain ID **`safro-devnet-1`** is separate from public testnet so wallets and scripts do not accidentally hit live endpoints.

## When to use

| Use local devnet | Use public testnet |
| --- | --- |
| Offline development | Shared faucet and explorers |
| Unlimited test `usaf` | Realistic latency and peers |
| Wasm upload experiments | IBC to Noble / Osmosis |
| SafHandle contract iteration | Production-like conditions |

Prerequisites: [Install safrochaind](./install) (testnet toolchain is fine for local dev).

## Quick start (repo script)

From the monorepo root:

```bash
chmod +x safrodevnet/scripts/bootstrap.sh
./safrodevnet/scripts/bootstrap.sh
```

First run creates genesis, funds a `dev` key, enables **wasm uploads for everybody**, and starts the node.

To wipe state and re-init:

```bash
RESET=1 ./safrodevnet/scripts/bootstrap.sh
```

Default endpoints: [Local devnet endpoints](/networks/local-devnet-endpoints).

## Manual setup

```bash
export CHAIN_ID=safro-devnet-1
export HOME_DIR="$PWD/safrodevnet"   # or any writable path
export KEYRING=test

safrochaind init devnet-node --chain-id "$CHAIN_ID" --home "$HOME_DIR"

safrochaind keys add validator --home "$HOME_DIR" --keyring-backend "$KEYRING"
safrochaind keys add dev --home "$HOME_DIR" --keyring-backend "$KEYRING"

VAL=$(safrochaind keys show validator -a --home "$HOME_DIR" --keyring-backend "$KEYRING")
DEV=$(safrochaind keys show dev -a --home "$HOME_DIR" --keyring-backend "$KEYRING")

safrochaind genesis add-genesis-account "$VAL" 100000000000000usaf \
  --home "$HOME_DIR" --keyring-backend "$KEYRING"
safrochaind genesis add-genesis-account "$DEV" 100000000000000usaf \
  --home "$HOME_DIR" --keyring-backend "$KEYRING"

# Allow wasm store on local devnet (default genesis is Nobody)
jq '.app_state.wasm.params.code_upload_access.permission = "Everybody"' \
  "$HOME_DIR/config/genesis.json" > /tmp/genesis.json && mv /tmp/genesis.json "$HOME_DIR/config/genesis.json"

safrochaind genesis gentx validator 70000000000000usaf \
  --chain-id "$CHAIN_ID" --home "$HOME_DIR" --keyring-backend "$KEYRING"
safrochaind genesis collect-gentxs --home "$HOME_DIR"
safrochaind genesis validate-genesis --home "$HOME_DIR"

safrochaind start --home "$HOME_DIR"
```

Save the `dev` address printed by `keys show dev`. It is pre-funded in genesis.

## Verify

```bash
curl -s http://127.0.0.1:26657/status | jq '.result.node_info.network'
# "safro-devnet-1"

safrochaind query bank balances "$DEV" \
  --node tcp://127.0.0.1:26657 \
  --chain-id safro-devnet-1
```

## Send a test tx

```bash
safrochaind tx bank send dev "$DEV" 1usaf \
  --chain-id safro-devnet-1 \
  --node tcp://127.0.0.1:26657 \
  --gas auto --gas-adjustment 1.3 \
  --gas-prices 0.05usaf \
  --home "$HOME_DIR" \
  --keyring-backend test \
  -y
```

## App developers

Point CosmJS or Cosmos Kit at localhost:

| Setting | Value |
| --- | --- |
| RPC | `http://127.0.0.1:26657` |
| REST | `http://127.0.0.1:1317` |
| Chain ID | `safro-devnet-1` |

Guide: [Developers: local devnet](/developers/get-started/local-devnet).

## Deploy SafHandle locally

1. Start devnet (above)
2. Store and instantiate [safhandle-contract](https://github.com/Safrochain-Org/safhandle-contract) wasm
3. Point `SafHandle({ contractAddress: '...' })` at your local contract

See [Smart contracts: local dev](/developers/smart-contracts/local-dev-and-testing).

## Related

- [Local devnet endpoints](/networks/local-devnet-endpoints)
- [Local testnet](./local-testnet) (minimal legacy quickstart)
- [Join testnet](./join-testnet) (public `safro-testnet-1`)
