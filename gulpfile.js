const { resolve } = require('path')

const gulp       = require('gulp')
const newer      = require('gulp-newer')
const imagemin   = require('gulp-imagemin')
const htmlmin    = require('gulp-html-minifier')
const sourcemaps = require('gulp-sourcemaps')
const inline     = require('gulp-inline')
const clone      = require('gulp-clone')
const postcss    = require('gulp-postcss')
const stylefmt   = require('gulp-stylefmt')
const rename     = require('gulp-rename')
const merge      = require('merge2')
const del        = require('del')
const Browser    = require('browser-sync')
const webpack    = require('webpack')

const noop = require('./noop')

const env = process.env.NODE_ENV
const dir = env === 'production' ? 'build' : 'dist'

console.log(env, 'environment', `--> '${dir}/'`)


/**
 * Assets (images)
 */

function images() {
  return gulp.src('src/img/**/*')
    .pipe(newer(resolve(dir, 'img')))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(resolve(dir, 'img')))
}

const assets = gulp.parallel(images, /* fonts */)


/**
 * Content (html)
 */

function content() {
  return gulp.src('src/index.html')
    // .pipe(newer(dir))
    .pipe(inline({ base: 'dist', disabledTypes: ['js', 'css'] }))
    .pipe(env === 'production' ? htmlmin() : noop())
    .pipe(gulp.dest(dir))
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
    .pipe(postcss(require('cssnano')({ discardComments: { removeAll: true }, autoprefixer: false }),))
    .pipe(rename({ suffix: '.min' }))

  return merge(css, min)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(resolve(dir, 'css')))
    .pipe(browser.stream())
}


/**
 * Server (browser-sync, webpack)
 */

function server() {
  browser.init({
    server: { baseDir: 'dist' },
  })
}


/**
 * Watchers
 */

function watchers() {
  gulp.watch('src/img/**/*', images)
  gulp.watch('src/index.html', content)
  gulp.watch('src/js/*.js', scripts)
  gulp.watch('src/components/*.vue', scripts)
  gulp.watch('src/css/styles.css', styles)
  gulp.watch('dist/index.html').on('change', () => browser.reload())
  gulp.watch('dist/js/bundle.js').on('change', () => browser.reload())
}


/**
 * Gulp tasks
 */

const clean = () => del(['dist', 'build'])
const build = gulp.series(clean, assets, content, styles, scripts)
const start = gulp.series(build, gulp.parallel(watchers, server))

gulp.task('default', start)

module.exports = {
  images, /*fonts,*/ assets, content, styles, scripts, clean, build, start, server, watchers,
}
