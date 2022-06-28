const db = require('../../database/models/index')
const Patient = db.patients



exports.patientExists = async (req, res) => {

    try {
        const patientId = req.body._id
        const query = await Patient.findById(patientId).exec()

        if (query) {
            return res.status(201).send({ message: 'El usuario no existe..' })
        }
        return res.status(404).send({ message: 'El paciente no existe..' })

    } catch (error) {
        res.status(400).send({ message: 'Ha habido un problema..' })

    }

}