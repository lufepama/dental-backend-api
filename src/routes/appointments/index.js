const routes = require('express').Router();
const controller = require('../../controller/appointmentsController')
const doctorController = require('../../controller/doctorsController')
const appointmentMiddleware = require('../../middlewares/appointments/index')


//POST
// routes.post('/create', controller.create)
// routes.post('/create-appointment', controller.createAppointment)
routes.post('/generate-daily-agenda', appointmentMiddleware.doctorsToAppointment, controller.generateDailyAgenda)
routes.post('/create-appointment', controller.createAppointment)

//GET
routes.get('/get-agenda/:week', controller.getAgenda)
routes.get('/get-detail-appointment', controller.getDetailAppointment)

//PUT
routes.put('/update-appointment/:id', controller.updateAppointment)

//DELETE
routes.delete('/delete-detail-appointment', controller.deleteDetailAppointment)

module.exports = routes