function signin(db,io) {
	this.attempt_signin = function(req,res) {
		// look for user in database and return polls
		var user = req.body.user_name
		var places_attending = db.collection('places_attending')
		places_attending.find({}).toArray(function(err,docs){
			var places_user_attending = docs.filter(doc => {
				if (doc.attending.indexOf(user) !== -1) {
					return {
						id: doc.id,
						name: doc.name,
						city: doc.city,
						num_attending: doc.attending.length
					}
				}
			})
			res.json({
				message: 'signin_successful',
				places_user_attending: places_user_attending
			})
		})

	}
}

module.exports = signin