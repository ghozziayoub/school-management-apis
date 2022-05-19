const express = require("express")

const app = express()

app.post('/', (req, res) => {
    res.status(200).send({ message: "add users!" })
})

app.get('/', (req, res) => {
  res.status(200).send({ message: "display users!" })
})

app.get('/:id', (req, res) => {
  res.status(200).send({ message: "display par Id!" })
})
module.exports = app