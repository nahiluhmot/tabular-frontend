import { Component, createElement, DOM } from 'react';

import NavBar from 'views/navs/nav-bar';
import FeedList from 'views/lists/feed';

const { a, button, div, h2 } = DOM;

/**
 * This class represents sign up page.
 */
class Feed extends Component {
  /**
   * Create a feed.
   * Props:
   *   - user:        An object containing data about the user; specificy their
   *                  username, followers count, and followees count.
   *   - follow:      Function that follows the user.
   *   - unfollow:    Function that unfollows the user.
   *   - loggedIn:    Boolean that denotes whether or not a user is logged in.
   *   - isFollowing: Boolean that denotes whether or not the logged in user
   *                  the user whose feed is being viewed.
   */
  constructor(props) {
    super(props);
    this.state = { page: 0, items: [], disabled: false };
  }

  render() {
    const { user, follow, unfollow, loggedIn, isFollowing } = this.props;
    const { followees_count, followers_count, username } = user;

    const followersLink = `/u/${username}/followers/`;
    const followingLink = `/u/${username}/following/`;

    const buttonProps = {
      className: `btn-${isFollowing ? 'danger' : 'primary'}  panel-footer`,
      onClick: isFollowing ? unfollow : follow
    };

    const buttonText = (loggedIn && isFollowing) ? 'Unfollow' : 'Follow';

    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          div({ className: 'row' },
            div({ className: 'col-md-4' },
              div({ className: 'panel panel-default centered-text' },
                div({ className: 'panel-heading' },
                  h2({ className: 'panel-title' }, `${username}'s feed`)),
                div({ className: 'panel-body' },
                    div({ className: 'row' },
                      div({ className: 'col-xs-6' },
                        a({ className: 'navigate', href: followersLink },
                          `${followers_count} Followers`)),
                      div({ className: 'col-xs-6' },
                        a({ className: 'navigate', href: followingLink },
                          `${followees_count} Following`)))),
                loggedIn ? div(buttonProps, buttonText) : null)),
            div({ className: 'col-md-8' },
              createElement(FeedList, this.props)))));

    return tree;
  }
}

export default Feed;
