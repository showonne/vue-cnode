const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config.js')
// var config = require('../config')
// var utils = require('./utils')
// var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  devtool: '@source-map',
  entry: {
    app: './src/client-entry.js',
    vendor: ['vue', 'vue-loader']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'client-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.less$/,
        loader: 'css!less'
      },
      {
        test: /\.css$/,
        loader: 'css'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: vueConfig
    })
  ]
}
