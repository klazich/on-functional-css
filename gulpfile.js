/** @format */

const { resolve } = require('path')

const { series, parallel, task, watch, src, dest } = require('gulp')

const newer = require('gulp-newer')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-html-minifier')
const sourcemaps = require('gulp-sourcemaps')
const inline = require('gulp-inline')
const clone = require('gulp-clone')
const merge = require('merge2')
const del = require('del')
const Browser = require('browser-sync')
const noop = require('./noop.js')

const browser = Browser.create()
const reload = browser.reload

const dir = process.env.NODE_ENV === 'production' ? 'dist' : 'tmp'

/**
 * Assets (images)
 */

const images = () =>
  src('src/img/**/*')
    .pipe(newer(resolve(dir, 'img')))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(dest(resolve(dir, 'img')))

let assets = parallel(images /* fonts */)

/**
 * HTML
 */

const html = () =>
  src('src/index.html')
    .pipe(newer(dir))
    .pipe(inline({ base: 'tmp', disabledTypes: ['js', 'css'] }))
    .pipe(dir === 'dist' ? htmlmin() : noop())
    .pipe(dest(dir))

/**
 * CSS
 */

const css = function() {
  const postcss = require('gulp-postcss')
  const cssnano = require('gulp-cssnano')
  const stylefmt = require('gulp-stylefmt')
  const rename = require('gulp-rename')

  let css = src('src/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(stylefmt())

  let min = css
    .pipe(clone())
    .pipe(
      cssnano({ discardComments: { removeAll: true }, autoprefixer: false })
    )
    .pipe(rename({ suffix: '.min' }))

  return merge(css, min)
    .pipe(sourcemaps.write('.'))
    .pipe(dest(dir))
    .pipe(browser.stream())
}

/**
 * Build/clean
 */

const clean = done => del(['tmp', 'dist'], done)
const build = series(clean, assets, html, css)

/**
 * Watch
 */

const bundleWatcher = series(done => del('tmp'))

const watchers = () => {
  watch('src/img/**/*', images),
    watch('src/index.html', html),
    watch('src/styles.css', css),
    watch('tmp/index.html').on('change', () => reload),
    watch('tmp/bundle.js').on('add', () => reload)
}

/**
 * BrowserSync/server
 */

const serve = () => {
  browser.init({ server: { baseDir: 'tmp' } })
}
const start = series(build, parallel(watchers, serve))

/**
 * Gulp tasks
 */

export { build, clean, assets, html, css }

export default start
