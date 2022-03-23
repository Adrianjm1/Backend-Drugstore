const Router = require('express').Router();
const { validToken } = require('../../user/controllers/middleware');
const Controller = require('./index.js');

Router.get('/',  Controller.getAll);
Router.get('/day', validToken, Controller.getPaymentsByDay);
Router.get('/month',  Controller.getPaymentsByMonth);
Router.get('/bill', validToken, Controller.getPaymentsByBill);
Router.post('/create', validToken, Controller.create);
Router.delete('/delete/:id', validToken, Controller.deletePay);

module.exports = Router

