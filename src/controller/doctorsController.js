const db = require('../database/models/index')
const Doctors = db.doctors

const getRandomNumber = () => {

}

const appointmentsOptions = [
    {
        type: 'General',
        descriptionList:[
            {
                code: 'g-01',
                description:'Primera visita'
            },
            {
                code: 'g-02',
                description:'Revisión general'
            },
            {
                code: 'g-03',
                description:'Urgencia'
            },
            {
                code: 'g-04',
                description:'Medidas de férulas de descarga'
            },
            {
                code: 'g-05',
                description:'Entrega de prótesis',
            },
            {
                code: 'g-06',
                description:'Medidas coronas sobre diente'
            },
            {
                code: 'g-07',
                description:'Medidas coronas sobre implantes'
            },
    ]
    },
    {
        type: 'Periodoncista',
        descriptionList:[
            {
                code: 'p-01',
                description:'Valoración periodoncial'
            },
            {
                code: 'p-02',
                description:'Revisión periodoncial'
            },
            {
                code: 'p-03',
                description:'Raspados o curetaje'
            },
            {
                code: 'p-04',
                description:'Mantenimiento periodoncial'
            },
            {
                code: 'p-05',
                description:'Cirugía periodoncial',
            }
    ]
    },
    {
        type: 'Endodoncista',
        descriptionList:[
            {
                code: 'e-01',
                description:'Valoración'
            },
            {
                code: 'e-02',
                description:'Endodoncia'
            },
            {
                code: 'e-03',
                description:'Reendondoncia'
            },
            {
                code: 'e-04',
                description:'Revisión'
            },
    ]
    },
    {
        type: 'Cirujano',
        descriptionList:[
            {
                code: 'c-01',
                description:'Valoración extracciones'
            },
            {
                code: 'c-02',
                description:'Valoración implantes'
            },
            {
                code: 'c-03',
                description:'Extracciones'
            },
            {
                code: 'c-04',
                description:'Implantes'
            },
            {
                code: 'c-05',
                description:'Revisión',
            },
            {
                code: 'c-06',
                description:'Segunda fase'
            },
            {
                code: 'c-07',
                description:'Elevación de seno'
            },
            {
                code: 'c-08',
                description:'Colocación de membrana'
            },
    ]
    },
    {
        type: 'Ortodoncista',
        descriptionList:[
            {
                code: 'c-01',
                description:'Primera visita'
            },
            {
                code: 'c-02',
                description:'Colocación'
            },
            {
                code: 'c-03',
                description:'Refinamiento'
            },
            {
                code: 'c-04',
                description:'Medida de retenedores'
            },
            {
                code: 'c-05',
                description:'Colocación de retenedores',
            },
            {
                code: 'c-06',
                description:'Colocación de retenedor inferior fijo'
            },
    ]
    },

]

exports.create = async (req, res) => {

    try {
        const doctorData = req.body
        const doctorSpeciality = doctorData.speciality
        console.log('doctorSpeciality', doctorSpeciality)
        const selectedDoctor = appointmentsOptions.filter(el => 
            el.type == doctorSpeciality
        )
        console.log({selectedDoctor})

        Doctors.create({
            firstName: doctorData.firstName,
            lastName: doctorData.lastName,
            spetiality: doctorData.spetiality,
            qualification: doctorData.qualification,
            phoneNumber: doctorData.phoneNumber,
            address: doctorData.address,
            appointmentsAvailable: selectedDoctor[0].descriptionList
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

        if (query) {
            return res.status(200).json({ success: true, data: query })
        }
        return res.status(200).json({ success: true })

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error, success: false })
    }

}