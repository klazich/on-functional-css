const ENV = process.env.NODE_ENV || 'development'
const OUTDIR = ENV === 'production' ? 'docs' : 'dist'

let config = {
  plugins: {
    'postcss-import'          : {},
    'immutable-css'           : {},
    'postcss-nested'          : {},
    'postcss-cssnext'         : {},
    'postcss-svgo'            : {},
    'css-mqpacker'            : {},
    'postcss-sorting'         : ENV === 'production' ? {} : false,
    'postcss-uncss'           : ENV === 'production' ? { html: [`${OUTDIR}/index.html`] } : false,
    'postcss-discard-comments': ENV === 'production' ? {} : false,
    'postcss-reporter'        : { clearMessages: true, throwError: false },
    'postcss-browser-reporter': ENV === 'production' ? false : {},
  },
}

module.exports = config
