env = process.env.NODE_ENV || 'development'

module.exports = {
  plugins: {
    'postcss-import'          : {},
    'postcss-nested'          : {},
    'postcss-cssnext'         : {},
    'postcss-font-magician'   : { display: 'fallback' },
    'postcss-svgo'            : {},
    'css-mqpacker'            : {},
    'postcss-sorting'         : {},
    // 'stylefmt'                : {},
    'postcss-uncss'           : env === 'production' ? { html: ['src/index.html'] } : false,
    'postcss-browser-reporter': {},
  },
}
