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
    idTrainer: {
        type: String,
        required: true,
    },
    idCategory: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required:true
    },
    starting_date:{
        type:Date,
        required:true
    },
    seat:{
        type: Number,
        required: true
    }
  
})

const Training = mongoose.model("training", trainingSchema)

module.exports = Training