# Railway Dockerfile deployment

This version explicitly uses the root `Dockerfile` rather than Nixpacks. Railway's Dockerfile builder should be selected automatically when the Dockerfile is present; `railway.json` also declares `DOCKERFILE`.

## Railway settings
- Root directory: the folder containing `package.json`, `Dockerfile`, and `railway.json` (leave blank if those are at repository root).
- Builder: Dockerfile / Dockerfile detected.
- Start command: leave blank to use the Dockerfile CMD, or set `node scripts/render-start.mjs`.
- Healthcheck path: `/api/config` (confirm this route returns HTTP 200 in the deployed environment).
- For persistent SQLite data, attach a Railway Volume at `/app/data`. Set `DB_FILE=/app/data/jeddah.sqlite`.

## Important
The Dockerfile and config are updated, but this archive has not been deployed to Railway. If health checks still fail, inspect the first runtime error in Deploy Logs; a health-check path cannot fix a process that crashes during SQLite migration or startup.
