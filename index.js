// import
const express = require("express")

// creation d'un objet express
const app = express()

const port = 3000

app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })