const { resolve } = require('path')

const gulp = require('gulp')
const newer = require('gulp-newer')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const inline = require('gulp-inline')
const clone = require('gulp-clone')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const merge = require('merge2')
const del = require('del')
const cleanCSS = require('gulp-clean-css')
const Browser = require('browser-sync')
const webpack = require('webpack')

/***** Assets (images & misc.) *****************/

function images() {
  return gulp
    .src('src/**/*.{jpeg,jpg,png,svg}')
    .pipe(newer(resolve('dist', 'img')))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest('dist'))
}

function misc() {
  return gulp.src('src/*.{ico,json}').pipe(gulp.dest('dist'))
}

const assets = gulp.parallel(images, misc)

/***** Content (html) **************************/

function content() {
  return gulp
    .src('src/index.html')
    .pipe(newer('dist'))
    .pipe(inline({ base: 'dist', disabledTypes: ['js', 'css'] }))
    .pipe(gulp.dest('dist'))
}

/***** Scripts (javascript) ********************/

let webpackConfig = require('./webpack.config')

function scripts() {
  return new Promise(resolve => {
    webpack(webpackConfig, (err, stats) => {
      if (err) console.log('WEBPACK', err)
      console.log(stats.toString({ colors: true }))
      resolve()
    })
  })
}

/***** Styles (css with postcss) ***************/

function styles() {
  let css = gulp
    .src('src/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss())

  let min = css
    .pipe(clone())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))

  return merge(css, min)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(resolve('dist', 'css')))
}

/***** Server (browser-sync) *******************/

const browser = Browser.create()

function server() {
  browser.init({
    server: {
      baseDir: 'dist',
    },
    files: ['dist/js/*.js', 'dist/css/*.css', 'dist/index.html'],
  })
}

/***** Watchers ********************************/

function watchers() {
  gulp.watch('src/img/**/*', images)
  gulp.watch('src/*.{ico,json}', misc)
  gulp.watch('src/index.html', content)
  gulp.watch('src/js/*.js', scripts)
  gulp.watch('src/css/*.css', styles)
}

/***** Gulp tasks ******************************/

const clean = () => del(['dist'])
const build = gulp.series(clean, assets, content, scripts, styles)
const start = gulp.series(build, gulp.parallel(watchers, server))

gulp.task('default', start)

module.exports = {
  images,
  misc,
  assets,
  content,
  styles,
  scripts,
  clean,
  build,
  start,
  server,
  watchers,
}
