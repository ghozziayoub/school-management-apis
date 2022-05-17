// import libs
const express = require("express")

// import controllers (1)
const trainerController = require("./controllers/trainerController")
const trainingController = require("./controllers/trainingController")

// creation d'un objet express .
const app = express()
const port = 3000

// autorisé les données de type JSON
app.use(express.json())

// router
app.use("/trainer", trainerController)
app.use("/training", trainingController)

// create server
app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })