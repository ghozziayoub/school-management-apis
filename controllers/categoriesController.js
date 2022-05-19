const express = require("express")

const app = express()

app.post('/', (req, res) => {
    res.status(200).send({ message: "add category works !" })
})

app.get('/', (req, res) => {
    res.status(200).send({ message: "afficher tous catgories !" })
})

app.get('/:id', (req, res) => {
    res.status(200).send({ message: "afficher catgories par id !" })
})

app.patch('/:id', (req, res) => {
    res.status(200).send({ message: "modifier catgories par id !" })
})

app.delete('/:id', (req, res) => {
    res.status(200).send({ message: "supprimer catgories par id !" })
})

module.exports = app