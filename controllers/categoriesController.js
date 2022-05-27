const express = require("express")

const Category = require('./../models/category')
const Training = require("../models/training");

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

app.get('/', async (req, res) => {
    try {
        let categories = await Category.find()
        res.status(200).send(categories)
    } catch (error) {
        res.status(400).send({ message: "error fetching categories !", error: error })
    }
})

app.get('/:id', async (req, res) => {
    try {
        let categoryId = req.params.id

        let category = await Category.findOne({ _id: categoryId })

        if (category)
            res.status(200).send(category)
        else
            res.status(404).send({ message: "Category not found !" })
    } catch (error) {
        res.status(400).send({ message: "Error fetching category !", error: error })
    }
})

app.patch('/:id', async (req, res) => {
    try {
        let categoryId = req.params.id
        let data = req.body

        let category = await Category.findOneAndUpdate({ _id: categoryId }, data)

        if (category)
            res.status(200).send({ message: "Category updated !" })
        else
            res.status(404).send({ message: "Category not found !" })
    } catch (error) {
        res.status(400).send({ message: "Error updating category !", error: error })
    }
})

app.delete('/:id', async (req, res) => {
    try {
        let categoryId = req.params.id
        let category = await Category.findOneAndDelete({ _id: categoryId })
        let training = await Training.deleteMany({ idCategory: categoryId });

        if (category && training)
            res.status(200).send({ message: "Category Deleted !" })
        else
            res.status(404).send({ message: "Category not found !" })
    } catch (error) {
        res.status(400).sen$({ message: "Error deleting categories !", error: error })
    }
})

module.exports = app