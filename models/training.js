const mongoose = require("mongoose")

const trainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   
})

const training = mongoose.model("training", TrainingSchema)

module.exports = TrainingSchema