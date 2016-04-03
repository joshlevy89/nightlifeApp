var Search = require('../controllers/search.js')
var Add = require('../controllers/add.js')
var Signin = require('../controllers/signin.js')
var Authenticate = require('../controllers/authenticate.js')


module.exports = function(app, db, io) {
	var search = new Search(db, io)
	var add = new Add(db, io)
	var signin = new Signin(db,io)
	var authenticate = new Authenticate(app)

	app.route('/api/search')
		.post(search.search_yelp)

	app.route('/api/add')
		.post(add.add_attendee)

	app.route('/api/signin')
		.post(signin.attempt_signin)

	app.route('/auth/twitter')
		.get(authenticate.twitter_authentication) 

	app.route('/auth/twitter/return')
		.get(authenticate.twitter_callback)
}