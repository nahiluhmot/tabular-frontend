var gulp = require('gulp');

/**
 * Build the application.
 */
gulp.task('build', ['compress', 'html', 'fonts', 'js', 'less']);
