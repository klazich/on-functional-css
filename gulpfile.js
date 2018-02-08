let gulp = require('gulp')

gulp.task('css', function () {
    let postcss = require('gulp-postcss')
    let sourcemaps = require('gulp-sourcemaps')

    return gulp.src('src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('postcss-import'),
            require('postcss-nested'),
            require('postcss-cssnext'),
            require('cssnano')
        ], { syntax: require('postcss-scss') }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public'))
})