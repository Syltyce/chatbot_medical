// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assure-toi que le chemin est correct

const User = sequelize.define('User', {
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true // Tu peux définir si l'âge est obligatoire ou non
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: true // Tu peux définir si la date de naissance est obligatoire ou non
  }
});

module.exports = User;
