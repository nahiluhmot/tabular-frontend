import { Component, createElement, DOM } from 'react';

import NavBar from 'views/navs/nav-bar';
import FeedList from 'views/lists/feed';

const { a, button, div, h2, span } = DOM;

/**
 * This class represents sign up page.
 */
class Feed extends Component {
  /**
   * Create a feed.
   * Props:
   *   - user:   An object containing data about the user; specificy their
   *             username, followers count, and followees count.
   *   - edit:   Function that navigates to the edit page.
   *   - newTab: Function that navigates to the new tab page.
   */
  constructor(props) {
    super(props);
    this.state = { page: 0, items: [], disabled: false };
  }

  render() {
    const { edit, newTab, user } = this.props;
    const { followees_count, followers_count, username } = user;

    const followersLink = `/u/${username}/followers/`;
    const followingLink = `/u/${username}/following/`;

    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          div({ className: 'row' },
            div({ className: 'col-md-4' },
              div({ className: 'row' },
                div({ className: 'panel panel-default centered-text' },
                  div({ className: 'panel-heading' },
                    h2({ className: 'panel-title' }, username)),
                  div({ className: 'panel-body' },
                      div({ className: 'row' },
                        div({ className: 'col-xs-6' },
                          a({ className: 'navigate', href: followersLink },
                            `${followers_count} Followers`)),
                        div({ className: 'col-xs-6' },
                          a({ className: 'navigate', href: followingLink },
                            `${followees_count} Following`)))),
                  div({ className: 'panel-footer' },
                    div({ className: 'row' },
                      div({ className: 'col-xs-6' },
                        a({ className: 'navigate', href: `/u/${username}/` },
                          'View Profile')),
                      div({ className: 'col-xs-6' },
                        a({ className: 'navigate', href: '/a/edit' },
                          'Change Password')))))),
              div({ className: 'row' },
                button({
                  className: 'btn btn-primary padded-bottom full-button',
                  onClick: newTab
                }, 'Upload a Tab'))),
            div({ className: 'col-md-8' },
              createElement(FeedList, this.props)))));

    return tree;
  }
}

export default Feed;
