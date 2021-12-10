const Router = require('express').Router();

Router.use('/payments', require('./payments/controllers/router.js'));
Router.use('/bill', require('./bill/controllers/router.js'));
Router.use('/amounts', require('./amounts/controllers/router.js'));
Router.use('/user', require('./user/controllers/router.js'));
Router.use('/seller', require('./seller/controllers/router.js'));

module.exports = Router