const express = require("express")

const app = express()

app.Post('/', (req, res) => {
    res.status(200).send({ message: "Post Training !" })
})



module.exports = app