const express = require("express")

const Training = require('./../models/training')
const multer = require('multer')

const path = require('path');

const storage = multer.diskStorage(
  {

    destination: './assets/images/trainings',

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
const app = express()

app.post('/', [upload.single('picture')],async (req, res) => {
  try {
    let data = req.body

    let training = new Training({
      name: data.name,
      objectif: data.objectif,
      program: data.program,
      hours: data.hours,
      idTrainer: data.idTrainer,
      idCategory: data.idCategory,
      image: file.filename
    })

    await training.save()

    res.status(201).send({ message: "Training saved !" })
  } catch (error) {
    res.status(400).send({ message: "Training not saved !", error: error })
  }

})

app.get('/', async (req, res) => {
  try {
    let trainings = await Training.find()
    res.status(200).send(trainings)
  } catch (error) {
    res.status(400).send({ message: "Error fetching trainings !", error: error })
  }
})

app.get('/:id', async (req, res) => {
  try {
    let trainingId = req.params.id

    let training = await Training.findOne({ _id: trainingId })

    if (training)
      res.status(200).send(training)
    else
      res.status(404).send({ message: "Training not found !" })

  } catch (error) {
    res.status(400).send({ message: "Error fetching training !", error: error })
  }
})

app.patch('/:id', async (req, res) => {
  try {
    let trainingId = req.params.id
    let data = req.body

    let training = await Training.findOneAndUpdate({ _id: trainingId }, data)

    if (training)
      res.status(200).send({ message: "Training updated !" })
    else
      res.status(404).send({ message: "Training not found !" })

  } catch (error) {
    res.status(400).send({ message: "Error updating Training !", error: error })
  }

})

app.delete('/:id', async (req, res) => {
  try {
    let trainingId = req.params.id

    let training = await Training.findOneAndDelete({ _id: trainingId })

    if (training)
      res.status(200).send({ message: "Training deleted !" })
    else
      res.status(404).send({ message: "Training not found !" })

  } catch (error) {
    res.status(400).send({ message: "Error deleting Training !", error: error })
  }
})

module.exports = app