const mongoose = require("mongoose")

const TrainerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    }

})

const Trainer = mongoose.model("trainer", TrainerSchema)
module.exports = Trainer