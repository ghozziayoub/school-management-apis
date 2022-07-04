const express = require("express");

const Inscription = require("./../models/inscription");
const Training = require("./../models/training");

const app = express();

app.post("/", async (req, res) => {
  try {
    let data = req.body;
    let inscription = new Inscription({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      telephone: data.telephone,
      trainingId: data.trainingId,
    });
    await inscription.save();
    res.status(200).send({ messages: "inscription done !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "error fetching articles !", error: error });
  }
});

module.exports = app;
