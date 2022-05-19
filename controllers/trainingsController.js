const express = require("express")

const app = express()

app.get('/', (req, res) => {
    res.status(200).send({ message: "Post Training !" })
})

app.get('/all', (req, res) => {
    res.status(200).send({ message: "Get all Training works !" })
})
app.get('/', (req, res) => {
    res.status(200).send({ message: "training all works !" })
})
app.get('/', (req, res) => {
    res.status(200).send({ message: "training all works !" })
})

app.get('/all', (req, res) => {
    res.status(200).send({ message: "Get all Training works !" })
})

module.exports = app