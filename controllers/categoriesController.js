const express = require("express")

const app = express()

app.post('/', (req, res) => {
    res.status(200).send({ message: "add all works !" })
})
app.get('/', (req, res) => {
    res.status(200).send({ message: "afficher tous catgories !" })
})

app.get('/:id', (req, res) => {
    res.status(200).send({ message: "afficher catgories par id !" })
})

module.exports = app