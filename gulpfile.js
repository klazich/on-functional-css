const gulp       = require('gulp')
const newer      = require('gulp-newer')
const imagemin   = require('gulp-imagemin')
const htmlmin    = require('gulp-html-minifier')
const stylefmt   = require('gulp-stylefmt')
const postcss    = require('gulp-postcss')
const rename     = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const injectStr  = require('gulp-inject-string')
const inline     = require('gulp-inline')
const del        = require('del')
const Browser    = require('browser-sync')
const noop       = require('./noop.js')

const browser = Browser.create()
const reload  = browser.reload

const options = {
  uncss       : { html: ['src/index.html'] },
  fontMagician: {
    display: 'fallback',
    hosted : ['src/fonts/ttf', 'src/fonts/woff', 'src/fonts/woff2'],
  },
  rename      : { suffix: '.min' },
  inline      : { base: 'tmp/', disabledTypes: ['js', 'css', 'img'] },
  cssnano     : { autoprefixer: false },
}

/**
 * Clean tmp/dist gulp task
 */

let clean = dir => done => del(dir, done)

gulp.task('clean', clean(['tmp', 'dist']))


/**
 * Fonts gulp tasks
 */

let fonts = dest => () =>
  gulp.src('src/fonts/**/*')
    .pipe(newer(dest))
    .pipe(gulp.dest(dest))

gulp.task('fonts', fonts('tmp/fonts'))
gulp.task('fonts:dist', fonts('dist/fonts'))


/**
 * Images gulp tasks
 */

let images = dest => () =>
  gulp.src('src/images/**/*')
    .pipe(newer(dest))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(dest))

gulp.task('images', images('tmp/images'))
gulp.task('images:dist', images('dist/images'))


/**
 * HTML gulp task
 */

let html = dest => () =>
  gulp.src('src/index.html')
    .pipe(newer(dest))
    .pipe(inline(options.inline))
    .pipe(dest === 'dist' ? injectStr.replace('styles.css', 'styles.min.css') : noop())
    .pipe(dest === 'dist' ? htmlmin() : noop())
    .pipe(gulp.dest(dest))

gulp.task('html', ['images'], html('tmp'))
gulp.task('html:dist', ['images:dist'], html('dist'))


/**
 * CSS gulp task
 */

let css = dest => {

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-cssnext'),
    require('postcss-font-magician')(options.fontMagician),
    require('postcss-svgo'),
    require('postcss-sorting'),
    require('css-mqpacker'),
  ]

  if ( dest === 'dist' ) {
    processors = [
      ...processors,
      require('postcss-uncss')(options.uncss),
      require('cssnano')(options.cssnano),
    ]
  }

  processors = [
    ...processors,
    require('postcss-reporter'),
  ]

  return () =>
    gulp.src('src/styles.css')
      .pipe(sourcemaps.init())
      .pipe(postcss(processors))
      .pipe(dest === 'dist' ? rename(options.rename) : noop())
      .pipe(dest === 'dist' ? noop() : stylefmt())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest))
      .pipe(browser.stream())
}

gulp.task('css', ['html', 'images', 'fonts'], css('tmp'))
gulp.task('css:dist', ['html:dist', 'images:dist', 'fonts:dist'], css('dist'))


/**
 * Build gulp tasks
 */

gulp.task('build', ['html', 'css', 'fonts'])
gulp.task('build:dist', ['html:dist', 'css:dist', 'fonts:dist'])


/**
 * BrowserSync init task
 */

gulp.task('browserSync', ['build'], () => {
  browser.init({
    server: { baseDir: 'tmp' },
  })
})

/**
 * Watch and serve gulp tasks
 */

gulp.task('watch', ['build'], () => {
  gulp.watch('src/fonts/**/*', ['fonts'])
  gulp.watch('src/images/**/*', ['images'])
  gulp.watch('src/index.html', ['html'])
  gulp.watch('src/styles.css', ['css'])
  gulp.watch('tmp/index.html').on('change', reload)
})

gulp.task('serve', ['watch', 'browserSync'])

gulp.task('default', ['serve'])
