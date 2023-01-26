
const sharp = require('sharp')
const Athlete = require('../models/athlete')
const { welcomeEmail, cancelationEmail } = require('../emails/athleteAccount')


exports.createAthlete = async (req, res) => {
    const athlete = new Athlete(req.body)

    try {
        const token = await athlete.generateToken()
        await athlete.save()
        welcomeEmail(athlete.email, athlete.firstName)
        res.status(201).send({ athlete, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.loginAthlete = async (req, res) => {

    try {
        const athlete = await Athlete.credentialsCheck(req.body.email, req.body.password)
        const token = await athlete.generateToken()
        console.log(athlete)
        res.send({athlete, token})
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.logoutAthlete = async (req, res) => {

    try {
        req.athlete.tokens = req.athlete.tokens.filter(token => token.token !== req.token)
        await req.athlete.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }

}

exports.logoutAll = async (req, res) => {

    try {
        req.athlete.tokens = []
        await req.athlete.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}


exports.readAthletes = async (req, res) => {
    
    try {
        res.send(req.athlete)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.readAthlete = async (req, res) => {
    console.log(req.params.id)
    try {
        const athlete = await Athlete.findById(req.params.id)
        if (!athlete) return res.status(404).send()
        res.send(athlete)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.updateAthlete = async (req, res) => {
    const allowedUpdates = ['firstName', 'lastName', 'password', 'height', 'weight', 'age']
    const updates = Object.keys(req.body)
    const isAllowed = updates.every(update => allowedUpdates.includes(update));

    if (!isAllowed) res.status(400).send()

    try {
        updates.forEach(update => req.athlete[update] = req.body[update])
        await req.athlete.save()
        res.send({ athlete: req.athlete, token: req.token })
    } catch (e) {
        res.status(500).send(e)
    }
}



exports.deleteAthlete = async (req, res) => {

    try {
        await req.athlete.remove()
        cancelationEmail(req.athlete.email, req.athlete.firstName)
        res.send(req.athlete)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.uploadPhoto = async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.athlete.profilePhoto = buffer
    await req.athlete.save()
    res.send()

}

exports.deletePhoto = async (req, res) => {
    
    req.athlete.profilePhoto = undefined
    await req.athlete.save()
    res.sendStatus(200)
}

exports.getPhoto = async (req, res) => {
    
    try {
        const athlete = await Athlete.findById(req.params.id)
        if (!athlete || !athlete.profilePhoto) throw new Error()
        res.set('Content-Type', 'image/jpg')
        res.send(athlete.profilePhoto)

    } catch (e) {
        res.sendStatus(404)
    }
}