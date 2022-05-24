const express = require("express")
const Trainer = require("../models/trainer")

const app = express()

//add trainer api
app.post('/', async (req, res) => {
    try {
        let data = req.body
        let trainer = new Trainer({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            speciality: data.speciality,
            yearsOfExperience: data.yearsOfExperience
        })
        await trainer.save()
        res.status(201).send({message:"trainer added successfully"})
    } catch (error) {
        res.status(400).send({message:"trainer not saved !", error: error})
    }
})
//show all trainers api. 
app.get('/', async(req, res) => {
     try { let trainers = await Trainer.find() 
        if(trainers.length != 0){ res.status(200).send(trainers) }
        else{ res.status(200).send({message: "no trainer found"}) } }
     catch (error) { res.status(400).send({message: "Error fetching trainers !", error: error}) } })


//show a trainer api
app.get('/:id', async (req, res) => {
    try {
        let trainerId = req.params.id
        let trainer = await Trainer.findOne({_id : trainerId})
        if(trainer){
            res.status(200).send(trainer)
        } else {
            res.status(404).send({message: "trainer not found !"})
        }
        
    } catch (error) {
            res.status(400).send({message:"Error fetching trainers !", error: error})
    }   
})

//modify a spesific trainer api
app.patch('/:id', async (req, res) => {
    try {
        let trainerId = req.params.id
        let data = req.body
        let trainer = await Trainer.findOneAndUpdate({_i : trainerId}, data)
        if(trainer){
            res.status(200).send({message : "trainer updated"})
        } else {
            res.status(404).send({message: "trainer not found !"})
        }
    } catch (error) {
        res.status(400).send({message:"Error fetching trainers !", error: error})
        
    }
})

//delete a spesific trainer api
app.delete('/:id', async (req, res) => {
    try {
        let trainerId= req.params.id
        let trainer = await Trainer.findOneAndDelete({_id : trainerId})
        if(trainer){
            res.status(200).send({message : "trainer deleted"})
        } else {
            res.status(404).send({message: "trainer not found !"})
        }
    } catch (error) {
        res.status(400).send({message:"Error fetching trainers !", error: error})
        
    }
})

module.exports = app