const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fontAwesomeConfig = require('./font-awesome.config');

fontAwesomeConfig.styleLoader = ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader!less-loader'
});

module.exports = fontAwesomeConfig;
