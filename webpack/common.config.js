const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const development = require('./dev.config.js');
const production = require('./prod.config.js');

require('babel-polyfill').default;

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, '../src/static'),
    build: path.join(__dirname, '../src/static_dist'),
};

const VENDOR = [
    'history',
    'babel-polyfill',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-mixin',
    'classnames',
    'redux',
    'react-router-redux',
    'jquery'
];

process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        app: PATHS.app,
        vendor: VENDOR,
    },

    output: {
        filename: '[name].[hash].js',
        path: PATHS.build,
        publicPath: '/static'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/static/index.html'),
            hash: true,
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        // extract all common modules to vendor so we can load multiple apps in one page
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[hash].js' })
    ],

    resolve: {
        extensions: ['', '.jsx', '.js', '.json', '.scss'],
        modulesDirectories: ['node_modules', PATHS.app],
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loader: 'file?name=/images/[name].[ext]?[hash]'
            },
            {
                test: /\.woff(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
            },
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?.*)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]'
            },
            {
                test: /\.otf(\?.*)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.json(\?.*)?$/,
                loader: 'file-loader?name=/files/[name].[ext]'
            }
        ]
    },

    postcss: (param) => {
        return [
            autoprefixer({
                browsers: ['last 2 versions'],
            }),
            postcssImport({
                addDependencyTo: param,
            }),
        ];
    },
};

if (TARGET === 'dev' || !TARGET) {
    module.exports = merge(development, common);
}

if (TARGET === 'compile' || !TARGET) {
    module.exports = merge(production, common);
}
