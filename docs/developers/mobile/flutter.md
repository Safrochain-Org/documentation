---
title: Flutter integration
description: "Integrate Safrochain into Flutter apps with CosmJS and Cosmos Kit (WalletConnect): no separate Dart chain SDK."
sidebar_position: 1
keywords:
  - Flutter
  - CosmJS
  - Cosmos Kit
  - Safrochain mobile
  - wallet app
---

Use this guide when building **iOS and Android** apps with Flutter. Chain signing uses the same **CosmJS** and **Cosmos Kit** stacks as web and React Native. There is no `safrochain_flutter` package.

## What you will build

- Query balances with CosmJS `StargateClient`
- Sign and broadcast with CosmJS, or connect an external wallet via **Cosmos Kit + WalletConnect**
- Optional: Flutter UI around a shared TypeScript CosmJS module

## Prerequisites

- Flutter 3.16+
- Node.js 20+ (to bundle CosmJS for embedded JS, if you use that path)
- Funded testnet account: [faucet](https://faucet.safrochain.com/)
- [Testnet endpoints](/networks/testnet-endpoints)

## Recommended approach

| Path | When | Docs |
| --- | --- | --- |
| **CosmJS** | Self-custody wallet, scripts in TS | [CosmJS overview](../web/cosmjs) |
| **Cosmos Kit + WalletConnect** | User signs in Keplr / Leap Mobile | [Cosmos Kit](../wallets/cosmos-kit) |
| **React Native** | Team wants native CosmJS without a JS bridge | [React Native](./react-native) |

:::tip Flutter + CosmJS
Bundle CosmJS in a small JavaScript runtime (`flutter_js`, `webview_flutter` + prebuilt JS, or a shared TS package). Your Dart layer calls into that module for `SigningStargateClient` APIs. The TypeScript is identical to [React Native](./react-native).
:::

## Query balance (CosmJS)

```ts
import { StargateClient } from '@cosmjs/stargate';

const RPC = 'https://rpc.testnet.safrochain.com:443';
const DENOM = 'usaf';
const address = 'addr_safro1...';

const client = await StargateClient.connect(RPC);
const balance = await client.getBalance(address, DENOM);
console.log(balance);
```

## Sign and broadcast (CosmJS)

```ts
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient, assertIsDeliverTxSuccess } from '@cosmjs/stargate';

const RPC = 'https://rpc.testnet.safrochain.com:443';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'addr_safro' });
const [{ address }] = await wallet.getAccounts();

const client = await SigningStargateClient.connectWithSigner(RPC, wallet, {
  gasPrice: { denom: 'usaf', amount: '0.05' },
});

const res = await client.sendTokens(address, address, [{ denom: 'usaf', amount: '1' }], 'auto', 'flutter send');
assertIsDeliverTxSuccess(res);
```

Store mnemonics in **Keychain / Keystore** (via `flutter_secure_storage`), never in plain files. See [Keys and UX](./keys-and-ux).

## External wallet (Cosmos Kit)

For production apps where users keep keys in **Keplr Mobile** or **Leap Mobile**, use **WalletConnect v2** through Cosmos Kit (same config as web; see [Cosmos Kit](../wallets/cosmos-kit) React Native / mobile section). Your Flutter app opens the wallet app for approve/sign, then receives the signed tx or offline signer session.

## Next steps

- [First transaction](../get-started/first-transaction) (Flutter tab)
- [React Native](./react-native)
- [SafHandle](../safhandle)
- [IBC transfers](../integrations/ibc-transfers)
