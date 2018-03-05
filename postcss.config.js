const ENV = process.env.NODE_ENV || 'development'
const OUTDIR = ENV === 'production' ? 'docs' : 'dist'

let config = {
  plugins: {
    'postcss-import'          : {},
    'postcss-nested'          : {},
    'postcss-cssnext'         : {},
    'postcss-svgo'            : {},
    'css-mqpacker'            : {},
    'postcss-sorting'         : ENV === 'production' ? {} : false,
    'postcss-discard-comments': ENV === 'production' ? {} : false,
    'postcss-uncss'           : ENV === 'production' ? { html: [`${OUTDIR}/index.html`], ignore: ['.*hover.*, .*focus.*'] } : false,
    'postcss-browser-reporter': {},
  },
}

module.exports = config
