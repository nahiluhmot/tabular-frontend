requirejs.config({
  baseUrl: '/js/',
  paths: {
    'tabular': '/js/app/tabular',

    'tabular-spec': '/js/spec/tabular-spec',

    'aviator': '/js/vendored/aviator',
    'chai': '/js/vendored/chai',
    'mocha': '/js/vendored/mocha',
    'react': '/js/vendored/react',
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
