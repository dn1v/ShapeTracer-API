const express = require('express')
const router = new express.Router()
const controllerSessionRPE = require('../controllers/sRPE')
const auth = require('../middleware/authentication')
const queryFilter = require('../middleware/queryFilter')
const pagAndSort = require('../middleware/querySortingAndPagination')

router.post('/sessionRPE', auth, controllerSessionRPE.createSessionRPE)
      .get('/sessionRPE', auth, queryFilter, pagAndSort, controllerSessionRPE.readSessionRPEs)
      .get('/sessionRPE/:id', auth,controllerSessionRPE.readSessionRPE)
      .patch('/sessionRPE/:id', auth, controllerSessionRPE.updateSessionRPE)
      .delete('/sessionRPE/:id', auth, controllerSessionRPE.deleteSesssionRPE)
      
module.exports = router;