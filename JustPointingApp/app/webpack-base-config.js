const paths = require('./node_modules/react-scripts/config/paths');
const webpack = require('webpack');

process.env.NODE_ENV = 'production';
require('./node_modules/react-scripts/config/env');
const getClientEnvironment = require('./node_modules/react-scripts/config/env');
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const _CSSURL = 'style.css';

module.exports = {
    MINICSSEXTRACTPLUGIN: 
        new MiniCssExtractPlugin({
            filename: _CSSURL
        })
    ,
    ENVIRONMENT_VAR_CONFIG:
        new webpack.DefinePlugin(env.stringified)
    ,
    JSPRESETRULES: {
        test: /\.js$/,
        exclude: '/node_modules',
        use: [{
        loader:  'babel-loader',
        options:{
            presets: [
                '@babel/preset-react',
                ['@babel/preset-env',{
                    targets : {
                        node: "current",
                        browsers : ['last 2 versions']
                    }
                }]
            ],
            sourceType: "unambiguous",
            plugins: [
              [
                "@babel/plugin-transform-runtime"
              ],              
              [
                "@babel/plugin-proposal-class-properties",
              ]
          ]
        }
        }]
    },
    CSSPRESETRULES: {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } }
        ]
    }
}