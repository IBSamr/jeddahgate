# Railway healthcheck fix

This version changes Railway's healthcheck path from `/en` to `/`.
The project has a root App Router page at `app/page.tsx`, so `/` is the most direct
healthcheck target and avoids relying on the localized route.

Deploy the project root (the folder containing `package.json`, `app/`, `lib/`,
`components/`, and `railway.json`) and use `pnpm start` as the start command.

If Railway still reports a network healthcheck failure, inspect the **Deploy Logs**
for the start command and the **HTTP Logs** for the healthcheck request. A path
change cannot fix a process that crashes before binding to the assigned `PORT`.
