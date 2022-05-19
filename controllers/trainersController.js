const express = require("express")

const app = express()

let trainers = [];

//add trainer api
app.post('/', (req, res) => {
    trainer = req.body
    if(trainers.find((u) => {return u.id == trainer.id})!=null){
        res.status(400).send({ message: "trainer already registred" })
    } else {
        trainers.push(trainer)
        res.status(201).send({ message: "trainer added succsuflly" })
    }
    
})


//show all trainers api
app.get('/', (req, res) => {
        res.status(200).send({ message: trainers })
    }
    
)





module.exports = app