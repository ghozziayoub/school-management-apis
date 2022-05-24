const express = require("express")
const Trainer = require("../models/trainer")

const app = express()

//add trainer api
app.post('/', async (req, res) => {
    try {
        let data = req.body
        let trainer = new Trainer({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            speciality: data.speciality,
            yearsOfExperience: data.yearsOfExperience
        })
        await trainer.save()
        res.status(201).send({message:"trainer added successfully"})
    } catch (error) {
        res.status(400).send({message:"trainer not saved !", error: error})
    }
})

//show all trainers api
app.get('/', (req, res) => {
    res.status(200).send({ message: "get all trainers works !" })
})

//show a trainer api
app.get('/:id', (req, res) => {
    res.status(200).send({ message: "get trainer by id works !" })
})

//modify a spesific trainer api
app.patch('/:id', (req, res) => {
    res.status(200).send({ message: "update trainer works !" })
})

//delete a spesific trainer api
app.delete('/:id', (req, res) => {
    res.status(200).send({ message: "delete trainerworks !" })
})

module.exports = app