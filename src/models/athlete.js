const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const BodyMeasurements = require('./bodyMeasurements')
const SessionRPE = require('./sRPE')
const Bodyweight = require('./bodyweight')
const POMS = require('./POMS')

const athleteSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
    },
    height: {
        type: Number

    },
    weight: {
        type: Number
    },
    age: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Age must be greater than zero.')
        }
    },
    tokens: [
        {
            token: {
                type: String, 
                required: true
            }
        }
    ],
    profilePhoto: {
        type: Buffer
    }
}, {
    timestamps: true
})

athleteSchema.statics.credentialsCheck = async function (email, password) {

    const athlete = await Athlete.findOne({ email }).exec();
    console.log(athlete)
    if (!athlete) throw new Error('Unable to find user.')
    const isMatch = await bcrypt.compare(password, athlete.password)
    console.log(isMatch);
    if (!isMatch) throw new Error('Invalid password.')
    //await athlete.save();
    return athlete
}

athleteSchema.methods.generateToken = async function () {

    const  token = await jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET)

    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

athleteSchema.methods.toJSON = function () {
    const athlete = this.toObject()

    delete athlete.password
    delete athlete.tokens
    delete athlete.profilePhoto

    return athlete
}

athleteSchema.pre('save', async function (next) {

    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12)
    next()

})

athleteSchema.pre('remove', async function () {
    const filter = {owner: this._id}
    
    await SessionRPE.deleteMany(filter);
    await POMS.deleteMany(filter);
    await Bodyweight.deleteMany(filter);
    await BodyMeasurements.deleteMany(filter)
})

athleteSchema.virtual('bodyMeasurements', {
    ref: 'BodyMeasurements',
    localField: '_id',
    foreignField: 'owner'
})

athleteSchema.virtual('bodyweight', {
    ref: 'Bodyweight',
    localField: '_id',
    foreignField: 'owner'
})

athleteSchema.virtual('sRPE', {
    ref: 'SessionRPE',
    localField: '_id',
    foreignField: 'owner'
})

athleteSchema.virtual('pomsQ', {
    ref: 'POMS',
    localField: '_id',
    foreignField: 'owner'
})

const Athlete = mongoose.model('Athlete', athleteSchema)

module.exports = Athlete

