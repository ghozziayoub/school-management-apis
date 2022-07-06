const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//import models
const Article = require("./../models/article");
const User = require("../models/user");

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
    });
    await article.save();
    res.status(200).send({ message: "article added !" });
  } catch (error) {
    res.status(400).send(error);
  }
});

//show all articles
app.get("/", async (req, res) => {
  try {
    let articles = await Article.find();
    res.status(200).send(articles);
  } catch (error) {
    res
      .status(400)
      .send({ message: "error fetching articles !", error: error });
  }
});

//get article by id
app.get("/:id", async (req, res) => {
  try {
    let articleId = req.params.id;
    let article = await Article.findOne({ _id: articleId });

    if (article) res.status(200).send(article);
    else res.status(404).send({ message: "Article not found !" });
  } catch (error) {
    res.status(400).send({ message: "Error fetching article !", error: error });
  }
});

app.patch("/:id", [upload.single("picture")], async (req, res) => {
  try {
    let articleId = req.params.id;
    let data = req.body;

    if (req.file) {
      data.image = req.file.filename;
      let article = await Article.findOne({ _id: articleId });
      fs.unlinkSync("assets/images/articles/" + article.image);
    }

    let updatedArticle = await Article.findOneAndUpdate(
      { _id: articleId },
      data
    );

    if (updatedArticle) res.status(200).send({ message: "Article updated !" });
    else res.status(404).send({ message: "Article not found !" });
  } catch (error) {
    res.status(400).send({ message: "Error updating article !", error: error });
  }
});

// delete article api
app.delete("/:id", async (req, res) => {
  try {
    let articleId = req.params.id;
    let articlePic = await Article.findOne({ _id: articleId });
    fs.unlinkSync("assets/images/articles/" + articlePic.image);
    let article = await Article.findOneAndDelete({ _id: articleId });
    res.status(200).send({ message: "Article updated !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting articles !", error: error });
  }
});

module.exports = app;
