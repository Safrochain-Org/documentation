---
title: Testnet software upgrade to v0.2.2
description: Governance proposal to align safro-testnet-1 with mainnet safrochaind v0.2.2 (plan name v29).
sidebar_position: 1
---

# Testnet software upgrade — align with mainnet `v0.2.2`

This page is the **canonical operator brief** for bringing `safro-testnet-1` onto the same application binary as `safrochain-1`.

| | Today (testnet) | Target (mainnet) |
| --- | --- | --- |
| Chain ID | `safro-testnet-1` | `safrochain-1` |
| App version | `v0.1.0` | **`v0.2.2`** |
| Cosmos SDK | v0.50.13 | v0.50.14 |
| Go (release build) | 1.23.9 | 1.25.8 |

Mainnet launched already on `v0.2.2`, so it never executed an on-chain upgrade plan for this tag. Testnet must schedule a coordinated halt and binary swap.

## Plan name vs release tag

| Field | Value | Why |
| --- | --- | --- |
| **Release / binary** | `v0.2.2` | Same git tag / binary as mainnet |
| **On-chain plan name** | **`v29`** | Must match a handler registered in that binary (`app/upgrades/v29`) |
| **Cosmovisor path** | `cosmovisor/upgrades/v29/bin/safrochaind` | Cosmovisor keys off the **plan name**, not the semver tag |

:::warning Do not name the plan `v0.2.2`
The `v0.2.2` binary only registers upgrade handlers `v28` and `v29`. A plan named `v0.2.2` will panic at the upgrade height.
:::

## What the `v29` handler does

At the upgrade height the new binary:

1. Runs module migrations (`RunMigrations`) to reconcile the module version map with `v0.2.2`.
2. Sets `x/gov` **`expedited_min_deposit`** to **`10000000000usaf` (10,000 SAF)** — aligning the expedited floor with the mainnet-oriented constant in the handler.

Current testnet floors (for comparison):

| Param | Before upgrade | After `v29` |
| --- | --- | --- |
| `min_deposit` | 10 SAF | unchanged by this handler |
| `expedited_min_deposit` | 50 SAF | **10,000 SAF** |
| Voting period | 7 days | unchanged |
| Expedited voting | 24 hours | unchanged |

:::note Optional prior step (`v28`)
The same binary also registers `v28` (MEV residual sweep + delete legacy stores `08-wasm` / `builder`). Testnet genesis never included those stores; a single `v29` plan is sufficient to reach mainnet software. Operators who want the full handler sequence can schedule `v28` then `v29` as two proposals.
:::

## Recommended schedule (expedited)

| Step | Timing |
| --- | --- |
| Submit proposal | Day 0 — **expedited**, deposit **50 SAF** (`50000000usaf`) |
| Voting | 24 hours |
| Binary staging window | After passage, before halt — validators place `v0.2.2` under `upgrades/v29/` |
| Upgrade height | **≥ voting end + ~12–24 h**; round to a clean thousands |

**Suggested height (recompute before submit):** with ~3 s blocks, **~48 h from now** ≈ current height + ~58k → round to **`13883000`** (verify live height and block time immediately before broadcasting).

```bash
# Live height + suggested +48h target
H=$(curl -s https://rpc.testnet.safrochain.com/status | jq -r .result.sync_info.latest_block_height)
echo "now=$H  suggest_48h=$(( H + 58000 ))  round=$(( ((H + 58000 + 999) / 1000) * 1000 ))"
```

## Validator checklist

1. Build or obtain **`safrochaind` `v0.2.2`** (tag [`v0.2.2`](https://github.com/Safrochain-Org/safrochain-node/releases/tag/v0.2.2)):

   ```bash
   git clone https://github.com/Safrochain-Org/safrochain-node.git
   cd safrochain-node && git checkout v0.2.2
   make install
   safrochaind version --long   # expect version: v0.2.2
   ```

2. Stage for cosmovisor (**directory name = plan name `v29`**):

   ```bash
   mkdir -p "$HOME/.safrochain/cosmovisor/upgrades/v29/bin"
   cp "$(command -v safrochaind)" "$HOME/.safrochain/cosmovisor/upgrades/v29/bin/"
   "$HOME/.safrochain/cosmovisor/upgrades/v29/bin/safrochaind" version
   ```

3. Confirm cosmovisor is supervising the process (`DAEMON_NAME=safrochaind`, `DAEMON_HOME=…/.safrochain`).

4. Vote **Yes** on the proposal; watch logs near the upgrade height.

5. After restart, confirm:

   ```bash
   curl -s https://rpc.testnet.safrochain.com/abci_info | jq .result.response.version
   # expect: "v0.2.2"
   ```

See also: [Upgrades (cosmovisor)](../run-a-node/upgrades).

## Proposal text (title / summary)

**Title:** `Software Upgrade: Align Testnet with Mainnet v0.2.2 (plan v29)`

**Summary:**

> Schedule a coordinated software upgrade of `safro-testnet-1` to application binary **safrochaind v0.2.2** (identical to mainnet `safrochain-1`). On-chain plan name is **`v29`** to match the upgrade handler registered in that binary. Cosmovisor operators must place the new binary at `cosmovisor/upgrades/v29/bin/safrochaind`. At halt height the handler runs module migrations and sets `expedited_min_deposit` to `10000000000usaf` (10,000 SAF). Build from https://github.com/Safrochain-Org/safrochain-node/releases/tag/v0.2.2 .

## Submit (gov v1 JSON)

Machine-readable files live in the node ops tree:

- `nodestest/governance/testnet-v0.2.2/proposal.json`
- `nodestest/governance/testnet-v0.2.2/proposal-details.md`
- `nodestest/governance/testnet-v0.2.2/submit.sh`

```bash
cd nodestest/governance/testnet-v0.2.2
# Edit UPGRADE_HEIGHT in proposal.json, then:
./submit.sh --from <key> --dry-run    # simulate first
./submit.sh --from <key>              # broadcast
```

Authority for `MsgSoftwareUpgrade` is the gov module account  
`addr_safro10d07y265gmmuvt4z0w9aw880jnsr700jzwjjar`.
