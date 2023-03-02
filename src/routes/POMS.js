const express = require('express')
const router = new express.Router()
const controllerPOMS = require('../controllers/POMS')
const auth = require('../middleware/authentication')
const queryFilter = require('../middleware/queryFilter')
const pagAndSort = require('../middleware/querySortingAndPagination')

router.post('/poms', auth, controllerPOMS.createPOMS)
      .get('/poms', auth, queryFilter, pagAndSort, controllerPOMS.readManyPOMS)
      .get('/poms/:id', auth, controllerPOMS.readPOMS)
      .patch('/poms/:id', auth, controllerPOMS.updatePOMS)
      .delete('/poms/:id', auth, controllerPOMS.deletePOMS);

module.exports = router