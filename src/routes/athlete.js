const express = require('express')
const router = new express.Router()
const auth = require('../middleware/authentication')
const athleteController = require('../controllers/athlete')
const uploadError = require('../middleware/uploadError')
const photoUpload = require('../middleware/photoUpload')

router.post('/athletes', athleteController.createAthlete)
      .get('/athletes/me', auth, athleteController.readAthletes)
      .post("/athletes/login", athleteController.loginAthlete)
      .post('/athletes/logout', auth, athleteController.logoutAthlete)
      .post('/athletes/logoutAll', auth, athleteController.logoutAll)
      .patch('/athletes/me', auth, athleteController.updateAthlete)
      .delete('/athletes/me', auth, athleteController.deleteAthlete)
      .post('/athletes/me/profilePic', 
            auth,
            photoUpload.single('photo'), 
            athleteController.uploadPhoto, 
            uploadError)
      .delete('/athletes/me/profilePic', auth, athleteController.deletePhoto)
      .get('/athletes/:id/profilePic', athleteController.getPhoto)

module.exports = router

