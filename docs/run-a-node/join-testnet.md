---
title: Join testnet
description: Sync a Safrochain node against the live safro-testnet-1 network.
sidebar_position: 5
---

The Safrochain testnet (`safro-testnet-1`) is live and is the easiest way to
exercise the full validator + node + wallet stack end-to-end.

## Network versions

| Network | Chain ID | safrochain-node tag | Go |
| --- | --- | --- | --- |
| Testnet | `safro-testnet-1` | `release/v0.1.0` | `1.23.9` |
| Mainnet | `safrochain-1` | `v0.2.2` | `1.25.8` |

## Endpoints

See [Networks → Testnet endpoints](../networks/testnet-endpoints) for the
canonical list. Quick reference:

| Service | Endpoint |
| --- | --- |
| RPC | [https://rpc.testnet.safrochain.com](https://rpc.testnet.safrochain.com) |
| REST | [https://rest.testnet.safrochain.com](https://rest.testnet.safrochain.com) |
| gRPC | [https://grpc.testnet.safrochain.com/](https://grpc.testnet.safrochain.com/) |
| Faucet | [https://faucet.safrochain.com/](https://faucet.safrochain.com/) |
| Explorer | [https://explorer.safrochain.com/](https://explorer.safrochain.com/) |

## Steps

### 1. Install `safrochaind` (testnet)

Follow the **Testnet** track in [Install](./install) (Go **1.23.9** + branch
**`release/v0.1.0`**), or run the consolidated copy-paste block below.

```bash
# =============================================================================
# Testnet: Go 1.23.9 + safrochaind release/v0.1.0 (Ubuntu / Debian)
# Chain ID: safro-testnet-1
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

# Build safrochaind release/v0.1.0 (testnet branch: NOT v0.2.x)
git clone https://github.com/Safrochain-Org/safrochain-node ~/safrochain-node
cd ~/safrochain-node
git fetch --tags
git checkout release/v0.1.0
make install

safrochaind version
safrochaind version --long | grep -E '^version:|^cosmos_sdk_version:|^go:|^build_tags:|^commit:'
```

:::warning
Do **not** check out `v0.2.2` for testnet: that tag is for mainnet
(`safrochain-1`) and requires Go 1.25.8.
:::

### 2. Initialise the home directory

```bash
safrochaind init my-moniker --chain-id safro-testnet-1 --home ~/.safrochain-testnet
```

### 3. Replace the placeholder genesis with the testnet's

The canonical testnet `genesis.json` lives in
[`Safrochain-Org/genesis`](https://github.com/Safrochain-Org/genesis)
as `genesis-testnet.json`. Official mirrors (use **one**):

```bash
export HOME_NODE="$HOME/.safrochain-testnet"

curl -fsSL -o "$HOME_NODE/config/genesis.json" \
  https://raw.githubusercontent.com/Safrochain-Org/genesis/main/genesis-testnet.json
```

```bash
# Alternative mirror (same network: verify JSON if you switch sources)
curl -fsSL -o "$HOME_NODE/config/genesis.json" \
  https://genesis.safrochain.com/testnet/genesis.json
```

```bash
jq empty "$HOME_NODE/config/genesis.json" && sha256sum "$HOME_NODE/config/genesis.json"
```

The expected SHA-256 is published on the network's GitHub release page when we cut releases.

:::tip Older step-by-step mirror
The legacy walkthrough [Install a Node](https://docs.safrochain.com/install-a-node-1176655m0) uses the same overall flow; **minimum gas prices and seed addresses must match current chain params**: prefer the values below and [Chain registry](../networks/chain-registry).
:::

### 4. Configure `app.toml`, `config.toml`, and `client.toml`

Set **`HOME_NODE`** for the snippets (matches common guides):

```bash
export HOME_NODE="$HOME/.safrochain-testnet"
```

#### `config/app.toml`

Align the node's mempool policy with the chain (**global minimum gas**). Adjust only the line if your file already exists:

```bash
grep -q '^minimum-gas-prices' "$HOME_NODE/config/app.toml" \
  && sed -i.bak 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.05usaf"|' "$HOME_NODE/config/app.toml" \
  || echo 'minimum-gas-prices = "0.05usaf"' >> "$HOME_NODE/config/app.toml"
```

On **macOS**, use `sed -i ''` instead of `sed -i.bak`:

```bash
grep -q '^minimum-gas-prices' "$HOME_NODE/config/app.toml" \
  && sed -i '' 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.05usaf"|' "$HOME_NODE/config/app.toml" \
  || echo 'minimum-gas-prices = "0.05usaf"' >> "$HOME_NODE/config/app.toml"
```

Optional API / gRPC (local indexing or tooling): ensure these sections exist: merge by hand if missing:

```toml
# ~/.safrochain-testnet/config/app.toml (merge into existing file)

[api]
enable = true
swagger = false
address = "tcp://0.0.0.0:1317"

[grpc]
enable = true
address = "0.0.0.0:9090"

[grpc-web]
enable = true
```

#### `config/config.toml`: seeds and P2P

Prefer **foundation DNS seeds** when available (IDs published with releases / [Chain registry](../networks/chain-registry)). Replace placeholders with the live node IDs:

```toml
[p2p]
laddr = "tcp://0.0.0.0:26656"
external_address = "<YOUR_PUBLIC_IP_OR_EMPTY>:26656"
seeds = "<NODE_ID>@seed.testnet.safrochain.com:26656"
persistent_peers = ""
pex = true
addr_book_strict = true
```

**Non-interactive seed update** (Linux: GNU `sed`):

```bash
SEEDS='<NODE_ID>@seed.testnet.safrochain.com:26656'
sed -i.bak -e "s|^seeds *=.*|seeds = \"$SEEDS\"|" "$HOME_NODE/config/config.toml"
```

**macOS (BSD `sed`)**:

```bash
SEEDS='<NODE_ID>@seed.testnet.safrochain.com:26656'
sed -i '' -e "s|^seeds *=.*|seeds = \"$SEEDS\"|" "$HOME_NODE/config/config.toml"
```

To add **multiple** comma-separated seeds without replacing other keys by hand:

```bash
# Example only: substitute IDs from the foundation / Discord announcements
SEEDS="2242a526e7841e7e8a551aabc4614e6cd612e7fb@88.99.211.113:26656,642dfd491b8bfc0b842c71c01a12ee1122f3dafe@46.62.140.103:26656"
sed -i.bak -e "s|^seeds *=.*|seeds = \"$SEEDS\"|" "$HOME_NODE/config/config.toml"   # Linux
```

Verify:

```bash
grep -E '^(seeds|persistent_peers|pex) ' "$HOME_NODE/config/config.toml"
```

#### `config/client.toml`

Copy-paste defaults for the embedded CLI (same home):

```toml
# ~/.safrochain-testnet/config/client.toml

chain-id = "safro-testnet-1"
keyring-backend = "file"
output = "json"
node = "tcp://127.0.0.1:26657"
```

Or set the same values with **`safrochaind config set`** (Cosmos SDK / confix; writes `client.toml`):

```bash
safrochaind config set client chain-id safro-testnet-1 --home "$HOME_NODE"
safrochaind config set client node tcp://127.0.0.1:26657 --home "$HOME_NODE"
safrochaind config set client keyring-backend file --home "$HOME_NODE"
safrochaind config set client output json --home "$HOME_NODE"
safrochaind config set client broadcast-mode sync --home "$HOME_NODE"
```

### 5. Point the CLI at public RPC (optional second home)

If you also use the **default** home `~/.safrochain` for quick queries (no local node), align its `client.toml` to testnet:

```bash
safrochaind config set client chain-id safro-testnet-1
safrochaind config set client node https://rpc.testnet.safrochain.com:443
safrochaind config set client keyring-backend file
safrochaind config set client broadcast-mode sync
safrochaind config set client output json
```

### 6. (Optional) Statesync for fast catch-up

A fresh sync from genesis takes a long time even on testnet. Statesync
catches up to a recent height in minutes. See [Statesync](./statesync).

### 7. Start

```bash
safrochaind start --home ~/.safrochain-testnet
```

Watch the height climb:

```bash
curl -s http://127.0.0.1:26657/status \
  | jq '.result.sync_info | {latest_block_height, catching_up}'
```

When `catching_up == false`, you're synced.

### 8. Try the chain

```bash
# create a key
safrochaind keys add me --keyring-backend file --home ~/.safrochain-testnet
ME=$(safrochaind keys show me -a --home ~/.safrochain-testnet)

# fund it from the faucet
echo "Drip $ME at https://faucet.safrochain.com/"

# verify
safrochaind query bank balances "$ME" --home ~/.safrochain-testnet
```

You can now [delegate](../cli/staking), [vote on proposals](../cli/governance),
and [send IBC transfers](../ibc/overview) on testnet without any cost.

## Resetting

If the testnet is reset (announced on Discord), re-download the new
`genesis.json`, run:

```bash
safrochaind comet unsafe-reset-all --home ~/.safrochain-testnet
```

…and restart.

## Useful tip: run this as a systemd service

```ini
# /etc/systemd/system/safrochaind-testnet.service
[Unit]
Description=Safrochain testnet node
After=network-online.target

[Service]
Type=simple
User=safrochain
ExecStart=/home/safrochain/go/bin/safrochaind start --home /var/lib/safrochain-testnet
Restart=on-failure
RestartSec=5s
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now safrochaind-testnet
sudo journalctl -u safrochaind-testnet -f
```
