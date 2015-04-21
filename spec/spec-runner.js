requirejs.config({
  baseUrl: '/js/',
  paths: {
    'tabular-spec': '/js/spec/tabular-spec',

    'aviator': '/js/vendored/aviator',
    'cookies': '/js/vendored/cookies',
    'chai': '/js/vendored/chai',
    'json': '/js/vendored/json3',
    'mocha': '/js/vendored/mocha',
    'react-with-addons': '/js/vendored/react-with-addons',
    'require': '/js/vendored/require',
    'reqwest': '/js/vendored/reqwest',
    'underscore': '/js/vendored/underscore'
  }
});

const specs = [
  'tabular-spec'
];

require(['mocha'], () => {
  mocha.setup('bdd');

  require(specs, () => mocha.run());
});
