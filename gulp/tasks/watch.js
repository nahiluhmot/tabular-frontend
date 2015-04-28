var config = require('../config.js');
var gulp = require('gulp');

/**
 * Watch the sources and rebuild the assets when they change.
 */
gulp.task('watch', ['build'], function() {
  var less = config.less.app.src.concat(
    config.less.vendored.src,
    config.less['flat-ui'].copy.src
  );

  gulp.watch(config.html.src, ['html']);
  gulp.watch(config.js.compile.src, ['js']);
  gulp.watch(less, config.less, ['less']);
});
