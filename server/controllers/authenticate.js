function authenticate(app) {

var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
app.use(passport.initialize());
app.use(passport.session());

var isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
  var credentials = {
    consumerKey: "iWLqGs4FvOU5BquzV7ThZDFw5",
    consumerSecret: "BmanTkz22qqtjRStMfFjVnAAVZ0dLRXKUNb9sTivG0ANcan5Gu",
  }
}
else {
  var credentials = {
    consumerKey: "CW6VEnw5s1HArmtlvyyncSgjW",
    consumerSecret: "wiE6v7BfxCBB0IoiIw6rg2Qo5nbHG2L7O3hYyemq7NyicsIOAp",
  }
}

// Configure the Twitter strategy for use by Passport.
passport.use(new Strategy({
    consumerKey: credentials.consumerKey,
    consumerSecret: credentials.consumerSecret,
    callbackURL: '/auth/twitter/return'
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


this.twitter_authentication = passport.authenticate('twitter')

this.twitter_callback = app.get('/auth/twitter/return',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
       var username = encodeURIComponent(req.user.username);
       res.redirect('/signin/'+username);
})
}

module.exports = authenticate