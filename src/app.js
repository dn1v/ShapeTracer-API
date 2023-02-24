require('./db/mongoose')

const express = require('express')
const app = express()

const athleteRouter = require('./routes/athlete')
const bodyMeasurementsRouter = require('./routes/bodyMeasurements')
const bodyweightRouter = require('./routes/bodyweight')
const sRPERouter = require('./routes/sRPE')
const POMSRouter = require('./routes/POMS')

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", process.env.CORS_URL);
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
   next();
})

app.use(express.json())

app.use(athleteRouter)
   .use(bodyMeasurementsRouter)
   .use(bodyweightRouter)
   .use(sRPERouter)
   .use(POMSRouter)


module.exports = app


