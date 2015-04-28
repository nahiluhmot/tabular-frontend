var path = require('path');
var $ = path.join;

/**
 * Enable production-only features.
 */
var isProductionBuild = process.env.NODE_ENV === 'production';

/**
 * Absolute path of current directory.
 */
var base = path.resolve('.');

/**
 * Top level application and build directories.
 */
var bower = $(base, 'bower_components');
var build = $(base, 'build');
var gulp = $(base, 'gulp');
var html = $(base, 'html');
var js = $(base, 'js');
var less = $(base, 'less');

/**
 * This object holds the configuration for each task, keyed by task name.
 */
var config = {
  clean: {
    dir: build
  },
  compress: {
    src: [
      $(build, 'public', '**', '*.css'),
      $(build, 'public', '**', '*.html'),
      $(build, 'public', '**', '*.js')
    ],
    dest: $(build, 'public')
  },
  html: {
    src: $(html, '**', 'index.html'),
    dest: $(build, 'public')
  },
  js: {
    sourceMaps: !isProductionBuild,
    compile: {
      src: $(js, '**', '*.js'),
      dest: $(build, 'compile'),
      modules: 'common'
    },
    min: {
      src: $(build, 'compile', 'app.js'),
      dest: $(build, 'public', 'js')
    },
    bundle: {
      src: $(build, 'compile', 'main.js'),
      file: 'app.js',
      paths: [$(build, 'compile')],
      dest: $(build, 'compile')
    },
    vendored: {
      src: [
        $(bower, 'aviator', 'aviator.js'),
        $(bower, 'cookies-js', 'dist', 'cookies.js'),
        $(bower, 'flat-ui', 'dist', 'js', 'flat-ui.js'),
        $(bower, 'json3', 'lib', 'json3.js'),
        $(bower, 'jquery', 'dist', 'jquery.js'),
        $(bower, 'react', 'react.js'),
        $(bower, 'reqwest', 'reqwest.js'),
        $(bower, 'underscore', 'underscore.js')
      ],
      dest: $(build, 'public', 'js', 'vendored')
    }
  },
  less: {
    app: {
      src: $(less, '**', '*.less'),
      dest: $(build, 'public', 'css'),
      paths: [$(less, 'includes')]
    },
    vendored: {
      src: [
        $(bower, 'bootstrap', 'dist', 'css', 'bootstrap.min.css'),
        $(bower, 'flat-ui', 'dist', 'css', 'flat-ui.min.css')
      ],
      dest: $(build, 'public', 'css')
    },
  },
  fonts: {
    vendored: {
      src: [
        $(bower, 'bootstrap', 'dist', 'fonts', '**', '*'),
        $(bower, 'flat-ui', 'dist', 'fonts', '**', '*')
      ],
      dest: $(build, 'public', 'fonts')
    }
  },
  lint: {
    src: [
      $(base, 'gulpfile.js'),
      $(gulp, '**', '*.js'),
      $(js, '**', '*.js')
    ],
    reporter: 'jshint-stylish'
  },
  serve: {
    src: $(build, 'public'),
    port: 3000
  }
};

module.exports = config;
