---
name: Astro Upgrade
description: Bi-weekly check for new Astro releases. If found, reads the changelog and upgrade docs, then creates a PR with all required changes.

on:
  schedule:
    - cron: "bi-weekly"
  workflow_dispatch:

permissions:
  contents: read
  pull-requests: read
  issues: read

timeout-minutes: 30

engine:
  id: claude

tools:
  github:
    toolsets: [default]
  web-fetch:
  edit:
  bash: ["*"]

network:
  allowed:
    - node
    - github
    - api.anthropic.com
    - "docs.astro.build"

safe-outputs:
  create-pull-request:
    title-prefix: "[astro-upgrade] "
    labels: [dependencies, automated]
    draft: false
    protected-files: allowed
    if-no-changes: ignore
---

# Astro Upgrade Agent

You are an expert JavaScript/TypeScript developer specializing in Astro projects. Your task is to check for new Astro releases and, if found, upgrade this project and open a pull request.

## Step 1 – Detect available upgrades

Read `package.json` at the repository root to identify the currently installed versions of all Astro-related packages (e.g. `astro`, `@astrojs/*`).

For each Astro-related package in `dependencies` and `devDependencies`, query the npm registry to find the latest stable version:

```bash
npm view astro version
npm view @astrojs/tailwind version
# … repeat for every @astrojs/* package found in package.json
```

If none of the Astro-related packages have a newer version available, stop here and do nothing (no PR needed).

## Step 2 – Read the changelog and upgrade guide

Fetch the following resources and read them carefully before making any changes:

1. **Astro CHANGELOG** – https://raw.githubusercontent.com/withastro/astro/main/packages/astro/CHANGELOG.md
   Focus on every entry that is newer than the currently installed version.

2. **"Upgrading Astro" docs** – https://docs.astro.build/en/upgrade-astro/
   Pay close attention to breaking changes and migration steps for each release.

## Step 3 – Plan the upgrade

Based on what you read in Step 2, produce a concise upgrade plan that covers:
- Which packages will be bumped and to what version
- Any breaking changes that affect this project's source files (check `src/`, `astro.config.mjs`, `tsconfig.json`)
- Configuration changes required (e.g. renamed options, removed integrations, new required fields)
- Dependency changes (peer deps, new required packages, removed packages)

## Step 4 – Apply changes

Apply all changes required to upgrade Astro:

1. **Update `package.json`** – Bump the version strings for every affected package to their latest stable versions. Do not change the package manager field or engines field.

2. **Update source files** – Apply any migration changes identified in Step 3 (e.g. updated imports, renamed APIs, new configuration syntax in `astro.config.mjs`).

3. **Install dependencies and verify the build** – Run:
   ```bash
   npm install
   npm run build
   ```
   If the build fails, analyse the error output and apply additional fixes until the build succeeds, iterating as needed.

## Step 5 – Create a pull request

Once the build passes, create a pull request using the following guidelines:

- **Title**: `Upgrade Astro to vX.Y.Z` (use the new Astro version)
- **Body**: Include:
  - Summary of all packages upgraded and their old → new versions
  - Highlights of breaking changes that were addressed
  - Link to the relevant CHANGELOG section(s)
  - Link to https://docs.astro.build/en/upgrade-astro/

Use the `create-pull-request` safe output to open the PR. Target the default branch.
