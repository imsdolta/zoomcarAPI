const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{ // May not need it later
        type: mongoose.Schema.Types.String
    }],
    rentedCars: [{
        type: ObjectId,
        ref: 'Car'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;