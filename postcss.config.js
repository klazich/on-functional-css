const ENV = process.env.NODE_ENV || 'development'
const OUTDIR = ENV === 'production' ? 'docs' : 'dist'

const config = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-cssnext': {},
    'postcss-font-magician': {
      variants: {
        'Fira Mono': { '200': [], '400': [], '700': [] },
        'PT Serif': { '200': [], '400': [], '700': [] },
        'Source Sans Pro': { '200': [], '400': [], '700': [] },
      },
      foundries: ['google'],
    },
    'postcss-svgo': {},
    'css-mqpacker': {},
    'postcss-sorting': ENV === 'production' ? {} : false,
    'postcss-uncss':
      ENV === 'production' ? { html: [`${OUTDIR}/index.html`] } : false,
    'postcss-discard-comments': ENV === 'production' ? {} : false,
    perfectionist: {},
    'immutable-css': {},
    'postcss-reporter': {
      clearMessages: true,
      throwError: false,
    },
    'postcss-browser-reporter': ENV === 'production' ? false : {},
  },
}

module.exports = config
