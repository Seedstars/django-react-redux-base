import webpack           from 'webpack';
import config            from './config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const paths = config.get('utils_paths');

const autoprefixer = require('autoprefixer');

const webpackConfig = {
  name    : 'client',
  target  : 'web',
  entry   : {
    app : [
      paths.project(config.get('dir_src'))
    ],
    vendor : config.get('vendor_dependencies')
  },
  output : {
    filename   : '[name].[hash].js',
    path       : paths.project(config.get('dir_dist')),
    publicPath : '/static/'
  },
  plugins : [
    new webpack.DefinePlugin(config.get('globals')),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template : paths.src('index.html'),
      hash     : true,
      filename : 'index.html',
      inject   : 'body'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    // extract all common modules to vendor so we can load multiple apps in one page
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ],
  resolve : {
    extensions : ['', '.js', '.jsx'],
    alias      : config.get('utils_aliases')
  },
  module : {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        exclude : /node_modules/,
        loader  : 'babel'
      },
      {
        test    : /\.scss$/,
        loaders : [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      /* eslint-disable */
      { test: /\.jpe?g$|\.gif$|\.png$/, loader: "file?name=[path][name].[ext]?[hash]" },
      { test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      { test: /\.otf(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]&mimetype=application/font-otf" },
      { test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" },
      { test: /\.json(\?.*)?$/,  loader: "file-loader?name=[path][name].[ext]" }
      /* eslint-enable */
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};

export default webpackConfig;
