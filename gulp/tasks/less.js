var config = require('../config.js').less;
var gulp = require('gulp');
var less = require('gulp-less');
var logError = require('../util/log-error');
var minify = require('gulp-minify-css');

/**
 * Compile all of the less and vendored assets.
 */
gulp.task('less', ['less:app', 'less:vendored']);

gulp.task('less:app', function() {
  return gulp.src(config.app.src)
    .pipe(less({ paths: config.app.paths }))
    .pipe(minify())
    .on('error', logError)
    .pipe(gulp.dest(config.app.dest));
});

gulp.task('less:vendored', function() {
  return gulp.src(config.vendored.src)
    .pipe(minify())
    .pipe(gulp.dest(config.vendored.dest));
});
