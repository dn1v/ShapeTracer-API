const jwt = require('jsonwebtoken')
const Athlete = require('../models/athlete')

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const athlete = await Athlete.findOne({_id: decoded._id, 'tokens.token': token}).exec()

        if (!athlete) throw new Error('Unable to find user.')
        req.athlete = athlete
        req.token = token
        next()

    } catch (e) {
        res.status(401).send()
    }
}

module.exports = auth