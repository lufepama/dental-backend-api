const routes = require('express').Router();
const controller = require('../../controller/doctorsController')

routes.post('/create', controller.create)

module.exports = routes