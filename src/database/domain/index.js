const { Sequelize } = require('sequelize');

// Dirección de la DB.
module.exports = new Sequelize('enmanuel', 'root', '', { host: 'localhost', dialect: 'mysql' });