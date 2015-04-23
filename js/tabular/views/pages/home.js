import { Component, createElement, DOM } from 'react';
import { pick } from 'underscore';

import NavBar from 'tabular/views/navs/nav-bar';
import Search from 'tabular/views/forms/search';

const { div, h1, p } = DOM;

/**
 * This class represents homepage for logged out users.
 */
class Home extends Component {
  /**
   * Create a new Home page. It requires all of the props required by the
   * NavBar and Search form.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          h1({}, 'Tabular'),
          p({ className: 'lead' },
            'Guitar tabs without the ads'),
          createElement(Search, this.props)));
    return tree;
  }
}

export default Home;
