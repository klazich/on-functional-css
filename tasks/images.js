/** @format */

import gulp from 'gulp'
import { resolve } from 'path'
import newer from 'gulp-newer'
import imagemin from 'gulp-imagemin'

export function images() {
  return gulp
    .src('src/img/**/*')
    .pipe(newer(resolve(dir, 'img')))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(resolve(dir, 'img')))
}
