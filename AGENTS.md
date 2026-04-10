# AGENTS hand-off: unity-asset-store-site

## Project intent
- Static landing page for studio `Gutsy vole`.
- Studio focus: 3D assets for Unity Asset Store.
- Current truthful product state:
  - Only one announced pack: `Pirate Island Pack`.
  - Status: `WIP` (not released yet).

## Stack and structure
- Plain static site (no framework):
  - `index.html`
  - `styles.css`
  - `script.js`
  - assets: `logo.png`, `logo-transparent.png`, `background.png`
- Keep edits lightweight and direct; no bundler required.

## Content rules (important)
- Do not invent released products, packs, ratings, customer logos, or metrics.
- Keep copy factual and aligned with current state:
  - one WIP pack (`Pirate Island Pack`)
  - studio landing page only
- If asked to add new products, confirm they are real before publishing them in copy.

## Deployment
- CI/CD is already configured in GitHub Actions:
  - workflow: `.github/workflows/deploy.yml`
  - trigger: push to `main` (and manual dispatch)
- Deploy target:
  - S3 bucket: `vgogilchyn-static-site`
  - CloudFront distribution: `E1WKEOMCIKLVAJ`
  - domain: `https://vgog.uk`
- AWS OIDC role for Actions:
  - `arn:aws:iam::039304676246:role/github-actions-unity-asset-store-site-deploy`

## Operational policy for agents
- Do not deploy automatically unless the user explicitly asks.
- Default flow for normal work:
  1. edit files
  2. commit
  3. push
  4. check workflow status
- For deployment verification:
  - check GH Actions run status first
  - then check `https://vgog.uk` response headers/content freshness

## Useful commands
- Local git state:
  - `git status --short`
- Push changes:
  - `git push origin main`
- CI check:
  - `gh run list --repo lslayer/unity-asset-store-site --workflow "Deploy Static Site" --limit 5`
  - `gh run view <run_id> --repo lslayer/unity-asset-store-site`
- Production reachability:
  - `curl -I https://vgog.uk`

## Known follow-up task
- During the next site update, upgrade GitHub Actions versions to handle Node.js 20 deprecation warnings:
  - currently `actions/checkout@v4`
  - currently `aws-actions/configure-aws-credentials@v4`
