const express = require("express")

const app = express()

let trainer = [];

//add trainer api
app.post('/', (req, res) => {
    res.status(200).send({ message: "trainer all works !" })
})

//show all trainer api
app.get('/', (req, res) => {
    res.status(200).send({ message: "trainer all works !" })
})

//show spesific trainer with id api
app.get('/:id', (req, res) => {
    res.status(200).send({ message: "trainer all works !" })
})


//modify trainer with spesific id
app.patch('/:id', (req, res) => {
    res.status(200).send({ message: "trainer all works !" })
})


//delete trainer
app.get('/:id', (req, res) => {
    res.status(200).send({ message: "trainer all works !" })
})



module.exports = app