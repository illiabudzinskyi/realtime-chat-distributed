# ============================================
# 🏗️ 1. BUILD STAGE
# ============================================
FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

ENV NX_DAEMON=false
ENV CI=true

RUN npx nx build @chromaspace/shared
RUN npx nx build user-service
RUN npm cache clean --force

# ============================================
# 🚀 2. RUNNER STAGE
# ============================================
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev
RUN npm cache clean --force

COPY --from=builder /app/dist ./dist

# 🧩 Temp layer for @chromaspace/shared
# In real prod will be npm publish
RUN rm -rf /app/node_modules/@chromaspace/shared && \
    mkdir -p /app/node_modules/@chromaspace/shared && \
    cp -r /app/dist/libs/shared/* /app/node_modules/@chromaspace/shared/

EXPOSE 3000
CMD ["node", "dist/apps/user-service/main.js"]