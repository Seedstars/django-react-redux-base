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
        publicPath: '/static/'
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
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ],

    resolve: {
        extensions: ['', '.jsx', '.js', '.json', '.scss'],
        modulesDirectories: ['node_modules', PATHS.app],
    },

    module: {
        loaders: [
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports?jQuery=jquery',
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff',
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff2',
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream',
            }, {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-otf',
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml',
            }, {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            }, {
                test: /\.png$/,
                loader: 'file?name=[name].[ext]',
            }, {
                test: /\.jpg$/,
                loader: 'file?name=[name].[ext]',
            }],
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
