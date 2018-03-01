const path = require('path')

const outputDir = process.env.NODE_ENV === 'production' ? 'docs' : 'dist'

let config = {
  mode: process.env.NODE_ENV || 'development',

  entry: path.resolve(__dirname, 'src/js/index.js'),

  output: {
    filename  : 'bundle.js',
    path      : path.resolve(__dirname, outputDir, 'js'),
    publicPath: '/js/',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test   : /\.js$/,
        loader : ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test   : /\.svg$/,
        loader : 'vue-svg-loader', // `vue-svg` for webpack 1.x
        options: {
          // optional [svgo](https://github.com/svg/svgo) options
          svgo: {
            plugins: [
              { removeDoctype: true },
              { removeComments: true },
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use : [
          {
            loader : 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
}

module.exports = config