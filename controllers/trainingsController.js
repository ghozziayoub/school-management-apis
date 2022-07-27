const express = require("express");
const fs = require("fs");
const Trainer = require("./../models/trainer");
const Category = require("./../models/category");
const Training = require("./../models/training");

const multer = require("multer");

const path = require("path");
const Inscription = require("../models/insctiption");

const storage = multer.diskStorage({
  destination: "./assets/images/trainings",

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
const app = express();

app.post("/", [upload.single("picture")], async (req, res) => {
  try {
    let data = req.body;
    let file = req.file;
    let training = new Training({
      name: data.name,
      objectif: data.objectif,
      program: data.program,
      hours: data.hours,
      starting_date: data.starting_date,
      price: data.price,
      seat: data.seat,
      idTrainer: data.idTrainer,
      idCategory: data.idCategory,
      image: file.filename,
    });
    let trainer = await Trainer.findOne({ _id: data.idTrainer });
    let category = await Category.findOne({ _id: data.idCategory });
    if (trainer && category) {
      await training.save();
      res.status(201).send({ message: "Training saved !" });
    } else {
      fs.unlinkSync("assets/images/trainings/" + file.filename);
      res.status(400).send({ message: "Training not saved !", error: error });
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Training not saved !", error: error });
  }
});

app.get("/all", async (req, res) => {
  try {
    let trainings = await Training.find();
    let allTrainings = [];

    for (let i = 0; i < trainings.length; i++) {
      const element = trainings[i];

      let trainer = await Trainer.findOne({ _id: element.idTrainer });
      let category = await Category.findOne({ _id: element.idCategory });
      let inscriptions = await Inscription.find({trainingId: element._id})
      let training = {
        _id: element._id,
        name: element.name,
        objectif: element.objectif,
        program: element.program,
        hours: element.hours,
        image: element.image,
        starting_date: element.starting_date,
        price: element.price,
        seat: element.seat,
        trainer,
        category,
        inscriptions
      };

      allTrainings.push(training);
    }

    res.status(200).send(allTrainings);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching trainings !", error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    const today = new Date();
    let trainings = await Training.find({ starting_date: {  $gt: today } });
    let allTrainings = [];

    for (let i = 0; i < trainings.length; i++) {
      const element = trainings[i];

      let trainer = await Trainer.findOne({ _id: element.idTrainer });
      let category = await Category.findOne({ _id: element.idCategory });
      let inscriptions = await Inscription.find({trainingId: element._id})
      let training = {
        _id: element._id,
        name: element.name,
        objectif: element.objectif,
        program: element.program,
        hours: element.hours,
        image: element.image,
        starting_date: element.starting_date,
        price: element.price,
        seat: element.seat,
        trainer,
        category,
        inscriptions
      };

      allTrainings.push(training);
    }

    res.status(200).send(allTrainings);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching trainings !", error: error });
  }
});

app.get("/related/:category", async (req, res) => {
  try {
    let relatedCategory = req.params.category
    console.log(relatedCategory)
    let trainings = await Training.find({idCategory: relatedCategory, starting_date: {  $gt: today } });
    console.log(trainings)
    let allTrainings = [];

    for (let i = 0; i < trainings.length; i++) {
      const element = trainings[i];

      let trainer = await Trainer.findOne({ _id: element.idTrainer });
      let category = await Category.findOne({ _id: element.idCategory });
      let training = {
        _id: element._id,
        name: element.name,
        objectif: element.objectif,
        program: element.program,
        hours: element.hours,
        image: element.image,
        starting_date: element.starting_date,
        price: element.price,
        seat: element.seat,
        trainer,
        category,
      };

      allTrainings.push(training);
    }

    res.status(200).send(allTrainings);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching trainings !", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    let trainingId = req.params.id;

    let training = await Training.findOne({ _id: trainingId });
    let trainer = await Trainer.findOne({ _id: training.idTrainer });
    let category = await Category.findOne({ _id: training.idCategory });

    let trainingDetails = {
      _id: training._id,
      name: training.name,
      objectif: training.objectif,
      program: training.program,
      hours: training.hours,
      image: training.image,
      price: training.price,
      seat: training.seat,
      starting_date: training.starting_date,
      trainer,
      category,
    };

    if (training) res.status(200).send(trainingDetails);
    else res.status(404).send({ message: "Training not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching training !", error: error });
  }
});

app.patch("/:id", [upload.single("picture")], async (req, res) => {
  try {
    let trainingId = req.params.id;
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
      let trainingPic = await Training.findOne({ _id: trainingId });
      fs.unlinkSync("assets/images/trainings/" + trainingPic.image);
    }
    let trainer = await Trainer.findOne({ _id: data.idTrainer });
    let category = await Category.findOne({ _id: data.idCategory });
    if (trainer && category) {
      let training = await Training.findOneAndUpdate({ _id: trainingId }, data);
      if (training) res.status(200).send({ message: "Training updated !" });
      else res.status(404).send({ message: "Training not found !" });
    } else {
      res.status(400).send({ message: "Training not saved !", error: error });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating Training !", error: error });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let trainingId = req.params.id;
    console.log(trainingId);

    let trainingPic = await Training.findOne({ _id: trainingId });
    fs.unlinkSync("assets/images/trainings/" + trainingPic.image);
    let training = await Training.findOneAndDelete({ _id: trainingId });

    if (training) res.status(200).send({ message: "Training deleted !" });
    else res.status(404).send({ message: "Training not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting Training !", error: error });
  }
});

module.exports = app;
