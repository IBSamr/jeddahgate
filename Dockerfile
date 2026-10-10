# Railway Dockerfile for the JeddahGate Next.js app
FROM node:22-bookworm-slim AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.26.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV HOSTINGER_BUILD=true
RUN pnpm build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Next.js standalone output includes the production server and traced dependencies.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# The app's startup script runs SQLite migrations before starting Next.js.
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/drizzle ./drizzle
RUN mkdir -p /app/data
EXPOSE 3000
CMD ["node", "scripts/render-start.mjs"]
