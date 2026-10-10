# Jeddah Gate website — Railway deployment

## What this package uses

This project already has database migrations under `drizzle/`. Its current schema and SQL are SQLite/D1-style, so this Railway setup uses Node's built-in SQLite driver rather than switching to PostgreSQL and risking breaking existing queries. The SQLite database and uploaded media must live on a Railway Volume so they survive redeploys.

## 1. Deploy the code

1. Extract this ZIP into a new GitHub repository (keep the project files at the repository root).
2. Push the repository to GitHub.
3. In Railway, create a project and choose **Deploy from GitHub Repo**; select the repository.
4. Railway should read `railway.json`. Build command: `pnpm build`. Start command: `pnpm start`.
5. Use Node.js 22.13 or newer.

## 2. Add persistent storage

In the Railway service, open **Volumes** and add a volume mounted at `/data`.

## 3. Add variables

In the Railway service's **Variables**, set:

- `DB_FILE=/data/jeddah.sqlite`
- `NODE_MEDIA_DIR=/data/media`
- `ADMIN_USER=choose-your-admin-username`
- `ADMIN_PASSWORD=use-a-long-unique-password`
- `ADMIN_SESSION_SECRET=use-a-long-random-secret-at-least-32-characters`
- `NODE_ENV=production`

Do not commit real passwords or secrets to GitHub. Generate a unique random secret for `ADMIN_SESSION_SECRET` and save the values securely.

## 4. Deploy and verify

Trigger a deployment. On startup, `scripts/render-start.mjs` runs `scripts/hostinger-init.mjs`, which creates the SQLite file and applies the SQL migrations in `drizzle/` once. Then it starts the standalone Next.js server. Railway supplies `PORT` automatically.

After deployment:
- Open the public Railway domain and test both English and Arabic pages.
- Test a contact submission and a service/request submission.
- Log in to the admin panel using `ADMIN_USER` and `ADMIN_PASSWORD`.
- Confirm uploaded media remains after a redeploy.
- Configure any external email/Google/chat integrations in Railway Variables as required by your enabled features.

## Important notes

- This uses SQLite on a persistent Railway Volume; it is not a Railway PostgreSQL database. That matches the project's current SQLite SQL and avoids a broad SQL migration.
- The Volume must remain mounted at `/data`, and `DB_FILE` must point inside it. Without persistent storage, database changes can be lost when the service is replaced.
- Before using this in production, test the complete admin workflow and external integrations. A successful build alone does not prove every integration is configured.
