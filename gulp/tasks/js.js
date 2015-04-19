var config = require('../config.js').js;
var gulp = require('gulp');
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

gulp.task('js:vendored', config.vendored.srcs.map(function(object) {
  var taskName = 'js:vendored:' + object.name;

  gulp.task(taskName, function() {
    return minify(object.src, config.vendored.dest, config.sourceMaps);
  });

  return taskName;
}));
