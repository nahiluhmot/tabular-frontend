/**
 * Configure the application with requirejs.
 */
requirejs.config({
  baseUrl: '/js/',
  paths: {
    'aviator': '/vendored/aviator',
    'react': '/vendored/react',
    'react-with-addons': '/vendored/react-with-addons',
    'require': '/vendored/require',
    'reqwest': '/vendored/reqwest',
    'underscore': '/vendored/underscore'
  }
});
