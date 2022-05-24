const mongoose = require("mongoose")

const messagesSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,

    },

})

const Message = mongoose.model("message", messagesSchema)

module.exports = Message