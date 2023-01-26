const express = require('express')
const router = new express.Router()
const auth = require('../middleware/authentication')
const bodyMeasurementsController = require('../controllers/bodyMeasurements')
const queryFilter = require('../middleware/queryFilter')
const pagAndSort = require('../middleware/querySortingAndPagination')

router.post('/bodyMeasurements', auth, bodyMeasurementsController.createOne)
      .get('/bodyMeasurements', auth, queryFilter, pagAndSort, bodyMeasurementsController.readMany)
      .get('/bodyMeasurements/:id', auth, bodyMeasurementsController.readOne)
      .patch('/bodyMeasurements/:id', auth, bodyMeasurementsController.update)
      .delete('/bodyMeasurements/:id', auth, bodyMeasurementsController.delete)

module.exports = router

