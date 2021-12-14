const Router = require('express').Router();
const {validToken} = require('../../user/controllers/middleware');
const Controller = require('./index.js');

Router.get('/', Controller.getAll);
Router.get('/day', validToken, Controller.getPaymentsByDay);
Router.get('/month', validToken, Controller.getPaymentsByMonth);
Router.get('/:id', Controller.getOne); 
Router.get('/make', Controller.make);

module.exports = Router

