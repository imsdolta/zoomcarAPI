const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose')

const User = mongoose.model('User');

router.get('/', async(req, res) => {
    res.json("Welcome to zoomCarAPI")
})

// @desc register 
// @route POST /register

router.post('/register', (req, res) => {
    const { username, email, password, password2 } = req.body;
    let errors = [];

    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        return res.status(401).send(errors);
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                console.log(errors)
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                res.send(user.username + " is registered sucessfully")
                            });
                    })
                });
            }
        });
    }
});

// @desc login
// @route POST /login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send("cannot login ");
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send("user " + user.username + " logged in");
        });
    })(req, res, next);
});

// @desc logout
// @route GET /logout
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send("logged out")
});

module.exports = router;