# Jeddah Gate deployment fix

## Why the build failed
The uploaded project contains these required source files:
- lib/config.ts
- lib/auth.ts
- lib/store.ts
- lib/xlsx.ts

The failed deployment log says Next.js cannot resolve them even though they exist in this source archive. This usually means the deployed repository/build context is incomplete or its Root Directory is not the project root.

## Fix for Git-based deployment
1. In the repository used by the hosting service, confirm `lib/config.ts`, `lib/auth.ts`, `lib/store.ts`, and `lib/xlsx.ts` are present at the repository root under `lib/`.
2. Confirm `components/` and `app/` are at that same root, alongside `package.json`.
3. Commit and push the complete `lib/` directory. Make sure it was not excluded by a deployment ignore rule or omitted from the commit.
4. Set the hosting service's Root Directory to the folder containing `package.json`, `app/`, `components/`, and `lib/`.
5. Redeploy with the same build command:
   `corepack enable && corepack prepare pnpm@10.26.0 --activate && pnpm install --frozen-lockfile && pnpm build`

## Note
The `middleware` deprecation warning is not the cause of this build failure. This environment could not run the full build verification because Corepack could not download pnpm from the npm registry, so the archive is not represented as build-tested.


## v9 startup-path fix
The Dockerfile copies the contents of `.next/standalone` into `/app`, which places the generated server at `/app/server.js`. The startup script now imports `../server.js` from `/app/scripts/render-start.mjs` rather than the nonexistent `/app/.next/standalone/server.js`.
