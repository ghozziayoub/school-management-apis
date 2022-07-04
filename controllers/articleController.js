const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//import models
const Article = require("./../models/article");
const User = require("../models/user");
const { find } = require("./../models/article");

const app = express();

const storage = multer.diskStorage({
  destination: "./assets/images/articles",

  filename: function (req, file, cb) {
    let name = req.body.titre.replace(" ", "").toLowerCase();

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

//add article api
app.post("/", [upload.single("picture")], async (req, res) => {
  try {
    let data = req.body;
    let file = req.file;
    let article = new Article({
        titre: data.titre,
        content: data.content,
        image: file.filename,
        createdBy: data.userId  
    })
    await article.save();
    res.status(200).send("article added !");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = app;
