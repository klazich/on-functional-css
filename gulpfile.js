const gulp = require('gulp')

const styles = 'tachyons'


gulp.task('clean:dist', function () {
  const del = require('del')
  return del.sync('dist')
})

gulp.task('html', function () {
  const htmlmin = require('gulp-htmlmin')
  const del = require('del')

  del.sync('dist/*.html')

  return gulp.src('src/index.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('dist'))
})


gulp.task('css:solid', function () {
  const sass = require('gulp-sass')

  return gulp
    .src('node_modules/bf-solid/_lib/solid.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
})


gulp.task('css:tachyons', function () {
  const postcss = require('gulp-postcss')

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
  ]

  return gulp.src('node_modules/tachyons/src/tachyons.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('src/css'))
})


gulp.task('css:postcss', [`css:${styles}`], function () {
  const postcss = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')

  let options = {
    uncss: {
      html: ['dist/index.html'],
      ignore: [],
    },
  }

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-cssnext'),
    require('postcss-font-magician')
  ]

  return gulp.src('src/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
})


gulp.task('css:beautify', [`css:${styles}`, 'css:postcss'], function () {
  const stylefmt = require('gulp-stylefmt')

  return gulp.src('dist/css/*.css')
    .pipe(stylefmt())
    .pipe(gulp.dest('dist/css'))
})


gulp.task('css:minify', [`css:${styles}`, 'css:postcss', 'css:beautify'], function () {
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

gulp.task('build', ['html', `css:${styles}`, 'css:postcss', 'css:beautify', 'css:minify'])

gulp.task('watch', function () {
  gulp.watch('src/index.html', ['html'])
  gulp.watch('src/css/styles.css', ['css:tachyons', 'css:postcss', 'css:beautify', 'css:minify'])
})
