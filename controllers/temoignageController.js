const express = require("express")

const Temoignage = require('./../models/temoignage')
const multer = require("multer");
const path = require("path");
const fs = require("fs");



const storage = multer.diskStorage({
  destination: "./assets/images/temoignages",

  filename: function (req, file, cb) {
    let name = req.body.fullname.replace(" ", "").toLowerCase();

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


const app = express()

app.post('/',[upload.single('picture')], async (req, res) => {
    try {
        let data = req.body
        let file = req.file
        let temoignage = new Temoignage({
            fullname: data.fullname,
            content: data.content,
            image: file.filename
        })
        await temoignage.save()
        res.status(201).send({ message: "temoignage saved !" })

    } catch (error) {
        res.status(400).send({ message: "add temoignage faild !" })
    }
})


app.get('/', async (req, res) => {
    try {
        let temoignage = await Temoignage.find()
        res.status(200).send(temoignage)
    } catch (error) {
        res.status(400).send({ message: "Error fetching temoignage !", error: error })
    }
})

app.get('/:id', async (req, res) => {
    try {
        let messagesId = req.params.id

        let temoignage = await Temoignage.findOne({ _id: messagesId })

        if (temoignage)
            res.status(200).send(temoignage)
        else
            res.status(404).send({ message: "temoignage not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error fetching temoignage !", error: error })
    }
})

app.patch('/:id',[upload.single('picture')], async (req, res) => {
    try {
        let temoignageId = req.params.id
        let data = req.body
        if (req.file) {
            data.image = req.file.filename;
            let temoignagePic = await Temoignage.findOne({ _id: temoignageId });
            fs.unlinkSync("assets/images/temoignages/" + temoignagePic.image);
          }
        let temoignage = await Temoignage.findOneAndUpdate({ _id: temoignageId }, data)

        if (temoignage)
            res.status(200).send({ message: "temoignage updated !" })
        else
            res.status(404).send({ message: "temoignage not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error updating temoignage !", error: error })
    }

})

app.delete('/:id', async (req, res) => {
    try {
        let messagesId = req.params.id
        let temoignagePic = await Temoignage.findOne({ _id: temoignageId });
        fs.unlinkSync("assets/images/temoignages/" + temoignagePic.image);

        let temoignage = await Temoignage.findOneAndDelete({ _id: messagesId })

        if (temoignage)
            res.status(200).send({ message: "temoignage deleted !" })

    } catch (error) {
        res.status(400).send({ message: "Error deleting temoignage !", error: error })
    }
})

module.exports = app