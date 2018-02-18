let gulp      = require('gulp')
let newer     = require('gulp-newer')
let imagemin  = require('gulp-imagemin')
let htmlclean = require('gulp-htmlclean')
let cleanCSS  = require('gulp-clean-css')
let postcss   = require('gulp-postcss')
let rename    = require('gulp-rename')
let Browser   = require('browser-sync')
let noop      = require('./noop.js')

let browser = Browser.create()
let reload  = browser.reload


let fonts = (dest) => () =>
  gulp.src('src/fonts/**/*')
    .pipe(newer(dest))
    .pipe(gulp.dest(dest))

gulp.task('fonts', fonts('tmp/fonts'))
gulp.task('fonts:dist', fonts('dist/fonts'))


let images = (dest) => () =>
  gulp.src('src/images/**/*')
    .pipe(newer(dest))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(dest))

gulp.task('images', images('tmp/images'))
gulp.task('images:dist', images('dist/images'))


let html = (dest) => () =>
  gulp.src('src/index.html')
    .pipe(newer(dest))
    .pipe(dest === 'dist' ? htmlclean() : noop())
    .pipe(gulp.dest(dest))

gulp.task('html', ['images'], html('tmp'))
gulp.task('html:dist', ['images:dist'], html('dist'))


let css = (dest) => {
  let options = {
    uncss       : { html: ['src/index.html'] },
    fontMagician: {
      display: 'fallback',
      hosted : ['src/fonts/ttf', 'src/fonts/woff', 'src/fonts/woff2'],
    },
    cleanCSS    : { format: 'beautify' },
    assets      : { loadPaths: ['images/'] },
    rename      : { suffix: '.min' },
  }

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-cssnext'),
    require('postcss-font-magician')(options.fontMagician)
  ]

  if ( dest === 'dist' ) {
    processors = [
      ...processors,
      require('postcss-assets')(options.assets),
      require('postcss-sorting'),
      require('postcss-uncss')(options.uncss),
      require('css-mqpacker'),
    ]
  }

  return () =>
    gulp.src('src/styles/**/*')
      .pipe(postcss(processors))
      // .pipe(dest === 'dist' ? rename(options.rename) : noop())
      .pipe(dest === 'dist' ? cleanCSS() : cleanCSS(options.cleanCSS))
      .pipe(gulp.dest(dest))
      .pipe(browser.stream())
}

gulp.task('css', ['html', 'images', 'fonts'], css('tmp'))
gulp.task('css:dist', ['html:dist', 'images:dist', 'fonts:dist'], css('dist'))


gulp.task('build', ['html', 'css', 'fonts'])
gulp.task('build:dist', ['html:dist', 'css:dist', 'fonts:dist'])


gulp.task('browserSync', () => {
  browser.init({
    server: { baseDir: 'tmp' },
  })
})

gulp.task('watch', ['build', 'browserSync'], () => {
  gulp.watch('src/fonts/**/*', ['fonts'])
  gulp.watch('src/images/**/*', ['images'])
  gulp.watch('src/index.html', ['html'])
  gulp.watch('src/styles/**/*.css', ['css'])
  gulp.watch('tmp/index.html').on('change', reload)
})