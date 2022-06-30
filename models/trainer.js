const mongoose = require("mongoose")

const trainerSchema = new mongoose.Schema({
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
        required: true,
        unique: true
    },
    speciality: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    intagram: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

})

const Trainer = mongoose.model("trainer", trainerSchema)
module.exports = Trainer