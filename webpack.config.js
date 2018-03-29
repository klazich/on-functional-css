const { resolve } = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: resolve(__dirname, 'src/js/main.js'),

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist', 'js'),
    publicPath: '/js/',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
