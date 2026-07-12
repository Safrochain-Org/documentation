---
title: safrochaind CLI overview
description: "The safrochaind command-line interface: global flags, keyring backends, query/tx patterns, fees, gas, and broadcast modes."
sidebar_position: 1
keywords:
  - safrochaind
  - CLI
  - Cosmos SDK CLI
  - keyring
  - tx
  - query
  - gas
  - fees
  - broadcast mode
  - Safrochain commands
---

`safrochaind` is the single binary that powers a Safrochain node and acts as
its CLI client. It follows the standard Cosmos SDK 0.50 layout:

```text
safrochaind <command> [flags]
  status / version / config / init / start
  keys     <add|list|show|delete|export|import>
  query    <module>  ...           (read-only, no signing)
  tx       <module>  ...           (signs and broadcasts)
  comet    <show-node-id|show-validator|reset-state|...>
  module   <feepay|feeshare|drip|clock|cw-hooks|...> ...
```

## Install

```bash
git clone https://github.com/Safrochain-Org/safrochain-node
cd safrochain-node
make install
safrochaind version
```

For an exhaustive build/run guide, see
[Run a Node → Install](../run-a-node/install).

## Configure once, save typing forever

`safrochaind config` writes a per-user config file under
`~/.safrochain/config/client.toml`:

```bash
safrochaind config chain-id  safrochain-1
safrochaind config node      https://rpc.safrochain.network:443
safrochaind config keyring-backend file
safrochaind config broadcast-mode sync
safrochaind config output  json
```

After this, you can drop `--chain-id`, `--node`, `--keyring-backend`,
`--broadcast-mode`, and `--output` from every subsequent command.

## Global flags worth knowing

| Flag | Purpose |
| --- | --- |
| `--node URL` | RPC to use. Mainnet: `https://rpc.safrochain.network:443`. Testnet: `https://rpc.testnet.safrochain.com:443`. |
| `--chain-id ID` | `safrochain-1` or `safro-testnet-1`. |
| `--keyring-backend KIND` | `file` (recommended) / `os` / `test` (sandbox only). |
| `--from KEY` | which signer key to use. |
| `--gas auto --gas-adjustment 1.3` | safe default; override with a fixed number for known-cheap txs. |
| `--gas-prices 0.05usaf` | matches **0.05 usaf/gas** (the chain-wide min via globalfee) (`usaf`) and [`globalfee`](../modules/globalfee); use with `--gas auto`. |
| `--broadcast-mode sync` | wait for inclusion in mempool but not confirmation. |
| `--output json` | parse with `jq`/`yq`. |
| `--yes -y` | skip confirmation prompt. |

## Keyring backends

| Backend | Storage | When to use |
| --- | --- | --- |
| `file` | encrypted on disk (passphrase) | **default for production** |
| `os` | OS keychain (macOS Keychain, Linux secret-service) | dev workstations |
| `test` | plaintext in `~/.safrochain` | local sandbox **only** |
| `pass` | `pass`-based store | advanced |

Always pass `--keyring-backend file` (or set it via `safrochaind config`).
The default is `os`, which can silently fall back to plaintext in some
container images.

## Smoke commands (every new operator runs these)

```bash
safrochaind status \
  | jq '.sync_info | {latest_block_height, catching_up}'

safrochaind query bank total --denom usaf

safrochaind query staking validators --limit 100 \
  | jq '.validators[] | {moniker:.description.moniker, tokens:.tokens, jailed:.jailed}'

safrochaind query distribution params

safrochaind query gov params
```

## Where to go next

- [Keys](./keys): managing operator and consensus keys
- [Bank](./bank): sending and querying SAF
- [Staking](./staking): delegate, redelegate, unbond, validator ops
- [Governance](./governance): submit, vote, query proposals
- [Query](./query): every read-only namespace
- [Tx](./tx): every signing namespace plus broadcast workflows
