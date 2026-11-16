---
title: Mainnet software upgrade to v0.3.0
description: Coordinated upgrade of safrochain-1 from v0.2.2 to v0.3.0 at block 4,557,100. What changes, the timeline, how to vote, build or download, stage and verify v0.3.0.
keywords: [safrochain, mainnet, upgrade, v0.3.0, validators, cosmovisor, governance]
---

# Mainnet software upgrade: `v0.3.0`

:::danger Mandatory for every `safrochain-1` node
Validators and full-node operators must switch to **v0.3.0** at block **4,557,100**
(about **Wednesday 18 November 2026, 14:00 UTC**). A node that keeps running v0.2.2 stops at
that height. Install the new binary now, it only takes effect at the upgrade height.
:::

## At a glance

| | |
| --- | --- |
| Network | `safrochain-1` (mainnet) |
| Current version | `v0.2.2` |
| New version | **`v0.3.0`** |
| Upgrade plan name | `v0.3.0` (cosmovisor directory `upgrades/v0.3.0`) |
| Upgrade height | **4,557,100**, about Wed 18 Nov 2026, 14:00 UTC (the exact time depends on block times) |
| Governance | expedited proposal: 24 h vote, 66.7% Yes needed |
| Type | security and stability release, **state-machine breaking** |
| Release | [github.com/Safrochain-Org/safrochain-node/releases/tag/v0.3.0](https://github.com/Safrochain-Org/safrochain-node/releases/tag/v0.3.0) |

**Who has to do what**

| You are | Action |
| --- | --- |
| Validator | [vote](#1-vote), [install v0.3.0](#2-get-v030), [stage it](#3-stage-the-binary), be online at the height |
| Full node, RPC provider, explorer, relayer operator | [install](#2-get-v030) and [stage](#3-stage-the-binary) v0.3.0 |
| Exchange or integrator | plan for a short halt, see [Integrators](#integrators) |
| SAF holder or delegator | nothing: funds and stake are not affected |

## What is upgraded

| Component | v0.2.2 (today) | v0.3.0 |
| --- | --- | --- |
| Safrochain application | v0.2.2 | **v0.3.0** |
| Cosmos SDK | v0.50.14 | v0.50.15 |
| CometBFT | v0.38.21 | v0.38.26 |
| CosmWasm wasmd / wasmvm | v0.54.1 / v2.2.4 | v0.54.11 / v2.2.10 |
| ibc-go | v8.7.0 | v8.8.0 |
| Go toolchain | 1.25.8 | 1.26.11 |

What the upgrade changes on chain:

- The consensus **block gas limit** (`max_gas`) is set to **100,000,000**. It is unlimited
  today. No other mainnet parameter changes and no store is added or removed.
- Several Safrochain modules are hardened. As is standard for security releases, the detailed
  release notes and the security advisories are published once the upgrade is live.

What changes for operators:

- `MAX_WASM_SIZE` is no longer read from the environment. Remove it from your service files.
- The release binaries are statically linked (no `libwasmvm` shared library needed).

## Timeline

| Step | When (UTC) |
| --- | --- |
| Expedited proposal submitted | Monday 16 November 2026 |
| Voting ends | 24 hours after submission |
| Upgrade height **4,557,100** | about Wednesday 18 November 2026, 14:00 |

Blocks take about 2.8 s. Estimate the remaining time at any moment:

```bash
H=4557100
NOW=$(curl -s https://rpc.safrochain.network/status | jq -r .result.sync_info.latest_block_height)
echo "blocks left: $((H - NOW)), about $(( (H - NOW) * 28 / 10 / 3600 )) h"
```

## 1. Vote

The proposal is titled **Software Upgrade v0.3.0** and links to this page. Find its ID in the
announcement, on the [explorer](https://explorer.safrochain.com/) (Governance), or with the CLI:

```bash
safrochaind q gov proposals --proposal-status voting-period \
  --node https://rpc.safrochain.network:443 --output json | jq '.proposals[] | {id, title}'
```

Vote with your validator operator key:

```bash
safrochaind tx gov vote PROPOSAL_ID yes \
  --from <your-key> --chain-id safrochain-1 \
  --node https://rpc.safrochain.network:443 \
  --gas auto --gas-adjustment 1.4 --gas-prices 0.05usaf
```

:::warning Vote within the first 24 hours
An expedited proposal needs **66.7% Yes** of the votes cast and a 33.4% quorum within 24 hours.
If it misses them it becomes a regular 7-day proposal, its upgrade height would then be in the
past, and a new proposal would be needed.
:::

## 2. Get v0.3.0

Choose **A** (build it yourself) or **B** (download the release binary). Both give the same
software.

### A. Build from source

Requirements: `git`, `make`, `gcc` (for example `build-essential` on Ubuntu) and Go 1.21 or newer.
The repository pins Go **1.26.11**; Go downloads that toolchain by itself the first time it builds.

```bash
git clone https://github.com/Safrochain-Org/safrochain-node.git
cd safrochain-node
git fetch --tags
git checkout v0.3.0
make build                      # writes ./bin/safrochaind
./bin/safrochaind version --long | grep -E '^(version|commit|go):'
./bin/safrochaind query wasm libwasmvm-version
```

Expected output:

```text
commit: 618edf2ec87e6e7182bf70210b269f3cd18bce5c
go: go version go1.26.11 linux/amd64
version: v0.3.0
2.2.10
```

:::tip Use `make build`, not `make install`
`make install` overwrites the `safrochaind` in your Go `bin` directory, which may be the binary
your running node uses. `make build` leaves it alone: you copy `./bin/safrochaind` into the
cosmovisor directory in [step 3](#3-stage-the-binary).
:::

A binary built from source loads `libwasmvm.x86_64.so` (or `libwasmvm.aarch64.so`) from your Go
module cache. If the node runs as another user or on another machine, copy that file to
`/usr/local/lib` and run `sudo ldconfig`, or use the statically linked release binary (option B):

```bash
ls "$(go env GOMODCACHE)"/github.com/\!cosm\!wasm/wasmvm/v2@v2.2.10/internal/api/libwasmvm.*.so
```

### B. Download the release binary

Statically linked binaries for `linux/amd64` and `linux/arm64`, built by CI from the `v0.3.0`
tag, are published on the GitHub release and mirrored on `rpc1.safrochain.network`:

| Platform | File | SHA-256 |
| --- | --- | --- |
| linux/amd64 | `safrochaind-v0.3.0-linux-amd64` | `c5b8ee22cf51e702d8c9a0b6291ab00f4cda7cb3fceecaacdbd10fba3a217abd` |
| linux/arm64 | `safrochaind-v0.3.0-linux-arm64` | `dd9952cbb7ce5bc43708def067d66fe43218aa1cfbe0b517d61cf24f83392763` |

```bash
ARCH=amd64        # or arm64
BASE=https://github.com/Safrochain-Org/safrochain-node/releases/download/v0.3.0
# mirror: BASE=https://rpc1.safrochain.network/binaries/v0.3.0

curl -fLO "$BASE/safrochaind-v0.3.0-linux-$ARCH"
curl -fLO "$BASE/SHA256SUMS"
sha256sum -c --ignore-missing SHA256SUMS        # must print: ... OK
install -m 0755 "safrochaind-v0.3.0-linux-$ARCH" ./safrochaind
./safrochaind version --long | grep -E '^(version|commit|go):'
```

The same checksums are in the on-chain upgrade plan once the proposal passes
(`safrochaind q upgrade plan`).

## 3. Stage the binary

### With cosmovisor (recommended)

The directory name must be the plan name, **`v0.3.0`**:

```bash
export DAEMON_NAME=safrochaind
export DAEMON_HOME="$HOME/.safrochain"
mkdir -p "$DAEMON_HOME/cosmovisor/upgrades/v0.3.0/bin"
cp ./bin/safrochaind "$DAEMON_HOME/cosmovisor/upgrades/v0.3.0/bin/"   # option B: cp ./safrochaind ...
"$DAEMON_HOME/cosmovisor/upgrades/v0.3.0/bin/safrochaind" version          # v0.3.0
```

Recommended cosmovisor settings: `DAEMON_ALLOW_DOWNLOAD_BINARIES=false`,
`DAEMON_RESTART_AFTER_UPGRADE=true`, `UNSAFE_SKIP_BACKUP=false`. With backups enabled,
cosmovisor copies the data directory at the upgrade: keep enough free disk space.
See [Upgrades (cosmovisor)](../run-a-node/upgrades) for the general setup.

### Without cosmovisor

At the height the node logs `UPGRADE "v0.3.0" NEEDED at height: 4557100` and stops. Then:

1. stop the service;
2. replace the `safrochaind` binary used by the service with v0.3.0;
3. start the service again.

## 4. Checklist before the height

- [ ] Voted on the proposal (validators).
- [ ] v0.3.0 staged, and `version` prints `v0.3.0`.
- [ ] `MAX_WASM_SIZE` removed from the service environment.
- [ ] `minimum-gas-prices` in `app.toml` is `0.05usaf` or higher.
- [ ] Enough free disk space for the cosmovisor backup.
- [ ] Someone watches the node at the upgrade height.

:::danger Never start v0.3.0 early, never go back to v0.2.2
Running v0.3.0 before the height, or v0.2.2 after it, makes the node compute a different app
hash: it stops and must be resynced.
:::

## 5. At and after the height

The chain halts at block 4,557,100 and resumes as soon as validators with more than 2/3 of the
voting power run v0.3.0, usually within minutes. Then check:

```bash
curl -s localhost:26657/abci_info | jq -r .result.response.version      # v0.3.0
safrochaind q upgrade applied v0.3.0 --node https://rpc.safrochain.network:443
safrochaind q consensus params --node https://rpc.safrochain.network:443 # max_gas: "100000000"
safrochaind q slashing signing-info "$(safrochaind comet show-validator)" \
  --node https://rpc.safrochain.network:443                              # missed blocks stop increasing
```

## If something goes wrong

- Do **not** switch back to v0.2.2 after the upgrade height.
- Post the last 200 lines of your node log in the validators channel on Discord and wait for the
  core team's instructions.
- If a fix is needed, a corrected binary is published under the same plan name `v0.3.0`.

## Integrators

- Block production pauses for a few minutes at block 4,557,100.
- Exchanges: pause SAF deposits and withdrawals about 30 minutes before the height, resume once
  blocks are produced again.
- RPC providers, explorers and indexers: upgrade every full node like a validator (steps 2 to 5).
- IBC relayers: no configuration change. Restart the relayer if it does not reconnect by itself.

## The proposal

| Field | Value |
| --- | --- |
| Message | `/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade` |
| Authority | `addr_safro10d07y265gmmuvt4z0w9aw880jnsr700jzwjjar` (gov module) |
| Plan name | `v0.3.0` |
| Plan height | `4557100` |
| Plan info | binary URLs with their SHA-256 for `linux/amd64` and `linux/arm64` |
| Type | expedited, deposit 10,000 SAF |
