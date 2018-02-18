let gulp = require('gulp')
let del = require('del')
let paths = require('./paths.js')

let browserSync = require('browser-sync').create()
let reload = browserSync.reload

let options = {
  uncss: {
    html: [paths.html.dest + 'index.html'],
    ignore: [],
  },
  fontMagician: {
    display: 'fallback',
  }
}

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

cleanImages = (done) => del(paths.images.dest, done)
cleanStyles = (done) => del(paths.styles.dest, done)
copyImages = () => gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest))
copyHtml = () => gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest))

gulp.task('build:styles', () => {
  let sourcemaps = require('gulp-sourcemaps')
  let stylefmt = require('gulp-stylefmt')
  let postcss = require('gulp-postcss')
  let rename = require('gulp-rename')
  let cleanCSS = require('gulp-clean-css')

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
    // require('postcss-uncss')(options.uncss),
    require('postcss-cssnext'),
    require('postcss-font-magician')(options.fontMagician),
  ]

  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(cleanCSS({format: 'beautify'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
})

// grouped
gulp.task('html', gulp.series(copyHtml))
gulp.task('images', gulp.series(cleanImages, copyImages))
gulp.task('styles', gulp.series(cleanStyles, 'build:styles'))
gulp.task('build', gulp.parallel(gulp.series('html', 'styles'), 'images'))

// watchers
watchImages = () => gulp.watch(paths.images.src, gulp.series('images'))
watchStyles = () => gulp.watch(paths.styles.src, gulp.series('styles'))
watchHtml = () => gulp.watch(paths.html.src, gulp.series('html'))
watchDist = () => gulp.watch(paths.html.dest).on('change', reload)
gulp.task('watch', gulp.parallel(watchHtml, watchImages, watchStyles, watchDist))

// default - all together
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'browserSync')))