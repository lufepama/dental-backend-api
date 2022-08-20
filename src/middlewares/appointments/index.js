const db = require('../../database/models/index')
const Doctors = db.doctors


exports.doctorsToAppointment = async (req, res, next) => {
    try {

        const query = await Doctors.find({})
        console.log({ query })
        if (query.length != 0) {
            req.doctors = query
            next()
            return
        }
        return res.status(200).json({ success: false, message: 'No doctors registered' })

    } catch (error) {
        return res.status(400).json({ success: false, error: error })

    }
}