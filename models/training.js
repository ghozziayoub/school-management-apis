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
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    idTrainer :{
        type :String,
        required: true,
    }
})

const Training = mongoose.model("training", trainingSchema)

module.exports = Training