---
title: Validators overview
description: What a Safrochain validator does, the full lifecycle from setup to retirement, and where to start in this section.
sidebar_position: 1
keywords:
  - Safrochain validator
  - validator overview
  - validator lifecycle
  - CometBFT consensus
  - proof of stake
  - Cosmos validator
  - validator operations
---

A **validator** is the operator of a CometBFT consensus node that proposes and
signs blocks for Safrochain. In return for keeping the chain live, validators
earn block rewards and a configurable commission on stake delegated to them.
This section covers the entire validator lifecycle, from first setup through
day-2 operations to graceful exit.

## What a validator actually does

| Responsibility | Why it matters |
| --- | --- |
| Run a synced full node | You cannot sign blocks you have not seen |
| Hold and protect a **consensus key** | Used to sign every block; loss or duplication causes slashing |
| Hold and protect an **operator key** | Used to send `tx staking edit-validator`, `unjail`, withdraw rewards |
| Stay online (target ≥ 99.9 %) | Missing too many blocks → jailed → slashed |
| Never double-sign | One signature at the same height from two hosts is permanent jail |
| Apply chain upgrades on time | Coordinated upgrades expect all validators at the new height |
| Monitor & alert 24/7 | The chain pages **you** when it sees you, not the other way around |
| Communicate with delegators | Commission changes, identity, governance positions |

## The lifecycle at a glance

```text
   ┌─────────────────┐
   │   Set up host   │  hardware, OS, time-sync, firewall
   └────────┬────────┘
            ▼
   ┌─────────────────┐
   │  Sync full node │  state-sync or snapshot, then catch up
   └────────┬────────┘
            ▼
   ┌─────────────────┐
   │ Generate keys   │  operator + consensus, secure backups
   └────────┬────────┘
            ▼
   ┌─────────────────┐
   │ Move signing    │  TMKMS or Horcrux behind sentries
   │ off the host    │
   └────────┬────────┘
            ▼
   ┌─────────────────┐
   │ create-validator│  self-delegation, commission, moniker
   └────────┬────────┘
            ▼
   ┌─────────────────┐
   │  Going live     │  Prometheus + Grafana + Alertmanager
   └────────┬────────┘
            ▼
   ┌─────────────────┐
   │   Day-2 ops     │  edit-validator, withdraw, upgrades
   └────────┬────────┘
            ▼
   ┌─────────────────┐
   │  Exit / migrate │  unbond, transfer, retire signer
   └─────────────────┘
```

## Where to start in this section

| If you want to… | Read |
| --- | --- |
| Launch a validator for the first time | [Launch your first validator](./validator-walkthrough) |
| Understand operator vs consensus keys | [Key management](./key-management) |
| Stand up your first validator end-to-end (concise) | [Become a validator](./become-a-validator) |
| Move signing off the validator host | [Remote signing](./remote-signing) |
| Lay out sentries and validator topology | [Sentry architecture](./sentry-architecture) |
| Set up Prometheus + Grafana | [Monitoring](./monitoring) |
| Wire Alertmanager + paging | [Alerting & runbooks](./alerting) |
| Run day-to-day operations | [Operations](./operations) |
| Harden the host | [Security](./security) |
| Recover from disaster | [Disaster recovery](./disaster-recovery) |
| Understand penalties | [Slashing & jail](./slashing) |

## Minimum viable validator (MVV)

The **smallest** stack the foundation considers production-ready on mainnet:

1. One validator host, dedicated to `safrochaind`, behind a firewall.
2. Two **public sentries** in front of the validator (P2P-only entry points).
3. **Remote signing** via TMKMS or Horcrux 2-of-3: the validator host
   never holds the consensus key on disk in plaintext.
4. **Prometheus + Grafana + Alertmanager** scraping the validator and
   sentries; one paging integration (Discord/PagerDuty/Telegram).
5. **Encrypted off-host backups** of operator key, consensus state, and
   genesis/upgrade plans.
6. **Two operators** with documented runbooks who can both unjail at 3 a.m.

Anything smaller is a learning lab. Anything larger is a refinement of the
same six pillars.

## Status of the network

| Network | Chain ID | Status | Validator slots |
| --- | --- | --- | --- |
| Mainnet | `safrochain-1` | **live** since `2026-06-25T10:00:00Z` | open via `MsgCreateValidator` |
| Testnet | `safro-testnet-1` | live | open, faucet-funded |

Always validate on testnet first. Every page in this section assumes you
have a synced node: see [Run a node](../run-a-node/overview) if you do not
have one yet.
