const { resolve } = require('path')

const gulp       = require('gulp')
const newer      = require('gulp-newer')
const imagemin   = require('gulp-imagemin')
const htmlmin    = require('gulp-htmlmin')
const sourcemaps = require('gulp-sourcemaps')
const inline     = require('gulp-inline')
const clone      = require('gulp-clone')
const postcss    = require('gulp-postcss')
const stylefmt   = require('gulp-stylefmt')
const rename     = require('gulp-rename')
const merge      = require('merge2')
const del        = require('del')
const cleanCSS   = require('gulp-clean-css')
const Browser    = require('browser-sync')
const webpack    = require('webpack')

const noop = require('./noop')

const ENV = process.env.NODE_ENV || 'development'
const DIR = ENV === 'production' ? 'docs' : 'dist'

console.log(ENV, 'environment', `build to: '${DIR}/'`)


/**
 * Assets (images)
 */

function images() {
  return gulp.src('src/**/*.{jpeg,jpg,png,svg}')
    .pipe(newer(resolve(DIR, 'img')))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(DIR))
}

function misc() {
  return gulp.src(['src/favicon.ico', 'src/manifest.json'])
    .pipe(gulp.dest(DIR))
}

const assets = gulp.parallel(images, misc)


/**
 * Content (html)
 */

function content() {
  return gulp.src('src/index.html')
    .pipe(newer(DIR))
    .pipe(inline({ base: 'dist', disabledTypes: ['js', 'css', 'img'] }))
    .pipe(ENV === 'production' ? htmlmin({ collapseWhitespace: true }) : noop())
    .pipe(gulp.dest(DIR))
}


/**
 * Scripts (javascript)
 */

let webpackConfig = require('./webpack.config')
const browser     = Browser.create()

function scripts() {
  return new Promise(resolve => {
    webpack(webpackConfig,
      (err, stats) => {
        if ( err ) console.log('WEBPACK', err)
        console.log(stats.toString({ colors: true }))
        resolve()
      })
  })
}


/**
 * Styles (css)
 */

function styles() {
  let css = gulp.src('src/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(stylefmt())

  let min = css.pipe(clone())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))

  return merge(css, min)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(resolve(DIR, 'css')))
}


/**
 * Server (browser-sync)
 */

function server() {
  browser.init({
    server: {
      baseDir  : 'dist',
      directory: true,
    },
    files : [
      'dist/js/*.js',
      'dist/css/*.min.css',
      'dist/index.html',
    ],
  })
}


/**
 * Watchers
 */

function watchers() {
  gulp.watch('src/img/**/*', images)
  gulp.watch(['src/favicon.ico',
              'src/manifest.json'], misc)
  gulp.watch('src/index.html', content)
  gulp.watch('src/js/*.js', scripts)
  gulp.watch('src/css/*.css', styles)
}


/**
 * Gulp tasks
 */

const clean = () => del([DIR])
const build = gulp.series(clean, assets, content, scripts, styles)
const start = gulp.series(build, gulp.parallel(watchers, server))

gulp.task('default', start)

module.exports = {
  images, misc, assets, content, styles, scripts, clean, build, start, server, watchers,
}
