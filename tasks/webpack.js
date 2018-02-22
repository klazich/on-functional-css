import path from 'path'
import webpack from 'webpack'

let config = {
  entry: {
    main: [
      './main.js',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ]
  },

  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, '../tmp'),
  },

  context: path.resolve(__dirname, '../tmp'),

  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
}

function script() {
  return new Promise(
    resolve => webpack(config,
      
      (err, stats) => {
        if (err) console.log('Webpack', err)
        console.log(stats.toString({}))
        resolve()
      
      }))
}

module.exports = { config, scripts }