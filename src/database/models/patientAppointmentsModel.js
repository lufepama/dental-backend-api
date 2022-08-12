module.exports = (mongoose) => {

    let schema = mongoose.Schema({
        weekOfYear: { type: String },
        year: { type: String },
        appointments: [{
            doctorName: { type: String },
            isActive: { type: Boolean },
            hoursAppointments: [{
                hour: { type: String },
                squares: { type: String },
                patientId: { type: String },
                description: { type: String },
                specialist: { type: String }
            }]

        }]
    },
        { timestamps: true }
    )

    const PatientAppointments = mongoose.model('patientAppointments', schema)

    return PatientAppointments

}