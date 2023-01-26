const SessionRPE = require('../models/sRPE')

exports.createSessionRPE = async (req, res) => {

    const sRPE = new SessionRPE({
        ...req.body,
        owner: req.athlete._id
    })

    try {
        await sRPE.save();
        res.status(201).send(sRPE)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.readSessionRPEs = async (req, res) => {
    
    match = req.match
    options = req.options
    try {

        await req.athlete.populate({
            path: 'sRPE',
            match,
            options
        })
        console.log(req.athlete.sRPE)
        res.send(req.athlete.sRPE)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.readSessionRPE = async (req, res) => {

    try {
        const sRPE = await SessionRPE.findOne({_id: req.params.id, owner: req.athlete._id})
        sRPE ? res.send(sRPE) : res.sendStatus(404)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.updateSessionRPE = async (req, res) => {

    const allowedUpdates = ['trainingType', 'duration', 'sRPE']
    const updates = Object.keys(req.body)
    const isAllowed = updates.every(update => allowedUpdates.includes(update))

    if (!isAllowed) return res.sendStatus(400)
    
    try {
        const sRPE = await SessionRPE.findOne({_id: req.params.id, owner: req.athlete._id})
        if (!sRPE) res.sendStatus(404)
        updates.forEach(update => sRPE[update] = req.body[update])
        await sRPE.save()
        res.send(sRPE)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.deleteSesssionRPE = async (req, res) => {

    try {
        const sRPE = await SessionRPE.findOneAndDelete({_id: req.params.id, owner: req.athlete._id})
        sRPE ? res.send(sRPE) : res.sendStatus(404)
    } catch (e) {
        res.status(500).send(e)
    }
}