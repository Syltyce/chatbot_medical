// backend/config/config.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nom de la base de données
  process.env.DB_USER,      // Utilisateur de la base de données
  process.env.DB_PASSWORD,  // Mot de passe
  {
    host: process.env.DB_HOST,  // Nom du service MySQL (service db dans docker-compose.yml)
    dialect: 'mysql',
  }
);

module.exports = sequelize;
