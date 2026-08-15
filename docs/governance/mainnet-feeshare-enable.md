---
title: Enable FeeShare on mainnet
description: Governance proposal to set x/feeshare enable_fee_share=true on safrochain-1 (no software upgrade).
sidebar_position: 2
---

# Enable FeeShare on `safrochain-1`

This page is the **canonical proposal brief**. Point the on-chain `metadata` field at this URL:

[`https://docs.safrochain.com/governance/mainnet-feeshare-enable`](https://docs.safrochain.com/governance/mainnet-feeshare-enable)

Gov `v1` does **not** store the markdown file on-chain. `title` and `summary` are on-chain; this page is the attached details.

| | |
| --- | --- |
| Type | Param change (`MsgUpdateParams`) |
| Module | `x/feeshare` |
| Chain | `safrochain-1` |
| Binary | `safrochaind v0.2.2` (no upgrade / halt) |
| Working copy | `nodestest/governance/mainnet-feeshare-enable/` |

## Current state (verified 2026-08-15)

| Param | Live value |
| --- | --- |
| `enable_fee_share` | `false` |
| `developer_shares` | `0.250000000000000000` (25%) |
| `allowed_denoms` | `[]` (all denoms allowed) |
| Registered contracts | 0 |
| `MsgRegisterFeeShare` txs | 0 |

The module is compiled into `v0.2.2` and wired in the ante handler, but payouts and register/update/cancel txs all no-op or reject while the flag is off.

## Proposed params

| Param | After passage |
| --- | --- |
| `enable_fee_share` | **`true`** |
| `developer_shares` | `0.250000000000000000` (unchanged) |
| `allowed_denoms` | `[]` (unchanged) |

This proposal **only flips the enable flag**. Share rate and denom allowlist stay at genesis.

## What it does

After execution:

1. Contract **admin** (or **creator** if there is no admin) can `safrochaind tx feeshare register <contract> <deployer> <withdrawer>`.
2. On each successful `MsgExecuteContract` targeting a registered contract, the ante decorator moves **25%** of the tx fee from `fee_collector` to the registered withdrawer.
3. Remaining **75%** stays in `fee_collector` for the usual validator / community distribution.
4. Unregistered contracts: **no change** — 100% of fees stay with the fee collector.
5. Non-Wasm txs: **no change**.

## What it does not do

- No software upgrade / halt.
- Does not auto-register any contract.
- Does not change `globalfee`, mint, or distribution params.
- Does not raise developer share to the spec default of 50%. That can be a later param proposal if validators want it.

## Authority

Gov module account (queried on-chain):

`addr_safro10d07y265gmmuvt4z0w9aw880jnsr700jzwjjar`

## Governance calendar (standard, not expedited)

| Step | Param |
| --- | --- |
| Min deposit | `5000000000usaf` (5,000 SAF) — included so voting starts immediately |
| Deposit period | 2 days (only if deposit is incomplete) |
| Voting period | **7 days** |
| Quorum | 33.4% |
| Pass threshold | 50% Yes |
| Veto | 33.4% NoWithVeto burns deposit |

## After passage — verify

```bash
NODE=https://rpc1.safrochain.network:443

safrochaind q feeshare params --node "$NODE" -o json
# enable_fee_share should be true

safrochaind tx feeshare register <CONTRACT> <DEPLOYER> <WITHDRAWER> \
  --from <DEPLOYER_KEY> --chain-id safrochain-1 --node "$NODE" \
  --gas auto --gas-adjustment 1.3 --gas-prices 0.05usaf -y

safrochaind q feeshare contracts --node "$NODE" -o json
```

A later `MsgExecuteContract` against that contract should emit `payout_fee_share` and credit the withdrawer with 25% of the gas fee.

## References

- [FeeShare module CLI](../modules/feeshare)
- Source: `safrochain-node/x/feeshare/`
- Ante payout: `safrochain-node/x/feeshare/ante/ante.go`
