---
title: React Native integration
description: "Integrate Safrochain into React Native and Expo with CosmJS, secure storage, and testnet endpoints."
sidebar_position: 2
---

Use this guide for **React Native** and **Expo** apps. CosmJS APIs match [Web CosmJS](../web/cosmjs); this page covers mobile-specific setup.

## Prerequisites

- Node.js 20+, React Native 0.74+ or current Expo SDK
- Funded testnet account
- [Testnet endpoints](/networks/testnet-endpoints)

## Install

```bash
npm i @cosmjs/stargate @cosmjs/proto-signing @cosmjs/encoding expo-secure-store
```

## Constants

```ts
export const RPC = 'https://rpc.testnet.safrochain.com:443';
export const REST = 'https://rest.testnet.safrochain.com';
export const CHAIN_ID = 'safro-testnet-1';
export const DENOM = 'usaf';
```

## Secure storage

```ts
import * as SecureStore from 'expo-secure-store';

export async function saveMnemonic(mnemonic: string): Promise<void> {
  await SecureStore.setItemAsync('safro_mnemonic', mnemonic);
}
```

## Connect and sign

See the **React Native** tab on [First transaction](../get-started/first-transaction) and [Signing overview](../transactions/signing-overview).

Metro must bundle `@cosmjs/crypto` (Expo SDK 50+ typically works). HD path: `m/44'/118'/0'/0/0`, prefix `addr_safro`.

## UX patterns

- Show chain ID and endpoint health before sends
- Use [SafHandle](../safhandle) for `@handle` payees
- Link to [Keys and UX](./keys-and-ux) for confirm-before-sign flows

## Next steps

- [Flutter](./flutter)
- [Cosmos Kit](../wallets/cosmos-kit) with WalletConnect for mobile browsers
- [Payments flow](../integrations/payments-flow)
