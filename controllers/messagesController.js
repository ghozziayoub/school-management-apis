const express = require("express")
const bcrypt = require("bcryptjs")

const message = require('./../models/messages')

const app = express()

app.post('/', (req, res) => {
    try {
        let data = req.body
        let messages = new Messages({
            sender: data.sender,
            title: data.title,
            content: data.content,
        })
        await messages.save()
        res.status(200).send({ message: "add message works !" })

    } catch (error) {
        res.status(200).send({ message: "add message works !" })
    }

})


app.get('/', async(req, res) => {
    try {
        let messages = await Messages.find()
        res.status(200).send(messages)
    } catch (error) {
        res.status(400).send({ message: "Error fetching messages !", error: error })
    }
})









app.get('/:id', (req, res) => {
    res.status(200).send({ message: "get message by id works !" })
})

app.patch('/:id', (req, res) => {
    res.status(200).send({ message: "update message works !" })
})

app.delete('/:id', (req, res) => {
    res.status(200).send({ message: "delete message works !" })
})

module.exports = app