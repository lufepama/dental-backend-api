const routes = require('express').Router();
const controller = require('../../controller/appointmentsController')

routes.post('/create', controller.create)


module.exports = routes