const express = require("express");
const Inscription = require("./../models/insctiption");
const Training = require("./../models/training");

const app = express();

app.post("/:id", async (req, res) => {
  try {
    let id = req.params.id
    let data = req.body;
    let trainingId = await Training.findOne({ _id: id });
    let checkStudent = await Inscription.findOne({ email: data.email , trainingId: id})
    if (trainingId && !checkStudent) {
      let inscription = new Inscription({
        fullname: data.fullname,
        email: data.email,
        telephone: data.telephone,
        trainingId: id,
      });
      console.log(inscription)
      await inscription.save();
      res.status(200).send({ messages: "inscription done !" });
    } else {
      
      res
        .status(400)
        .send({ message: "utilisateur est deja inscript !" });
    }
  } catch (error) {
    error= "error fetching inscription !"
    res
      .status(400)
      .send({ error});
  }
});

app.get("/:id", async (req, res) => {
  try {
    let id = req.params.id
    let inscriptionList = [];
    let inscriptions = await Inscription.find({trainingId: id});
    for (let i = 0; i < inscriptions.length; i++) {
      const element = inscriptions[i];

      const training = await Training.findOne({ _id: element._id });
      let inscription = {
        _id: element._id,
        fullname: element.fullname,
        email: element.email,
        telephone: element.telephone,
        createdAt:element.createdAt,
        training,
      };
      inscriptionList.push(inscription);
    }
    res.status(200).send(inscriptionList);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching inscriptions !", error: error });
  }
});
app.get("inscription/:id", async (req, res) => {
  try {
    let id = req.params.id
    let inscriptionList = [];
    let inscriptions = await Inscription.find({trainingId: id});
    for (let i = 0; i < inscriptions.length; i++) {
      const element = inscriptions[i];

      const training = await Training.findOne({ _id: element._id });
      let inscription = {
        _id: element._id,
        fullname: element.fullname,
        email: element.email,
        telephone: element.telephone,
        createdAt:element.createdAt,
        training,
      };
      inscriptionList.push(inscription);
    }
    res.status(200).send(inscriptionList);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching inscriptions !", error: error });
  }
});

app.get("inscriptions/:id", async (req, res) => {
  try {
    let inscriptionId = req.params.id;
    let inscription = await Inscription.findOne({ _id: inscriptionId });
    let training = await Training.findOne({ _id: inscription.trainingId });
    let inscriptionToTraining = {
      _id: inscription._id,
      firstname: inscription.firstname,
      lastname: inscription.lastname,
      email: inscription.email,
      telephone: inscription.telephone,
      training,
    };

    res.status(200).send(inscriptionToTraining);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching inscription !", error: error });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let inscriptionId = req.params.id;
    let inscription = await Inscription.findOneAndDelete({
      _id: inscriptionId,
    });
    if (inscription) {
      res.status(200).send("inscription deleted succfully");
    } else {
      res.status(400).send({ message: "Error inscription not deleted !" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching inscription !", error: error });
  }
});

module.exports = app;
