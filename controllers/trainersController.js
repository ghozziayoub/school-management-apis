const express = require("express")

const app = express()

let trainers = [];

//add trainer api
app.post('/', (req, res) => {
    trainer = req.body
    if(trainers.find((u) => {return u.id == trainer.id})){
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


//show a trainer api
app.get('/:id', (req, res) => {
    userId = req.params.id
    if(isNaN(userId)){
        res.status(400).send({ message: "trainer id not valid" })
    } 
    else {
        trainer = trainers.find((u) => {return u.id == userId})
        if(trainer){
            res.status(200).send({ message: trainer})
        } else {
            res.status(404).send({ message: "trainer not found" })
        }
    }

}
)


//modify a spesific trainer apo
app.patch('/:id', (req, res) => {
    userId = req.params.id
    trainer = req.body
    if(isNaN(userId)){
        res.status(400).send({ message: "trainer id not valid" })
    } 
    else {
        indexOf = trainers.findIndex((u) => {return u.id == userId})
        if(trainers[indexOf]){
            trainers[indexOf] = trainer;
            res.status(404).send({ message: trainer })
        } else {
            res.status(404).send({ message: "trainer not found" })
        }
    }
}
)






module.exports = app