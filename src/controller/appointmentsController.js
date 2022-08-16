const db = require('../database/models/index')
const Appointments = db.appointments
const PatientAppointments = db.patientAppointments
const objectID = require('mongodb').ObjectID
const myController = require('./appointmentsController')
const agendaHelpers = require('../helpers/appointments/generateAgendaStructure')

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
        return res.status(400).json({ message: error, success: false })
    }
}

exports.generateAnnualAgenda = async (req, res) => {

    try {

        const doctors = req.doctors

        const response = agendaHelpers.getAppointmentObject('doctorName', 'doctorId')

        console.log({ response })

        return res.status(201).json({ success: true })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false })
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

exports.updateAppointment = async (req, res) => {

    try {

        const weekOfYear = '43'
        const doctorAgendaId = req.body.doctorAgendaId
        const appointmentCellId = req.body.appointmentCellId
        const updatedDescription = 'Es un ejemplo de descripcion modificada'
        const updatedSpecialsit = 'CAREMAZO'

        const resp = await PatientAppointments.updateOne(
            {
                'weekOfYear': weekOfYear,
                'appointments': {
                    '$elemMatch': {
                        'doctorAppointmentsId': 'doctorAppointmentsId',
                        'hoursAppointments.appointmentId': 'appointmentId'
                    },
                }
            },
            {
                '$set': {
                    'appointments.$[outer].hoursAppointments.$[inner].description': 'updatedDescription',
                    'appointments.$[outer].hoursAppointments.$[inner].specialist': ''
                }
            },
            {
                'arrayFilters': [
                    { 'outer.doctorAppointmentsId': 'doctorAppointmentsId' },
                    { 'inner.appointmentId': 'appointmentId' },
                ]
            }
        )



        return res.status(201).json({ success: true, resp: resp })

    } catch (error) {
        console.log(error)
        return res.status(404).json({ success: false, error: error })
    }

}
