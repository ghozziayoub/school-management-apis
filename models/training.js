const mongoose = require("mongoose")

const trainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    objectif: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
        required: true
    },
    idTrainer :{
        type :String,
        required: true
    }
})

const training = mongoose.model("training", TrainingSchema)

module.exports = TrainingSchema