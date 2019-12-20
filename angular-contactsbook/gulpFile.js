var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('dev', function() {
    gulp.src('./static/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('../sourcemaps'))
        .pipe(gulp.dest('./static/css'));

})

gulp.task('sass:watch', function() {
    gulp.watch('./static/sass/*.scss', ['dev'])
})
