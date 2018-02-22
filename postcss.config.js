module.exports = ({ file, options, env }) => ( {
  plugins: {
    'postcss-import'          : {},
    'postcss-nested'          : {},
    'postcss-discard-comments': {},
    'postcss-cssnext'         : options.cssnext ? options.cssnext : {},
    'postcss-font-magician'   : { /*display: 'fallback',*/ hosted: ['src/fonts/ttf'] },
    'postcss-svgo'            : {},
    'css-mqpacker'            : {}, // env === 'production' ? {} : false,
    'postcss-sorting'         : {},
    'postcss-uncss'           : env === 'production' ? { html: ['src/index.html'] } : false,
    'cssnano'                 : env === 'production' ? { autoprefixer: false } : false,
    'postcss-browser-reporter': {},
    'postcss-reporter'        : {},
  },
} )



