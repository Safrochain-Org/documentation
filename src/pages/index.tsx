import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';

type NetworkPillProps = {
  label: string;
  href: string;
  state: 'live' | 'soon';
  external?: boolean;
};

function NetworkPill({ label, href, state, external }: NetworkPillProps): React.JSX.Element {
  const Tag: React.ElementType = external ? 'a' : Link;
  const props = external
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { to: href };
  return (
    <Tag className={`safro-pill safro-pill--${state}`} {...props}>
      <span
        className="safro-dot"
        style={{ color: state === 'live' ? '#34d399' : '#fbbf24' }}
        aria-hidden
      />
      <span style={{ color: 'var(--ifm-font-color-base)' }}>{label}</span>
    </Tag>
  );
}

type HomeCardProps = {
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
};

function HomeCard({ eyebrow, title, desc, href }: HomeCardProps): React.JSX.Element {
  return (
    <Link className="safro-card" to={href}>
      <div className="safro-card-eyebrow">{eyebrow}</div>
      <div className="safro-card-title">{title}</div>
      <div className="safro-card-desc">{desc}</div>
      <div style={{ marginTop: 12, fontSize: 13, color: 'var(--safro-accent-light)' }}>
        Open guide →
      </div>
    </Link>
  );
}

function GitHubIcon(): React.JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ArrowIcon(): React.JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function SocialIconDiscord(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249-1.845-.276-3.68-.276-5.486 0-.164-.393-.406-.874-.617-1.249a.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.12 13.12 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.25-.192.368-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.119.099.243.198.369.292a.077.077 0 0 1-.006.127 12.4 12.4 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.88 19.88 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.673-3.548-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z" />
    </svg>
  );
}

function SocialIconX(): React.JSX.Element {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SocialIconTelegram(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.04 15.47 8.9 19.2c.5 0 .72-.22.98-.48l2.35-2.25 4.86 3.56c.89.49 1.52.23 1.76-.82l3.19-14.96h0c.29-1.35-.49-1.88-1.34-1.56L1.9 10.02c-1.31.51-1.29 1.24-.24 1.57l4.88 1.52L18.1 6.06c.54-.33 1.03-.15.62.18" />
    </svg>
  );
}

function Hero(): React.JSX.Element {
  return (
    <header className="safro-hero" style={{ padding: '4rem 0 1.75rem' }}>
      <div className="container">
        <div
          style={{
            maxWidth: 980,
            margin: '0 auto',
            padding: '0 1rem',
            textAlign: 'left',
          }}
        >
          <div
            className="safro-glass"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 999,
              padding: '0.32rem 0.75rem',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.01em',
              color: 'var(--ifm-color-content-secondary)',
              gap: '0.45rem',
            }}
          >
            <span
              className="safro-dot"
              style={{ color: '#fbbf24' }}
              aria-hidden
            />
            Cosmos SDK Layer-1 · Mainnet Q3 2026
          </div>

          <h1
            style={{
              marginTop: '1rem',
              fontSize: 'clamp(2rem, 3.6vw, 2.8rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontWeight: 700,
            }}
          >
            Build on Safrochain
          </h1>

          <p
            style={{
              marginTop: '0.85rem',
              fontSize: '1.02rem',
              lineHeight: 1.6,
              color: 'var(--ifm-color-content-secondary)',
              maxWidth: 760,
            }}
          >
            Safrochain empowers communities through fast, affordable, and accessible
            blockchain infrastructure tailored for real-world use cases. A Cosmos SDK
            Layer-1 built for mobile-first users, everyday payments, and real utility,
            with support for{' '}
            <strong>local currencies</strong> and{' '}
            <strong>non-USD denominated stablecoins</strong>
            {' '}so everyday prices map to the economy people actually use, connecting
            local economies to global markets with sovereign block space, predictable
            fees, and IBC rails to the wider Cosmos ecosystem.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              marginTop: '1.4rem',
              flexWrap: 'wrap',
            }}
          >
            <Link className="safro-cta-primary" to="/intro">
              Get started
              <ArrowIcon />
            </Link>
            <a
              className="safro-cta-secondary"
              href="https://github.com/Safrochain-Org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>

          {/* Live network pills */}
          <div
            style={{
              marginTop: '1.6rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
            }}
          >
            <NetworkPill
              label="Testnet RPC"
              href="https://rpc.testnet.safrochain.com"
              state="live"
              external
            />
            <NetworkPill
              label="Testnet REST"
              href="https://rest.testnet.safrochain.com"
              state="live"
              external
            />
            <NetworkPill
              label="Faucet"
              href="https://faucet.safrochain.com/"
              state="live"
              external
            />
            <NetworkPill
              label="Explorer"
              href="https://explorer.safrochain.com/"
              state="live"
              external
            />
            <NetworkPill label="Mainnet (Q3 2026)" href="/networks/mainnet-endpoints" state="soon" />
            <NetworkPill
              label="Status"
              href="https://status.safrochain.network"
              state="soon"
              external
            />
          </div>
        </div>
      </div>
    </header>
  );
}

type ArchNodeProps = { title: string; sub?: string; href?: string };
function ArchNode({ title, sub, href }: ArchNodeProps): React.JSX.Element {
  const inner = (
    <>
      <div className="safro-node-title">{title}</div>
      {sub ? <div className="safro-node-sub">{sub}</div> : null}
    </>
  );
  if (href) {
    return (
      <Link className="safro-node safro-node--link" to={href}>
        {inner}
      </Link>
    );
  }
  return <div className="safro-node">{inner}</div>;
}

function ArchArrows({ count = 4 }: { count?: number }): React.JSX.Element {
  return (
    <div className="safro-arch-arrows" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="safro-arch-arrow" />
      ))}
    </div>
  );
}

function Architecture(): React.JSX.Element {
  return (
    <section className="safro-arch">
      <div className="safro-arch-bg" aria-hidden />
      <div className="safro-arch-inner">
        <div className="safro-arch-eyebrow">Architecture</div>
        <h2 className="safro-arch-title">
          One stack: chain, nodes, validators, and IBC
        </h2>
        <p className="safro-arch-sub">
          Safrochain is a Cosmos SDK + CometBFT Layer-1. Wallets and dApps reach
          the chain through public RPC, REST, and gRPC. Validators run consensus,
          relayers move assets across IBC, and a small set of chain-specific
          modules unlocks fee-paying smart contracts and recurring payouts.
        </p>

        <div className="safro-arch-stack">
          {/* Tier 1: Clients */}
          <div className="safro-tier">
            <div className="safro-tier-label">Apps & Clients</div>
            <div className="safro-tier-row">
              <ArchNode
                title="Wallets"
                sub="Keplr, Leap, Cosmostation, Ledger"
                href="/developers/wallets/supported-wallets"
              />
              <ArchNode
                title="dApps"
                sub="Web, mobile, CosmWasm contracts"
                href="/developers/start-here"
              />
              <ArchNode title="Block Explorer" sub="explorer.safrochain.com" />
              <ArchNode title="IBC counterparties" sub="ATOM, OSMO, Noble, Stride" />
            </div>
          </div>

          <ArchArrows count={4} />

          {/* Tier 2: Public endpoints */}
          <div className="safro-tier">
            <div className="safro-tier-label">Public endpoints</div>
            <div className="safro-tier-row">
              <ArchNode title="RPC" sub="CometBFT JSON-RPC · :26657" />
              <ArchNode title="REST" sub="Cosmos SDK gRPC-gateway · :1317" />
              <ArchNode title="gRPC" sub="Native protobuf API · :9090" />
              <ArchNode title="P2P" sub="Validator + node mesh · :26656" />
            </div>
          </div>

          <ArchArrows count={3} />

          {/* Tier 3: Operators */}
          <div className="safro-tier">
            <div className="safro-tier-label">Operators</div>
            <div className="safro-tier-row">
              <ArchNode title="Validators" sub="CometBFT consensus, block proposing & signing" />
              <ArchNode title="Full / sentry nodes" sub="Public seeds, RPC fan-out" />
              <ArchNode title="IBC relayers" sub="Hermes / rly, cross-chain packets" />
            </div>
          </div>

          <ArchArrows count={3} />

          {/* Tier 4: Cosmos SDK application core */}
          <div className="safro-tier safro-tier--core">
            <div className="safro-tier-label">Cosmos SDK application: safrochaind</div>
            <div className="safro-modules">
              <span className="safro-mod-chip">Bank</span>
              <span className="safro-mod-chip">Staking</span>
              <span className="safro-mod-chip">Distribution</span>
              <span className="safro-mod-chip">Slashing</span>
              <span className="safro-mod-chip">Gov</span>
              <span className="safro-mod-chip">Auth</span>
              <span className="safro-mod-chip">IBC</span>
              <span className="safro-mod-chip">ICA</span>
              <span className="safro-mod-chip">CosmWasm</span>
              <span className="safro-mod-chip safro-mod-chip--accent">Token factory</span>
              <span className="safro-mod-chip safro-mod-chip--accent">FeePay</span>
              <span className="safro-mod-chip safro-mod-chip--accent">FeeShare</span>
              <span className="safro-mod-chip safro-mod-chip--accent">Drip</span>
              <span className="safro-mod-chip safro-mod-chip--accent">Clock</span>
              <span className="safro-mod-chip safro-mod-chip--accent">CW Hooks</span>
            </div>
          </div>

          <ArchArrows count={2} />

          {/* Tier 5: Foundation */}
          <div className="safro-tier">
            <div className="safro-tier-label">Foundation</div>
            <div className="safro-tier-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <ArchNode title="CometBFT" sub="BFT consensus & networking" />
              <ArchNode title="IAVL state store" sub="Versioned merkle tree" />
              <ArchNode title="usaf base unit" sub="1 SAF = 1 000 000 usaf" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardGrid(): React.JSX.Element {
  return (
    <section style={{ padding: '0 0 3rem' }}>
      <div className="container">
        <div
          style={{
            maxWidth: 1060,
            margin: '0 auto',
            padding: '0 1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.85rem',
          }}
        >
          <HomeCard
            eyebrow="RUN A NODE"
            title="Install & sync safrochaind"
            desc="Build from source, configure peers, and join testnet or mainnet."
            href="/run-a-node/overview"
          />
          <HomeCard
            eyebrow="VALIDATORS"
            title="Become a validator"
            desc="create-validator flag-by-flag, commission, and self-delegation."
            href="/validators/become-a-validator"
          />
          <HomeCard
            eyebrow="NETWORKS"
            title="Public endpoints"
            desc="Live RPC, REST, gRPC, P2P seeds, faucet, and explorer."
            href="/networks/mainnet-endpoints"
          />
          <HomeCard
            eyebrow="INTEROP"
            title="IBC & relayers"
            desc="Hermes setup template and the canonical channels list."
            href="/ibc/overview"
          />
          <HomeCard
            eyebrow="DEVELOPERS"
            title="Start here"
            desc="Mobile, wallets, CosmJS, SafHandle, and smart contracts: pick your path."
            href="/developers/start-here"
          />
          <HomeCard
            eyebrow="DEVELOPERS"
            title="Wallets & Cosmos Kit"
            desc="Keplr, Leap, Cosmostation, and browser wallet connect for dApps."
            href="/developers/wallets/cosmos-kit"
          />
        </div>
      </div>
    </section>
  );
}

function CommunityCTA(): React.JSX.Element {
  return (
    <section style={{ padding: '0 0 4.5rem' }}>
      <div className="container">
        <div
          style={{
            maxWidth: 980,
            margin: '0 auto',
            padding: '1.6rem 1rem 0',
            borderTop: '1px solid var(--safro-border)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>
                Join the community
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  color: 'var(--ifm-color-content-secondary)',
                  lineHeight: 1.55,
                }}
              >
                Validator coordination happens in Discord. Releases and upgrades are
                announced on Telegram and X.
              </div>
            </div>
            <div className="safro-social-row safro-social-row--icons">
              <a
                href="https://discord.gg/fe2XAm6ENQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Safrochain on Discord"
              >
                <SocialIconDiscord />
              </a>
              <a
                href="https://x.com/safrochain"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Safrochain on X"
              >
                <SocialIconX />
              </a>
              <a
                href="https://t.me/safrochainannonce"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Safrochain on Telegram"
              >
                <SocialIconTelegram />
              </a>
              <a
                href="https://github.com/Safrochain-Org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Safrochain on GitHub"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const homepageDescription =
    'Official Safrochain documentation: build on, validate, and ' +
    'operate Safrochain, a Cosmos SDK Layer-1 for fast, affordable, ' +
    'mobile-first payments, remittances, and IBC-connected economies.';

  // TechArticle / WebPage JSON-LD for the documentation home, plus
  // duplicated description so it overrides the site-wide default in
  // page-specific previews.
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://docs.safrochain.com/#home',
    url: 'https://docs.safrochain.com/',
    name: 'Safrochain Documentation',
    description: homepageDescription,
    inLanguage: 'en',
    isPartOf: { '@id': 'https://docs.safrochain.com/#website' },
    about: { '@id': 'https://safrochain.com/#organization' },
    primaryImageOfPage: 'https://docs.safrochain.com/img/og.png',
  };

  return (
    <Layout>
      <Head>
        <title>Safrochain Docs: Cosmos SDK Layer-1 for mobile-first payments</title>
        <meta name="description" content={homepageDescription} />
        <link rel="canonical" href="https://docs.safrochain.com/" />
        <meta
          name="keywords"
          content="Safrochain, Safrochain docs, Cosmos SDK, Layer-1, blockchain, validator, IBC, CometBFT, SAF, mobile-first payments, remittances, African blockchain, RPC, REST, gRPC, staking, governance"
        />
        <meta property="og:title" content="Safrochain Docs: Cosmos SDK Layer-1" />
        <meta property="og:description" content={homepageDescription} />
        <meta property="og:url" content="https://docs.safrochain.com/" />
        <meta name="twitter:title" content="Safrochain Docs: Cosmos SDK Layer-1" />
        <meta name="twitter:description" content={homepageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(homeJsonLd)}
        </script>
      </Head>
      <main>
        <Hero />
        <Architecture />
        <CardGrid />
        <CommunityCTA />
      </main>
    </Layout>
  );
}
