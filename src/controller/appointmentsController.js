const db = require('../database/models/index')
const Appointments = db.appointments
const PatientAppointments = db.patientAppointments
const objectID = require('mongodb').ObjectID
const myController = require('./appointmentsController')
const agendaHelpers = require('../helpers/appointments/generateAgendaStructure')
const appointmentMethods = require('../helpers/appointments/index')

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
        let agendaAppointments = []
        doctors.forEach((x, i) => {
            const response = agendaHelpers.getAppointmentObject(x.firstName, x._id)
            agendaAppointments.push(response)
        })

        const { weekOfYear, currentYear } = appointmentMethods.getWeekOfTheYear()

        if (weekOfYear && currentYear) {
            await PatientAppointments.create({
                weekOfYear: weekOfYear,
                year: currentYear,
                appointments: agendaAppointments
            }, (err, newAppointment) => {
                if (err) { console.log('err', err) }
                return res.status(200).json({ message: 'Register Appointmet', success: true, data: newAppointment })
            })
        } else {
            return res.status(201).json({ success: true, data: agendaAppointments })
        }

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

exports.getDetailAppointment = async (req, res) => {

    try {
        const data = req.body
        const { weekOfYear, year, doctorAppointmentsId, appointmentId } = data

        const query = await PatientAppointments.findOne(
            {
                'weekOfYear': weekOfYear,
                'year': year,
            },
        )
        const appointments = query.appointments
        let doctorAgenda = []
        let appointmentData = {}

        for (let i = 0; i < appointments.length; i++) {
            if (appointments[i]?.doctorAppointmentsId == doctorAppointmentsId) {
                doctorAgenda = appointments[i]
                break
            }
        }

        const doctorHourAgenda = doctorAgenda?.hoursAppointments

        for (let j = 0; j < doctorHourAgenda.length; j++) {
            if (doctorHourAgenda[j].appointmentId == appointmentId) {
                console.log(doctorHourAgenda[j]);
                appointmentData = doctorHourAgenda[j]
                break
            }
        }

        if (!query) { return res.status(400).json({ message: 'Ha habido un problema con la peticion', success: false }) }

        return res.status(200).json({ message: 'There you have', success: true, data: appointmentData })

    } catch (error) {
        console.log({ error })
        return res.status(401).json({ success: false })
    }

}

exports.deleteDetailAppointment = async (req, res) => {

    try {

        const data = req.body
        const { weekOfYear, year, doctorAppointmentsId, appointmentId } = data
        const resp = await PatientAppointments.updateOne(
            {
                'weekOfYear': weekOfYear,
                'year': year,
                'appointments': {
                    '$elemMatch': {
                        'doctorAppointmentsId': doctorAppointmentsId,
                        'hoursAppointments.appointmentId': appointmentId
                    },
                }
            },
            {
                '$set': {
                    'appointments.$[outer].hoursAppointments.$[inner].description': '',
                    'appointments.$[outer].hoursAppointments.$[inner].specialist': '',
                    'appointments.$[outer].hoursAppointments.$[inner].squares': '',
                    'appointments.$[outer].hoursAppointments.$[inner].isOccupated': false,
                    'appointments.$[outer].hoursAppointments.$[inner].patientId': '',
                    'appointments.$[outer].hoursAppointments.$[inner].isDisplayed': true,

                }
            },
            {
                'arrayFilters': [
                    { 'outer.doctorAppointmentsId': doctorAppointmentsId },
                    { 'inner.appointmentId': appointmentId },
                ]
            }
        )

        return res.status(200).json({ success: true, data: resp })

    } catch (error) {
        console.log({ error })
        return res.status(401).json({ success: false })

    }

}