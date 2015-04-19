var config = require('../config.js').spec;
var gulp = require('gulp');
var minify = require('../util/minify-js.js');
var serve = require('gulp-webserver');
var transpile = require('../util/transpile.js');

/**
 * Compile and run all of the specs.
 */
gulp.task('spec', ['spec:run']);

/**
 * Transpile the spec sources.
 */
gulp.task('spec:compile', function() {
  return transpile(config.compile.src, config.compile.dest, { modules: 'amd' });
});

gulp.task('spec:html', function() {
  return gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.dest));
});

gulp.task('spec:min',  ['spec:compile'], function() {
  return minify(config.min.src, config.min.dest, true);
});

gulp.task('spec:build', ['build', 'spec:html', 'spec:min']);

gulp.task('spec:watch', ['spec:build', 'watch'], function() {
  gulp.watch(config.compile.src, ['spec:compile']);
  gulp.watch(config.min.src, ['spec:min']);
  gulp.watch(config.html.src, ['spec:html']);
});

gulp.task('spec:run', ['spec:watch'], function() {
  return gulp.src(config.run.src)
    .pipe(serve({
      port: config.run.port,
      open: config.run.open
    }));
});
