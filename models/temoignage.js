const mongoose = require("mongoose")

const temoignageSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
})

const Temoignage = mongoose.model("temoignage", temoignageSchema)

module.exports = Temoignage