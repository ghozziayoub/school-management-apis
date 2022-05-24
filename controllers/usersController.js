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
  User
    .find()
    .then((users) => {
      res.status(200).send(users)
    })
    .catch((error) => {
      res.status(400).send({ message: "Error fetching users !", error: error })
    })
})

app.get('/:id', (req, res) => {

  let userId = req.params.id

  User
    .findOne({ _id: userId })
    .then((user) => {
      if (user)
        res.status(200).send(user)
      else
        res.status(404).send({ message: "User not found !" })
    })
    .catch((error) => {
      res.status(400).send({ message: "Error fetching users !", error: error })
    })

})

app.patch('/:id', (req, res) => {
  let userId = req.params.id
  let data = req.body

  User
    .findOneAndUpdate({ _id: userId }, data)
    .then((user) => {
      if (user)
        res.status(200).send({ message: "User updated !" })
      else
        res.status(404).send({ message: "User not found !" })
    })
    .catch((error) => {
      res.status(400).send({ message: "Error fetching users !", error: error })
    })
})

app.delete('/:id', (req, res) => {
  let userId = req.params.id

  User
    .findOneAndDelete({ _id: userId })
    .then((user) => {
      if (user)
        res.status(200).send({ message: "User deleted !" })
      else
        res.status(404).send({ message: "User not found !" })
    })
    .catch((error) => {
      res.status(400).send({ message: "Error fetching users !", error: error })
    })
})

module.exports = app