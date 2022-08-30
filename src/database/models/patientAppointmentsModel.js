module.exports = (mongoose) => {

    let schema = mongoose.Schema({
        dayOfYear: { type: String },
        weekOfYear: { type: String },
        year: { type: String },
        appointments: [{
            doctorId: { type: String },
            doctorName: { type: String },
            speciality: {type:String},
            appointmentsAvailable:[{
                code:{type:String},
                description:{type:String},
            }],
            isActive: { type: Boolean },
            doctorAppointmentsId: { type: String },
            hoursAppointments: [{
                hour: { type: String },
                highHour: { type: String },
                squares: { type: String },
                isOccupated: { type: Boolean, default: true },
                appointmentCause: { type: String },
                specialist: { type: String },
                isDisplayed: { type: Boolean, default: true },
                appointmentId: { type: String },
                listOfRangedIds: [String],
                isConfirmed: { type: Boolean, default: false },
                isCanceled: { type: Boolean, default: false },

                patientFirstName: { type: String },
                patientLastName: { type: String },
                patientId: { type: String },
                patientPhone: {type:String},
                patientAddress: {type:String},
            }]

        }]
    },
        { timestamps: true }
    )

    const PatientAppointments = mongoose.model('patientAppointments', schema)

    return PatientAppointments

}