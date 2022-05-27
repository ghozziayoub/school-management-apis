const express = require("express")

const app = express()

//add trainer api
app.post('/', (req, res) => {
    res.status(200).send({ message: "add trainer works !" })
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