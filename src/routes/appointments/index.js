const routes = require('express').Router();
const controller = require('../../controller/appointmentsController')

routes.post('/create', controller.create)

routes.post('/create-appointment', controller.createAppointment)
routes.get('/get-agenda/:week', controller.getAgenda)

module.exports = routes