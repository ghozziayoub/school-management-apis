app.get("/a3tini-donnee/:userId", (req, res) => {

    let myId = req.params.userId

    if (isNaN(myId)) {
        res.status(400).send({ message: "Invalid ID !" })
    } else {

        let users = [
            { id: 1, name: "ali", age: "50" },
            { id: 2, name: "mohamed", age: "30" },
            { id: 3, name: "salah", age: "60" },
        ]

        let user = users.find((u) => { return u.id == myId })

        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send({ message: "user not found" })
        }
    }


})

app.post("/register", (req, res) => {

    let user = req.body

    console.log("index-L42", user);

    res.status(200).send({ message: "register works !" })
})