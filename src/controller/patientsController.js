const db = require('../database/models/index')
const Patients = db.patients
const { ObjectId } = require('mongodb')


const DIR = '/images/profile/'


exports.create = async (req, res) => {

    try {
        const userData = req.body
        const fullNameInfo = userData.firstName + ' ' + userData.lastName
        const url = req.protocol + '://' + req.get('host')
        Patients.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            ocupation: userData.ocupation,
            gender: userData.gender,
            age: userData.age,
            address: userData.address,
            fullName: fullNameInfo,
            profileImg: url + DIR + req.file.filename
        }, (err, newUser) => {
            if (err) { return res.status(400).json({ message: `Problemon... ${error}` }) }

        })

        res.status(200).json({ message: 'Register user', success: true })


    } catch (error) {
        res.status(400).json({ message: `Problemon... ${error}` })
    }

}

exports.updateInformation = async (req, res) => {

    try {
        const patientInfo = req.body

        const query = await Patients.findOneAndUpdate({ _id: patientInfo._id }, {
            firstName: patientInfo.firstName,
            lastName: patientInfo.lastName,
            phoneNumber: patientInfo.phoneNumber,
            ocupation: patientInfo.ocupation,
            gender: patientInfo.gender,
            age: patientInfo.age,
            address: patientInfo.address,
            fullName: patientInfo.firstName + ' ' + patientInfo.lastName,
        })

        console.log({ query });

        res.status(200).json({ message: 'Register userd', success: true })

    } catch (error) {
        console.log({ error })
        res.status(400).json({ message: 'Register user', success: false })
    }
}


exports.deletePatient = async (req, res) => {

    try {
        const patientId = req.params.id
        const query = await Patients.deleteOne({ _id: ObjectId(patientId) })

        if (query) {
            return res.status(200).json({ message: 'User deleted', success: true })
        }
        return res.status(400).json({ message: `Problemon... ${error}` })


    } catch (error) {
        res.status(400).json({ message: `Problemon... ${error}` })
    }
}

exports.getAllPatients = async (req, res) => {

    try {

        const response = await Patients.find({})

        res.status(200).json({ message: 'There you have', success: true, data: response })

    } catch (error) {
        console.log('err', error)
    }

}

exports.updatePersonalInformation = async (req, res) => {

    try {
        const patientId = req.params.id

        console.log('body', req.body)

        res.status(200).json({ message: 'oK', success: true })
    } catch (error) {

    }

}