# Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY public ./public
COPY prisma ./prisma
COPY tsconfig.json next.config.ts tailwind.config.ts postcss.config.js ./
COPY app ./app

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN npx prisma generate
RUN pnpm build

FROM node:20-alpine AS runtime

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

ENV PORT=3000
EXPOSE 3000

CMD ["pnpm", "start"]
