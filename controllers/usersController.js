const express = require("express")

const app = express()

app.post('/', (req, res) => {
  res.status(200).send({ message: "add users!" })
})

app.get('/', (req, res) => {
  res.status(200).send({ message: "display all users!" })
})

app.get('/:id', (req, res) => {
  res.status(200).send({ message: "display user par Id!" })
})

app.patch('/:id', (req, res) => {
  res.status(200).send({ message: "update user!" })
})

app.delete('/:id', (req, res) => {
  res.status(200).send({ message: "delete user!" })
})

module.exports = app