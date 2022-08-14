const routes = require('express').Router();
const controller = require('../../controller/appointmentsController')

routes.post('/create', controller.create)

routes.post('/create-appointment', controller.createAppointment)
routes.get('/get-agenda/:week', controller.getAgenda)
routes.put('/update-appointment/:id', controller.updateAppointment)

module.exports = routes