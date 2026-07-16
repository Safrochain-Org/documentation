---
title: "Ask me — CLI quick reference"
description: "Practical Safrochain CLI examples: query balances, send tokens, and broadcast transactions with copy-paste command snippets."
sidebar_position: 2
keywords:
  - cli
  - safrochaind
  - transaction
  - broadcast
  - rpc
---

## Overview

This page provides quick, copy-paste CLI examples for common tasks on Safrochain: querying balances, sending tokens, and broadcasting transactions. Commands are shown for testnet endpoints and assume you have `safrochaind` installed and a key configured.

---

## Query an account balance

```bash
safrochaind q bank balances <address> --node https://rpc.testnet.safrochain.com:26657
```

Example output (JSON):

```json
{
  "balances": [
    {"denom": "usaf", "amount": "1000000"}
  ]
}
```

![Query balance screenshot](/img/cli-screenshot-1.svg)

---

## Send tokens (example)

1. Construct and broadcast a transaction using `safrochaind` CLI:

```bash
safrochaind tx bank send <your-key-name> <recipient-address> 1000000usaf \
  --chain-id safrochain-testnet --node https://rpc.testnet.safrochain.com:26657 \
  --gas auto --gas-adjustment 1.2 -y
```

2. Verify the transaction by querying the transaction hash:

```bash
safrochaind q tx <tx-hash> --node https://rpc.testnet.safrochain.com:26657
```

![Send tokens screenshot](/img/cli-screenshot-2.svg)

---

## Broadcast via REST (curl)

Sign locally and broadcast via JSON REST (example payload omitted for brevity):

```bash
curl -s -X POST "https://rest.testnet.safrochain.com/cosmos/tx/v1beta1/txs" \
  -H "Content-Type: application/json" \
  -d '{"tx_bytes":"<base64-signed-tx>","mode":"BROADCAST_MODE_SYNC"}'
```

---

## Tips

- Use `--node` to point at the official testnet RPC when testing.
- Always review gas and fees before broadcasting on mainnet.

---

If you want, I can add step-by-step screenshots showing a full `safrochaind` send flow from key creation to tx confirmation. Tell me which command you want documented in depth.
