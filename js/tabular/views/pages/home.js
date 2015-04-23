import { Component, createElement, DOM } from 'react';
import { pick } from 'underscore';

import LoggedOutNav from 'tabular/views/navs/logged-out';
import Search from 'tabular/views/forms/search';

const { div, h1, p } = DOM;

/**
 * This class represents homepage for logged out users.
 */
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tree =
      div({},
        createElement(LoggedOutNav, this.props),
        div({ className: 'container center' },
          div({ className:  'jumbotron' },
            h1({}, 'Tabular'),
            p({ className: 'lead' },
              'Guitar tabs without the ads'))));
    return tree;
  }
}

export default Home;
