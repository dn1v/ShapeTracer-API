const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Athlete = require('../../src/models/athlete')

const userId = new mongoose.Types.ObjectId()

const user = {
    _id: userId,
    firstName: "Pera",
    lastName: 'Peric',
    email: "pera.peric@gmail.com",
    password: 'peraperic',
    tokens: [{
        token: jwt.sign({_id: userId, }, process.env.JWT_SECRET)
    }]
}

const setupDB = async () => {
    await Athlete.deleteMany()
    await new Athlete(user).save()
}

module.exports = {
    userId,
    user,
    setupDB
}