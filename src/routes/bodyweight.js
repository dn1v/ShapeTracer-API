const express = require('express')
const router = new express.Router()
const auth = require('../middleware/authentication')
const bodyweightController = require('../controllers/bodyweight')
const queryFilter = require('../middleware/queryFilter')
const pagAndSort = require('../middleware/querySortingAndPagination')

router.post('/bodyweight', auth, bodyweightController.createBodyweight)
      .get('/bodyweight', auth, queryFilter, pagAndSort, bodyweightController.readBodyweights)
      .get('/bodyweight/:id', auth, bodyweightController.readBodyweight)
      .patch('/bodyweight/:id', auth, bodyweightController.updateBodyweight)
      .delete('/bodyweight/:id',auth, bodyweightController.deleteBodyweight)
      
module.exports = router