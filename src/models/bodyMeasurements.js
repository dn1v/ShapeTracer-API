const mongoose = require('mongoose')
const validator = require('validator')

const bodyMeasurementsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    chest: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Chest girth be greater than zero.')
        }
    },
    leftArm: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Left arm girth must be greater than zero.')
        }
    },
    rightArm: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Right arm girth must be greater than zero.')
        }
    },
    aboveNavel: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Above navel girth must be greater than zero.')
        }
    },
    navel: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Navel girth must be greater than zero.')
        }
    },
    belowNavel: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Bellow navel girth must be greater than zero.')
        }
    },
    hips: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Hips girth must be greater than zero.')
        }
    },
    leftThigh: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Left thigh girth must be greater than zero.')
        }
    },
    rightThigh: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Right thigh girth must be greater than zero.')
        }
    },
    leftCalf: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Calf girth must be greater than zero.')
        }
    },
    rightCalf: {
        type: Number,
        trim: true,
        validate(value) {
            if (value <= 0) throw new Error('Calf girth must be greater than zero.')
        }
    }
}, {
    timestamps: true
})

const BodyMeasurements = mongoose.model('BodyMeasurements', bodyMeasurementsSchema)

module.exports = BodyMeasurements