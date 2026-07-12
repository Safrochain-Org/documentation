---
title: Join mainnet
description: Sync a Safrochain node against safrochain-1.
sidebar_position: 6
---

:::info Mainnet is live
`safrochain-1` is producing blocks. Genesis time was
`2026-06-25T10:00:00Z`. Follow the procedure below to spin up a node and
sync from genesis.
:::

## Network versions

| Network | Chain ID | safrochain-node tag | Go |
| --- | --- | --- | --- |
| Mainnet | `safrochain-1` | `v0.2.2` | `1.25.8` |
| Testnet | `safro-testnet-1` | `release/v0.1.0` | `1.23.9` |

## Endpoints

See [Networks → Mainnet endpoints](../networks/mainnet-endpoints). Quick
reference:

| Service | Endpoint |
| --- | --- |
| RPC | [https://rpc.safrochain.network](https://rpc.safrochain.network) (round-robin between rpc1/rpc2) |
| REST | [https://api.safrochain.network](https://api.safrochain.network) |
| gRPC | [https://grpc.safrochain.network](https://grpc.safrochain.network) |
| gRPC-Web | [https://grpc-web.safrochain.network](https://grpc-web.safrochain.network) |
| Seeds | `bc772fdc9749e6dfd200a9428f07d86fe4fd34ec@seed.safrochain.network:26666`<br/>`d323d296ba55e89fb6ce1a724f8da1740bd8cbb0@seed2.safrochain.network:26670` |
| Status | [https://status.safrochain.network](https://status.safrochain.network) |

## Steps

### 1. Install `safrochaind` (mainnet)

Follow the **Mainnet** track in [Install](./install) (Go **1.25.8** + tag
**`v0.2.2`**), or run the consolidated copy-paste block below.

```bash
# =============================================================================
# Mainnet: Go 1.25.8 + safrochaind v0.2.2 (Ubuntu / Debian)
# Chain ID: safrochain-1
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

# Build safrochaind v0.2.2 (mainnet tag)
git clone https://github.com/Safrochain-Org/safrochain-node ~/safrochain-node
cd ~/safrochain-node
git fetch --tags
git checkout v0.2.2
make install
```

After a successful build, `make install` prints an **install complete** banner.
For tag **`v0.2.2`** you should see (paths and commit vary by machine):

```text
┌──────────────────────────────────────────────────────────────────
│   ✨  INSTALL COMPLETE
├──────────────────────────────────────────────────────────────────
│   ●  safrochaind   v0.2.2
│   ●  Cosmos SDK    v0.50.14
│   ●  CometBFT      v0.38.21
│   ●  Go runtime    go1.25.8 darwin/arm64
│   ●  Build tags    netgo,ledger
│   ●  Commit        <short sha>
│   ●  Binary        <path>/safrochaind
└──────────────────────────────────────────────────────────────────
```

On Linux AMD64 servers the **Go runtime** line is typically `go1.25.8 linux/amd64`
instead of `darwin/arm64`.

Cross-check with the CLI (`--long` lists dependencies first; filter to the summary):

```bash
safrochaind version
# safrochaind v0.2.2

safrochaind version --long | grep -E '^version:|^cosmos_sdk_version:|^go:|^build_tags:|^commit:'
```

Expected (commit full hash varies; **go** shows your OS/arch, e.g. macOS Apple Silicon):

```text
build_tags: netgo,ledger
commit: <sha>
cosmos_sdk_version: v0.50.14
go: go version go1.25.8 darwin/arm64
version: v0.2.2
```

### 2. Initialise the home

```bash
safrochaind init my-moniker --chain-id safrochain-1 --home ~/.safrochain
```

### 3. Replace genesis

The canonical mainnet `genesis.json` lives in the
[`Safrochain-Org/mainnet-genesis`](https://github.com/Safrochain-Org/mainnet-genesis)
repository. Pull it and verify the SHA-256:

```bash
curl -fsSL https://raw.githubusercontent.com/Safrochain-Org/mainnet-genesis/main/genesis.json \
  -o ~/.safrochain/config/genesis.json

sha256sum ~/.safrochain/config/genesis.json
# Expected:
# c05ac5aec1918df9edb257e8e0eea184d73edc51370eb4aa9f0b4f0aad615c4d
```

One-liner verification:

```bash
( cd ~/.safrochain/config && \
  echo "c05ac5aec1918df9edb257e8e0eea184d73edc51370eb4aa9f0b4f0aad615c4d  genesis.json" \
  | shasum -a 256 -c - )
# Expected: genesis.json: OK
```

:::note Launch genesis
This is the live `safrochain-1` genesis with `genesis_time = 2026-06-25T10:00:00Z`
and four block-1 validators: **Ubuntu** + **Kilimanjaro** (Safrochain Foundation,
50,000 SAF each, Horcrux-protected 2-of-3 threshold consensus keys) and
**HusoNode** + **Winnode** (community, 10,000 SAF each). Additional validators
join on-chain via `MsgCreateValidator` after syncing.
:::

### 4. Configure peers (`config.toml`)

```bash
export MAINNET_HOME="$HOME/.safrochain"
```

Edit `$MAINNET_HOME/config/config.toml` under `[p2p]`:

```toml
[p2p]
seeds = "bc772fdc9749e6dfd200a9428f07d86fe4fd34ec@seed.safrochain.network:26666,d323d296ba55e89fb6ce1a724f8da1740bd8cbb0@seed2.safrochain.network:26670"
persistent_peers = ""
addr_book_strict = true
pex = true
```

The two foundation seeds are sufficient to bootstrap the peer mesh. Once
your node has connected and `pex` has populated its address book, it will
discover and dial additional peers automatically.

The same node IDs are also published in:

- [Chain registry](../networks/chain-registry) (field `peers.seeds[].id`)
- the `v0.2.2` GitHub release notes

The 40-hex-char IDs above are the **production** ed25519 node IDs of the Safrochain Foundation sentries and rpc1. They remain stable across chain resets (we preserve `config/node_key.json`).

**Update seeds without opening an editor** (comma-separated list):

```bash
SEEDS="bc772fdc9749e6dfd200a9428f07d86fe4fd34ec@seed.safrochain.network:26666,d323d296ba55e89fb6ce1a724f8da1740bd8cbb0@seed2.safrochain.network:26670"
```

Linux:

```bash
sed -i.bak -e "s|^seeds *=.*|seeds = \"$SEEDS\"|" "$MAINNET_HOME/config/config.toml"
```

macOS:

```bash
sed -i '' -e "s|^seeds *=.*|seeds = \"$SEEDS\"|" "$MAINNET_HOME/config/config.toml"
```

Optional public P2P advertisement:

```bash
# Replace with your routable IP:port if this node accepts inbound P2P
sed -i.bak -e "s|^external_address *=.*|external_address = \"<PUBLIC_IP>:26656\"|" "$MAINNET_HOME/config/config.toml"   # Linux
```

Verify:

```bash
grep -E '^(seeds|persistent_peers|pex|external_address) ' "$MAINNET_HOME/config/config.toml"
```

:::tip Same layout as the public guide
The legacy [Install a Node](https://docs.safrochain.com/install-a-node-1176655m0) walkthrough uses the same **`sed`** pattern for `seeds` / `persistent_peers` / `pex`; mainnet **addresses and gas** must follow this page and launch-day releases, not the older examples on that URL.
:::

### 5. App-level settings (`app.toml`)

```toml
# ~/.safrochain/config/app.toml

minimum-gas-prices = "0.05usaf"

[api]
enable = true
swagger = false
address = "tcp://0.0.0.0:1317"

[grpc]
enable = true
address = "0.0.0.0:9090"

[grpc-web]
enable = true
address = "0.0.0.0:9091"

[telemetry]
enabled = true
prometheus-retention-time = 60

# pruning
pruning             = "default"
pruning-keep-recent = "100"
pruning-interval    = "10"
```

For an archive (RPC-2-style) node:

```toml
pruning = "nothing"
```

One-line **minimum gas** patch (if you only adjust the floor):

```bash
sed -i.bak 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.05usaf"|' "$MAINNET_HOME/config/app.toml"   # Linux
# macOS: sed -i '' 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.05usaf"|' "$MAINNET_HOME/config/app.toml"
```

### 5b. `client.toml` (optional file defaults)

```toml
# ~/.safrochain/config/client.toml

chain-id = "safrochain-1"
keyring-backend = "file"
output = "json"
node = "tcp://127.0.0.1:26657"
```

### 6. Set CLI defaults (`client.toml` via confix)

Writes `~/.safrochain/config/client.toml` when using the default `--home`:

```bash
safrochaind config set client chain-id safrochain-1
safrochaind config set client node https://rpc.safrochain.network:443
safrochaind config set client keyring-backend file
safrochaind config set client broadcast-mode sync
safrochaind config set client output json
```

If your node data lives under a custom `--home`, pass it on each command:

```bash
export MAINNET_HOME="$HOME/.safrochain"
safrochaind config set client chain-id safrochain-1 --home "$MAINNET_HOME"
safrochaind config set client node tcp://127.0.0.1:26657 --home "$MAINNET_HOME"
safrochaind config set client keyring-backend file --home "$MAINNET_HOME"
safrochaind config set client output json --home "$MAINNET_HOME"
safrochaind config set client broadcast-mode sync --home "$MAINNET_HOME"
```

### 7. (Recommended) Statesync from rpc1/rpc2

Mainnet history won't be huge for the first few months, but statesync
saves time even at low height. See [Statesync](./statesync).

### 8. Start under systemd

```ini
# /etc/systemd/system/safrochaind.service
[Unit]
Description=Safrochain mainnet node
After=network-online.target

[Service]
Type=simple
User=safrochain
ExecStart=/home/safrochain/go/bin/safrochaind start --home /var/lib/safrochain
Restart=on-failure
RestartSec=5s
LimitNOFILE=1048576
TimeoutStopSec=30s

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now safrochaind
sudo journalctl -u safrochaind -f
```

### 9. Verify

```bash
curl -s http://127.0.0.1:26657/status \
  | jq '.result.sync_info | {latest_block_height, catching_up}'

# match against a public RPC
curl -s https://rpc.safrochain.network/status \
  | jq '.result.sync_info.latest_block_height'
```

The two values should converge once you finish catching up.

## Recommended posture

- **Pruned RPC**: `default` pruning, fronted by a TLS-terminating reverse
  proxy on `:443` if you intend to expose it publicly.
- **Archive RPC**: `nothing` pruning, behind a private network, used as a
  source of truth for explorers / indexers.
- **Validator**: `default` pruning, **no public exposure**, P2P only to
  your own sentries / private network.

## After your first upgrade

Use **cosmovisor** so your binary swaps automatically at the upgrade
height. See [Upgrades](./upgrades).
