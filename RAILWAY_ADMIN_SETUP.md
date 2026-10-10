# Railway admin login setup

Open Railway → project → service → Variables and add:

- `ADMIN_USER` = `admin`
- `ADMIN_PASSWORD` = `New@12345`
- `ADMIN_SESSION_SECRET` = a unique random secret of at least 32 characters

Then redeploy and open `/admin`. Keep these values in Railway Variables, not in source code. Because this is a public website, change the requested starter password to a unique secret before using the panel for real administration. The application does not hardcode a password fallback.
