const mongoose = require('mongoose');
const User = require('mongoose').model('User');
const Car = require('mongoose').model('Car');

var ObjectId = require('mongodb').ObjectID;

const rentedCarSchema = new mongoose.Schema({
    car: {
        type: ObjectId,
        required: true,
        ref: 'Car'
    },
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
})

const RentedCar = mongoose.model('RentedCar', rentedCarSchema);

module.exports = RentedCar;