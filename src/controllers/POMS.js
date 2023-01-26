const POMS = require('../models/POMS')
const { update } = require('./bodyMeasurements')

exports.createPOMS = async (req, res) => {

    const poms = new POMS({
        ...req.body,
        owner: req.athlete._id
    })

    try {
        await poms.save()
        res.status(201).send(poms)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.readManyPOMS = async (req, res) => {

    try {
        await req.athlete.populate('pomsQ')
        res.send(req.athlete.pomsQ)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.readPOMS = async (req, res) => {

    try {
        const poms = await POMS.findOne({_id: req.params.id, owner: req.athlete._id})
        poms ? res.send(poms) : res.sendStatus(404)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.updatePOMS = async (req, res) => {
    const forbiddenUpdates = ['angerMoodState', 'confusionMoodState', 'depressionMoodState', 'fatigueMoodState', 'tensionMoodState', 'vigourMoodState', 'totalMoodScore']
    let isNotAllowed = false
    const updates = Object.keys(req.body)
    updates.forEach(update => {
        if (forbiddenUpdates.includes(update)) return isNotAllowed = true
    })
    if (isNotAllowed) return res.sendStatus(400)

    try {
        const poms = await POMS.findOne({_id: req.params.id, owner: req.athlete._id})
        if (!poms) return res.sendStatus(404)
        updates.forEach(update => poms[update] = req.body[update])
        await poms.save()
        res.send(poms)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.deletePOMS = async (req, res) => {

    try {
        const poms = await POMS.findOneAndDelete({_id: req.params.id, owner: req.athlete._id})
        poms ? res.send(poms) : res.sendStatus(404)
    } catch (e) {
        res.status(500).send(e)
    }
}

