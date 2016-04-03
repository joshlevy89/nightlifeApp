function add(db, io) {
	this.add_attendee = function(req,res){
		var user = req.body.user
		var result = req.body.result
		if (user === undefined) {
			res.end()
			return
		}
		var places_attending = db.collection('places_attending')
		// get the bars people are attending
		places_attending.find({}).toArray(function(err,docs) {
		// find the result in list, if exists
		matches = docs.filter(doc => {
			if (doc.id === result.id) {
				return true
			}
		})
		var match = matches[0];

		// if doesn't exist, add to the list along with user name
		if (matches.length === 0){
			var new_place = 
			{
				id: result.id,
				business: result.business,
				attending: [user]
			}
			places_attending.insert(new_place, function(err,doc) {
				io.sockets.emit('places_attending_updated',{
					id: result.id,
					business: result.business,
					num_attending: 1
				})
			})
		}
		// if does exist and user has not marked attending, update
		else if (match.attending.indexOf(user) === -1) {
			var attending_update = match.attending.slice(0)
			attending_update.push(user)
			places_attending.update({
				id: result.id
			}, {
				$set: {
					attending: attending_update
				}
			}, function(err,doc) {
				io.sockets.emit('places_attending_updated',{
					id: result.id,
					business: result.business,
					attending: attending_update.length
				})
			})
		}
		//update to include user
		res.end()
		})
	}
}

module.exports = add