module.exports = ({ file, options, env }) => ( {
  plugins: {
    'postcss-import'          : {},
    'postcss-nested'          : {},
    'postcss-discard-comments': {},
    'postcss-cssnext'         : options.cssnext ? options.cssnext : false,
    'postcss-font-magician'   : { display: 'fallback', hosted: ['./src/fonts/woff2'], formats: 'woff2 woff' },
    'postcss-svgo'            : {},
    'postcss-sorting'         : {},
    'css-mqpacker'            : env === 'production' ? {} : false,
    'postcss-uncss'           : env === 'production' ? { html: ['src/index.html'] } : false,
    'cssnano'                 : env === 'production' ? { autoprefixer: false } : false,
    'postcss-browser-reporter': {},
    'postcss-reporter'        : {},
  },
} )



