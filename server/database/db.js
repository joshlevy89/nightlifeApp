function db() {

	var db_singleton = null;

	this.dbConnect = function(cb) {
	  if (this.db_singleton) {
		cb(err,db)
		return
	  }
	  else {
		var url = 'mongodb://localhost:27017/nightlifeApp'
		var mongo = require('mongodb').MongoClient
		mongo.connect(url, function(err,db) {
			db_singleton = db;
			console.log('new db connection created')
			cb(err, db);
			return
		})
	  }
	}

}

module.exports = db;