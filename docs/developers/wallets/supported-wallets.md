---
title: Supported wallets
description: "Wallets that work with Safrochain: Keplr, Leap, Cosmostation, Ledger, and Cosmos Kit providers."
sidebar_position: 1
---

Safrochain is **Cosmos-native** (not EVM). Wallets must support `addr_safro` bech32 and `coin_type` 118.

## Verified today

| Wallet | Platforms | Safrochain | Notes |
| --- | --- | --- | --- |
| Keplr | Extension, mobile | Manual suggest + Cosmos Kit | See [testnet chain JSON](/networks/testnet-endpoints#wallet-connection-keplr--leap) |
| Leap | Extension, mobile | Manual suggest + Cosmos Kit | Same HD path as Keplr |
| Cosmostation | Extension, mobile | Cosmos Kit + manual | Homepage arch diagram |
| Ledger | Hardware (Cosmos app) | `coin_type` 118 | Validator keys: [key management](/validators/key-management) |
| MetaMask / EVM | N/A | Not supported | No EVM JSON-RPC on Safrochain |

## Via Cosmos Kit

When your chain is registered in `ChainProvider`, many interchain wallets work without per-wallet code:

| Tier | Examples |
| --- | --- |
| Extension | Keplr, Leap, Cosmostation, Compass, Station, Omni, Fin |
| Mobile (WalletConnect v2) | Keplr Mobile, Leap Mobile, Cosmostation Mobile |

```mermaid
flowchart LR
  User[User] --> Wallet[Wallet extension]
  Wallet --> dApp[dApp with Cosmos Kit]
  dApp --> RPC[Safrochain RPC / REST]
```

## Resources

- [Cosmos Kit wallet list](https://docs.hyperweb.io/cosmos-kit)
- [chain-registry on npm](https://www.npmjs.com/package/chain-registry)
- [Chain registry](/networks/chain-registry) (SLIP-44, denom metadata)

:::info Interchain Kit
Cosmos Kit 3.x points new projects to [Interchain Kit](https://github.com/hyperweb-io/interchain-kit). This portal documents **Cosmos Kit 2.x** as the stable path today.
:::

## Next steps

- [Cosmos Kit integration](./cosmos-kit)
- [Connect browser wallets](./connect-browser-wallets) (without a framework)
- [Transactions](../transactions/signing-overview)
