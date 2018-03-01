env = process.env.NODE_ENV || 'development'
dir = env === 'production' ? 'docs' : 'dist'

module.exports = {
  plugins: {
    'postcss-import'          : {},
    'postcss-nested'          : {},
    'postcss-cssnext'         : {},
    'postcss-font-magician'   : { display: 'fallback' },
    'postcss-svgo'            : {},
    'css-mqpacker'            : {},
    'postcss-sorting'         : env === 'production' ? {} : false,
    'postcss-discard-comments': env === 'production' ? {} : false,
    'postcss-uncss'           : env === 'production'
      ? { html: [`${dir}/index.html`], ignore: ['.*hover.*, .*focus.*'] }
      : false,
    'postcss-browser-reporter': {},
  },
}
