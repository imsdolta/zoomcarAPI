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
        res.status(200);
    } catch (err) {
        console.log(err)
        res.status(402);
    }

})

router.get('/showall', async(req, res) => {

    try {
        const cars = await Car.find({})
        res.send(cars)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router