const path = require('path')

const ENV     = process.env.NODE_ENV || 'development'
const OUTDIR  = ENV === 'production' ? 'docs' : 'dist'

let config = {
  mode: ENV,

  entry: path.resolve(__dirname, 'src/js/main.js'),

  output: {
    filename  : 'bundle.js',
    path      : path.resolve(__dirname, OUTDIR, 'js'),
    publicPath: '/js/',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}

module.exports = config