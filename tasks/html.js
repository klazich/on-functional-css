/** @format */

import gulp from 'gulp'
import { resolve } from 'path'
import newer from 'gulp-newer'
import inline from 'gulp-inline'
import htmlmin from 'gulp-html-minifier'
import prettify from 'gulp-jsbeautifier'

export function html() {
  return gulp
    .src('src/index.html')
    .pipe(newer('tmp'))
    .pipe(inline({ base: 'tmp', disabledTypes: ['js', 'css'] }))
    .pipe('tmp' === 'dist' ? htmlmin() : prettify())
    .pipe(gulp.dest('tmp'))
}
