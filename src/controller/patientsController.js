const db = require('../database/models/index')
const Patients = db.patients

exports.create = async (req, res) => {


    try {
        const userData = req.body
        Patients.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            ocupation: userData.ocupation,
            gender: userData.gender,
            age: userData.age,
            address: userData.address
        }, (err, newUser) => {
            if (err) { return res.status(400).json({ message: `Problemon... ${error}` }) }

            console.log('saved', newUser)

        })

        res.status(200).json({ message: 'Register user', success: true })


    } catch (error) {
        res.status(400).json({ message: `Problemon... ${error}` })

    }

}

exports.getAllPatients = async (req, res) => {

    try {

        const response = await Patients.find({})
        console.log('res', response)

        res.status(200).json({ message: 'There you have', success: true, data: response })

    } catch (error) {
        console.log('err', error)
    }

}