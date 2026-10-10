# Jeddah Gate — Railway deployment fix

This ZIP contains the full project with `app/`, `package.json`, `next.config.ts`, and `scripts/` at the same project root.

## Why the previous deployment failed

The deployed `package.json` invoked `scripts/check-next-root.mjs`, but Railway could not find that file in the source tree. This package build no longer depends on that preflight script.

## Deploy carefully

1. Extract the **entire ZIP** into the GitHub repository branch connected to Railway. Do not copy only `package.json`.
2. Confirm the repository root contains all of these paths:
   - `package.json`
   - `pnpm-lock.yaml`
   - `next.config.ts`
   - `app/page.tsx`
   - `app/layout.tsx`
   - `scripts/prepare-standalone.mjs`
3. Set Railway's Root Directory to the folder containing these files. If they are at repository root, leave the field blank.
4. Use the build command:

   `corepack enable && corepack prepare pnpm@10.26.0 --activate && pnpm install --frozen-lockfile && pnpm build`

5. Trigger a fresh deployment after committing all files.

The build script is now `HOSTINGER_BUILD=true next build --webpack && node scripts/prepare-standalone.mjs`.
If Next.js still says it cannot find `app/` or `pages/`, Railway is not building from the project root or the full source tree has not been committed; a package.json-only update cannot fix missing application files.


## Admin panel credentials (Railway)

In Railway → your service → Variables, set these server-side variables (do not add them to client-side code):

- `ADMIN_USER=admin`
- `ADMIN_PASSWORD=New@12345`
- `ADMIN_SESSION_SECRET=` followed by a long, unique random secret (at least 32 characters)

Redeploy after saving the variables. The admin login is at `/admin`. For a public production site, replace the requested password with a unique strong password after initial access; never commit real secrets to the repository. The login intentionally fails closed when `ADMIN_PASSWORD` or `ADMIN_SESSION_SECRET` is missing.
