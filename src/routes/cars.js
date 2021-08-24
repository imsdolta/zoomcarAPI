const mongoose = require('mongoose')
const router = require('express').Router()
const Car = require('../Models/Car')
const User = mongoose.model('User')
const rentedCar = require('../Models/rentedCar')

const { ensureAuthenticated } = require('../config/auth');


// Find all cars that are not rented
router.get('/', ensureAuthenticated, async(req, res) => {
    const cars = await Car.find({
        $or: [{
            "isRented": false
        }]
    })
    res.send(cars)
});


// @desc  fetch all bookings for current user
// @route GET /booking  
router.get('/booking', ensureAuthenticated, async(req, res) => {
    try {

        let id = req.user._id
        const cars = await rentedCar.find({ user: id }).populate('car')

        let result = []

        if (!cars) {
            res.send("Not found")
        } else {
            cars.forEach(item => {
                result.push({
                    "model": item.car.model,
                    "price": item.car.price,
                    "booked At ": item.car.creationDate,
                    "booking Duration": item.car.days
                })
            })
        }
        res.send(result)

    } catch (err) {
        res.status(500).send({
            "error": "Cannot find the cars",
            "stack": err
        })
    }

})


// @desc  book the car given model number
//  @route  POST /booking 
router.post('/booking', ensureAuthenticated, async(req, res) => {
    try {
        let id = req.body.carId
        let userId = req.user._id

        const car = await Car.findById(id)
        const user = await User.findOneAndUpdate({ userId })

        if (!user || !car) {
            res.status(500).json({
                "msg": "User or car not found",
                "user or Car": car + user
            })
        }

        if (user && !car.isRented) {

            const RentedCarInfo = {
                car: car._id,
                user: userId,
                date: req.body.rentalDate,
                days: req.body.rentalDays
            }

            await rentedCar.create(RentedCarInfo)
            car.isRented = true
            await car.save()

        } else {
            return res.json({
                "msg": "car already rented"
            })
        }

        res.json({
            "msg": "Car succesfully rented"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            "msg": "Error renting car",
            "stack": err
        })
    }
})

// @desc  get car given model number
//  @route  POST /booking 
router.get('/:id', ensureAuthenticated, async(req, res) => {
    try {
        let id = req.params.id
        let data = await Car.findOne({ model: { $eq: id } })

        if (data) {
            console.log(data)
            res.send({
                "rented": data.isRented,
                "model": data.model,
                "price": data.price,
                "year added ": data.year
            })
        } else {
            res.send("car with Model number " + req.params.id + " does not exist")
        }
    } catch (err) {
        res.send("something went wrong")
    }
})

module.exports = router