const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();

const env = process.env.NODE_ENV || 'development';
const config = require('./src/config/config.js')[env];

require('./src/config/db')(config);

// Passport Config
require('./src/config/passport')(passport);


app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('useCreateIndex', true)
    // Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use('/', require('./src/routes/user.js'))
app.use('/register', require('./src/routes/user.js'));
app.use('/login', require('./src/routes/user.js'));
app.use('/logout', require('./src/routes/user.js'));
app.use('/admin', require('./src/routes/admin.js'));
app.use('/cars', require('./src/routes/cars.js'))
app.use('/cars/booking', require('./src/routes/cars.js'))



// app.use('/users', require('./routes/users.js'));
// app.use('/reservation/', require('./routes/reservation.js'))

const PORT = process.env.PORT || 1337;

app.listen(PORT, console.log(`Server started on port ${PORT}`));