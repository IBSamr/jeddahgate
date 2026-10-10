# Railway deployment — corrected project layout

This ZIP is arranged with the actual Next.js project at the archive root. When extracting or copying it to the GitHub repository, keep `package.json`, `next.config.ts`, `app/`, `components/`, `lib/`, `scripts/`, and `railway.json` together at the same level. Do **not** put the extracted contents inside an additional `jeddah/` directory unless Railway's Root Directory is explicitly set to `/jeddah`.

## Railway settings

- **Root Directory:** repository root (blank/default) when these files are at the root.
- **Build Command:** `corepack enable && corepack prepare pnpm@10.26.0 --activate && pnpm install --frozen-lockfile && pnpm build`
- **Start Command:** `pnpm start`

If a custom Build Command is configured in Railway service settings, it overrides the auto-detected/config-as-code build command. Ensure it runs `pnpm build` after installation. Railway's Root Directory setting controls where build and deploy commands run.

## What was changed

- Pinned `packageManager` to `pnpm@10.26.0`.
- The build script now runs `scripts/check-next-root.mjs` before Next.js. It reports the exact missing files and working directory rather than leaving the opaque “Couldn't find any pages or app directory” error.
- The Next.js build is invoked with `.` as the explicit project directory.
- Retained `HOSTINGER_BUILD=true` because this project replaces the `cloudflare:workers` module for non-Cloudflare hosting and its data access code references that runtime module.

## Important deployment step

Downloading this ZIP does not change the code in your GitHub repository. Replace the repository files with this ZIP's contents, commit, and push to the exact branch connected to Railway. Then trigger a fresh deployment. In the log, look for:

`[Railway preflight] Next.js project root verified: /app`

If that line does not appear, Railway is still building an older commit or using a different project/root directory.
