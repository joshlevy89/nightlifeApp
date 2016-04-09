function signin(db,io) {
	this.attempt_signin = function(req,res) {
		// look for user in database and return polls
		var user = req.body.user_name
		var places_attending = db.collection('places_attending')
		places_attending.find({}).toArray(function(err,docs){
			// get places user has marked as going
			var places_user_marked = docs.filter(doc => {
				if (doc.attending.indexOf(user) !== -1) {
					return true 
				}
			})
			// get the relevant fields for those documents
			var places_user_attending = places_user_marked.map(place => {
					return {
						id: place.business.id,
						business: place.business
					}
				}
			)
			res.json({
				message: 'signin_successful',
				places_user_attending: places_user_attending
			})
		})

	}
}

module.exports = signin