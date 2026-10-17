const CHAT_PAGE = '/chat';

const launcherStyle: Record<string, string | number> = {
  position: 'fixed',
  right: '1rem',
  bottom: '1.25rem',
  zIndex: 2147483647,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  boxShadow: '0 18px 48px rgba(15, 23, 42, 0.22)',
  background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
  pointerEvents: 'auto',
  animation: 'safrochain-askme-entrance 0.45s ease-out forwards, safrochain-askme-pulse 3s ease-in-out 0.7s infinite',
};

const linkStyle: Record<string, string | number> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.65rem',
  padding: '0.95rem 1.1rem',
  textDecoration: 'none',
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.95rem',
  minWidth: '4.2rem',
  minHeight: '3rem',
};

const iconStyle: Record<string, string | number> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  fontSize: '1rem',
};
function injectStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById('safrochain-askme-client-styles')) return;

  const styleEl = document.createElement('style');
  styleEl.id = 'safrochain-askme-client-styles';
  styleEl.textContent = `
    #safrochain-askme-launcher {
      position: fixed !important;
      right: 20px !important;
      bottom: 28px !important;
      z-index: 2147483647 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 999px !important;
      padding: 6px !important;
      pointer-events: auto !important;
      -webkit-tap-highlight-color: transparent;
    }

    #safrochain-askme-launcher > a {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0.6rem !important;
      padding: 0.9rem 1.1rem !important;
      text-decoration: none !important;
      color: #fff !important;
      font-weight: 700 !important;
      font-size: 0.95rem !important;
      background: linear-gradient(135deg, #2563eb, #0ea5e9) !important;
      border-radius: 999px !important;
      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.28) !important;
      border: 2px solid rgba(255,255,255,0.06) !important;
      transform: translateY(16px) scale(0.96);
      animation: safrochain-askme-entrance 420ms cubic-bezier(.2,.9,.3,1) forwards, safrochain-askme-pulse 3s ease-in-out 0.7s infinite;
    }

    #safrochain-askme-launcher a:hover { transform: translateY(0) scale(1.02) !important; }

    #safrochain-askme-launcher .safro-askme-icon {
      display: inline-flex !important;
      width: 2.2rem !important;
      height: 2.2rem !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 1.05rem !important;
    }

    @keyframes safrochain-askme-entrance {
      from { opacity: 0; transform: translateY(16px) scale(0.94); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes safrochain-askme-pulse {
      0%, 100% { box-shadow: 0 18px 48px rgba(15, 23, 42, 0.22); }
      50% { box-shadow: 0 26px 70px rgba(37, 99, 235, 0.28); }
    }

    /* Very visible debug border for initial testing */
    #safrochain-askme-launcher.debug {
      outline: 3px dashed rgba(255, 69, 58, 0.85) !important;
    }
  `;

  document.head.appendChild(styleEl);
}

function createChatButton(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const existing = document.getElementById('safrochain-askme-launcher');
  if (existing) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.id = 'safrochain-askme-launcher';

  // Add temporary debug class so users can see it immediately; remove after 6s
  wrapper.className = 'debug';

  const link = document.createElement('a');
  link.href = CHAT_PAGE;
  link.setAttribute('aria-label', 'Open Ask me chatbot');

  const icon = document.createElement('span');
  icon.className = 'safro-askme-icon';
  icon.textContent = '💬';

  const text = document.createElement('span');
  text.textContent = 'Ask me';

  link.appendChild(icon);
  link.appendChild(text);
  wrapper.appendChild(link);

  // Prefer attaching into the footer element so the button is explicitly tied
  // to the `.safro-footer` area in the page. Fall back to body when footer
  // is not present (dev server/loading order differences).
  try {
    const footer = document.querySelector('.safro-footer');
    if (footer && footer.appendChild) {
      footer.appendChild(wrapper);
      wrapper.setAttribute('data-attached', 'footer');
      console.info('[safrochain] Ask me launcher appended to .safro-footer');
    } else {
      document.body.appendChild(wrapper);
      console.info('[safrochain] Ask me launcher appended to document.body');
    }
  } catch (e) {
    // Very defensive: fallback to body
    try { document.body.appendChild(wrapper); } catch (err) {}
  }

  // Remove debug outline after a few seconds so it doesn't remain in prod screenshots
  window.setTimeout(() => {
    try { wrapper.classList.remove('debug'); } catch (e) {}
  }, 6000);

  // Developer-visible log to confirm injection
  try { console.info('[safrochain] Ask me launcher mounted', wrapper); } catch (e) {}
}

export default function (): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const mountButton = () => {
    injectStyles();
    createChatButton();
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    mountButton();
  } else {
    document.addEventListener('DOMContentLoaded', mountButton, { once: true });
  }
}

// Debug banner to help testers locate the floating button when it doesn't render
function createDebugBanner(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById('safrochain-askme-debug-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'safrochain-askme-debug-banner';
  banner.style.position = 'fixed';
  banner.style.left = '50%';
  banner.style.transform = 'translateX(-50%)';
  banner.style.bottom = '18px';
  banner.style.zIndex = '2147483648';
  banner.style.background = 'rgba(0,0,0,0.72)';
  banner.style.color = '#fff';
  banner.style.padding = '10px 14px';
  banner.style.borderRadius = '999px';
  banner.style.fontWeight = '600';
  banner.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';

  banner.innerHTML = `
    Ask me button should appear bottom-right. 
    <a href="/chat" style="color:#fff;text-decoration:underline;margin-left:8px">Open chat</a>
    <button id="safrochain-askme-debug-close" style="margin-left:10px;background:transparent;border:1px solid rgba(255,255,255,0.12);color:#fff;padding:6px 8px;border-radius:8px;cursor:pointer">Dismiss</button>
  `;

  document.body.appendChild(banner);

  const close = document.getElementById('safrochain-askme-debug-close');
  if (close) {
    close.addEventListener('click', () => { try { banner.remove(); } catch (e) {} });
  }

  // Auto-remove after 20s
  window.setTimeout(() => { try { banner.remove(); } catch (e) {} }, 20000);
}

// Mount debug banner alongside the launcher to make it impossible to miss during tests
try { createDebugBanner(); } catch (e) { /* ignore */ }
