const path              = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry  : path.resolve(__dirname, 'src/js/index.js'),
  output : {
    filename: 'bundle.js',
    path    : path.resolve(__dirname, 'tmp'),
  },
  module : {
    rules: [
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test   : /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : [
            // { loader: 'style-loader' },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader : 'postcss-loader',
              options: {
                config: {
                  ctx: { cssnext: {} },
                },
              },
            },
          ]
        }),
      },
      /*{
          test: /\.(gif|png|jpe?g|svg)$/i,
          include: path.resolve(__dirname, 'tmp'),
          use: [
            { loader: 'file-loader' },
            { loader: 'image-webpack-loader', options: { bypassOnDebug: true } },
          ]
        },*/
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],

}