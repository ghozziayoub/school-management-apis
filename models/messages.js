const mongoose = require("mongoose")

const messagesSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    tittel: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,

    },

})

const message = mongoose.model("message", messagesSchema)

module.exports = message