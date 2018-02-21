const path = require('path')

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
        use    : [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader : 'postcss-loader',
            options: {
              config: {
                ctx: { cssnext: {} },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
}