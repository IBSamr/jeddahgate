# Jeddah Gate Agency — Render deployment

This package is a full Node.js web service. It keeps the latest public site, bilingual routes, Shahd chatbot, request tracking, contact/request databases, admin panel, SEO/GEO panel, media uploads, and Google integration routes.

## Deploy

1. Create a private GitHub repository and upload the contents of this package, or use the Render source upload workflow if it is available in your account.
2. In Render, choose **New → Web Service** and connect the repository.
3. Render can use the included `render.yaml`. If entering settings manually, use:
   - Runtime: **Node**
   - Build command: the `buildCommand` from `render.yaml`
   - Start command: `node scripts/render-start.mjs`
   - Node version: **22.13.0 or newer**
4. Add `ADMIN_PASSWORD` in Render Environment. The Blueprint generates the session and encryption secrets automatically.
5. Keep the attached persistent disk mounted at `/var/data`. It stores the SQLite database and uploaded media. Without a persistent disk, submissions and uploads disappear after a deploy or restart.
6. Deploy and open the Render URL to test `/`, `/ar`, `/en`, `/request`, `/track`, `/admin`, and `/seo`.

## URL compatibility

The root URL now serves the Arabic homepage, matching the current `https://jeddahgateagency.com/` behavior. The existing section anchors are preserved: `#من_نحن`, `#خدماتنا`, `#المدونة`, and `#اتصل_بنا`. Compatibility rewrites also support `/about`, `/services`, `/request`, `/offers`, `/articles`, `/contact`, `/track`, and `/chat` while the bilingual `/ar/...` and `/en/...` routes remain available.

In Render, add `jeddahgateagency.com` as a custom domain and follow the DNS records Render displays. Keep the SEO & GEO panel's canonical domain as `https://jeddahgateagency.com`. Render's `onrender.com` address is only the deployment address; attaching the custom domain does not change the application route names.

## First login

Use `/admin` for the content/design panel and `/seo` for SEO/GEO. The username is `admin`; the password is the value you enter as `ADMIN_PASSWORD`. Never commit the password to GitHub or `render.yaml`.

## Email and Google services

Add `RESEND_API_KEY` and `EMAIL_FROM` for confirmation and internal notification emails. Configure SMS/WhatsApp through the messaging webhook variables if needed. For Google OAuth, use `https://jeddahgateagency.com/api/google/callback` as the redirect URL after the custom domain is active.

## Existing data

This source package does not include the private Cloudflare/D1 production database or uploaded private media. Export existing requests and contacts from the current admin panel before migration. The Render disk starts with a new database and the current default content/design configuration.
