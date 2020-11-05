const mongoose = require('mongoose')
const router = require('express').Router()
const Car = require('../Models/Car')
const User = mongoose.model('User')
const rentedCar = require('../Models/rentedCar')

const { ensureAuthenticated } = require('../config/auth');


// Find all cars that are not rented
router.get('/', async(req, res) => {
    const cars = await Car.find({
        $or: [{
            "isRented": false
        }]
    })
    res.send(cars)
});


// @desc GET fetch all bookings for current user
//  @route /booking  
router.get('/booking', ensureAuthenticated, async(req, res) => {
    let id = req.user._id
        // const cars = await User.find({ "user": userId}).populate('Car')
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
    console.log(result);
    res.send(result)
})


// @desc POST book the car given model number
//  @route /booking 
router.post('/booking', ensureAuthenticated, (req, res) => {
    let id = req.body.carId
    let userId = req.user._id
    console.log(id, userId)

    let RentedCarInfo = {}

    Car.findOne({ model: { $eq: id } }).then(foundCar => {
        console.log(foundCar)
        User.findById(userId).then(user => {
                user.rentedCars.push(foundCar._id)
                user.save().then(() => {
                    foundCar.isRented = true
                    foundCar.save().then(() => {
                        RentedCarInfo = {
                            car: foundCar._id,
                            user: userId,
                            date: req.body.rentalDate,
                            days: req.body.rentalDays
                        }
                        console.log(RentedCarInfo)
                        rentedCar.create(RentedCarInfo).then(() => { //save to db
                            res.send("car was booked")
                        })
                    }).catch(err => console.log(err))
                })
            })
            .catch(err => {
                if (err.code == 'E11000')
                    res.send("Already Exist")
            })
    })
})

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
        console.log(err)
    }
})

module.exports = router