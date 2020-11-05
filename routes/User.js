const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose')

// Load User 
// Load User model
const User = mongoose.model('User');

router.get('/', async(req, res) => {
    await User.deleteMany({})
    res.json("hello world")
})

// Register
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
        console.log(errors)
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
                                    res.send('You are now registered and can log in')
                                });
                        })
                        .catch(err => console.log(err));
                });

            }
        });
    }
});


// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send("cannot login"); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send("user " + user.username + " logged in");
        });
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send("logged out")
});

module.exports = router;