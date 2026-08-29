import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import ChatBot from '../components/ChatBot';

export default function ChatPage(): React.JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Ask me</title>
        <meta
          name="description"
          content="Ask the Safrochain documentation assistant about testnet, RPC, node setup, CLI commands, and the chain registry."
        />
      </Head>
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <section className="card padding--lg">
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-content-secondary)', margin: 0 }}>
                    Safrochain documentation assistant.
                  </p>
                  <h1 style={{ margin: '0.4rem 0 0', fontSize: 'clamp(2rem, 3.2vw, 2.8rem)' }}>
                    Ask me
                  </h1>
                </div>
                <p style={{ margin: 0, color: 'var(--ifm-color-content-secondary)', lineHeight: 1.8 }}>
                  This page helps you find the right Safrochain documentation page and summarize the next steps.
                  Ask for testnet endpoints, CLI commands, node setup, or how to use the chain registry.
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <ChatBot />
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
