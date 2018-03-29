const fs = require('fs')
const path = require('path')
const postcss = require('postcss')

const processors =
  process.env.NODE_ENV === 'production'
    ? [
        require('postcss-uncss')({
          html: ['dist/index.html'],
        }),
        require('cssnano')({
          autoprefixer: false,
        }),
      ]
    : [
        require('postcss-import'),
        require('postcss-cssnext'),
        require('postcss-font-magician')({
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
        }),
        require('css-mqpacker'),
        require('postcss-pxtorem'),
        require('perfectionist'),
        require('immutable-css'),
        require('postcss-browser-reporter'),
      ]

const options =
  process.env.NODE_ENV === 'production'
    ? {
        map: { inline: false },
        from: 'dist/css/styles.css',
        to: 'dist/css/styles.min.css',
      }
    : {
        map: { inline: false },
        from: 'src/css/styles.css',
        to: 'dist/css/styles.css',
      }

fs.readFile(
  process.env.NODE_ENV === 'production'
    ? 'dist/css/styes.css'
    : 'src/css/styles.css',
  (err, css) => {
    postcss(processors)
      .process(css, options)
      .then(result => {
        fs.writeFile(options.to, result.css, err => console.log(err))
        if (result.map)
          fs.writeFile(options.to + '.map', result.map, err => console.log(err))
      })
  }
)
