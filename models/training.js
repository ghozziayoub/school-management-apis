const mongoose = require("mongoose")

const TrainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Objectif: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    idTrainer :{
        type :String,
        required: true,
        unique: true
    }
})

const Training = mongoose.model("training", TrainingSchema)

module.exports = TrainingSchema