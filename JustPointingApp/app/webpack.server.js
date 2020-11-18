const path = require('path');
const nodeExternals = require('webpack-node-externals');
const BASECONFIG = require('./webpack-base-config');

module.exports = {
  entry: ['babel-polyfill','./src/server.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    globalObject: "this",
    path: path.resolve('server-build'),
    filename: 'bundle.js'
  }, 
  plugins: [
    BASECONFIG.MINICSSEXTRACTPLUGIN,
    BASECONFIG.ENVIRONMENT_VAR_CONFIG
  ],
  module: {
    rules: [
      BASECONFIG.JSPRESETRULES,
      BASECONFIG.CSSPRESETRULES
    ]
  }
};