const routes = require('express').Router();
const controller = require('../../controller/patientsController')
const mwAuth = require('../../middlewares/validationAuth')

const multer = require('multer')
let uuidv4 = require('uuid').v4



const DIR = './src/public/images/profile'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            console.log('file type', file.mimetype)
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

routes.post('/create', upload.single('patientImg'), controller.create)

routes.get('/all-patients', controller.getAllPatients)

routes.delete('/delete-patient/:id', controller.deletePatient)

module.exports = routes