const express = require("express")
const Category = require('./../models/category')

const app = express()


app.post('/', async (req, res) => {
    try {
        let data = req.body

        let category = new Category({
            name: data.name,
        })
        await category.save()
        res.status(201).send({ message: "category saved !" })
    } catch (error) {
        res.status(400).send({ message: "category not saved !", error: error })
    }
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