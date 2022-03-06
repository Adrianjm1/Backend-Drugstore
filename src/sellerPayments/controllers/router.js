const Router = require('express').Router();
const {validToken} = require('../../user/controllers/middleware');
const Controller = require('./index.js');

Router.get('/', validToken, Controller.getAll);
Router.post('/create', validToken, Controller.create);
Router.get('/:id', validToken, Controller.getPayBySeller);


module.exports = Router

