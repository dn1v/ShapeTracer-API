const mongoose = require('mongoose')


const bodyWeightSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    weight: {
        type: Number,
        trim: true,
        required: true,
        validate(value) {
            if (value <= 0) throw new Error('Bodyweight must be greater than zero.')
        }
    },
}, {
    timestamps: true
})

const Bodyweight = mongoose.model('Bodyweight', bodyWeightSchema)

module.exports = Bodyweight