# Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY public ./public
COPY prisma ./prisma
COPY tsconfig.json next.config.ts tailwind.config.ts postcss.config.js ./
COPY app ./app
COPY i18n ./i18n
COPY components ./components
COPY contexts ./contexts
COPY lib ./lib
COPY messages ./messages
COPY middleware.ts ./middleware.ts

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN npx prisma generate
RUN pnpm build

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

FROM node:20-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/i18n ./i18n
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/middleware.ts ./middleware.ts

ENTRYPOINT ["/bin/sh", "/app/entrypoint.sh"]

ENV PORT=3000
EXPOSE 3000

CMD ["pnpm", "start"]
