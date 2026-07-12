---
title: CosmJS for web and TypeScript
description: "Install CosmJS and connect to Safrochain testnet: prerequisites and links to query and signing guides."
sidebar_position: 1
keywords:
  - CosmJS
  - StargateClient
  - SigningStargateClient
  - safro-testnet-1
---

**CosmJS** is the standard TypeScript SDK for Cosmos chains. Use it for web dashboards, Node scripts, and React Native (see [React Native](../mobile/react-native)).

## Prerequisites

- Node.js 20+
- Funded testnet account: [faucet](https://faucet.safrochain.com/)

```bash
npm i @cosmjs/stargate @cosmjs/proto-signing @cosmjs/encoding
```

## Constants

```ts
export const RPC = 'https://rpc.testnet.safrochain.com:443';
export const REST = 'https://rest.testnet.safrochain.com';
export const CHAIN_ID = 'safro-testnet-1';
export const DENOM = 'usaf';
```

Wallet prefix: `addr_safro`.

## What to read next

| Task | Page |
| --- | --- |
| Read-only queries | [Query the chain](./query-chain) |
| Sign and broadcast | [Signing overview](../transactions/signing-overview) |
| Browser wallets | [Cosmos Kit](../wallets/cosmos-kit) |
| First tx walkthrough | [First transaction](../get-started/first-transaction) |

:::tip Production
Use Cosmos Kit or another wallet signer in browser apps. Mnemonics in `process.env` are for scripts and local dev only.
:::
