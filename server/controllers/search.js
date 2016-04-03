function search(db, io) {
var request_yelp = require('../yelp_api/request_yelp')

this.search_yelp = function(req,res) {
	var params = {
		location: req.body.location,
		limit: 10,
		category_filter: 'bars'
	}
	// make call to yelp api
	request_yelp(params,function cb(error,response,body){
		// when get response, convert string to json
		var businesses = JSON.parse(body).businesses

		if (businesses === undefined) {
			res.json({
				message: 'NO_RESULTS_RECEIVED'
			})
			return
		}
		// find documents with the business ids
		// get business ids
		var businesses_ids = businesses.map(business => { return business.id })
		// get the documents with these ids
		var places_attending = db.collection('places_attending')
		places_attending.find({
			'id': { $in: businesses_ids }
		}).toArray(function(err,docs) {
			// get the ids of the documents
			var docs_ids = docs.map(doc => { 
				return doc.id 
				}
			)
			// go through each business and return a result for it,
			// using the database documents to get the number attending
			var results = businesses.map(business => {
				var docInd = docs_ids.indexOf(business.id);
				var num_attending = 0
				// if exists, get the # attending
				if (docInd !== -1) {
					num_attending = docs[docInd].attending.length
				}
				return {
					id: business.id,
					business: business,
					num_attending: num_attending
				}
			})
			res.json({
				results: results,
				message: 'RESULTS_RECEIVED'
			})
		})
	})
}
}

module.exports = search
