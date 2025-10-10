# Étape 1 : build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Étape 2 : backend + frontend
FROM node:18-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend ./
COPY --from=frontend-build /app/frontend/build ../frontend/build
EXPOSE 5000
CMD ["node", "server.js"]
 