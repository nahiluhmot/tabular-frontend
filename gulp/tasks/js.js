var config = require('../config.js').js;
var gulp = require('gulp');
var merge = require('merge-stream');
var minify = require('../util/minify-js.js');
var transpile = require('../util/transpile.js');

/**
 * Transpile and minify and all of the JavaScript.
 */
gulp.task('js', ['js:min', 'js:vendored']);

gulp.task('js:compile', function() {
  return transpile(config.compile.src, config.compile.dest, { modules: 'amd' });
});

gulp.task('js:min', ['js:compile'], function() {
  return minify(config.min.src, config.min.dest, config.sourceMaps);
});

gulp.task('js:vendored', function()  {
  return minify(config.vendored.src, config.vendored.dest, config.sourceMaps);
});
