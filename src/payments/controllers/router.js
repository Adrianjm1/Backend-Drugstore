const Router = require('express').Router();
const {validToken} = require('../../user/controllers/middleware');
const Controller = require('./index.js');

Router.get('/', Controller.getAll);

Router.get('/day', Controller.getPaymentsByDay);
//Router.get('/day', validToken, Controller.getPaymentsByDay);
Router.get('/month', Controller.getPaymentsByMonth);
//Router.get('/month', validToken, Controller.getPaymentsByMonth);

Router.post('/create', Controller.create);

module.exports = Router

