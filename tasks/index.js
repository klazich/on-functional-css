/** @format */

import gulp from 'gulp'

import { scripts } from './webpack'
import { server } from './server'
import { images } from './images'
import { html as runHtml } from './html'

export const dev = gulp.series(server)
export const build = gulp.series(scripts)

export const html = gulp.series(runHtml)

export default dev

/**
 * https://css-tricks.com/combine-webpack-gulp-4/
 */
