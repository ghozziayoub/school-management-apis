// import
const express = require("express")

// creation d'un objet express
const app = express()

const port = 3000

app.get("/a3tini-donnee", (req, res) => {

    let users = [
        { name: "ali", age: "50" },
        { name: "mohamed", age: "30" },
        { name: "salah", age: "60" },
    ]

    res.status(200).send(users)

})

// create server
app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })