import { Component, createElement, DOM } from 'react';

import NavBar from 'views/navs/nav-bar';
import Search from 'views/forms/search';

const { a, div, h2, p } = DOM;

/**
 * This class represents homepage.
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
          div({ className: 'centered-text' },
            h2({}, 'Tabular')),
          p({},
            'Tabular is a website that allows users to easily search for, ',
            'upload, and share their thoughts about guitar tabs.'),
          p({},
            'This website was made for Northeastern\'s CS 4550 Web ',
            'Development course as the final project by Tom Hulihan.'),
          p({},
            'The source code can be found on GitHub, with the ',
            a({ href: 'https://github.com/nahiluhmot/tabular-frontend' },
              'frontend'),
            ' and ',
            a({ href: 'https://github.com/nahiluhmot/tabular-backend' },
              'backend'),
            ' being split into two separate repositories.')));
    return tree;
  }
}

export default Home;
