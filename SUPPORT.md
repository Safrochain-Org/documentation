# Support

This page tells you the best place to ask for help, depending on what you are
trying to do.

## I want to run a node

- Read: `docs/run-a-node/overview`
- Ask in Discord: https://discord.gg/safrochain (channel: `#node-operators`)

Include in your message:

- chain id (`safro-testnet-1` or `safrochain-1`)
- your `safrochaind version`
- your OS and CPU architecture
- the last ~50 lines of logs around the failure

## I want to become a validator

- Start here: `docs/validators/overview`
- Follow: `docs/validators/become-a-validator`
- Monitoring: `docs/validators/monitoring` (Prometheus + Grafana)
- Alerting: `docs/validators/alerting` (Alertmanager + runbooks)

For urgent validator incidents (jailed, not signing), ask in Discord in
`#validators` and include:

- your `addr_safrovaloper1...` operator address
- your `addr_safrovalcons1...` consensus address
- whether you use TMKMS or Horcrux
- current peer count and disk free %

## I am building a dApp / integrating RPC

Start with:

- `docs/networks/mainnet-endpoints`
- `docs/networks/testnet-endpoints`
- `docs/ibc/overview`

If you report an endpoint issue, include:

- the exact endpoint URL
- request details (method + path)
- response status code and body
- approximate time window (UTC)

## I found a bug in the docs site

Open a GitHub issue with:

- the page URL
- what you expected vs what happened
- screenshots (if UI-related)
- your browser + OS

If the issue is security-related, do not open a public issue. Follow
`SECURITY.md`.

## Security issues

Please report privately as described in `SECURITY.md`.

## Contacts

- Discord: https://discord.gg/safrochain
- GitHub org: https://github.com/Safrochain-Org
- Email: team@safrochain.com
- Security: security@safrochain.com

