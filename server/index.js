var cors = require('cors')
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
// NOT SURE WHY I NEED TO GO BACK 3 FOLDERS TO GET TO PORT_CONFIG
var port = require("../port_config.json").server_port;
var PORT = Number(process.env.PORT || port);
var routes = require('./routes/index.js')
var database = require('./database/db.js')
var db = new database()

app.use(cors()); // middleware that allows cross-platform requests
app.use(bodyParser.json());

db.dbConnect(function(err,db_instance){
	routes(app, db_instance, io)
})

http.listen(PORT, function () {
	console.log('Backend server listening at http://localhost:' + PORT);
})

module.exports = http

