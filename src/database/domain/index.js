const { Sequelize } = require('sequelize');

// Dirección de la DB.
module.exports = new Sequelize('emmanuel', 'root', '', { host: 'localhost', dialect: 'mysql' });