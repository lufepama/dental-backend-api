module.exports = (mongoose) => {

    let schema = mongoose.Schema({
        firstName: { type: String },
        lastName: { type: String },
        qualification: { type: String },
        phoneNumber: { type: String },
        address: { type: String },
        spectiality: { type: String },
    },
        { timestamps: true }
    )

    const Doctors = mongoose.model('doctors', schema)

    return Doctors

}