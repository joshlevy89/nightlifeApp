var cors = require('cors')
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var routes = require('./app/routes/index.js')
var database = require('./app/database/db.js')
var db = new database()
const webpack = require('webpack');

var passport = require('passport');


var PORT = Number(process.env.PORT || 3000);

const isDevMode = (process.env.NODE_ENV !== 'production');

app.use(express.static('public'));
app.use(cors()); // middleware that allows cross-platform requests
app.use(bodyParser.json());
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));



if (isDevMode) {
  // Use Webpack Hot middleware in development
  (function () {
    console.log('development mode')
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

app.get('/signin*',function(req,res){
  var path = require('path');

  console.log('sign in hit');
	res.sendFile(path.join(__dirname, '/public/index.html'))
})


http.listen(PORT, function () {
	console.log('Backend server listening at http://localhost:' + PORT);
})

module.exports = http

