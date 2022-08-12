const db = require('../database/models/index')
const Appointments = db.appointments
const PatientAppointments = db.patientAppointments


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
        }, (err, newAppointment) => {
            if (err) { console.log('err', err) }
            res.status(200).json({ message: 'Register Appointmet', success: true, data: newAppointment })
        })

        res.status(300).json({ message: 'Error', success: false, })

    } catch (error) {
        res.status(400).json({ error: error, success: false })
    }
}

exports.createAppointment = async (req, res) => {

    try {
        const data = req.body
        const { weekOfYear, year, appointments } = data
        PatientAppointments.create({
            weekOfYear: weekOfYear,
            year: year,
            appointments: appointments
        }, (err, newAppointment) => {
            if (err) { return res.status(400).json({ message: 'Register patient Appoint', success: true }) }
            return res.status(200).json({ message: 'Register patient Appoint', success: true, data: newAppointment })
        })

    } catch (error) {
        return res.status(200).json({ message: error, success: false })
    }
}

exports.getAgenda = async (req, res) => {

    try {

        const weekOfYear = req.params['week']
        console.log({ weekOfYear });

        const agenda = await PatientAppointments.find({ weekOfYear: weekOfYear }).exec();

        return res.status(200).json({ message: 'error', success: true, data: agenda })


    } catch (error) {
        return res.status(200).json({ message: error, success: false })

    }

}