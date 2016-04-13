var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var ports = require("./port_config.json");

const port = ports.client_port;
console.log(port)

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at https://localhost:' + port);
});
