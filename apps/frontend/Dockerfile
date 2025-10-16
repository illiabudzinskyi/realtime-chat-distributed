# ============================================
# 🏗️ 1. BUILD STAGE
# ============================================
FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

RUN rm -f apps/frontend/.env.local

COPY apps/frontend/.env.docker apps/frontend/.env

RUN npx nx build frontend --prod

# ============================================
# 🚀 2. RUNNER STAGE
# ============================================
FROM nginx:alpine

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]