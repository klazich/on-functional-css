const path = require('path')

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
  fontMagician: { display: 'fallback', hosted: ['src/fonts'] },
  rename      : { suffix: '.min' },
  inline      : { base: 'tmp/', disabledTypes: ['js', 'css', 'img'] },
  cssnano     : { autoprefixer: false },
}


/**
 * Assets (fonts/images)
 */

const fonts = dest => () =>
  gulp.src('src/fonts/**/*')
    .pipe(newer(path.resolve(dest, 'fonts')))
    .pipe(gulp.dest(path.resolve(dest, 'fonts')))

const images = dest => () =>
  gulp.src('src/images/**/*')
    .pipe(newer(path.resolve(dest, 'images')))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(path.resolve(dest, 'images')))

const assets = dest => gulp.parallel(fonts(dest), images(dest))


/**
 * Javascript
 */

const js = dest => () =>
  gulp.src('src/js/**/*')
    .pipe(gulp.dest(dest))


/**
 * HTML
 */

const html = dest => () =>
  gulp.src('src/index.html')
    .pipe(newer(dest))
    .pipe(inline(options.inline))
    .pipe(dest === 'dist' ? injectStr.replace('styles.css', 'styles.min.css') : noop())
    .pipe(dest === 'dist' ? htmlmin() : noop())
    .pipe(gulp.dest(dest))


/**
 * CSS
 */

const css = dest => {

  let processors = [
    require('postcss-import')(),
    require('postcss-nested')(),
    require('postcss-discard-comments')(),
    require('postcss-cssnext')(),
    require('postcss-font-magician')(options.fontMagician),
    require('postcss-svgo')(),
    require('postcss-sorting')(),
    require('css-mqpacker')(),
  ]

  processors = dest === 'dist'
    ? [...processors,
       require('postcss-uncss')(options.uncss),
       require('cssnano')(options.cssnano),]
    : [...processors,
       require('postcss-browser-reporter')(),
       require('postcss-reporter')(),]

  return () =>
    gulp.src('src/styles.css')
      .pipe(sourcemaps.init())
      .pipe(postcss(processors))
      .pipe(dest !== 'dist' ? noop() : rename(options.rename))
      .pipe(dest === 'dist' ? noop() : stylefmt())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dest))
      .pipe(browser.stream())
}

/**
 * Build/clean
 */

const clean = dir => done => del(dir, done)
const build = dest => gulp.series(clean(['tmp', 'dist']), assets(dest), js(dest), html(dest))


/**
 * BrowserSync
 */

const bs = dest => () => {
  browser.init({
    server: { baseDir: dest },
  })
}


/**
 * Watch/serve
 */

const watch = dest => () => {
  gulp.watch('src/fonts/**/*', fonts(dest))
  gulp.watch('src/images/**/*', images(dest))
  gulp.watch('src/js/index.js', js(dest))
  gulp.watch('src/index.html', html(dest))
  gulp.watch('src/styles.css', css(dest))
  gulp.watch('tmp/index.html').on('change', reload)
  gulp.watch('tmp/bundle.js').on('change', reload)
}

const serve = dest => gulp.series(build(dest), gulp.parallel(watch(dest), bs(dest)))


/**
 * Gulp tasks
 */

// tmp - development directory and server
// -----------------------------------------
// gulp.task(`assets`, assets('tmp'))
// gulp.task(`html`, gulp.series(assets('tmp'), html('tmp')))
// gulp.task(`css`, gulp.series(assets('tmp'), html('tmp'), css('tmp')))
gulp.task(`clean`, clean('tmp'))
gulp.task(`build`, build('tmp'))
gulp.task('serve', serve('tmp'))

// dist - production directory
// -----------------------------------------
// gulp.task(`assets:dist`, assets('dist'))
// gulp.task(`html:dist`, gulp.series(assets('dist'), html('dist')))
// gulp.task(`css:dist`, gulp.series(assets('dist'), html('dist'), css('dist')))
gulp.task(`clean:dist`, clean('dist'))
gulp.task(`build:dist`, build('dist'))

gulp.task('default', serve('tmp'))