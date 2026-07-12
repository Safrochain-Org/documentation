---
title: Global fee
description: "Chain-wide minimum gas prices via the globalfee module: CLI queries and governance-only parameter updates."
---

The **globalfee** module exposes **minimum gas prices** enforced across the network (aligned with the Cosmos SDK fee market expectations used by validators). Governance updates module parameters; everyday users mainly **query** current minimums.

Mainnet genesis ships with a chain-wide minimum of **`0.05 usaf` per unit of gas** in the globalfee module.
At ~200 000 gas for a typical IBC transfer this comes to **≈ 0.01 SAF** per tx: a sensible spam floor
without making the chain expensive. Validators should set a matching `minimum-gas-prices` in `app.toml`
so node policy and network policy stay aligned (the `v0.2.2` `safrochaind` binary defaults `app.toml`
to `0.05usaf` for fresh `safrochaind init` homes).

**CLI root**: `safrochaind query globalfee` and `safrochaind tx globalfee`

## Query commands

| Command | Purpose |
| --- | --- |
| `minimum-gas-prices` | Display enforced minimum gas prices. |

## Transactions

`UpdateParams` is **authority gated** (governance). There is no general-purpose user subcommand for changing global fees.

## Examples

```bash
export RPC="tcp://127.0.0.1:26657"

# JSON (scripts, tooling)
safrochaind query globalfee minimum-gas-prices --node "$RPC" -o json

# Human-readable default output
safrochaind query globalfee minimum-gas-prices --node "$RPC"

# Same query against a remote RPC (example host)
safrochaind query globalfee minimum-gas-prices \
  --node "tcp://rpc.example.com:26657" -o json | jq .
```

**Source**: `safrochain-node/x/globalfee/`
