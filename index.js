// import statement in common js
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// just to make sure these files run on runtime
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

// each call of express function is an application
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys:[keys.cookieKey]
    })
);

// use cookies to handle auth
app.use(passport.initialize());
app.use(passport.session());

// require returns a function and we pass app to that function
require('./routes/authRoutes')(app);

// app.get('/', (req, res)  => {
//     res.send({ hi:'there' });
// });

// listen to what port gets used or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);