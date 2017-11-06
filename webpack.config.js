/* eslint global-require: "off", no-console: "off" */

/**
 * WEBPACK CONFIG
 *
 * Notes on config properties:
 *
 * 'entry'
 * Entry point for the bundle.
 *
 * 'output'
 * If you pass an array - the modules are loaded on startup. The last one is exported.
 *
 * 'resolve'
 * Array of file extensions used to resolve modules.
 *
 * 'webpack-dev-server'
 * Is a little node.js Express server, which uses the webpack-dev-middleware to
 * serve a webpack bundle. It also has a little runtime which is connected to
 * the server via Socket.IO.
 *
 * 'webpack/hot/dev-server'
 * By adding a script to your index.html file and a special entry point in your
 * configuration you will be able to get live reloads when doing changes to your
 * files.
 *
 * devtool: 'eval-source-map'
 * http://www.cnblogs.com/Answer1215/p/4312265.html
 * The source map file will only be downloaded if you have source maps enabled
 * and your dev tools open.
 *
 * HotModuleReplacementPlugin()
 * Hot Module Replacement (HMR) exchanges, adds or removes modules while an
 * application is running without page reload.
 *
 * NoErrorsPlugin()
 * Hot loader is better when used with NoErrorsPlugin and hot/only-dev-server
 * since it eliminates page reloads altogether and recovers after syntax errors.
 *
 * 'react-hot'
 * React Hot Loader is a plugin for Webpack that allows instantaneous live
 * refresh without losing state while editing React components.
 *
 * 'babel'
 * Babel enables the use of ES6 today by transpiling your ES6 JavaScript into equivalent ES5 source
 * that is actually delivered to the end user browser.
 */

const webpack = require('webpack');
const path = require('path');

const MODE = process.env.NODE_ENV || 'development';
const PROD_MODE = MODE === 'production';
const DEV_MODE = !PROD_MODE;

console.log(`\nWebpack started in ${MODE} mode.`);

const entry = ['./scripts/index'];

if (DEV_MODE) {
  entry.push('webpack-dev-server/client?http://localhost:5000', 'webpack/hot/dev-server');
}

module.exports = {
  entry,
  output: {
    path: DEV_MODE ? __dirname : path.resolve(__dirname, './dist'),
    filename: DEV_MODE ? 'bundle.js' : 'bundle-prod.js',
    publicPath: '/static/',
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'scripts/lib'),
    },
    extensions: ['.js', '.jsx'],
  },
  devtool: '',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(MODE),
      },
      NODE_ENV: JSON.stringify(MODE),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: PROD_MODE,
      debug: DEV_MODE,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'scripts'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, 'scripts'),
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader'},
        ]
      }
    ]
  }
};

if (PROD_MODE) {
  const CompressionPlugin = require('compression-webpack-plugin');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

  module.exports.plugins.push(
    new UglifyJSPlugin({
      sourceMap: false,
      extractComments: true,
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        warnings: false,
      }
    }),
    new CompressionPlugin({
      regExp: /\.js$/,
      minRatio: 0.9,
    }),
  );
}
