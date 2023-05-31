FROM node:18-alpine AS base

# This Dockerfile is copy-pasted from https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile
# Only customize one line for tsconfig.components.json

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=app --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

COPY --from=builder /app/tsconfig.components.json .

RUN yarn turbo run build --filter=app...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/packages/app/next.config.js .
COPY --from=installer /app/packages/app/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/packages/app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/packages/app/.next/static ./packages/app/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/packages/app/public ./packages/app/public

CMD ["node", "packages/app/server.js"]
