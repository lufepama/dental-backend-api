const db = require('../database/models/index')
const Appointments = db.appointments


exports.create = async (req, res) => {

    try {
        const patientData = req.body

        Appointments.create({
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            phoneNumber: patientData.phoneNumber,
            ocupation: patientData.ocupation,
            gender: patientData.gender,
            age: patientData.age,
            address: patientData.address,
            month: patientData.selectedMonth,
            day: patientData.selectedDay,
            time: patientData.time,
        }, (err, newUser) => {
            if (err) { console.log('err', err) }

            console.log('saved', newUser)

        })

        res.status(200).json({ message: 'Register Appointmet', success: true, data: doctorData })

    } catch (error) {
        res.status(400).json({ error: error, success: false })

    }
}