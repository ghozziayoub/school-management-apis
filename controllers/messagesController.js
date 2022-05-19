const express = require("express")

const app = express()

app.post('/', (req, res) => {
    res.status(200).send({ message: "all messages works !" })
})

app.get('/', (req, res) => {
    res.status(200).send({ message: "all messages works !" })
})

app.get('/:id', (req, res) => {
    res.status(200).send({ message: "all messages works !" })
})

app.patch('/:id', (req, res) => {
    res.status(200).send({ message: "all messages works !" })
})


module.exports = app