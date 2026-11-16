---
title: Upgrades (cosmovisor)
description: Coordinated chain upgrades for Safrochain validators and full nodes.
sidebar_position: 9
---

Safrochain follows the standard Cosmos SDK upgrade pattern: an on-chain
`MsgSoftwareUpgrade` proposal targets a future block height, and every node
must run the new binary at exactly that height. The simplest way to do this
safely is **cosmovisor**, a thin process supervisor that watches for the
upgrade plan, halts `safrochaind` at the target height, swaps the binary
symlink, and restarts.

## 1 · Install cosmovisor

### Linux / macOS

```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
cosmovisor version
```

If `~/go/bin` is not in your `$PATH`:

```bash
echo 'export PATH=$PATH:$HOME/go/bin' >> ~/.bashrc
source ~/.bashrc
```

## 2 · Lay out the cosmovisor directory

```text
~/.safrochain/cosmovisor/
  current -> upgrades/<plan-name>     # symlink, cosmovisor manages it
  genesis/bin/safrochaind             # the binary you launched the chain with
  upgrades/<plan-name>/bin/safrochaind
```

:::important Plan name ≠ release tag
Cosmovisor directories must match the **on-chain upgrade plan name** (the string passed to `MsgSoftwareUpgrade`), not necessarily the git tag. Example: aligning testnet to binary **`v0.2.2`** uses plan name **`v29`** → stage at `cosmovisor/upgrades/v29/bin/safrochaind`. See [Testnet upgrade to v0.2.2](../governance/testnet-upgrade-v0.2.2).
:::

Bootstrap with the binary you have today:

```bash
mkdir -p ~/.safrochain/cosmovisor/genesis/bin
cp "$(command -v safrochaind)" ~/.safrochain/cosmovisor/genesis/bin/
```

## 3 · Run cosmovisor under systemd

Create `/etc/systemd/system/safrochaind.service`:

```ini
[Unit]
Description=Safrochain (cosmovisor)
After=network-online.target

[Service]
User=safrochain
Environment="DAEMON_HOME=/home/safrochain/.safrochain"
Environment="DAEMON_NAME=safrochaind"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
ExecStart=/home/safrochain/go/bin/cosmovisor run start
Restart=on-failure
RestartSec=5s
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now safrochaind
sudo journalctl -u safrochaind -f
```

## 4 · Stage a new release before the upgrade height

When the foundation announces a release tag (for example `v0.3.0`, see
[Mainnet software upgrade to v0.3.0](../governance/mainnet-upgrade-v0.3.0)), stage it under the **plan name** directory.
Either build it from the tag (`git checkout v0.3.0 && make build`, then copy `./bin/safrochaind`), or
download the statically linked release binary and verify it against the release `SHA256SUMS`:

```bash
RELEASE=v0.3.0          # release tag
PLAN=v0.3.0             # on-chain upgrade plan name (cosmovisor directory)
ARCH=amd64              # or arm64
BASE="https://github.com/Safrochain-Org/safrochain-node/releases/download/${RELEASE}"

cd /tmp
curl -fLO "${BASE}/safrochaind-${RELEASE}-linux-${ARCH}"
curl -fLO "${BASE}/SHA256SUMS"
sha256sum -c --ignore-missing SHA256SUMS      # must print: ... OK

mkdir -p ~/.safrochain/cosmovisor/upgrades/${PLAN}/bin
install -m 0755 "safrochaind-${RELEASE}-linux-${ARCH}" ~/.safrochain/cosmovisor/upgrades/${PLAN}/bin/safrochaind
~/.safrochain/cosmovisor/upgrades/${PLAN}/bin/safrochaind version --long | grep -E '^version:|^cosmos_sdk_version:|^go:'
```

cosmovisor will pick up the new binary automatically when it sees the
matching upgrade plan on chain.

## 5 · Watch the upgrade height

```bash
# the active proposal (height + name)
safrochaind query upgrade applied $RELEASE
safrochaind query upgrade plan

# tail logs through the upgrade
sudo journalctl -u safrochaind -f
```

At the upgrade height, cosmovisor will halt the running binary, switch
the `current` symlink, and restart. After restart, confirm:

```bash
safrochaind status \
  | jq '.node_info.version, .sync_info.latest_block_height'
```

## 6 · If something goes wrong

If a validator does **not** come back within ~5 minutes:

```bash
sudo journalctl -u safrochaind -n 500 --no-pager
```

If cosmovisor flipped the symlink but the new binary panics, flip it back
to the previous version manually and coordinate with other validators in
the operator channel:

```bash
sudo systemctl stop safrochaind
cd ~/.safrochain/cosmovisor
ln -sfn upgrades/<previous-version> current
sudo systemctl start safrochaind
```

## 7 · Coordinated chain restart (no governance)

Used only in emergencies (state corruption, panic loop). The foundation
will publish:

- a new `genesis.json` (export-genesis from a healthy archive) + sha256
- a new chain id, if any

Each operator:

```bash
sudo systemctl stop safrochaind

# replace genesis
sudo cp genesis-...json ~/.safrochain/config/genesis.json

# wipe local state but keep node_key.json + priv_validator_key.json
safrochaind comet unsafe-reset-all --keep-addr-book

sudo systemctl start safrochaind
```

Watch peers reconnect and consensus form. Coordinate timing in the operator
channel before doing this.
