import { Component, createElement, DOM } from 'react';

import NavBar from 'views/navs/nav-bar';

const { a, div, h2 } = DOM;

/**
 * This class represents search field and button for tabs.
 */
class Relationships extends Component {
  /**
   * Create a new Search field.
   *
   * Props:
   *   - type:     The type of relationships, either 'following' or 'followers'.
   *   - username: Unique identifier of the user whose relationships are being
   *               viewed.
   *   - users:    The users associated with the given usernameh.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { type, username, users } = this.props;

    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          h2({ className: 'centered-text' },
            'Users ',
            (type === 'following') ? 'following ' : 'followed by ',
            a({ className: 'navigate', href: `/u/${username}/` },
              username)),
          div({ className: 'list-group' },
            users.map(({ username }) =>
              a({
                key: username,
                className: 'list-group-item navigate',
                href: `/u/${username}/`
              }, username)))));
    return tree;
  }
}

export default Relationships;
