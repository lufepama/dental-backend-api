module.exports = (mongoose) => {

    let schema = mongoose.Schema({
        firstName: { type: String },
        lastName: { type: String },
        phoneNumber: { type: String },
        ocupation: { type: String },
        gender: { type: String },
        age: { type: Number },
        address: { type: String }
    },
        { timestamps: true }
    )

    const Patients = mongoose.model('patients', schema)

    return Patients

}