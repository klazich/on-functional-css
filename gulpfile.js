const gulp = require('gulp')

gulp.task('css:sass', function () {
  let sass = require('gulp-sass')

  return gulp
    .src('node_modules/bf-solid/_lib/solid.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
})


gulp.task('css:postcss', ['css:sass'], function () {
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

  return gulp
    .src('src/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
})


gulp.task('css:beautify', ['css:sass', 'css:postcss'], function () {
  var stylefmt = require('gulp-stylefmt')

  return gulp.src('build/css/*.css')
    .pipe(stylefmt())
    .pipe(gulp.dest('build/css'))
})


gulp.task('css:minify', ['css:sass', 'css:postcss', 'css:beautify'], function () {
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
