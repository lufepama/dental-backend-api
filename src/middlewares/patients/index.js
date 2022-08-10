const db = require('../../database/models/index')
const Patient = db.patients
const objectID = require('mongodb').ObjectID

exports.patientExists = async (req, res, next) => {

    try {
        const patientId = req.body._id
        const query = await Patient.findById(objectID(patientId)).exec()

        if (query) {
            next()
            return
        }

        return res.status(401).send({ message: 'Ha habido un problema..' })

    } catch (error) {
        return res.status(400).send({ message: 'Ha habido un problema..' })
    }

}