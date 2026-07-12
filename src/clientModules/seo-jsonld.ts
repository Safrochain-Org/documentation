/**
 * Per-route SEO enrichment.
 *
 * On every successful client navigation we:
 *  1. Refresh `<link rel="canonical">` so it always reflects the URL the
 *     user is currently looking at (Docusaurus renders the initial value
 *     server-side, but SPA-style transitions keep the original href if
 *     we don't update it).
 *  2. Emit a fresh `BreadcrumbList` JSON-LD graph derived from the path
 *     segments. This gives Google rich-result eligibility for breadcrumb
 *     navigation in SERPs and matches the visual breadcrumb the theme
 *     renders.
 *  3. Keep `og:url` and `twitter:url` in sync with the current route.
 *
 * The script is intentionally framework-agnostic: it only touches the
 * DOM when running in a browser context, and is a no-op during SSR.
 */

declare const document: Document;
declare const window: Window & typeof globalThis;

const SITE_URL = 'https://docs.safrochain.com';
const BREADCRUMB_SCRIPT_ID = 'safro-breadcrumb-jsonld';

function ensureMeta(selector: string, attrs: Record<string, string>): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value);
    }
    document.head.appendChild(el);
    return;
  }
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
}

function ensureCanonical(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function humaniseSegment(segment: string): string {
  return segment
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildBreadcrumbList(pathname: string) {
  const cleaned = pathname.replace(/\/+$/, '');
  const segments = cleaned.split('/').filter(Boolean);

  const items: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
  ];

  let acc = '';
  segments.forEach((seg, idx) => {
    acc += `/${seg}`;
    items.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: humaniseSegment(decodeURIComponent(seg)),
      item: `${SITE_URL}${acc}`,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function syncRouteSeo(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const fullUrl = `${SITE_URL}${window.location.pathname}${window.location.search}`;
  const canonicalUrl = `${SITE_URL}${window.location.pathname.replace(/\/+$/, '') || '/'}`;

  ensureCanonical(canonicalUrl);
  ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  ensureMeta('meta[name="twitter:url"]', { name: 'twitter:url', content: fullUrl });

  // Replace any prior breadcrumb graph with the one for this route.
  const existing = document.getElementById(BREADCRUMB_SCRIPT_ID);
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = BREADCRUMB_SCRIPT_ID;
  script.textContent = JSON.stringify(buildBreadcrumbList(window.location.pathname));
  document.head.appendChild(script);
}

export function onRouteDidUpdate(): void {
  syncRouteSeo();
}

if (typeof window !== 'undefined') {
  // Docusaurus calls onRouteDidUpdate after the first paint of every
  // client navigation, but the very first page load happens before this
  // module is registered, so we also run once on hydration.
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    syncRouteSeo();
  } else {
    window.addEventListener('DOMContentLoaded', syncRouteSeo, { once: true });
  }
}
