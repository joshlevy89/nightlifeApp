function remove(db, io) {
	this.remove_attendee = function(req,res){
		var user = req.body.user
		var id = req.body.id

		var places_attending = db.collection('places_attending')
		// get the bars people are attending
		places_attending.find({}).toArray(function(err,docs) {

		// find the result in list
		matches = docs.filter(doc => {
			if (doc.id === id) {
				return true
			}
		})
		var match = matches[0];

		// remove the user from the list of attendees

		var attending_update = match.attending.slice(0)
		attending_update.push(user)
		var attending_update = match.attending.slice(0)
		var index = attending_update.indexOf(user)
		attending_update.splice(index, 1);
		places_attending.update({
			id: id
		}, {
			$set: {
				attending: attending_update
			}
		}, function(err,doc) {
			io.sockets.emit('places_attending_updated',{
				id: id,
				attending: attending_update.length
			})
		})
		res.end()
		})
	}
}

module.exports = remove