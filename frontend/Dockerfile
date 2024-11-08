# Utilise une image de base pour Node.js
FROM node:18-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers `package.json` et `package-lock.json`
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tous les fichiers du projet
COPY . .

# Expose le port 3000 pour le frontend
EXPOSE 3000

# Commande pour lancer l'application en mode développement
CMD ["npm", "start"]
