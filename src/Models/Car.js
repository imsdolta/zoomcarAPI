const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    isRented: {
        type: Boolean,
        required: true,
        default: false
    },
    creationDate: {
        type: Number,
        required: true
    }
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;