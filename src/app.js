require('./db/mongoose')

const express = require('express')
const app = express()

const athleteRouter = require('./routes/athlete')
const bodyMeasurementsRouter = require('./routes/bodyMeasurements')
const bodyweightRouter = require('./routes/bodyweight')
const sRPERouter = require('./routes/sRPE')
const POMSRouter = require('./routes/POMS')

app.use(express.json())

app.use(athleteRouter)
   .use(bodyMeasurementsRouter)
   .use(bodyweightRouter)
   .use(sRPERouter)
   .use(POMSRouter)

const port = process.env.PORT

module.exports = app


