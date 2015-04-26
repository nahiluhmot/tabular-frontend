import Base from 'controllers/base';

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

    this.withRequests('users', users =>
      users.findByUsername(username, {
        success: user =>
          this.withRequests('relationships', relationships => {
            const key = this.io.getSessionKey();
            const props = {
              user: user,
              follow: () =>
                relationships.follow(key, username, {
                  complete: () => this.io.refresh()
                }),
              unfollow: () =>
                relationships.unfollow(key, username, {
                  complete: () => this.io.refresh()
                }),
              getPage: (page, done) =>
                this.withRequests('activity-logs', logs =>
                  logs.recentActivity(username, page, {
                    success: done,
                    error: () => done([])
                  }))
            };

            relationships.isFollowing(key, username, {
              success: ({ following }) => {
                props.loggedIn = true;
                props.isFollowing = following;
              },
              error: () => {
                props.loggedIn = false;
                props.isFollowing = false;
              },
              complete: () => this.render('users/feed', props)
            });
          }),
        error: ex => this.render('users/not-found', { username: username })
      }));
  }

  /**
   * Fetch the followers for a username.
   */
  followers({ namedParams }) {
    const { username } = namedParams;

    this.withRequests('relationships', relationships => {
      relationships.followers(username, {
        success: data =>
          this.render('users/relationships', {
            type: 'following',
            username: username,
            users: data
          }),
        error: () => this.render('users/not-found', { username: username })
      });
    });
  }

  /**
   * Fetch the followees for a username.
   */
  following({ namedParams }) {
    const { username } = namedParams;

    this.withRequests('relationships', relationships => {
      relationships.followees(username, {
        success: data =>
          this.render('users/relationships', {
            type: 'followers',
            username: username,
            users: data
          }),
        error: () => this.render('users/not-found', { username: username })
      });
    });
  }
}

export default Users;
