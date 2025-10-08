# Étape 1 : build frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Installer les dépendances frontend
COPY frontend/package*.json ./
RUN npm install

# Copier tout le code frontend et build
COPY frontend ./
RUN npm run build

# Étape 2 : backend + frontend statique
FROM node:18-alpine

WORKDIR /app/backend

# Installer les dépendances backend
COPY backend/package*.json ./
RUN npm install --production

# Copier le code backend
COPY backend ./

# Copier les fichiers statiques du frontend buildé
COPY --from=frontend-build /app/frontend/build ../frontend/build

# Configurer Express pour servir le frontend
# (assure-toi que ton server.js contient `express.static()` pour ../frontend/build)
EXPOSE 5000

# Lancer le serveur Node
CMD ["node", "server.js"]
