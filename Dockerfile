# Étape 1 : build-frontend
FROM node:18-alpine AS frontend-build
RUN apk update && apk upgrade --no-cache
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

# Étape 2 : backend + frontend
FROM node:18-alpine
RUN apk update && apk upgrade --no-cache
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend ./
COPY --from=frontend-build /app/frontend/build ../frontend/build
EXPOSE 5000
CMD ["node", "server.js"]
 