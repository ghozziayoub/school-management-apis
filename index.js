// import libs
const express = require("express")

// import controllers
const trainersController = require("./controllers/trainersController")
const trainingsController = require("./controllers/trainingsController")
const categoriesController = require("./controllers/categoriesController")
const usersController = require("./controllers/usersController")


// creation d'un objet express .
const app = express()
const port = 3000

// autorisé les données de type JSON
app.use(express.json())

// router
app.use("/trainers", trainersController)
app.use("/trainings", trainingsController)
app.use("/categories", categoriesController)
app.use("/users", usersController)

// create server
app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })