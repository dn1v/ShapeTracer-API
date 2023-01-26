const express = require('express')
const router = new express.Router()
const controllerPOMS = require('../controllers/POMS')
const auth = require('../middleware/authentication')
const queryFilter = require('../middleware/queryFilter')
const pagAndSort = require('../middleware/querySortingAndPagination')

router.post('/pomsOne', auth, controllerPOMS.createPOMS)
      .get('/pomsMany', auth, queryFilter, pagAndSort, controllerPOMS.readManyPOMS)
      .get('/pomsOne/:id', auth, controllerPOMS.readPOMS)
      .patch('/pomsOne/:id', auth, controllerPOMS.updatePOMS)
      .delete('/pomsOne/:id', auth, controllerPOMS.deletePOMS);

module.exports = router