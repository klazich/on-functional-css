const gulp = require('gulp')
const del = require('del')
const paths = require('./paths.js')

const browserSync = require('browser-sync').create()

let options = {
  uncss: {
    html: [paths.html.dest + 'index.html'],
    ignore: [],
  },
  fontMagician: {
    display: 'fallback',
  },
  browserSync: {
    match: '**/*.css',
  },
  cssnano: {
    autoprefixer: false,
    preset: ['default', {
      discardComments: {
        removeAll: true,
      },
    }]
  }
}


gulp.task('clean', function (done) {
  return del(['dist', 'tmp'], done)
})


gulp.task('browserSync', function () {
  browserSync.init({
    server: { baseDir: 'dist' },
  })
})


// tasks - clean
gulp.task('clean:images', (done) => del(paths.images.dest, done))
gulp.task('clean:html', (done) => del(paths.html.dest + 'index.html', done))
gulp.task('clean:tachyons', (done) => del(paths.tachyons.dest + 'tachyons.css', done))
gulp.task('clean:styles', (done) => del(paths.styles.dest, done))

// tasks - copy
gulp.task('copy:images', () => gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest)))
gulp.task('copy:html', () => gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest)))


gulp.task('build:tachyons', () => {
  const postcss = require('gulp-postcss')

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
  ]

  return gulp.src(paths.tachyons.src)
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.tachyons.dest))
})

gulp.task('build:styles', () => {
  const stylefmt = require('gulp-stylefmt')
  const postcss = require('gulp-postcss')
  const rename = require('gulp-rename')

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-uncss')(options.uncss),
    require('postcss-cssnext'),
    require('postcss-font-magician')(options.fontMagician),
  ]

  return gulp.src(paths.styles.src)
    .pipe(postcss(processors))
    .pipe(stylefmt())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(postcss([require('cssnano')(options.cssnano)]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream(options.browserSync))
})

gulp.task('images', gulp.series('clean:images', 'copy:images'))
gulp.task('html', gulp.series('clean:html', 'copy:html'))
gulp.task('tachyons', gulp.series('clean:tachyons', 'build:tachyons'))
gulp.task('styles', gulp.series('clean:styles', 'build:styles'))


// gulp.task('watch', gulp.series(gulp.parallel('tachyons', 'html', 'images'), 'styles', 'styles:minify', 'browserSync', function () {
//   gulp.watch(paths.images.src, ['images'])
//   gulp.watch(paths.html.src, ['html'])
//   gulp.watch(paths.styles.src, gulp.series('styles', 'styles:minify'))
//   gulp.watch(paths.html.dest).on('change', browserSync.reload)
// }))

