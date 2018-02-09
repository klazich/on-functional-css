const gulp = require('gulp')

gulp.task('sass', function () {
  let sass = require('gulp-sass')

  return gulp
    .src('node_modules/bf-solid/_lib/solid.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
})

gulp.task('css:postcss', ['sass'], function () {
  const postcss = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')

  let options = {
    uncss: {
      html: ['public/index.html'],
      ignore: [],
    },
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
    .pipe(gulp.dest('public/css'))
})
