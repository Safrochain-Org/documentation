---
title: Hermes relayer setup
description: Full Hermes config template, systemd unit, and health checks for relaying Safrochain.
sidebar_position: 2
---

[Hermes](https://hermes.informal.systems/) is the relayer of choice for
Safrochain foundation operators. This page is a copy-paste template that
brings up a single-host relayer between Safrochain and one counterparty.
Mainnet channels to Noble and Osmosis are **already open**: configure Hermes
to relay existing paths; see [Channels](./channels#join-as-a-relayer).

## Prerequisites

- Linux server with at least 2 vCPU / 4 GB RAM / 50 GB SSD
- `safrochaind` keyring with a relayer key (with a small `usaf` balance)
- A keyring on the counterparty chain with a small balance of its native fee
  token
- Network access from this server to **all** RPC + gRPC endpoints of both
  chains
- Hermes binary v1.13+, see
  [installation guide](https://hermes.informal.systems/quick-start/installation.html)

## Install Hermes

```bash
curl -L https://github.com/informalsystems/hermes/releases/latest/download/hermes-v1.13-x86_64-unknown-linux-gnu.tar.gz \
  | tar xz -C /usr/local/bin
hermes version
```

## `~/.hermes/config.toml`

```toml
[global]
log_level = 'info'

[mode.clients]
enabled = true
refresh = true
misbehaviour = true

[mode.connections]
enabled = true

[mode.channels]
enabled = true

[mode.packets]
enabled = true
clear_interval = 100
clear_on_start = true
tx_confirmation = true
auto_register_counterparty_payee = true

[rest]
enabled = true
host = '127.0.0.1'
port = 3000

[telemetry]
enabled = true
host = '127.0.0.1'
port = 3001

# ----------------------------------------------------------------------------
# Safrochain (mainnet)
# ----------------------------------------------------------------------------
[[chains]]
id = 'safrochain-1'
type = 'CosmosSdk'
rpc_addr = 'https://rpc1.safrochain.network:443'
grpc_addr = 'https://grpc1.safrochain.network:443'
event_source = { mode = 'push', url = 'wss://rpc1.safrochain.network/websocket', batch_delay = '500ms' }
rpc_timeout = '15s'
trusted_node = false
account_prefix = 'safro'
key_name = 'relayer-safro'
key_store_type = 'Test'
store_prefix = 'ibc'
default_gas = 200000
max_gas = 4000000
gas_multiplier = 1.3
max_msg_num = 30
max_tx_size = 2097152
max_grpc_decoding_size = 33554432
clock_drift = '5s'
max_block_time = '6s'
ccv_consumer_chain = false
memo_prefix = ''
sequential_batch_tx = false
trusting_period = '14days'
trust_threshold = { numerator = '2', denominator = '3' }
address_type = { derivation = 'cosmos' }
gas_price = { price = 0.05, denom = 'usaf' }

# ----------------------------------------------------------------------------
# Noble (live path: channel-0 ↔ channel-581)
# ----------------------------------------------------------------------------
[[chains]]
id = 'noble-1'
type = 'CosmosSdk'
rpc_addr = 'https://noble-rpc.polkachu.com:443'
grpc_addr = 'https://noble-grpc.polkachu.com:443'
event_source = { mode = 'push', url = 'wss://noble-rpc.polkachu.com/websocket', batch_delay = '500ms' }
rpc_timeout = '15s'
trusted_node = false
account_prefix = 'noble'
key_name = 'relayer-noble'
key_store_type = 'Test'
store_prefix = 'ibc'
default_gas = 200000
gas_multiplier = 1.3
clock_drift = '5s'
max_block_time = '6s'
trusting_period = '14days'
trust_threshold = { numerator = '2', denominator = '3' }
address_type = { derivation = 'cosmos' }
gas_price = { price = 0.1, denom = 'uusdc' }

# ----------------------------------------------------------------------------
# Osmosis (live path: channel-1 ↔ channel-110497)
# ----------------------------------------------------------------------------
[[chains]]
id = 'osmosis-1'
type = 'CosmosSdk'
rpc_addr = 'https://rpc.osmosis.zone:443'
grpc_addr = 'https://grpc.osmosis.zone:443'
event_source = { mode = 'push', url = 'wss://rpc.osmosis.zone/websocket', batch_delay = '500ms' }
rpc_timeout = '15s'
trusted_node = false
account_prefix = 'osmo'
key_name = 'relayer-osmosis'
key_store_type = 'Test'
store_prefix = 'ibc'
default_gas = 200000
gas_multiplier = 1.3
clock_drift = '5s'
max_block_time = '6s'
trusting_period = '14days'
trust_threshold = { numerator = '2', denominator = '3' }
address_type = { derivation = 'cosmos' }
gas_price = { price = 0.025, denom = 'uosmo' }
```

## Import the relayer keys

```bash
# Safrochain
hermes keys add \
  --chain safrochain-1 \
  --mnemonic-file <(echo "your 24-word mnemonic")

# Noble
hermes keys add \
  --chain noble-1 \
  --mnemonic-file <(echo "your noble mnemonic")

# Osmosis
hermes keys add \
  --chain osmosis-1 \
  --mnemonic-file <(echo "your osmosis mnemonic")
```

Verify:

```bash
hermes keys list --chain safrochain-1
hermes keys balance --chain safrochain-1
```

## Validate the config

```bash
hermes config validate
hermes health-check
```

`health-check` will RPC + gRPC ping every chain and report the trusting
period vs unbonding period.

## Relay existing channels (mainnet)

Noble and Osmosis channels are **already open**. Start Hermes after config
validation: it will clear packets on:

| Path | Safrochain | Counterparty |
| --- | --- | --- |
| Noble | `transfer/channel-0` | `transfer/channel-581` |
| Osmosis | `transfer/channel-1` | `transfer/channel-110497` |

```bash
# Relay Safrochain ↔ Noble only
hermes start --chains safrochain-1,noble-1

# Or Safrochain ↔ Osmosis
hermes start --chains safrochain-1,osmosis-1

# Or all three chains
hermes start
```

Only run `hermes create channel` when opening a **new** counterparty that
does not yet appear in [Channels](./channels).

## Start as a systemd service

```ini
# /etc/systemd/system/hermes.service
[Unit]
Description=Hermes IBC relayer
After=network-online.target

[Service]
Type=simple
User=hermes
WorkingDirectory=/var/lib/hermes
ExecStart=/usr/local/bin/hermes start
Restart=on-failure
RestartSec=10s
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now hermes
sudo systemctl status hermes
sudo journalctl -u hermes -f
```

## Smoke test

```bash
# Send SAF to Osmosis (channel-1)
safrochaind tx ibc-transfer transfer transfer channel-1 \
  osmo1abc... 1000000usaf \
  --from sender --chain-id safrochain-1 \
  --node https://rpc1.safrochain.network:443 \
  --gas auto --gas-adjustment 1.3 --gas-prices 0.05usaf -y
```

Watch Hermes log:

```text
INFO ibc::relay::link::relay_path: relayed packets: src_chain=safrochain-1 dst_chain=osmosis-1 ...
```

Verify on Osmosis:

```bash
osmosisd query bank balances osmo1abc... --node https://rpc.osmosis.zone:443 \
  | grep ibc/DBAA4846F611A7603EFCE6F9F46F4F561D48B1F492A576022F000614A17089CE
```

## Health & monitoring

- Prometheus scrape: `127.0.0.1:3001/metrics`
- REST API: `127.0.0.1:3000/version`, `/chains`, `/channels`
- Wallet balance alert: keep `> 5 SAF` and `> 5 ATOM` (or counterparty
  fee token). Alerting is left to the operator's monitoring stack of choice
  (e.g. Prometheus + Alertmanager).
- Hermes upgrades on a `safrochaind` upgrade are usually unnecessary, but
  re-run `hermes config validate` after any chain upgrade to catch
  trusting-period drift.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `client expired` warning | unbonding period > trusting_period | update client (`hermes update client`) |
| stuck packets, `pending` rises | counterparty RPC unhealthy | switch RPC, restart Hermes |
| `gas estimate too low` | counterparty `min_gas_prices` raised | bump `gas_price.price` |
| `account sequence mismatch` | another sender used the same key | wait or rotate key |
| chain handshake fails | port misconfigured (`transfer` ↔ `transfer`) | rerun `create channel` |
