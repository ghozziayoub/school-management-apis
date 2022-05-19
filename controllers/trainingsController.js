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
app.get('/:id', (req, res) => {
    res.status(200).send({ message: "Get by id Training works !" })
})

app.get('/:update', (req, res) => {
    res.status(200).send({ message: " patch by id Training works !" })
})
app.get('/:Delete', (req, res) => {
    res.status(200).send({ message: "delete by id Training works !" })
})


module.exports = app