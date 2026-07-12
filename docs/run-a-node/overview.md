---
title: "Run a Safrochain node: overview"
description: Install safrochaind and run a local, testnet, or mainnet Safrochain full node, sentry, RPC, or archive node.
sidebar_position: 1
keywords:
  - run a Safrochain node
  - safrochaind
  - full node
  - RPC node
  - archive node
  - Cosmos node
  - CometBFT
  - testnet node
  - mainnet node
---

This section covers running a Safrochain full node with **`safrochaind`**.

## What you can do

- Run a **local single-node sandbox** for development.
- Join the **public testnet** (live) for end-to-end testing.
- Join the **mainnet** (Q3 2026) as a full or pruned node.
- Become a **validator** and help secure the network.

## Decision matrix

| Goal | Where to start |
| --- | --- |
| Try `safrochaind` in 5 minutes | [Local devnet](./local-devnet) |
| Connect a wallet / dApp to a live chain | [Join testnet](./join-testnet) |
| Run a public RPC | [Join mainnet](./join-mainnet) (use a TLS proxy in front) |
| Run a validator | [Become a validator](../validators/become-a-validator) |
| Operate an archive node | [Snapshots](./snapshots), set `pruning = "nothing"` |

## Read in order

1. [Install safrochaind](./install): build from source, verify checksum.
2. [Hardware requirements](./hardware): sizing per role (validator, sentry, RPC, archive).
3. [Local devnet](./local-devnet): single-node `safro-devnet-1` on localhost.
4. [Join testnet](./join-testnet): live `safro-testnet-1`.
5. [Join mainnet](./join-mainnet): `safrochain-1` (opens Q3 2026).
6. [Snapshots](./snapshots): fast catch-up via tarballs.
7. [Statesync](./statesync): cryptographic light-client sync.
8. [Upgrades](./upgrades): cosmovisor flow for chain upgrades.

If you want to run a validator on top of your node, head to
[Validators → Become a validator](../validators/become-a-validator).
