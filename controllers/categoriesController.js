const express = require("express")

const Category = require('./../models/category')
const Training = require("../models/training");

const multer = require('multer')

const path = require('path');

const app = express()

const storage = multer.diskStorage(
    {
  
      destination: './assets/images/categories',
  
      filename: function (req, file, cb) {
        let name = req.body.firstname.replace(' ', '').toLowerCase();
  
        cb(null, name + '-' + Date.now() + path.extname(file.originalname));
      }
    }
  );

 
function checkFileType(file, cb) {

  
    const filetypes = /jpeg|jpg|png|gif/;
  
   
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  

    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype == true && extname == true) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
  

  const upload = multer({
  
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  });
app.post('/',   [upload.single('picture')] ,async (req, res) => {
    try {
        let data = req.body
        let file = req.file
        
        let category = new Category({
            name: data.name,
            image: file.filename,
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