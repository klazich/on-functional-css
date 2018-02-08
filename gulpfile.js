let gulp = require('gulp')

gulp.task('css', function () {
    let postcss = require('gulp-postcss')
    let sourcemaps = require('gulp-sourcemaps')

    return gulp.src('src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('postcss-import'),
            require('postcss-cssnext'),
            require('cssnano')
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/'))
})