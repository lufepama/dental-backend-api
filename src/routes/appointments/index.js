const routes = require('express').Router();
const controller = require('../../controller/appointmentsController')
const doctorController = require('../../controller/doctorsController')


//POST
routes.post('/create', controller.create)
routes.post('/create-appointment', controller.createAppointment)
routes.post('/generate-annual-agenda', doctorController.getAllDoctors, controller.generateAnnualAgenda)

//GET
routes.get('/get-agenda/:week', controller.getAgenda)
routes.get('/get-detail-appointment', controller.getDetailAppointment)

//PUT
routes.put('/update-appointment/:id', controller.updateAppointment)

//DELETE
routes.delete('/delete-detail-appointment', controller.deleteDetailAppointment)

module.exports = routes