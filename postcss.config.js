const plugins = {
  'postcss-import': {},
  'postcss-cssnext': {},
  'postcss-font-magician': {
    variants: {
      'Fira Mono': {
        '200': [],
        '400': [],
        '700': [],
      },
      'PT Serif': {
        '200': [],
        '400': [],
        '700': [],
      },
      'Source Sans Pro': {
        '200': [],
        '400': [],
        '700': [],
      },
    },
    foundries: ['google'],
  },
  'css-mqpacker': {},
  'postcss-pxtorem': {},
  perfectionist: {},
  'immutable-css': {},
}

module.exports = ({ file, options, env }) =>
  env === 'production'
    ? {
        plugins: {
          ...plugins,
          'postcss-uncss': { html: ['tmp/index.html'] },
          cssnano: { autoprefixer: false },
        },
      }
    : { plugins }
