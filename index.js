// import
const express = require("express")

// creation d'un objet express
const app = express()

// autorisé les données de type JSON
app.use(express.json())

const port = 3000



// create server
app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })