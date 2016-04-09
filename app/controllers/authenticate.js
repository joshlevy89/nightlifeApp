function authenticate(app) {

var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;


// Configure the Twitter strategy for use by Passport.
passport.use(new Strategy({
    consumerKey: "CW6VEnw5s1HArmtlvyyncSgjW",
    consumerSecret: "wiE6v7BfxCBB0IoiIw6rg2Qo5nbHG2L7O3hYyemq7NyicsIOAp",
    callbackURL: 'http://127.0.0.1:2999/auth/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

this.twitter_authentication = passport.authenticate('twitter')

this.twitter_callback = app.get('/auth/twitter/return',
    passport.authenticate('twitter', { failureRedirect: 'http://127.0.0.1:3000/signin' }),
    function(req, res) {
       var username = encodeURIComponent(req.user.username);
       res.redirect('http://127.0.0.1:3000/signin/'+username);
})

}

module.exports = authenticate