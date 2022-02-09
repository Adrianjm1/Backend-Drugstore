const { Sequelize } = require('sequelize');

// Dirección de la DB.
module.exports = new Sequelize('enmanuel', 'root', '', { host: 'localhost', dialect: 'mysql' });
// module.exports = new Sequelize('enmanuel', 'admin', 'i70iUZs1', { host: 'mysql-66731-0.cloudclusters.net', dialect: 'mysql' });
// module.exports = new Sequelize('centrode_enmanuelle', 'centrode_enmanuelle', 'Enmanuelle2022', {
//     host: 'host.hostingmaracaibo.com',
//     dialect: 'mysql'
//   });