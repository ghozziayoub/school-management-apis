const express = require("express");

const Category = require("./../models/category");
const Training = require("../models/training");

const multer = require("multer");

const path = require("path");
const fs = require("fs");

const app = express();

const storage = multer.diskStorage({
  destination: "./assets/images/categories",

  filename: function (req, file, cb) {
    let name = req.body.name.replace(" ", "").toLowerCase();

    cb(null, name + "-" + Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype == true && extname == true) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

app.post("/", [upload.single("picture")], async (req, res) => {
  try {
    let data = req.body;
    let file = req.file;

    let category = new Category({
      name: data.name,
      image: file.filename,
    });

    await category.save();

    res.status(201).send({ message: "category saved !" });
  } catch (error) {
    res.status(400).send({ message: "category not saved !" });
  }
});

app.get("/", async (req, res) => {
  try {
    let categories = await Category.find();

    let allCategories = [];

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const trainings = Training.find({ idCategory: category._id });
      allCategories.push({ ...category._doc, trainings: (await trainings).length });
    }

    res.status(200).send(allCategories);
  } catch (error) {
    res
      .status(400)
      .send({ message: "error fetching categories !", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    let categoryId = req.params.id;

    let category = await Category.findOne({ _id: categoryId });

    if (category) res.status(200).send(category);
    else res.status(404).send({ message: "Category not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching category !", error: error });
  }
});

app.patch("/:id", [upload.single("picture")], async (req, res) => {
  try {
    let categoryId = req.params.id;
    let data = req.body;

    if (req.file) {
      data.image = req.file.filename;
      let category = await Category.findOne({ _id: categoryId });
      fs.unlinkSync("assets/images/categories/" + category.image);
    }

    let updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      data
    );

    if (updatedCategory)
      res.status(200).send({ message: "Category updated !" });
    else res.status(404).send({ message: "Category not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating category !", error: error });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let categoryId = req.params.id;
    let category = await Category.findOneAndDelete({ _id: categoryId });
    let training = await Training.deleteMany({ idCategory: categoryId });

    if (category && training)
      res.status(200).send({ message: "Category Deleted !" });
    else res.status(404).send({ message: "Category not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting categories !", error: error });
  }
});

module.exports = app;
