---
title: Choose your stack
description: "Compare Flutter, React Native, CosmJS, Cosmos Kit, and SafHandle for Safrochain app development."
sidebar_position: 1
---

Pick the stack that matches your users and team skills. Most production apps combine **mobile UI** + **SafHandle** + **wallet signing**.

## Stack comparison

| Stack | Best for | Signing | SafHandle |
| --- | --- | --- | --- |
| **Flutter** | iOS + Android from one codebase | CosmJS (embedded JS) or Cosmos Kit WC | `@safrochaindev/safhandle` |
| **React Native** | JS team, Expo | CosmJS + SecureStore | Same as web SDK |
| **Web (CosmJS)** | Dashboards, backends, scripts | Mnemonic (dev) or wallet signer | `@safrochaindev/safhandle` |
| **Cosmos Kit** | Browser dApps with wallet modal | Keplr / Leap / Cosmostation | Pair with SafHandle resolve |
| **CosmWasm (Rust)** | On-chain contracts only | N/A (deploy via CLI) | SafHandle contract on chain |

## Decision guide

```mermaid
flowchart TD
  start["What are you building?"]
  mobile["Mobile wallet / remittance app"]
  webdapp["Browser dApp"]
  contract["On-chain contract"]
  start --> mobile
  start --> webdapp
  start --> contract
  mobile --> rn["React Native or Flutter"]
  webdapp --> kit["Cosmos Kit + CosmJS"]
  contract --> rust["Rust CosmWasm"]
  rn --> sh["SafHandle for payees"]
  kit --> sh

  classDef question fill:#1e3a8a,stroke:#60a5fa,color:#f5f5f5,stroke-width:2px
  classDef mobile fill:#0f2847,stroke:#34d399,color:#f5f5f5,stroke-width:1.5px
  classDef web fill:#132a4a,stroke:#4a7fdb,color:#f5f5f5,stroke-width:1.5px
  classDef contract fill:#1a2f4f,stroke:#fbbf24,color:#f5f5f5,stroke-width:1.5px
  classDef safhandle fill:#162847,stroke:#93c5fd,color:#ffffff,stroke-width:2px

  class start question
  class mobile,rn mobile
  class webdapp,kit web
  class contract,rust contract
  class sh safhandle
```

## Recommended combinations

| App type | Stack |
| --- | --- |
| Consumer mobile wallet | Flutter or RN + CosmJS or Cosmos Kit + [SafHandle](../safhandle) |
| Web checkout | Cosmos Kit + CosmJS + SafHandle |
| Backend service | CosmJS + REST (no wallet UI) |
| Custom on-chain logic | [Build in Rust](./../smart-contracts/build-in-rust) + [interact from apps](./../smart-contracts/interact-from-apps) |

## Not for app developers

| Technology | Use case | Docs |
| --- | --- | --- |
| **Go** | Cosmos SDK chain modules (`safrochaind`) | [Infra: modules](/modules/overview) |
| **CLI only** | Debugging, genesis, node ops | [CLI overview](/cli/overview) |

## Next steps

- [Testnet setup](./testnet-setup): faucet, endpoints, funded wallet
- [First transaction](./first-transaction): send 1 `usaf` on testnet
