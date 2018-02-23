/** @format */

import path from 'path'
import webpack from 'webpack'

export const webpackConfig = {
  entry: {
    main: [
      './main.js',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
    ],
  },
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, '../tmp'),
  },
  context: path.resolve(__dirname, '../tmp'),
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
}

export const browserSync = {
  server: 'tmp',
  middleware: [
    webpackDevMiddleware(bundler, {}),
    webpackHotMiddleware(bundler),
  ],
}
