const mongoose = require('mongoose')

const properties = {
    type: Number,
    min: 0,
    max: 4,
    required: true
};

const moodStatePoperties = {
    type: Number
};

const pomsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    angry: properties,
    annoyed: properties, 
    badTempered: properties,
    bitter: properties,
    confused: properties,
    mixedUp: properties,
    muddled: properties,
    uncertain: properties,
    depressed: properties,
    downhearted: properties,
    miserable: properties,
    unhappy: properties,
    exhausted: properties,
    sleepy: properties,
    tired: properties,
    wornOut: properties,
    anxious: properties,
    nervous: properties,
    panicky: properties,
    worried: properties,
    active: properties,
    alert: properties,
    energetic: properties,
    lively: properties,
    vigourMoodState: moodStatePoperties,
    tensionMoodState: moodStatePoperties,
    fatigueMoodState: moodStatePoperties,
    depressionMoodState: moodStatePoperties,
    confusionMoodState: moodStatePoperties,
    angerMoodState: moodStatePoperties,
    totalMoodScore: moodStatePoperties
});

pomsSchema.pre('save', function (next) {
    this.angerMoodState = this.angry + this.annoyed + this.badTempered + this.bitter
    this.confusionMoodState = this.confused + this.mixedUp + this.muddled + this.uncertain
    this.depressionMoodState = this.depressed + this.downhearted + this.miserable + this.unhappy
    this.fatigueMoodState = this.exhausted + this.sleepy + this.tired + this.wornOut
    this.tensionMoodState = this.anxious + this.nervous + this.panicky + this.worried
    this.vigourMoodState = this.active + this.alert + this.energetic + this.lively
    this.totalMoodScore = this.angerMoodState + this.confusionMoodState + this.depressionMoodState + this.fatigueMoodState + this.tensionMoodState - this.vigourMoodState
    next()
})

const POMS = mongoose.model('POMS', pomsSchema)

module.exports = POMS
