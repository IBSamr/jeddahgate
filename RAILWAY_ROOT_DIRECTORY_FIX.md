# Railway build root fix

The build log says Next.js cannot find `app/` or `pages/`. That means the directory where `next build` runs does not contain the Next.js application folders.

This archive has a flat project layout. After extracting it, the repository root should contain all of these side-by-side:

- `package.json`
- `railway.json`
- `next.config.ts`
- `app/`
- `components/`
- `public/`

In Railway, set the service's **Root Directory** to the repository root (usually leave the field blank). Do not point it at a subfolder. The build now checks these files before running Next.js and prints an actionable error if the wrong directory is selected.
