const router = require('express').Router()
const Car = require('../Models/Car.js')


router.post('/addCar', (req, res) => {

    try {
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
        res.status(200).json({
            "msg": "Car added succesfully",
            "model": newCar.model
        })
    } catch (err) {
        console.log(err)

        res.status(500).send({
            "error": "Cannot find the cars",
            "stack": err
        })
    }

})

router.get('/showall', async(req, res) => {

    try {
        const cars = await Car.find({})
        if (!cars) {
            res.json({
                "msg": "Car could not be found"
            })
        }
        if (cars) {
            res.status(200).send(cars)
        }


    } catch (err) {
        console.log(err);
        res.status(500).send({
            "error": "Cannot find the cars",
            "stack": err
        })
    }
})

module.exports = router