const gulp = require('gulp')
const browserSync = require('browser-sync').create()

/* Cleaning tasks
  ========================================================================== */

gulp.task('clean:dist', () => {
  const del = require('del')
  return del.sync('dist')
})


/* HTML tasks
  ========================================================================== */

gulp.task('html', () => {
  // const htmlmin = require('gulp-htmlmin')
  // const del = require('del')
  //
  // del.sync('dist/*.html')

  return gulp.src('src/index.html')
    // .pipe(htmlmin())
    .pipe(gulp.dest('dist'))
})


/* Pre-build CSS tasks
  ========================================================================== */

gulp.task('css:tachyons', () => {
  const postcss = require('gulp-postcss')

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
  ]

  return gulp.src('node_modules/tachyons/src/tachyons.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('src/css'))
})


/* Postcss tasks
  ========================================================================== */

gulp.task('css:postcss', ['css:tachyons'], () => {
  const postcss = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')
  const stylefmt = require('gulp-stylefmt')

  let options = {
    uncss: {
      html: ['dist/index.html'],
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
    require('postcss-cssnext'),
    require('postcss-font-magician')(options.fontMagician),
  ]

  return gulp.src('src/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(stylefmt())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream(options.browserSync))
})


gulp.task('css:minify', ['css:tachyons', 'css:postcss'], () => {
  const postcss = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')
  const rename = require('gulp-rename')

  let options = {
    cssnano: {
      autoprefixer: false,
    },
  }

  return gulp
    .src('dist/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([require('cssnano')(options.cssnano)]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
})


/* Browser Sync tasks
  ========================================================================== */

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  })
})


/* Grouped and watch tasks
  ========================================================================== */

gulp.task('watch', ['browserSync', 'css:tachyons', 'css:postcss', 'html'], () => {
  gulp.watch('src/index.html', ['html'])
  gulp.watch('src/css/styles.css', ['css:tachyons', 'css:postcss', 'html'])
  gulp.watch('dist/index.html').on('change', browserSync.reload)
})
