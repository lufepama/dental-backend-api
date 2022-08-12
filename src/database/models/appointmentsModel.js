module.exports = (mongoose) => {

    let schema = mongoose.Schema({
        firstName: { type: String },
        lastName: { type: String },
        phoneNumber: { type: String },
        ocupation: { type: String },
        gender: { type: String },
        age: { type: Number },
        address: { type: String },
        month: { type: String },
        day: { type: Number },
        time: { type: String },
    },
        { timestamps: true }
    )

    const Appointments = mongoose.model('appointments', schema)

    return Appointments
}
