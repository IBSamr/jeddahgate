# Hostinger deployment

This is a server-backed application. Use a Hostinger Node.js-capable plan or VPS, not static-only shared hosting. The private Sites deployment is for review. Do not make the site public until administrator authentication and business contact details have been configured.

## Node.js deployment

1. Install Node.js 22.13 or newer (24 LTS recommended), and pnpm 10.12.1.
2. Upload or clone the repository and run `pnpm install --frozen-lockfile`.
3. Configure the variables below in the hosting environment. Keep secrets outside public files.
4. Run `node scripts/hostinger-init.mjs` to apply the versioned SQLite migrations.
5. Build with `HOSTINGER_BUILD=true pnpm exec next build --webpack`.
6. Copy `public` to `.next/standalone/public` and `.next/static` to `.next/standalone/.next/static`.
7. Run `.next/standalone/server.js` with `PORT=3000` behind Hostinger's HTTPS reverse proxy.
8. In the control panel set the canonical origin to your actual domain, enter official contact details and Google Maps URLs, preview, then publish. Enable search indexing only when publicly launched.

Database and uploaded media directories must be writable and persistent. Back up both regularly. The Sites build uses D1/R2; the Node deployment uses SQLite and the media directory. Migrating existing production records from Sites requires a data migration, not just copying source. The downloadable source is ready for setup; no Hostinger account has been changed and the Node production build and core workflows have been verified locally; deployment to Hostinger itself still needs your hosting account.

## Required production variables

```
PRIVATE_OWNER_ADMIN=false
ADMIN_PASSWORD=<long unique password>
ADMIN_SESSION_SECRET=<random secret>
TOKEN_ENCRYPTION_KEY=<random secret>
DB_FILE=/absolute/persistent/path/jeddah.sqlite
NODE_MEDIA_DIR=/absolute/persistent/path/media
```

For cloud SQL instead of local SQLite, omit DB_FILE and supply DB_HTTP_URL and DB_HTTP_TOKEN for a libSQL HTTP endpoint. For remote media use MEDIA_UPLOAD_URL, MEDIA_UPLOAD_TOKEN and MEDIA_PUBLIC_URL instead of NODE_MEDIA_DIR.

## Optional email and messaging

- Email: `RESEND_API_KEY`, `EMAIL_FROM` (a verified sender).
- SMS / WhatsApp: `MESSAGE_WEBHOOK_URL`, `MESSAGE_WEBHOOK_TOKEN` for your messaging adapter. It receives POST JSON `{channel,to,text,reference,language}`. The adapter must use your SMS or WhatsApp Business provider; the UI does not provision provider accounts.
- Add your operational inbox in Contact settings to receive internal submission notifications.
- If delivery is not configured the record is still saved and the confirmation screen displays the reference and private tracking code.

## Google integration

Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `TOKEN_ENCRYPTION_KEY` and optionally `GA_PROPERTY_ID`. Enable Search Console API, Analytics Data API, and Business Profile APIs in your Google Cloud project. Configure the OAuth consent screen and add `https://YOUR-DOMAIN/api/google/callback` as the redirect URI. Authorise the account through SEO & GEO → Google reports. Then set the Search Console property, GA4 numeric property ID and Business Profile account ID in SEO settings. API access and Business Profile availability depend on your Google account permissions. Tokens are encrypted in the database.

Keyword and backlink inventories are editable. Search Console provides query/page traffic, not full backlink data or keyword volume. Backlink monitoring requires an additional provider. Editing inventory does not modify external websites.

## Shahd

Shahd uses configured FAQ questions and comma-separated keyword rules. It is a controlled automated answer bot, not an unrestricted generative AI integration. Chat transcripts are saved in the database. An unguessable conversation link enables the separate chat tab. Request status uses a separate reference and private code.

## Templates and content

Use Content & Brand to save drafts, preview, publish and restore versions. Save company templates and export/import JSON to use the same website for another company. Templates contain public content and design configuration; they do not contain administrator credentials, clients or private requests. Deploy a separate instance per company for data separation.
