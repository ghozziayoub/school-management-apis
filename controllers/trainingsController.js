const express = require("express")

const app = express()

app.Post('/', (req, res) => {
    res.status(200).send({ message: "Post Training !" })
})
app.get('/', (req, res) => {
    res.status(200).send({ message: "Get all Training works !" })
})
app.get('/:id', (req, res) => {
    res.status(200).send({ message: "Get by id Training works !" })
})






module.exports = app