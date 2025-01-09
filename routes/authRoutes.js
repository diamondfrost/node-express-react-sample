const passport = require('passport');

// make sure to include the app object from index.js
module.exports = (app) => {
    // get the code to auth
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //give the code
    app.get('/auth/google/callback', passport.authenticate('google'));
    // user logout
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
    // returns logged in user
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};