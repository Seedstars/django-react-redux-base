const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  
  entry: {
    vendor: [
      'bootstrap-loader',
      'font-awesome-webpack!./src/static/styles/font-awesome.config.js'
    ]
  },
  
  output: {
    publicPath: '../src/static_dist/',
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass',
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __DEVELOPMENT__: true,
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
};
