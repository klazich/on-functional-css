/** @format */

const gulp = require('gulp')
const babel = require('gulp-babel')

const transpile = () =>
  gulp
    .src('tasks/**/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest('tasks_es5'))

exports.default = transpile
