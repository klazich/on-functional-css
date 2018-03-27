const ENV = process.env.NODE_ENV || 'development'

const fontMagician = {
  variants: {
    'Fira Mono': { '200': [], '400': [], '700': [] },
    'PT Serif': { '200': [], '400': [], '700': [] },
    'Source Sans Pro': { '200': [], '400': [], '700': [] },
  },
  foundries: ['google'],
}

const reporter = {
  clearMessages: true,
  throwError: false,
}

const uncss = { html: ['dist/index.html'] }

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    'postcss-font-magician': fontMagician,
    'postcss-svgo': {},
    'css-mqpacker': {},
    'postcss-sorting': ENV === 'production' ? {} : false,
    'postcss-uncss': ENV === 'production' ? uncss : false,
    'postcss-discard-comments': ENV === 'production' ? {} : false,
    perfectionist: {},
    'immutable-css': {},
    'postcss-reporter': reporter,
    'postcss-browser-reporter': ENV === 'development' ? {} : false,
  },
}
