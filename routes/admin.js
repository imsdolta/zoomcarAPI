const router = require('express').Router()
const mongoose = require('mongoose')
const Car = require('../Models/Car')
const rentedCar = require('../Models/rentedCar')


router.post('/addCar', (req, res) => {

    console.table(req.body)
    let newCar = {
        model: req.body.model,
        price: req.body.price,
        year: req.body.year,
        creationDate: Date.now()
    }

    Car.create(newCar).then((obj) => {
        console.log(obj)
        console.log("Added succesfully")
    })
    res.status(200);
})

router.get('/showall', async(req, res) => {

    const cars = await Car.find({})
    res.send(cars)

})

module.exports = router