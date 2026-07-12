---
title: Install safrochaind
description: Build safrochaind from source on Linux or macOS, and verify the binary.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page walks you through every step of getting a working `safrochaind`
binary on a fresh machine. Pick the tab that matches your OS and copy the
blocks straight into a terminal.

## Prerequisites

| Tool | Mainnet | Testnet |
| --- | --- | --- |
| Go | **1.25.8** | **1.23.9** |
| safrochain-node tag | **`v0.2.2`** | **`release/v0.1.0`** |
| make | any | any |
| git | any | any |
| C toolchain | `build-essential` (Linux) or Xcode CLI tools (macOS) | same |
| OS | Linux x86_64 / arm64, macOS (Intel or Apple Silicon) | same |

:::warning Pick the right network
Mainnet and testnet **do not share a Go toolchain**. Mainnet (`safrochain-1`)
requires **Go 1.25.8** and tag `v0.2.2`. Testnet (`safro-testnet-1`) requires
**Go 1.23.9** and tag `release/v0.1.0`. Mixing them produces a binary that
will fail to start with `Apphash mismatch` or refuse to build.
:::

## 1 · Install build tools

<Tabs groupId="os" defaultValue="ubuntu">
  <TabItem value="ubuntu" label="Ubuntu / Debian">

```bash
sudo apt update
sudo apt install -y build-essential git curl jq make pkg-config libssl-dev wget
```

  </TabItem>
  <TabItem value="rhel" label="Fedora / RHEL">

```bash
sudo dnf install -y @development-tools git curl jq make openssl-devel wget
```

  </TabItem>
  <TabItem value="macos" label="macOS">

```bash
xcode-select --install || true
brew install git curl jq make wget
```

  </TabItem>
</Tabs>

---

## 2 · Install Go and build `safrochaind`

Pick **one** of the two flows below. Do not run both on the same machine
unless you understand how to manage multiple Go toolchains side-by-side.

<Tabs groupId="network" defaultValue="mainnet">

<TabItem value="mainnet" label="Mainnet (safrochain-1)">

### 2.a: Install Go **1.25.8** for mainnet

<Tabs groupId="os" defaultValue="ubuntu">
  <TabItem value="ubuntu" label="Ubuntu / Debian">

```bash
# =============================================================================
# Mainnet: Go 1.25.8 install (Ubuntu / Debian)
# Required for: safrochain-1, safrochain-node tag v0.2.2
# =============================================================================

# Update package lists and install dependencies
sudo apt update
sudo apt install -y git make jq build-essential wget curl

# Download and install Go 1.25.8
wget https://go.dev/dl/go1.25.8.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.25.8.linux-amd64.tar.gz
rm go1.25.8.linux-amd64.tar.gz

# Configure Go environment
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
mkdir -p $GOPATH

# Persist environment variables
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc
source $HOME/.bashrc

# Verify Go installation
if go version | grep -q "go1.25.8"; then
    echo "Go 1.25.8 installed successfully."
else
    echo "Error: Go 1.25.8 not installed. Check installation steps."
    exit 1
fi
```

  </TabItem>
  <TabItem value="rhel" label="Fedora / RHEL">

```bash
# =============================================================================
# Mainnet: Go 1.25.8 install (Fedora / RHEL)
# =============================================================================
sudo dnf install -y @development-tools git curl jq make openssl-devel wget

ARCH=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/')
wget "https://go.dev/dl/go1.25.8.linux-${ARCH}.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go1.25.8.linux-${ARCH}.tar.gz"
rm "go1.25.8.linux-${ARCH}.tar.gz"

echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc
source $HOME/.bashrc

go version | grep -q "go1.25.8" && echo "Go 1.25.8 OK" || { echo "Go 1.25.8 missing"; exit 1; }
```

  </TabItem>
  <TabItem value="macos" label="macOS">

```bash
# =============================================================================
# Mainnet: Go 1.25.8 install (macOS, Intel or Apple Silicon)
# =============================================================================
ARCH=$(uname -m | sed 's/x86_64/amd64/;s/arm64/arm64/')
curl -fsSL "https://go.dev/dl/go1.25.8.darwin-${ARCH}.tar.gz" -o go1.25.8.darwin.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.25.8.darwin.tar.gz
rm go1.25.8.darwin.tar.gz

echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.zshrc
source $HOME/.zshrc

go version | grep -q "go1.25.8" && echo "Go 1.25.8 OK" || { echo "Go 1.25.8 missing"; exit 1; }
```

  </TabItem>
</Tabs>

You should see `go version go1.25.8 linux/amd64` (or `darwin/arm64`).

### 2.b: Build `safrochaind` for **mainnet** (tag `v0.2.2`)

```bash
# =============================================================================
# Mainnet: clone, checkout v0.2.2, build
# Chain ID: safrochain-1
# =============================================================================
git clone https://github.com/Safrochain-Org/safrochain-node ~/safrochain-node
cd ~/safrochain-node
git fetch --tags

# IMPORTANT: mainnet uses tag v0.2.2 (NOT v0.2.0, NOT release/v0.1.0)
git checkout v0.2.2

make install
```

After **`make install`**, you should see the **install complete** banner (same layout as [Join mainnet](./join-mainnet)). For **`v0.2.2`** the key lines match:

```text
│   ●  safrochaind   v0.2.2
│   ●  Cosmos SDK    v0.50.14
│   ●  CometBFT      v0.38.21
│   ●  Go runtime    go1.25.8 darwin/arm64
│   ●  Build tags    netgo,ledger
```

On Linux AMD64, **Go runtime** is typically `go1.25.8 linux/amd64`.

Verify the binary:

```bash
safrochaind version
safrochaind version --long | grep -E '^version:|^cosmos_sdk_version:|^go:|^build_tags:|^commit:'
```

</TabItem>

<TabItem value="testnet" label="Testnet (safro-testnet-1)">

### 2.a: Install Go **1.23.9** for testnet

<Tabs groupId="os" defaultValue="ubuntu">
  <TabItem value="ubuntu" label="Ubuntu / Debian">

```bash
# =============================================================================
# Testnet: Go 1.23.9 install (Ubuntu / Debian)
# Required for: safro-testnet-1, safrochain-node tag release/v0.1.0
# =============================================================================

# Update package lists and install dependencies
sudo apt update
sudo apt install -y git make jq build-essential

# Download and install Go 1.23.9
wget https://go.dev/dl/go1.23.9.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.23.9.linux-amd64.tar.gz
rm go1.23.9.linux-amd64.tar.gz

# Configure Go environment
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
mkdir -p $GOPATH

# Persist environment variables
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc
source $HOME/.bashrc

# Verify Go installation
if go version | grep -q "go1.23.9"; then
    echo "Go 1.23.9 installed successfully."
else
    echo "Error: Go 1.23.9 not installed. Check installation steps."
    exit 1
fi
```

  </TabItem>
  <TabItem value="rhel" label="Fedora / RHEL">

```bash
# =============================================================================
# Testnet: Go 1.23.9 install (Fedora / RHEL)
# =============================================================================
sudo dnf install -y @development-tools git curl jq make openssl-devel wget

ARCH=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/')
wget "https://go.dev/dl/go1.23.9.linux-${ARCH}.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go1.23.9.linux-${ARCH}.tar.gz"
rm "go1.23.9.linux-${ARCH}.tar.gz"

echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc
source $HOME/.bashrc

go version | grep -q "go1.23.9" && echo "Go 1.23.9 OK" || { echo "Go 1.23.9 missing"; exit 1; }
```

  </TabItem>
  <TabItem value="macos" label="macOS">

```bash
# =============================================================================
# Testnet: Go 1.23.9 install (macOS, Intel or Apple Silicon)
# =============================================================================
ARCH=$(uname -m | sed 's/x86_64/amd64/;s/arm64/arm64/')
curl -fsSL "https://go.dev/dl/go1.23.9.darwin-${ARCH}.tar.gz" -o go1.23.9.darwin.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.23.9.darwin.tar.gz
rm go1.23.9.darwin.tar.gz

echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.zshrc
source $HOME/.zshrc

go version | grep -q "go1.23.9" && echo "Go 1.23.9 OK" || { echo "Go 1.23.9 missing"; exit 1; }
```

  </TabItem>
</Tabs>

You should see `go version go1.23.9 linux/amd64` (or `darwin/arm64`).

### 2.b: Build `safrochaind` for **testnet** (tag `release/v0.1.0`)

```bash
# =============================================================================
# Testnet: clone, checkout release/v0.1.0, build
# Chain ID: safro-testnet-1
# =============================================================================
git clone https://github.com/Safrochain-Org/safrochain-node ~/safrochain-node
cd ~/safrochain-node
git fetch --tags

# IMPORTANT: testnet uses the release/v0.1.0 branch (NOT v0.2.2)
git checkout release/v0.1.0

make install

safrochaind version
safrochaind version --long | grep -E '^version:|^cosmos_sdk_version:|^go:|^build_tags:|^commit:'
```

</TabItem>

</Tabs>

`make install` puts the binary in `$GOBIN` (defaults to `~/go/bin`). If
`safrochaind` is not on your `$PATH`, run:

```bash
which safrochaind || echo 'export PATH=$PATH:$HOME/go/bin' >> ~/.bashrc
source ~/.bashrc
```

(macOS users: replace `~/.bashrc` with `~/.zshrc`.)

## 4 · Initialise a home directory

```bash
safrochaind init my-moniker \
  --chain-id safro-testnet-1 \
  --home ~/.safrochain
```

This creates `~/.safrochain/{config,data}` with:

- `config/genesis.json`: placeholder, replaced below.
- `config/config.toml`: CometBFT settings.
- `config/app.toml`: Cosmos SDK module settings.
- `config/client.toml`: CLI defaults (`safrochaind config …`).
- `config/priv_validator_key.json`: consensus key (treat as a secret).
- `config/node_key.json`: node ID for P2P.
- `data/`: empty, populated as the chain syncs.

## 5 · Replace the placeholder genesis

For **testnet** (`safro-testnet-1`):

```bash
curl -fsSL https://raw.githubusercontent.com/Safrochain-Org/genesis/main/genesis-testnet.json \
  -o ~/.safrochain/config/genesis.json
```

For **mainnet** (`safrochain-1`):

```bash
curl -fsSL https://raw.githubusercontent.com/Safrochain-Org/mainnet-genesis/main/genesis.json \
  -o ~/.safrochain/config/genesis.json
```

Canonical sources:

- Mainnet: [`Safrochain-Org/mainnet-genesis`](https://github.com/Safrochain-Org/mainnet-genesis)
- Testnet: [`Safrochain-Org/genesis`](https://github.com/Safrochain-Org/genesis) (`genesis-testnet.json`), or mirror `https://genesis.safrochain.com/testnet/genesis.json`

Verify the SHA-256 against the value published on
[Mainnet endpoints](../networks/mainnet-endpoints) /
[Testnet endpoints](../networks/testnet-endpoints):

```bash
shasum -a 256 ~/.safrochain/config/genesis.json
```

## 6 · Configure CLI defaults

```bash
safrochaind config chain-id        safro-testnet-1
safrochaind config node            https://rpc.testnet.safrochain.com:443
safrochaind config keyring-backend file
safrochaind config broadcast-mode  sync
safrochaind config output          json
```

## 7 · Start the node

Public seeds for testnet and mainnet are listed on
[Networks → Mainnet endpoints](../networks/mainnet-endpoints) and
[Networks → Testnet endpoints](../networks/testnet-endpoints). Configure
them in `~/.safrochain/config/config.toml` (the `seeds` field), then:

```bash
safrochaind start
```

You should see `Started node` and a stream of `Committed state` lines as
the node catches up.

## 8 · Run as a systemd service (Linux)

For 24/7 operation, copy this unit to `/etc/systemd/system/safrochaind.service`:

```ini
[Unit]
Description=Safrochain Node
After=network-online.target

[Service]
User=%u
ExecStart=%h/go/bin/safrochaind start --home %h/.safrochain
Restart=on-failure
RestartSec=5
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now safrochaind
sudo journalctl -u safrochaind -f
```

On macOS, run `safrochaind start` in a `tmux`/`screen` session, or wrap it
in a `launchd` plist.

## 9 · Upgrading to a new release

```bash
cd ~/safrochain-node
git fetch --tags
git checkout v<next-release>          # mainnet: e.g. v0.2.2, then v0.3.0, ...
make install
sudo systemctl restart safrochaind   # Linux only
safrochaind version
```

For coordinated chain upgrades use **cosmovisor** so the binary swap
happens at the upgrade height. See [Upgrades](./upgrades).

## Common issues

| Symptom | Fix |
| --- | --- |
| `make install` fails building `cosmwasm-vm` | install `clang` (`apt install clang` / `brew install llvm`) and retry |
| `safrochaind: command not found` | add `~/go/bin` (or `$(go env GOPATH)/bin` on macOS) to `$PATH` |
| starts then exits with `chain id mismatch` | wrong genesis: redownload the matching one |
| starts but stuck at height 0 | seeds not reachable: recheck the public seeds list on the [Networks](../networks/mainnet-endpoints) page |
| `dial tcp ... i/o timeout` on macOS | check `pf`/firewall and that you're not on a corporate VPN that blocks port 26656 |
