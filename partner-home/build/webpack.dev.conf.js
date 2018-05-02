var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.template.html',
      inject: true,
      // chunksSortMode: function (a, b) {  //alphabetical order
      //   console.log(a.names[0],b.names[0]);
      //   if (a.names[0] > b.names[0]) {
      //     return 1;
      //   }
      //   if (a.names[0] < b.names[0]) {
      //     return -1;
      //   }
      //   return 0;
      // }
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    // copy
    // new HtmlWebpackPlugin({
    //   filename: 'retg.html',
    //   template: 'src/retg.html',
    //   chunks: []
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'adRobot.html',
    //   template: 'src/historyProject/admin/adRobot.html',
    //   chunks: []
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'parterAllInfo.html',
    //   template: 'src/historyProject/admin/parterAllInfo.html',
    //   chunks: ['parterAllInfo']
    // }),
    new FriendlyErrorsPlugin()
  ]
})
