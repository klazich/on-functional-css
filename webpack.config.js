const path    = require('path')
const webpack = require('webpack')

let config = {
  entry  : {
    main: [
      path.resolve(__dirname, 'src/main.js'),
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
    ],
  },
  output : {
    filename: 'bundle.js',
    path    : path.resolve(__dirname, 'tmp'),
  },
  // context: path.resolve(__dirname, '../src'),
  module : {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    alias: { vue$: 'vue/dist/vue.esm.js', },
  },
}

module.exports = config