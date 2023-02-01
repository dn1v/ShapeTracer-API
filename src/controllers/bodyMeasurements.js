
const BodyMeasurements = require('../models/bodyMeasurements')
const Athlete = require('../models/athlete')

exports.createOne = async (req, res) => {

       const bodyMeasurements = await BodyMeasurements({
        ...req.body,
        owner: req.athlete._id
    })

    try {
        await bodyMeasurements.save()

        res.status(201).send(bodyMeasurements)

    } catch (e) {

        res.status(400).send(e);
    }
}

exports.readMany = async (req, res) => {

    const match = req.match
    try {
        await req.athlete.populate({
            path: 'bodyMeasurements',
            match
        })
        res.send(req.athlete.bodyMeasurements)

    } catch (e) {
        res.status(500).send(e)
    }
}

exports.readOne = async (req, res) => {

    try {
        const bodyMeasurement = await BodyMeasurements.findOne({_id: req.params.id, owner: req.athlete._id})
        if (!bodyMeasurement) return res.sendStatus(404)
        res.send(bodyMeasurement)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.update = async (req, res) => {

    const notAllowedUpdates = ['createdAt', 'updatedAt', '_id', 'owner']
    const updates = Object.keys(req.body)
    const isNotAllowed = false

    updates.forEach(update => {
        if (notAllowedUpdates.includes(update)) return isNotAllowed = true
    })

    if (isNotAllowed) return res.sendStatus(400)
    console.log(req.params.id, req.body)
    try {

        const bodyMeasurement = await BodyMeasurements.findOne({_id: req.params.id, owner: req.athlete._id})     
        if (!bodyMeasurement) return res.status(404).send()
        updates.forEach(update => bodyMeasurement[update] = req.body[update])
        await bodyMeasurement.save()
        res.send(bodyMeasurement)

    } catch (e) {

        res.status(500).send(e)
    }
}

exports.delete = async (req, res) => {

    try {
        const bodyMeasurement = await BodyMeasurements.findOneAndDelete({
            _id: req.params.id, 
            owner: req.athlete._id
        })
        bodyMeasurement ? res.send(bodyMeasurement) : res.sendStatus(404)
    } catch (e) {
        res.status(500).send(e)
    }
}


