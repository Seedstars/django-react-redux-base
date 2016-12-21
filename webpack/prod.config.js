const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('styles/[name].css');

module.exports = {
    // devtool: 'source-map', // No need for dev tool in production

    module: {
        rules: [{
            test: /\.css$/,
            use: [
                extractCSS.extract('style'),
                'css-loader?localIdentName=[path][name]--[local]',
                'postcss-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                extractCSS.extract('style'),
                'css-loader?localIdentName=[path][name]--[local]',
                'postcss-loader',
                'sass-loader',
            ]
        }],
    },

    plugins: [
        extractCSS,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
