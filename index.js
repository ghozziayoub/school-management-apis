// import libs
const express = require("express")
const cors = require("cors")

// import database connection
const mongoose = require("./config/db")

// import controllers
const trainersController = require("./controllers/trainersController")
const trainingsController = require("./controllers/trainingsController")
const messagesController = require("./controllers/messagesController")
const categoriesController = require("./controllers/categoriesController")
const usersController = require("./controllers/usersController")

// creation d'un objet express .
const app = express()
const port = 3000

// autorisé les données de type JSON
app.use(express.json())
// autorisé les données de type files
app.use(express.urlencoded({
    extended: true
}));
// autorisé l'accee d'un serveur
app.use(cors())

// access to public files
app.use(express.static('./assets/images'));
app.use(express.static('./assets/images/users'));
app.use(express.static('./assets/images/trainers'));
app.use(express.static('./assets/images/trainings'));

// router
app.use("/trainers", trainersController)
app.use("/trainings", trainingsController)
app.use("/messages", messagesController)
app.use("/categories", categoriesController)
app.use("/users", usersController)

// create server
app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })