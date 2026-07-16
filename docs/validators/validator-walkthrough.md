---
title: Launch your first validator
description: "Set up a Safrochain mainnet validator from an empty machine: install, sync, keys, funding, and create-validator, with the mistakes that commonly trip people up."
sidebar_position: 2
keywords:
  - Safrochain validator
  - validator guide
  - beginner validator
  - mainnet validator
  - create-validator
  - safrochain-1
  - staking SAF
  - validator walkthrough
---

This page takes you from an empty machine to a validator signing blocks on
Safrochain mainnet (`safrochain-1`). It assumes **no prior blockchain
experience**, and explains what each step does and why.

If you already run Cosmos validators and just want the commands, use
[Become a validator](./become-a-validator) instead — same process, no
explanations.

:::tip The one rule that matters
Everything up to and including [Part 8](#part-8--sync-your-node) is **local
and reversible**. You can delete it all and start over as many times as you
like, and nothing reaches the chain. The **only** irreversible step is
broadcasting `create-validator` in [Part 13](#part-13--go-live-the-irreversible-step).
Slow down there. Nowhere else.
:::

## What a validator actually is

Picture the blockchain as a shared notebook that thousands of people write
in at once — every transfer, every balance change. For that notebook to be
trustworthy, someone has to check each new page before it's added: no one
cheating, no one spending money they don't have, no one rewriting old pages.

A **validator** is a computer that does that checking, continuously, 24/7.
Instead of one bank controlling the notebook, a network of independent
validators each hold a copy and agree on what's true together. That's the
whole point of a blockchain — nobody is in charge.

### What you get out of it

- **Rewards.** New SAF and transaction fees get paid out to validators for
  doing this work. Part goes to you; part goes to anyone who delegates their
  SAF to you.
- **A vote.** Validators vote on proposals that steer the network — upgrades,
  parameter changes, treasury spending. More stake behind you, more weight.
- **Reputation.** Your validator's name is public and permanent. Running a
  reliable one is a real way to build credibility in the ecosystem.

### What it costs you

Running a validator is a **real operational commitment**, not passive income.
If your node goes offline too long you get [jailed](./slashing) and stop
earning. If it double-signs, you get **slashed** — tokens permanently
destroyed, and not only yours: your delegators lose too.

If you only want rewards without the responsibility, delegate your SAF to
someone else's validator instead. That's simpler, still pays, and carries
none of the uptime risk. This page assumes you've weighed that and want to
run infrastructure properly.

## Glossary

Skim this once. Every term comes up again below.

| Term | What it actually means |
| --- | --- |
| **Node** | A computer running the Safrochain software, keeping its own copy of the chain and talking to other nodes to stay in sync. |
| **Validator** | A node allowed to check and approve new blocks, in exchange for staking tokens as a good-behaviour deposit. |
| **Full node** | A node that keeps a copy of the chain and answers questions about it, but doesn't approve anything. |
| **Syncing** | Your node downloading and verifying history until it's up to date — like a new hire reading months of records before making decisions. |
| **Genesis file** | The very first page of the notebook: the chain's starting state. Every node needs a byte-identical copy. |
| **Statesync** | A shortcut. Instead of replaying every page from page 1, you start from a recent verified snapshot. Minutes instead of hours. |
| **Peer** | Another node yours talks to. |
| **Seed** | A well-known public node whose job is to introduce you to peers. Safrochain runs two. |
| **RPC** | A way to ask a node a question over the internet ("what's the latest block?") without running your own. |
| **Mnemonic (seed phrase)** | 24 words that regenerate your key. Anyone who sees them controls your funds. It is the master password to your money. |
| **Operator key** | The key representing *you* — signs transactions, holds funds, earns rewards. |
| **Consensus key** | A separate key belonging to *the node itself* — signs blocks automatically every few seconds. Kept apart from your operator key so a hacked server doesn't cost you your funds. |
| **Gas** | The processing fee for a transaction, based on how much computation it takes. |
| **Moniker** | Your validator's public display name. |
| **Commission** | The cut you take from rewards earned by people who delegate to you — your service fee. |
| **Self-delegation** | Your own tokens staked on your own validator. Your skin in the game. |
| **Active set** | The validators currently allowed to validate and earn. If you're outside it, you're registered but idle. |
| **Jailed** | A time-out. Temporarily removed from duty for being offline too much. |
| **Slashing** | A financial penalty — staked tokens permanently destroyed for serious misbehaviour. Hits your delegators too. |
| **Unbonding** | Cashing out your stake. There's a mandatory waiting period before tokens move again. |
| **Double-signing** | Signing two conflicting blocks at the same height. Gets you slashed. This is exactly why a consensus key must never run on two machines at once. |
| **Sentry node** | A bodyguard node between your validator and the public internet, hiding your validator's real address. |

## Before you start

You'll need:

- **A machine.** A VPS for anything long-running — see
  [Hardware requirements](../run-a-node/hardware). A laptop is fine to learn on,
  but a validator that sleeps when you close the lid will get jailed.
- **Real SAF.** Mainnet SAF is real money. You need enough to self-delegate
  (minimum 1 SAF, realistically much more to reach the active set) plus a
  little for fees.
- **About 30–60 minutes**, most of it waiting for the node to sync.
- **Ubuntu/Debian** is assumed below. macOS works for learning; see
  [Install](../run-a-node/install) for the differences.

:::note Practise on testnet first
Everything below works identically on testnet (`safro-testnet-1`), where the
tokens are free from a [faucet](https://faucet.safrochain.com/) and mistakes
cost nothing. Doing one full dry run there first is genuinely worth the hour.
See [Part 15](#part-15--already-on-testnet-moving-to-mainnet).
:::

## Part 1 — Install the software

Safrochain is built with the Cosmos SDK, which is written in Go, so you
install Go first, then build the Safrochain binary (`safrochaind`) with it.

:::warning Version matching is not optional
Mainnet runs a **specific** version. Building the wrong one is a common cause
of your node failing to agree with everyone else. Right now mainnet is
**Go 1.25.8** and tag **`v0.2.2`**. Before you build, confirm those are still
current in [Mainnet endpoints](../networks/mainnet-endpoints) — this page can
go stale, that one is the source of truth.
:::

```bash
sudo apt update
sudo apt install -y git make jq build-essential wget curl

wget https://go.dev/dl/go1.25.8.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.25.8.linux-amd64.tar.gz
rm go1.25.8.linux-amd64.tar.gz

echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc
source $HOME/.bashrc

go version
# expect: go version go1.25.8 linux/amd64
```

Now build `safrochaind` itself:

```bash
git clone https://github.com/Safrochain-Org/safrochain-node ~/safrochain-node
cd ~/safrochain-node
git fetch --tags
git checkout v0.2.2
make install

safrochaind version
# expect: v0.2.2
```

If `safrochaind: command not found`, your shell can't see Go's bin directory.
Re-run `source $HOME/.bashrc` and try again.

## Part 2 — Tell the CLI which chain you're on

Rather than typing `--chain-id` and `--node` on every command forever, save
them once:

```bash
safrochaind config set client chain-id safrochain-1
safrochaind config set client node https://rpc.safrochain.network:443
safrochaind config set client keyring-backend file
```

Commands below still spell these flags out explicitly, so they work either
way — but once you're comfortable you can drop them.

## Part 3 — Initialise your node

This creates your node's home directory and its starting config:

```bash
safrochaind init "your-validator-name" --chain-id safrochain-1 --home ~/.safrochain
```

Replace `your-validator-name` with whatever you want to be publicly known as.

This generates:

- `config/priv_validator_key.json` — your **consensus key**. Created right
  now, automatically. Not the same as your wallet key (see [Part 14](#part-14--security-why-two-keys)).
- `config/node_key.json` — your node's network identity.
- `config/genesis.json` — a **placeholder**. You replace it next.
- `config/config.toml` and `config/app.toml` — settings.

:::warning Running `init` twice reuses the same consensus key
That's usually fine. But if you ever need a genuinely *new* consensus
identity (say, migrating off a compromised server), use a **new, separate
`--home` directory** — don't try to regenerate `priv_validator_key.json` by
hand inside an existing one.
:::

## Part 4 — Get the real genesis file

The genesis file `init` created is a placeholder. Every node on mainnet must
have a byte-identical copy of the real one, or yours will disagree with the
network about basic reality and never sync.

```bash
curl -fsSL https://raw.githubusercontent.com/Safrochain-Org/mainnet-genesis/main/genesis.json \
  -o ~/.safrochain/config/genesis.json
```

Now verify you got the real file and not a corrupted download:

```bash
( cd ~/.safrochain/config && \
  echo "c05ac5aec1918df9edb257e8e0eea184d73edc51370eb4aa9f0b4f0aad615c4d  genesis.json" \
  | shasum -a 256 -c - )
# expect: genesis.json: OK
```

If that doesn't say `OK`, stop and re-download. Don't continue with a genesis
file that doesn't match — nothing after this will work.

## Part 5 — Point your node at the network

Your node needs to know how to find other nodes. Safrochain runs two public
**seed** nodes whose entire job is introducing you to peers.

```bash
SEEDS="bc772fdc9749e6dfd200a9428f07d86fe4fd34ec@seed.safrochain.network:26666,d323d296ba55e89fb6ce1a724f8da1740bd8cbb0@seed2.safrochain.network:26670"

sed -i.bak -e "s|^seeds *=.*|seeds = \"$SEEDS\"|" ~/.safrochain/config/config.toml

grep -E '^(seeds|pex) ' ~/.safrochain/config/config.toml
```

Those two seeds are enough. Once your node connects, `pex` (peer exchange)
populates its address book and it finds more peers on its own.

:::warning Don't hunt for peer IPs by hand
It's tempting to copy a raw IP address out of an old guide or a chat message.
Don't. Community node IPs go stale and you'll spend an hour debugging a dead
host that isn't your fault.

Equally, don't try to use `rpc.safrochain.network` as a peer. The public RPC
nodes sit behind Cloudflare, which serves HTTPS on port 443 but
[intentionally does not expose their P2P sockets](../networks/mainnet-endpoints#p2p-seeds-cometbft-p2p-over-tcp).
A raw P2P connection there will just time out. The seeds above are the
supported way in.
:::

## Part 6 — Set your gas price floor

Open `~/.safrochain/config/app.toml` and set the minimum gas price. This is
chain-wide policy — your node should match it:

```bash
sed -i.bak 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.05usaf"|' ~/.safrochain/config/app.toml
```

## Part 7 — Set up statesync (strongly recommended)

Syncing from block 1 means replaying the entire chain history — hours. Statesync
instead grabs a recent verified snapshot and starts from there — minutes.

It's not a shortcut that trades away safety: the snapshot's contents are
cryptographically checked against the real chain header, so a malicious server
can't feed you a fake chain. See [Statesync](../run-a-node/statesync) for why.

Get a recent trust height and its hash:

```bash
LATEST=$(curl -s https://rpc.safrochain.network/status | jq -r '.result.sync_info.latest_block_height')
TRUST=$((LATEST - 1000))
HASH=$(curl -s "https://rpc.safrochain.network/block?height=$TRUST" | jq -r '.result.block_id.hash')

echo "trust_height = $TRUST"
echo "trust_hash   = \"$HASH\""
```

Put those into `~/.safrochain/config/config.toml` under `[statesync]`:

```toml
[statesync]
enable = true
rpc_servers = "https://rpc1.safrochain.network:443,https://rpc2.safrochain.network:443"
trust_height = <TRUST_HEIGHT_FROM_ABOVE>
trust_hash   = "<TRUST_HASH_FROM_ABOVE>"
trust_period = "168h"
```

Four things people get wrong here, all of which produce the same unhelpful
"it just doesn't sync":

1. **Leaving out `trust_period`.** All five settings are needed together.
2. **Using a stale trust height.** Keep it recent — within a couple thousand
   blocks of the tip. Grab it fresh, right before you start.
3. **Listing the same RPC twice** in `rpc_servers`. Statesync needs **two
   independent** sources to cross-check the snapshot. Use `rpc1` and `rpc2` as
   shown, not `rpc` twice.
4. **Using the round-robin `rpc` alias** for both entries — it points at
   rpc1/rpc2 randomly, so you can silently end up asking the same server twice.

## Part 8 — Sync your node

```bash
safrochaind start --home ~/.safrochain
```

Watch the logs. You want to see a line like:

```text
Discovered snapshot height=... chunks=...
```

That confirms a peer is actually serving snapshot data.

:::note If you only see "Discovering snapshots" forever
If two minutes pass with no snapshot ever discovered, your peers don't have
snapshots to serve. Refresh your trust height and restart. If it still fails
repeatedly, fall back to a full sync from genesis — just set
`enable = false` under `[statesync]` and start again. It's slow, but it always
works.

If you need to reset and retry: `safrochaind tendermint unsafe-reset-all --home ~/.safrochain --keep-addr-book`
(the flag preserves discovered peers so you don't start peer discovery from zero).
:::

Confirm you're actually synced:

```bash
curl -s http://localhost:26657/status | jq -r '.result.sync_info | {catching_up, latest_block_height}'
```

`catching_up: false` means you're done. **Do not continue until you see that.**
Nothing below works on a node that hasn't caught up.

For a real deployment, run the node under systemd so it restarts
automatically — see [Join mainnet](../run-a-node/join-mainnet#8-start-under-systemd).

## Part 9 — Create your operator key

This is your personal identity on the network — like opening a bank account.
It's **different** from the consensus key your node already made back in
Part 3 (see [Part 14](#part-14--security-why-two-keys) for why they're
separate). Think of it this way: you (the operator key) hire the machine (the
consensus key) to do the validating on your behalf.

```bash
safrochaind keys add validator --keyring-backend file
```

You'll set a passphrase (needed every time you sign something), and it prints
a **24-word mnemonic exactly once**.

:::danger Write the mnemonic down offline, right now
Paper, or a password manager. Anyone who sees these words owns your funds
permanently.

**Do not:** save it to a file on the machine, paste it into any chat or
terminal that gets logged, or have it on screen while screen-sharing or
recording.

If a mnemonic is ever exposed — even once, even briefly — treat that key as
burned. Generate a new one and move the funds. Any SAF sent to that address
is at risk forever, not just in the moment it leaked.
:::

Confirm it exists and note your address:

```bash
safrochaind keys list --keyring-backend file
```

Copy the `addr_safro1…` address somewhere handy — you'll paste it in the next
step.

## Part 10 — Fund your operator key

Your validator needs SAF in this wallet to pay gas and to self-delegate.
Mainnet SAF comes from an exchange or the foundation's validator programme —
there's no faucet for real money.

If you're moving funds in from another wallet:

```bash
safrochaind tx bank send <FROM_ADDRESS> <TO_ADDRESS> <AMOUNT>usaf \
  --from <FROM_KEY_NAME> \
  --chain-id safrochain-1 \
  --gas 100000 --gas-prices 0.05usaf \
  --keyring-backend file \
  --node https://rpc.safrochain.network:443 --yes
```

Amounts are in `usaf`, the chain's base unit. **1 SAF = 1,000,000 usaf**, so
10 SAF is `10000000usaf`. Getting this wrong by a factor of a million is an
easy and expensive mistake — count the zeros.

Now check the balance actually arrived:

```bash
safrochaind query bank balances "$(safrochaind keys show validator -a --keyring-backend file)" \
  --node https://rpc.safrochain.network:443
```

The inner command looks up the address of the key you made in Part 9, so you
don't have to paste it by hand.

:::tip If it says `key not found`
The key is almost certainly fine. `--keyring-backend file` has to match what
you used to create it — leave the flag off and the CLI looks in the default
`os` backend instead, where nothing exists.

Checking from a different machine that has no keyring? Pass your
`addr_safro1…` address literally instead of the nested lookup.
:::

## Part 11 — Get your consensus pubkey

This is your node's "employee ID number", so you can register it as your
validator's block-signer in the next step. It's a **public** key — safe to
show anyone. It reads from your node's local config; no network call, no risk.

```bash
safrochaind comet show-validator --home ~/.safrochain
# {"@type":"/cosmos.crypto.ed25519.PubKey","key":"XXXXXXXXXXXX..."}
```

Copy the whole thing, braces included.

:::warning Use *this* node's key
This must be the consensus key of the node **you're actually going to run**.
Don't paste in one from a different or already-registered validator — the
chain rejects duplicates.
:::

## Part 12 — Build `validator.json`

Safrochain takes the validator details as a JSON file rather than a pile of
command-line flags. Think of it as your validator's business registration
form: name, contact details, and the terms you're offering delegators.

```bash
cat > validator.json <<EOF
{
  "pubkey": {"@type":"/cosmos.crypto.ed25519.PubKey","key":"<YOUR_PUBKEY_FROM_PART_11>"},
  "amount": "10000000usaf",
  "moniker": "your-validator-name",
  "identity": "",
  "website": "",
  "security": "",
  "details": "",
  "commission-rate": "0.05",
  "commission-max-rate": "0.20",
  "commission-max-change-rate": "0.01",
  "min-self-delegation": "1"
}
EOF
```

Field by field:

| Field | What it means in practice |
| --- | --- |
| `pubkey` | The consensus pubkey from Part 11 — links this validator to the machine that signs. |
| `amount` | Your self-delegation. Minimum 1 SAF (`1000000usaf`); the example stakes 10 SAF. Comes straight out of your wallet. |
| `moniker` | Your public display name. Renameable later. |
| `identity` | Keybase fingerprint — makes a logo appear next to your name in explorers. Cosmetic, optional. |
| `website` | Optional public link. |
| `security` | Optional contact email for security researchers. |
| `details` | Short public bio — who you are, why people should trust you with their stake. |
| `commission-rate` | Your cut of delegators' rewards. `0.05` = 5%. |
| `commission-max-rate` | The highest you're *ever* allowed to raise it. **Cannot be changed later.** Choose deliberately. |
| `commission-max-change-rate` | How much you can raise it per day — protects delegators from sudden spikes. |
| `min-self-delegation` | The floor you promise to keep staked. Drop below it and your validator automatically unbonds. |

### Choosing your commission

Roughly 90% of network rewards get spread across active validators, with the
rest going to the community pool. Of what your validator earns, your
`commission-rate` comes off the top and the remainder splits among your
delegators proportionally.

Lower commission attracts delegators but earns you less per unit of stake.
Most established validators sit in the **5–10%** range. Note that
`commission-max-rate` is permanent — pick a ceiling you can live with for the
life of the validator.

### About the active set

Imagine a room with a fixed number of chairs. The validators with the most
total stake (yours + everyone delegating to you) get one; everyone else is
registered but idle — no rewards, no work — until they gain enough stake to
take a chair.

Check the current cap and your standing:

```bash
safrochaind query staking params --node https://rpc.safrochain.network:443
```

Being in the set means you earn *and* your governance vote carries weight.

## Part 13 — Go live (the irreversible step)

:::danger This is the point of no return
Everything so far has been local. This command writes your validator to the
chain permanently. There is **no delete command** for a validator record —
unbonding to zero only marks it inactive, it never disappears.

Read `validator.json` one more time. Check the commission ceiling and the
zeros on `amount`.
:::

```bash
safrochaind tx staking create-validator ./validator.json \
  --from validator \
  --chain-id safrochain-1 \
  --gas 250000 --gas-prices 0.05usaf \
  --keyring-backend file \
  --node https://rpc.safrochain.network:443 --yes
```

:::note Why a flat `--gas` and not `--gas auto`
`--gas auto --gas-adjustment 1.3` is a common default, but the estimate can
land slightly under what the transaction actually needs, and the tx fails with
`out of gas` — **while still charging you the fee**, because the fee is taken
before execution. A flat, generous `--gas` avoids this. If you prefer auto,
use `--gas-adjustment 1.8` or higher.
:::

### Verify it actually landed

**Do not trust the broadcast response.** It tells you the transaction was
accepted for processing, not that it succeeded. Look it up:

```bash
safrochaind query tx <TXHASH> --node https://rpc.safrochain.network:443
```

Check the `code` field specifically:

- `code: 0` — success.
- `code: 11` — out of gas. Raise `--gas` and retry.
- anything else — it failed. Read the `raw_log` for the reason.

Then confirm the validator exists on-chain:

```bash
safrochaind query staking validator <YOUR_VALOPER_ADDRESS> \
  --node https://rpc.safrochain.network:443
```

You want `status: BOND_STATUS_BONDED` and your moniker. Your `addr_safrovaloper1…`
address is the validator form of your operator address:

```bash
safrochaind keys show validator --bech val -a --keyring-backend file
```

### Confirm you're signing

```bash
journalctl -u safrochaind -f | grep -i 'signed.*vote'
```

Blocks scrolling past with your signature means you're a working validator.

Now go set up [monitoring and alerting](./monitoring) — **before** you rely on
this. The chain penalises downtime and it will not call you. See
[Alerting & runbooks](./alerting).

## Part 14 — Security: why two keys

You now hold two very different keys, and the split is deliberate:

| | Operator key | Consensus key |
| --- | --- | --- |
| **Represents** | You, the person/business | The node itself |
| **Signs** | Transactions, staking, rewards | Every block, automatically |
| **Lives in** | Your keyring (`file` backend) | `priv_validator_key.json` on the node |
| **Recoverable?** | Yes — 24-word mnemonic | No mnemonic; not portable the same way |
| **Should live on the always-online server?** | **No** — keep it off, ideally on a separate machine or hardware wallet | Yes, it has to |

**Why this matters:** if your server gets compromised, the attacker gets
block-signing power — bad, and they can get you slashed by misusing it — but
they **don't get your funds**, because those need the operator key they don't
have.

### If your server is ever compromised

1. **Stop the validator process immediately** to prevent double-signing.
2. **Don't** reuse the same consensus key on a new machine while the old one
   might still be running anywhere. That is exactly what causes slashing.
3. Rotate to a fresh `priv_validator_key.json` (new `--home`, fresh `init`)
   and submit the new consensus pubkey once you're sure the old environment is
   fully decommissioned.
4. Your funds are fine **as long as the operator key was never on that machine.**

### Hardening checklist

- Back up `priv_validator_key.json` and your wallet keys **offline**, encrypted.
- Never store keys in plaintext files, shell history, or public repos.
- Open only the ports you need: `26656` (P2P), `26657` (RPC), `1317` (API),
  `9090` (gRPC). Block everything else — especially `26658` and `6060`.
- Don't expose RPC/REST publicly without a VPN or reverse proxy.
- SSH: key-based auth only, no root login, non-default port.
- **One unique `priv_validator_key.json` per node.** Never run the same one on
  two machines simultaneously.

Once you're stable, move signing off the validator host entirely — see
[Remote signing](./remote-signing) and [Sentry architecture](./sentry-architecture).
A single sentry already hides your validator's address; the foundation
recommends **at least two**, in different regions, so one failure doesn't take
your signing path offline.

## Part 15 — Already on testnet? Moving to mainnet

Treat mainnet as a **parallel setup, not an upgrade**. Testnet and mainnet are
entirely separate chains with separate state, genesis, keys, and funds.
Nothing carries over automatically.

| | Testnet | Mainnet |
| --- | --- | --- |
| Chain ID | `safro-testnet-1` | `safrochain-1` |
| RPC | `https://rpc.testnet.safrochain.com` | `https://rpc.safrochain.network` |
| Funds | Free from [faucet](https://faucet.safrochain.com/) | Real SAF — real money |
| Endpoints | [Testnet endpoints](../networks/testnet-endpoints) | [Mainnet endpoints](../networks/mainnet-endpoints) |

**What you can reuse:** your general workflow and muscle memory — every command
here works the same, just pointed at different values. Check whether your
binary version matches what mainnet currently requires; testnet may be running
a different tag.

**What you must not reuse:**

- **Your testnet operator key.** There's no technical reason you *can't* — it's
  the same key format — but testnet keys are habitually generated with sloppy
  security precisely because the funds are worthless. Generate a fresh key for
  mainnet and treat it like production from minute one.
- **A consensus key across two simultaneously-running nodes.** Never point an
  existing running node at a different chain-id to "switch". Use a completely
  separate `--home` directory so there's zero chance of cross-contamination or
  accidental double-signing.

To run both side by side, give mainnet its own home (e.g. `~/.safrochain`
alongside your existing `~/.safrochain-testnet`), pull the mainnet genesis, sync
independently, and use a fresh key. They coexist happily on separate homes and
keyrings.

## Troubleshooting

Things that actually go wrong, and what to do:

| Symptom | Cause | Fix |
| --- | --- | --- |
| `safrochaind: command not found` | Go's bin dir isn't on your `PATH` | `source $HOME/.bashrc` |
| Node won't sync, no obvious error | Genesis file doesn't match | Re-download and verify the SHA-256 ([Part 4](#part-4--get-the-real-genesis-file)) |
| `Discovering snapshots` forever | Peers aren't serving snapshots, or trust height is stale | Refresh trust height; else disable statesync and full-sync |
| Statesync silently never starts | `trust_period` missing, or same RPC listed twice | Set all five `[statesync]` values; use `rpc1` **and** `rpc2` |
| Peer connection times out | Using an RPC hostname as a P2P peer | Use the official seeds — RPC is behind Cloudflare, no P2P |
| Peer IP doesn't respond | Hardcoded IP from an old guide is dead | Use the official seeds; don't trust static IPs from docs or chat |
| `out of gas`, fee still charged | `--gas auto --gas-adjustment 1.3` under-estimated | Flat `--gas 250000`, or `--gas-adjustment 1.8`+ |
| Tx "succeeded" but nothing happened | You trusted the broadcast response | Always `query tx <hash>` and check `code: 0` |
| Balance check says `key not found` | `--keyring-backend file` missing from the nested `keys show` | Add the flag so it matches how you created the key |
| `--moniker` flag rejected on `edit-validator` | Wrong flag name | It's `--new-moniker` |
| Validator exists but earns nothing | Outside the active set | Check rank/stake; you need enough to take a chair |

## Quick reference

```bash
# Am I synced?
curl -s http://localhost:26657/status | jq -r '.result.sync_info | {catching_up, latest_block_height}'

# My validator's status
safrochaind query staking validator <VALOPER_ADDRESS> --node https://rpc.safrochain.network:443

# Chain-wide staking params (unbonding time, active set size)
safrochaind query staking params --node https://rpc.safrochain.network:443

# My balance
safrochaind query bank balances "<YOUR_ADDRESS>" --node https://rpc.safrochain.network:443

# Rename / re-commission (note: --new-moniker, not --moniker)
safrochaind tx staking edit-validator \
  --new-moniker "new-name" \
  --from validator --chain-id safrochain-1 \
  --gas 100000 --gas-prices 0.05usaf \
  --keyring-backend file \
  --node https://rpc.safrochain.network:443 --yes

# Get out of jail after downtime
safrochaind tx slashing unjail \
  --from validator --chain-id safrochain-1 \
  --gas 100000 --gas-prices 0.05usaf \
  --keyring-backend file \
  --node https://rpc.safrochain.network:443 --yes

# Begin exiting (subject to the unbonding period)
safrochaind tx staking unbond <VALOPER_ADDRESS> <AMOUNT>usaf \
  --from validator --chain-id safrochain-1 \
  --gas 100000 --gas-prices 0.05usaf \
  --keyring-backend file \
  --node https://rpc.safrochain.network:443 --yes
```

## Where to go next

| You want to… | Read |
| --- | --- |
| Understand penalties properly | [Slashing & jail](./slashing) |
| Set up Prometheus + Grafana | [Monitoring](./monitoring) |
| Wire up paging so you hear about downtime | [Alerting & runbooks](./alerting) |
| Get the consensus key off the validator host | [Remote signing](./remote-signing) |
| Lay out sentries properly | [Sentry architecture](./sentry-architecture) |
| Run day-to-day | [Operations](./operations) |
| Plan for the worst | [Disaster recovery](./disaster-recovery) |
