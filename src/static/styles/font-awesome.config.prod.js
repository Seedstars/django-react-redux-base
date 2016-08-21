const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fontAwesomeConfig = require('./font-awesome.config');

fontAwesomeConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');

module.exports = fontAwesomeConfig;
