const routes = require('express').Router();
const controller = require('../../controller/patientsController')
const mwAuth = require('../../middlewares/validationAuth')

routes.post('/create', controller.create)

routes.get('/all-patients', controller.getAllPatients)

module.exports = routes