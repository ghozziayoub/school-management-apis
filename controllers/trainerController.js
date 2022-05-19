const express = require("express")

const app = express()

app.get('/all', (req, res) => {
    res.status(200).send({ message: "trainer all works !" })
})


module.exports = app