const Bodyweight = require('../models/bodyweight')

exports.createBodyweight = async (req, res) => {

    const bodyweight = new Bodyweight({
        ...req.body,
        owner: req.athlete._id
    })

    try {
        await bodyweight.save()
        res.status(201).send(bodyweight)
    } catch (e) {
        res.sendStatus(400)
    }
}

exports.readBodyweights = async (req, res) => {

    const match = req.match
    try {
        await req.athlete.populate({
            path: 'bodyweight',
            match
        })
        req.athlete.bodyweight.length === 0 ? res.sendStatus(404) : res.send(req.athlete.bodyweight)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.readBodyweight = async (req, res) => {

    try {
        const bodyweight = await Bodyweight.findOne({_id: req.params.id, owner: req.athlete._id})
        bodyweight ? res.send(bodyweight) : res.sendStatus(404)

    } catch (e) {
        res.status(500).send(e)
    }
}

exports.updateBodyweight = async (req, res) => {

    if (Object.keys(req.body)[0] !== 'weight') return res.sendStatus(400)

    try {
        const bodyweight = await Bodyweight.findOneAndUpdate({_id: req.params.id, owner: req.athlete._id}, req.body, {
            new: true,
            runValidators: true
        })

        bodyweight ? res.send(bodyweight) : res.sendStatus(404)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.deleteBodyweight = async (req, res) => {

    try {
        const bodyweight = await Bodyweight.findOneAndDelete({
            _id: req.params.id,
            owner: req.athlete._id
        })

        bodyweight ? res.send(bodyweight) : res.sendStatus(404)

    } catch (e) {
        res.status(500).send(e)
    }
}