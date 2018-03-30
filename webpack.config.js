const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'development'
const OUT_DIR = path.join(__dirname, NODE_ENV === 'production' ? 'dist' : 'tmp')

console.log(OUT_DIR)

module.exports = {
  mode: NODE_ENV,
  entry: path.join(__dirname, 'src/js/index.js'),

  output: {
    filename: 'bundle.js',
    path: path.join(OUT_DIR, 'js'),
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
