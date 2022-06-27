const routes = require('express').Router();
const controller = require('../../controller/doctorsController')

routes.post('/create', controller.create)
routes.get('/get-all-doctors', controller.getAllDoctors)


module.exports = routes