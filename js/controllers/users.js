import Base from 'controllers/base';

import Feed from 'views/pages/users/feed';
import NotFound from 'views/pages/users/not-found';
import Relationships from 'views/pages/users/relationships';

/**
 * This controller has functions to deal with show a single user's feed as well
 * as their followers or followees.
 */
class Users extends Base {
  /**
   * Create a new Users controller.
   */
  constructor(io) {
    super(io);
  }

  /**
   * Render the recent activity for one user.
   */
  feed({ namedParams }) {
    const { username } = namedParams;

    this.users.findByUsername(username, {
      success: user => {
        const key = this.io.getSessionKey();
        const props = {
          user: user,
          follow: () =>
            this.relationships.follow(key, username, {
              complete: () => this.io.refresh()
            }),
          unfollow: () =>
            this.relationships.unfollow(key, username, {
              complete: () => this.io.refresh()
            }),
          getPage: (page, done) =>
            this.logs.recentActivity(username, page, {
              success: done,
              error: () => done([])
            })
        };

        this.relationships.isFollowing(key, username, {
          success: ({ following }) => {
            props.loggedIn = true;
            props.isFollowing = following;
          },
          error: () => {
            props.loggedIn = false;
            props.isFollowing = false;
          },
          complete: () => {
            if (props.loggedIn) {
              this.users.loggedIn(key, {
                success: ({ username }) => props.loggedIn = username,
                error: () => props.loggedIn = false,
                complete: () => this.render(Feed, props)
              });
            } else {
              this.render(Feed, props);
            }
          }
        });
      },
      error: ex => this.render(NotFound, { username: username })
    });
  }

  /**
   * Fetch the followers for a username.
   */
  followers({ namedParams }) {
    const { username } = namedParams;

    this.relationships.followers(username, {
      success: data =>
      this.render(Relationships, {
        type: 'following',
        username: username,
        users: data
      }),
      error: () => this.render(NotFound, { username: username })
    });
  }

  /**
   * Fetch the followees for a username.
   */
  following({ namedParams }) {
    const { username } = namedParams;

    this.relationships.followees(username, {
      success: data =>
        this.render(Relationships, {
          type: 'followers',
          username: username,
          users: data
        }),
      error: () => this.render(NotFound, { username: username })
    });
  }
}

export default Users;
