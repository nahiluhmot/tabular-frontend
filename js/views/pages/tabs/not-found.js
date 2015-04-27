import { Component, createElement, DOM } from 'react';

import NavBar from 'views/navs/nav-bar';

const { div, h1, p } = DOM;

/**
 * This class represents the not found page for tabs.
 */
class NotFound extends Component {
  /**
   * Create a new NotFound page.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props;
    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center centered-text' },
          h1({}, 'Tab Not Found'),
          p({ className: 'lead' },
            'It is possible that the user that uploaded this tab may have ',
            'deleted it.')));
    return tree;
  }
}

export default NotFound;
