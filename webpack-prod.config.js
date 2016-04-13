var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


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
        presets: ["es2015", "react", "stage-0"]
      }
    },
    { test: /\.scss$/,
        loaders: ["style", "css", "sass"]
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
 plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("./styles/main.css"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  }
};