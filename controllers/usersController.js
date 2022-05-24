const express = require("express")

const User = require('./../models/user')

const app = express()

app.post('/', (req, res) => {
  // 1 - recupération des données mel front
  let data = req.body
  // 2 - creation d'un objet User 
  // 2.1 - data => user
  let user = new User({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password
  })

  // 3 - save lel objet
  // 4 - return result to front , result => 201 or 400
  user
    .save()
    .then((userFromDb) => {
      res.status(201).send({ message: "user saved !" })
    })
    .catch((error) => {
      res.status(400).send({ message: "user not saved !", error: error })
    })

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