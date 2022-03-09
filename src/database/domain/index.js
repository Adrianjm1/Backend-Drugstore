const { Sequelize } = require('sequelize');

// Dirección de la DB.
<<<<<<< HEAD
// module.exports = new Sequelize('enmanuel', 'root', '', { host: 'localhost', dialect: 'mysql' });
// module.exports = new Sequelize('enmanuel', 'admin', 'i70iUZs1', { host: 'mysql-66731-0.cloudclusters.net', dialect: 'mysql' });
// module.exports = new Sequelize('centrode_enmanuelle', 'centrode_enmanuelle', 'Enmanuelle2022', {
//     host: 'host.hostingmaracaibo.com',
//     dialect: 'mysql'
//   });

module.exports = new Sequelize('drogueri_enmanuelle', 'drogueri_admin', 'Enmanuelle2022', {
    host: 'host.hostingmaracaibo.com',
    dialect: 'mysql'
  });
=======
module.exports = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, { host: process.env.DBHOST, dialect: 'mysql' });
>>>>>>> 3c379459b56c8affecbd9c6c912b9d9c5c1ac020
