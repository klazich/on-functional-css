const gulp = require('gulp')

const styles = 'tachyons'

gulp.task('html', function () {
  const htmlmin = require('gulp-htmlmin')

  return gulp.src('src/index.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('build'))
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
      html: ['build/index.html'],
      ignore: [],
    }
  }

  let processors = [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-cssnext'),
  ]

  return gulp.src('src/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
})


gulp.task('css:beautify', [`css:${styles}`, 'css:postcss'], function () {
  var stylefmt = require('gulp-stylefmt')

  return gulp.src('build/css/*.css')
    .pipe(stylefmt())
    .pipe(gulp.dest('build/css'))
})


gulp.task('css:minify', [`css:${styles}`, 'css:postcss', 'css:beautify'], function () {
  const postcss = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')
  const rename = require('gulp-rename')

  let options = {
    cssnano: {
      autoprefixer: false
    }
  }

  return gulp
    .src('build/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([require('cssnano')(options.cssnano)]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
})

gulp.task('build', ['html', `css:${styles}`, 'css:postcss', 'css:beautify', 'css:minify'])
