---
title: Local testnet
description: "Minimal single-node sandbox. For a full local devnet with wasm uploads, use Local devnet."
sidebar_position: 5
---

:::tip Recommended
For app development (CosmJS, CosmWasm, SafHandle), use **[Local devnet](./local-devnet)** with chain ID `safro-devnet-1`, the bootstrap script, and [local endpoints](/networks/local-devnet-endpoints).
:::

This page is the shortest path to confirm `safrochaind` works.

## Initialize

```bash
safrochaind init localnode --chain-id safro-devnet-1
```

## Create a key and fund it

```bash
safrochaind keys add validator --keyring-backend test
safrochaind add-genesis-account "$(safrochaind keys show validator -a --keyring-backend test)" 1000000000usaf
```

## Create genesis tx and start

```bash
safrochaind gentx validator 700000000usaf --chain-id safro-devnet-1 --keyring-backend test
safrochaind collect-gentxs
safrochaind start
```

RPC: `http://127.0.0.1:26657` · REST: `http://127.0.0.1:1317`
