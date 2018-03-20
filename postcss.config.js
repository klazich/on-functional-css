const ENV    = process.env.NODE_ENV || 'development'
const OUTDIR = ENV === 'production' ? 'docs' : 'dist'

const config = {
  plugins: {
    'postcss-import'          : { /* options */ },
    'postcss-nested'          : { /* options */ },
    'postcss-cssnext'         : { /* options */ },
    'postcss-font-magician'   : {
      variants : {
        'Fira Mono'      : { '200': [], '400': [], '700': [] },
        'PT Serif'       : { '200': [], '400': [], '700': [] },
        'Source Sans Pro': { '200': [], '400': [], '700': [] },
      },
      foundries: ['google'],
    },
    'postcss-svgo'            : { /* options */ },
    'css-mqpacker'            : { /* options */ },
    'postcss-sorting'         :
      ENV === 'production'
        ? { /* options */ }
        : false,
    'postcss-uncss'           :
      ENV === 'production'
        ? { html: [`${OUTDIR}/index.html`], }
        : false,
    'postcss-discard-comments':
      ENV === 'production'
        ? { /* options */ }
        : false,
    'perfectionist'           : { /* options */ },
    'immutable-css'           : { /* options */ },
    'postcss-reporter'        : {
      clearMessages: true, throwError: false,
    },
    'postcss-browser-reporter':
      ENV === 'production'
        ? false
        : { /* options */ },
  },
}

module.exports = config
