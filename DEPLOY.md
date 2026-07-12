# GitHub Pages deploy (GitHub Actions)

Production deploys use **only GitHub Actions**: build the Docusaurus site and publish
with `actions/upload-pages-artifact` + `actions/deploy-pages`. No Vercel or other
host tokens are required in the repo.

## One-time: enable Pages

1. Open the repo on GitHub → **Settings** → **Pages** (left sidebar under “Code and automation”).

2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).

3. After the first successful run of **CI and Deploy** on `main`, the site will be available at the URL GitHub shows (see below). You can add a **Custom domain** there (e.g. `docs.safrochain.com`) and follow the DNS instructions GitHub provides.

**No** `VERCEL_*` (or other) secrets are required for this flow.

## Default URL vs custom domain

| Setup | What you get |
| --- | --- |
| **Project site** (repo `documentation`) | `https://safrochain-org.github.io/documentation/` |
| **Custom domain** in Pages settings | Your domain (e.g. `https://docs.safrochain.com/`) with `static/CNAME` already in the build |

If you use the default `https://<org>.github.io/<repo>/` **without** a custom domain, set
Docusaurus `baseUrl` in `docusaurus.config.ts` to `'/<repo>/'` (e.g. `'/documentation/'`).
With a custom domain at the **root** of the site, keep `baseUrl: '/'` and align `url`
with the live hostname (already `https://docs.safrochain.com` in this project).

## How deploy runs

| Event | What happens |
| --- | --- |
| Pull request | `npm ci` → typecheck → lint → build. **No** deploy. |
| Push to `main` | Same build, then **Upload Pages artifact**, then **Deploy to GitHub Pages**. |
| **Run workflow** on `main` | Same as push (manual re-deploy). |

Workflow file: [`.github/workflows/ci.yml`](.github/workflows/ci.yml). The environment
`github-pages` and live URL are created by GitHub when Pages uses Actions.

## Local check (no cloud deploy)

```bash
npm run deploy
```

This runs the same quality steps as CI and stops after `build/`. Pushing to `main`
is what updates the live site.

## DNS (custom domain)

In **Settings** → **Pages** → **Custom domain**, add `docs.safrochain.com` (or
your host). GitHub will show a **CNAME** target (usually
`<user>.github.io` or a verification CNAME). Add that record at your DNS provider; see
[GitHub: managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Troubleshooting

- **“Workflow is not run”**: Source must be **GitHub Actions**, not “branch”.
- **404**: Check `baseUrl` vs real URL; wait for the green check on the **Deploy to GitHub Pages** job.
- **Old Vercel errors in history**: Removed; new runs use Pages only.
