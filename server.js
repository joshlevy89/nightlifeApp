var cors = require('cors')
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var routes = require('./routes/index.js')
var database = require('./database/db.js')
var db = new database()
const webpack = require('webpack');

var PORT = Number(process.env.PORT || 3000);

const isDevMode = (process.env.NODE_ENV !== 'production');

app.use(express.static('public'));
app.use(cors()); // middleware that allows cross-platform requests
app.use(bodyParser.json());

if (isDevMode) {
  // Use Webpack Hot middleware in development
  (function () {

    // Create & configure a webpack compiler
    const webpack = require('webpack');
    const webpackConfig = require(process.cwd() + '/webpack-dev.config.js');
    const compiler = webpack(webpackConfig);

    // Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      headers: { "Access-Control-Allow-Origin":
        "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true"
      },
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    }));
  })();
}

db.dbConnect(function(err,db_instance){
	routes(app, db_instance, io)
})

app.get('/',function(req,res){
	res.sendFile('/public/index.html');
})

http.listen(PORT, function () {
	console.log('Backend server listening at http://localhost:' + PORT);
})

module.exports = http

