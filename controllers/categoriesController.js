const express = require("express")

const app = express()

app.post('/', (req, res) => {
    res.status(200).send({ message: "Categories all works !" })
})


module.exports = app