// *******IMPORTS*********
const express = require('express');
const db = require('./database/models/index');
const bodyParser = require('body-parser')
const patientsRoutes = require('./routes/patients/index')
const doctorsRoutes = require('./routes/doctors/index')
const http = require('http');

const cors = require('cors');
// ******END IMPORTS********

// *****MY APP*******
const PORT = 8080

// Middlewares used in app instance
const app = express()
const server = http.createServer(app);

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())

// Database connection
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => { console.log(err) })

// Headers configuration
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow', true);

    // Pass to next layer of middleware
    next();
});

//Routes
app.use('/api/patients', patientsRoutes)
app.use('/api/doctors', doctorsRoutes)

server.listen(PORT, () => {
    console.log(`Running the app on PORT  ${PORT}`)
})