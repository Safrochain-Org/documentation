#!/usr/bin/env bash
# Local check: same steps as CI (no cloud deploy). Production goes out by
# pushing to main: GitHub Actions builds and deploys to GitHub Pages.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Install (ci-style)"
npm ci

echo "==> Quality gate"
npm run typecheck
npm run lint

echo "==> Production build"
npm run build

echo "==> OK. Push to main to deploy via GitHub Actions (GitHub Pages)."
