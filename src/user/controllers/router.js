const Router = require('express').Router();
const Controller = require('./index.js');
const {validToken} = require('./middleware');

Router.post('/login', Controller.login);
Router.post('/signup', validToken, Controller.signup);


module.exports = Router