const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // devtool: 'source-map', // No need for dev tool in production

    entry: {
        vendor: [
            'bootstrap-loader/extractStyles',
            'font-awesome-webpack!./src/static/styles/font-awesome.config.prod.js'
        ]
    },

    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", "css?minimize!postcss-loader!sass")
        }],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            '__DEVELOPMENT__': false
        }),
        new ExtractTextPlugin('styles/[name].[contenthash].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ],
};
