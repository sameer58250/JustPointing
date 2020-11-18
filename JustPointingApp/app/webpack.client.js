const path = require('path');
const BASECONFIG = require('./webpack-base-config');


module.exports = {
  entry: ['babel-polyfill','./src/index.js'],
  output: {
    globalObject: "this",
    path: path.resolve('server-build/public'),
    filename: 'client_bundle.js'
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