import { Component, createElement, DOM } from 'react';
import { pick } from 'underscore';

import Search from 'tabular/views/forms/search';

const { div, h1, p } = DOM;

/**
 * This class represents homepage for logged out users.
 */
class Home extends Component {
  /**
   * Create a new Home page.
   *
   * Props:
   *   - search: Function that accepts a query and performs a search.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const tree =
      div({},
        div({ className: 'container center' },
          h1({}, 'Tabular'),
          p({ className: 'lead' },
            'Guitar tabs without the ads'),
          createElement(Search, this.props)));
    return tree;
  }
}

export default Home;
