var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './public/src/index.js'
  ],
  output: {
    path: path.resolve('./public'),
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ["es2015", "react", "stage-1"]
      }
    },
    {
        test: /\.scss$/,
        exclude: ['node_modules', 'app'],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test   :  /\.json$/,
        loader : 'json'
      },
      {
        test   :  /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      }
  ]
},
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  }
};