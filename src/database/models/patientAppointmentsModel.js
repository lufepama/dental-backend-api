module.exports = (mongoose) => {

    let schema = mongoose.Schema({
        weekOfYear: { type: String },
        year: { type: String },
        appointments: [{
            doctorId: { type: String },
            doctorName: { type: String },
            isActive: { type: Boolean },
            hoursAppointments: [{
                hour: { type: String },
                squares: { type: String },
                isOccupated: { type: Boolean, default: true },
                patientId: { type: String },
                description: { type: String },
                specialist: { type: String },
                isDisplayed: { type: Boolean, default: true }
            }]

        }]
    },
        { timestamps: true }
    )

    const PatientAppointments = mongoose.model('patientAppointments', schema)

    return PatientAppointments

}