const dbConfig = require('../config');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.patients = require('./patientModels')(mongoose)
db.doctors = require('./doctorModels')(mongoose)


module.exports = db