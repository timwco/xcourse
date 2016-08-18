var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babel = require('babelify'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    fs = require('fs');

gulp.task('build:css', function () {
  gulp.src('./resources/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/'));
});

gulp.task('build:js', function() {
  return browserify('./resources/js/index.js')
    .transform(babel, {presets: ["es2015"]})
    .bundle()
    .pipe(source('./bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  watch('./resources/sass/**/*.scss', function () {
    gulp.start('build:css');
  });
  watch('./resources/js/**/*.js', function () {
    gulp.start('build:js');
  });
});

gulp.task('start', ['build:css', 'build:js', 'watch']);
gulp.task('build', ['build:css', 'build:js']);
