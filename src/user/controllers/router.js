const Router = require('express').Router();
const Controller = require('./index.js');
const {validToken, checkToken} = require('./middleware');

Router.post('/login', Controller.login);
Router.post('/signup', validToken, Controller.signup);
Router.get('/', checkToken, Controller.comprobate);

module.exports = Router