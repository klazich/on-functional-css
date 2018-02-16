const gulp = require('gulp')
const postcss = require('gulp-postcss')
const del = require('del')
const paths = require('./paths.js')

const browserSync = require('browser-sync').create()


gulp.task('clean', function (done) {
  del(['assets'], done)
})


gulp.task('browserSync', function (done) {
  browserSync.init({
    server: { baseDir: 'dist' },
  })
  done()
})

// images

gulp.task('clean:images', function (done) {
  del(paths.images.dest, done)
})

gulp.task('images', gulp.series('clean:images', function (done) {
  gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
  done()
}))

// html

gulp.task('clean:html', function (done) {
  del(paths.html.dest, done)
})

gulp.task('html', gulp.series('clean:html', function (done) {
  gulp.src(paths.html.src)
    .pipe(gulp.dest('dist/index.html'))
  done()
}))

// tachyons

gulp.task('clean:tachyons', function (done) {
  del(paths.tachyons.dest, done)
})

gulp.task('tachyons', gulp.series('clean:tachyons', function (done) {

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
  ]

  gulp.src(paths.tachyons.src)
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.tachyons.dest))
    .pipe(done)

  done()
}))

// styles

gulp.task('clean:styles', function (done) {
  del(paths.styles.dest, done)
})

gulp.task('styles', gulp.series('clean:styles', function (done) {
  const sourcemaps = require('gulp-sourcemaps')
  const stylefmt = require('gulp-stylefmt')

  let options = {
    uncss: {
      html: [paths.html.dest],
      ignore: [],
    },
    fontMagician: {
      display: 'fallback',
    },
    browserSync: {
      match: '**/*.css',
    },
  }

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-uncss')(options.uncss),
    require('postcss-cssnext'),
    require('postcss-font-magician')(options.fontMagician),
  ]

  gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(stylefmt())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream(options.browserSync))

  done()
}))


gulp.task('styles:minify', gulp.series('styles', function (done) {
  const postcss = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')
  const rename = require('gulp-rename')

  let options = {
    cssnano: {
      autoprefixer: false,
    },
  }

  gulp.src(paths.styles.dest)
    .pipe(sourcemaps.init())
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([require('cssnano')(options.cssnano)]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))

  done()
}))


/* Grouped and watch tasks
  ========================================================================== */

gulp.task('watch', gulp.series(gulp.parallel('tachyons', 'html', 'images'), 'styles', 'styles:minify', 'browserSync', function () {
  gulp.watch(paths.images.src, ['images'])
  gulp.watch(paths.html.src, ['html'])
  gulp.watch(paths.styles.src, gulp.series('styles', 'styles:minify'))
  gulp.watch(paths.html.dest).on('change', browserSync.reload)
}))

