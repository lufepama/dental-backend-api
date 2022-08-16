const db = require('../database/models/index')
const Doctors = db.doctors


exports.create = async (req, res) => {

    try {
        const doctorData = req.body

        Doctors.create({
            firstName: doctorData.firstName,
            lastName: doctorData.lastName,
            spectiality: doctorData.spectiality,
            qualification: doctorData.qualification,
            phoneNumber: doctorData.phoneNumber,
            address: doctorData.address
        }, (err, newUser) => {
            console.log('saved', newUser)

        })

        res.status(200).json({ message: 'Register Doctor', success: true })

    } catch (error) {
        res.status(400).json({ error: error, success: false })

    }
}

exports.getAllDoctors = async (req, res, next) => {

    try {

        const query = await Doctors.find({})

        // To use this function as midleware in appointmentsController
        if (next) {
            req.doctors = query
            next()
        }
        else {
            if (query) {
                return res.status(200).json({ success: true, data: query })
            }
            return res.status(200).json({ success: true })
        }



    } catch (error) {
        res.status(400).json({ error: error, success: false })
    }

}