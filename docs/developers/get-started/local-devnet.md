---
title: Connect to local devnet
description: "Point CosmJS, Cosmos Kit, and SafHandle at safro-devnet-1 on localhost."
sidebar_position: 4
---

Run a chain on your laptop before touching public testnet. Full node setup: [Run a local devnet](/run-a-node/local-devnet).

## Start the node

```bash
./safrodevnet/scripts/bootstrap.sh
```

Endpoints: [Local devnet endpoints](/networks/local-devnet-endpoints).

## Constants

```ts
export const RPC = 'http://127.0.0.1:26657';
export const REST = 'http://127.0.0.1:1317';
export const CHAIN_ID = 'safro-devnet-1';
export const DENOM = 'usaf';
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Query and send

<Tabs groupId="platform" defaultValue="web">
  <TabItem value="web" label="Web (CosmJS)">

```ts
import { StargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';

const client = await StargateClient.connect(RPC);
console.log(await client.getChainId()); // safro-devnet-1

// Dev key from bootstrap (test keyring) — local only
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(process.env.DEV_MNEMONIC!, {
  prefix: 'addr_safro',
});
const signing = await SigningStargateClient.connectWithSigner(RPC, wallet, {
  gasPrice: { denom: 'usaf', amount: '0.05' },
});
```

  </TabItem>
  <TabItem value="react-native" label="React Native">

Point `RPC` at your machine LAN IP if testing on a physical device, e.g. `http://192.168.1.10:26657`. Emulator can use `http://10.0.2.2:26657` (Android) or host IP (iOS).

  </TabItem>
  <TabItem value="flutter" label="Flutter (CosmJS)">

Same `RPC` / `CHAIN_ID` in your bundled CosmJS module. Ensure the device can reach your host port `26657`.

  </TabItem>
</Tabs>

## SafHandle on devnet

1. Deploy [safhandle-contract](https://github.com/Safrochain-Org/safhandle-contract) to your local node
2. Pass the contract address to the client:

```ts
const safHandle = new SafHandle({
  rpcUrl: RPC,
  contractAddress: 'addr_safro1...', // your local instantiate address
});
```

Then follow [Resolve](/developers/safhandle/resolve) and [Register](/developers/safhandle/register).

## vs public testnet

| | Local devnet | `safro-testnet-1` |
| --- | --- | --- |
| Faucet | Genesis-funded `dev` key | [faucet.safrochain.com](https://faucet.safrochain.com/) |
| IBC | Not available | Noble, Osmosis |
| Explorer | Query via REST only | [explorer.safrochain.com](https://explorer.safrochain.com/) |

## Next

- [First transaction](./first-transaction) (switch constants to devnet)
- [Local contract testing](/developers/smart-contracts/local-dev-and-testing)
