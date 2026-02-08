# Étape 1 : build frontend
FROM node:18-alpine AS frontend-build
RUN apk update && apk upgrade --no-cache
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend ./
RUN npm run build


# Étape 2 : runtime backend + static frontend build
FROM node:18-alpine AS runtime
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Backend deps (prod only, reproducible)
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Backend source
COPY backend ./

# Frontend build output served by backend (ou static hosting)
COPY --from=frontend-build /app/frontend/build /app/frontend/build

EXPOSE 5000
CMD ["node", "server.js"]
