var config = require('../config.js').less;
var gulp = require('gulp');
var ignore = require('gulp-ignore');
var less = require('gulp-less');
var logError = require('../util/log-error');
var minify = require('gulp-minify-css');

/**
 * Compile all of the less and vendored assets.
 */
gulp.task('less', ['less:app', 'less:vendored', 'less:flat-ui']);

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

/**
 * Build flat-ui with variable customizations.
 */
gulp.task('less:flat-ui', ['less:flat-ui:compile']);

gulp.task('less:flat-ui:copy', function() {
  var conf = config['flat-ui'].copy;

  return gulp.src(conf.src)
    .pipe(ignore.exclude(conf.exclude))
    .pipe(gulp.dest(conf.dest));
});

gulp.task('less:flat-ui:compile', ['less:flat-ui:copy'], function() {
  var conf = config['flat-ui'].compile;

  return gulp.src(conf.src)
    .pipe(less({ paths: config.paths }))
    .pipe(minify())
    .on('error', logError)
    .pipe(gulp.dest(conf.dest));
});
