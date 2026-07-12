---
title: Safrochain testnet endpoints (RPC, REST, faucet)
description: "Live public RPC, REST (LCD), gRPC, faucet, and explorer URLs for safro-testnet-1: the easiest way to experiment with Safrochain."
sidebar_position: 2
keywords:
  - Safrochain testnet
  - safro-testnet-1
  - testnet RPC
  - testnet REST
  - faucet
  - block explorer
  - chain endpoints
  - Cosmos testnet
---

:::tip Testnet is live
The testnet is currently live and is the easiest way to experiment with
`safrochaind`, fund a key from the faucet, and read the chain state.
:::

## Chain identity

| Field | Value |
| --- | --- |
| Chain ID | `safro-testnet-1` |
| Base denom | `usaf` |
| Display denom | `SAF` (test) |
| Conversion | `1 SAF = 1_000_000 usaf` |
| Bech32 prefix | `addr_safro` |

## Network versions

| Network | Chain ID | safrochain-node tag | Go |
| --- | --- | --- | --- |
| Testnet | `safro-testnet-1` | `release/v0.1.0` | `1.23.9` |
| Mainnet | `safrochain-1` | `v0.2.2` | `1.25.8` |

## Genesis

| Field | Value |
| --- | --- |
| Repository | [`Safrochain-Org/genesis`](https://github.com/Safrochain-Org/genesis) |
| File | [`genesis-testnet.json`](https://github.com/Safrochain-Org/genesis/blob/main/genesis-testnet.json) |
| Raw URL | `https://raw.githubusercontent.com/Safrochain-Org/genesis/main/genesis-testnet.json` |
| Mirror | `https://genesis.safrochain.com/testnet/genesis.json` |

```bash
curl -fsSL https://raw.githubusercontent.com/Safrochain-Org/genesis/main/genesis-testnet.json \
  -o ~/.safrochain/config/genesis.json
```

## Public endpoints

| Service | Endpoint |
| --- | --- |
| RPC (CometBFT JSON-RPC) | [https://rpc.testnet.safrochain.com](https://rpc.testnet.safrochain.com) |
| REST (Cosmos LCD) | [https://rest.testnet.safrochain.com](https://rest.testnet.safrochain.com) |
| gRPC (HTTP/2) | [https://grpc.testnet.safrochain.com/](https://grpc.testnet.safrochain.com/) |
| Faucet | [https://faucet.safrochain.com/](https://faucet.safrochain.com/) |
| Explorer | [https://explorer.safrochain.com/](https://explorer.safrochain.com/) |

## Quickstart

```bash
# Add the testnet to safrochaind
safrochaind config chain-id safro-testnet-1
safrochaind config node https://rpc.testnet.safrochain.com:443

# Probe the chain
curl -s https://rpc.testnet.safrochain.com/status \
  | jq '.result.sync_info | {latest_block_height, catching_up}'

# REST: query bank supply
curl -s https://rest.testnet.safrochain.com/cosmos/bank/v1beta1/supply | jq .

# Create a key, then ask the faucet for SAF (test)
safrochaind keys add me
ADDR=$(safrochaind keys show -a me)
echo "Drip me into $ADDR via https://faucet.safrochain.com/"
```

## Faucet: Discord Faucet Bot

Steps:

1. Join the Safrochain Discord.
2. Navigate to the **#testnet-faucet** channel.
3. Use the command below, replacing `addr_safroxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` with your wallet address:

```text
!faucet addr_safroxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- Receive: **10,000,000 `usaf`** (10 SAF)
- Cooldown: **24 hours**

Note: `usaf` is the micro-denomination of SAF, where `1 SAF = 1,000,000 usaf`.
Ensure your wallet address is valid and starts with `addr_safro` to receive tokens successfully.

## Wallet connection (Keplr / Leap)

If your wallet supports manual chain registration, use:

```json
{
  "chainId": "safro-testnet-1",
  "chainName": "Safrochain Testnet",
  "rpc": "https://rpc.testnet.safrochain.com",
  "rest": "https://rest.testnet.safrochain.com",
  "stakeCurrency": { "coinDenom": "SAF", "coinMinimalDenom": "usaf", "coinDecimals": 6 },
  "bech32Config": {
    "bech32PrefixAccAddr": "addr_safro",
    "bech32PrefixAccPub": "addr_safropub",
    "bech32PrefixValAddr": "addr_safrovaloper",
    "bech32PrefixValPub": "addr_safrovaloperpub",
    "bech32PrefixConsAddr": "addr_safrovalcons",
    "bech32PrefixConsPub": "addr_safrovalconspub"
  },
  "currencies": [{ "coinDenom": "SAF", "coinMinimalDenom": "usaf", "coinDecimals": 6 }],
  "feeCurrencies": [
    {
      "coinDenom": "SAF",
      "coinMinimalDenom": "usaf",
      "coinDecimals": 6,
      "gasPriceStep": { "low": 0.05, "average": 0.0625, "high": 0.075 }
    }
  ],
  "coinType": 118
}
```

## Notes

- Testnet may be reset between major upgrades. Watch
  [Discord](https://discord.gg/fe2XAm6ENQ) and
  [Telegram](https://t.me/safrochainannonce) for upgrade announcements.
- For a fully local development node, follow
  [Run a Node → Local devnet](../run-a-node/local-devnet) or
  [Local devnet endpoints](./local-devnet-endpoints).
