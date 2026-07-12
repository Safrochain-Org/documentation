---
title: Deploy and manage contracts
description: "Store, instantiate, and administer CosmWasm contracts on Safrochain testnet and mainnet."
sidebar_position: 3
---

Deployment uses `safrochaind tx wasm`. Full flag lists live in [wasm module](/modules/wasm).

## Store code

```bash
safrochaind tx wasm store ./artifacts/my_contract.wasm \
  --from deployer \
  --chain-id safro-testnet-1 \
  --node https://rpc.testnet.safrochain.com:443 \
  --gas auto --gas-adjustment 1.3 \
  --gas-prices 0.05usaf \
  -y
```

Note upload fees (chain params). Query with `safrochaind query wasm params`.

## Instantiate

```bash
CODE_ID=1
INIT='{"count":0}'

safrochaind tx wasm instantiate "$CODE_ID" "$INIT" \
  --label "my-contract-v1" \
  --admin addr_safro1admin... \
  --from deployer \
  --chain-id safro-testnet-1 \
  --node https://rpc.testnet.safrochain.com:443 \
  --gas auto --gas-adjustment 1.3 --gas-prices 0.05usaf \
  -y
```

Use `instantiate2` for predictable contract addresses (salt + code id).

## Admin operations

| Command | Purpose |
| --- | --- |
| `set-contract-admin` | Transfer admin |
| `clear-contract-admin` | Make immutable |
| `migrate` | Upgrade contract logic |

## Chain IDs

| Network | Chain ID |
| --- | --- |
| Testnet | `safro-testnet-1` |
| Mainnet | `safrochain-1` |

## Next

- [Interact from apps](./interact-from-apps)
- [Local dev and testing](./local-dev-and-testing)
