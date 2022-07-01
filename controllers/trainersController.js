const express = require("express");
const Trainer = require("../models/trainer");
const Training = require("../models/training");
const fs = require("fs");
const multer = require('multer')

const path = require('path');

const storage = multer.diskStorage(
  {

    destination: './assets/images/trainers',

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

const app = express();

//add trainer api
app.post("/",[upload.single('picture')], async (req, res) => {
  try {
    let data = req.body;
    let file = req.file
    
    let trainer = new Trainer({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      speciality: data.speciality,
      yearsOfExperience: data.yearsOfExperience,
      facebook: data.facebook,
      instagram: data.instagram,
      twitter: data.twitter,
      image: file.filename
    });
    console.log(trainer)
    await trainer.save();
    res.status(201).send({ message: "trainer added successfully" });
  } catch (error) {
    res.status(400).send({ message: "trainer not saved !", error: error });
  }
});

//show all trainers api.
app.get("/", async (req, res) => {
  try {
    let trainers = await Trainer.find();
    res.status(200).send(trainers);
  } catch (error) {
    res.status(400).send({ message: "Error fetching trainers !", error: error });
  }
});

//show a trainer api
app.get("/:id", async (req, res) => {
  try {
    let trainerId = req.params.id;
    let trainer = await Trainer.findOne({ _id: trainerId });
    if (trainer) {
      res.status(200).send(trainer);
    } else {
      res.status(404).send({ message: "trainer not found !" });
    }
  } catch (error) {
    res.status(400).send({ message: "Error fetching trainer !", error: error });
  }
});

//modify a spesific trainer api
app.patch("/:id", [upload.single('picture')], async (req, res) => {
  try {
    let trainerId = req.params.id;
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
      let trainerPic = await Trainer.findOne({ _id: trainerId });
      fs.unlinkSync("assets/images/trainers/" + trainerPic.image);
    }
    let trainer = await Trainer.findOneAndUpdate({ _id: trainerId }, data);
    if (trainer) {
      res.status(200).send({ message: "trainer updated" });
    } else {
      res.status(404).send({ message: "trainer not found !" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating trainer !", error: error });
  }
});

//delete a spesific trainer api
app.delete("/:id", async (req, res) => {
  try {
    let trainerId = req.params.id;
    let trainer = await Trainer.findOneAndDelete({ _id: trainerId });
    let training = await Training.deleteMany({ idTrainer: trainerId });
    if (trainer && training) {
      res.status(200).send({ message: "trainer deleted" });
    } else {
      res.status(404).send({ message: "trainer not found !" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting trainers !", error: error });
  }
});

module.exports = app;
