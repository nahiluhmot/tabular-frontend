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
var node = $(base, 'node_modules');

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
      dest: $(build, 'compile', 'src')
    },
    min: {
      src: $(build, 'compile', 'src', '**', '*.js'),
      dest: $(build, 'public', 'js')
    },
    vendored: {
      srcs: [
        {
          name: 'aviator',
          src: $(bower, 'aviator', 'aviator.js')
        },
        {
          name: 'bootstrap',
          src: $(bower, 'bootstrap', 'dist', 'js', 'bootstrap.js'),
        },
        {
          name: 'cookies-js',
          src: $(bower, 'cookies-js', 'dist', 'cookies.js')
        },
        {
          name: 'json3',
          src: $(bower, 'json3', 'lib', 'json3.js')
        },
        {
          name: 'jquery',
          src: $(bower, 'jquery', 'dist', 'jquery.js'),
        },
        {
          name: 'react',
          src: $(bower, 'react', 'react.js')
        },
        {
          name: 'requirejs',
          src: $(bower, 'requirejs', 'require.js')
        },
        {
          name: 'reqwest',
          src: $(bower, 'reqwest', 'reqwest.js')
        },
        {
          name: 'underscore',
          src: $(bower, 'underscore', 'underscore.js')
        }
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
        $(bower, 'bootstrap', 'dist', 'css', 'bootstrap-theme.min.css')
      ],
      dest: $(build, 'public', 'css', 'vendored')
    },
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
