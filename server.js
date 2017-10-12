/* eslint no-console: "off" */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, './public'),
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(5000, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:5000');
});
