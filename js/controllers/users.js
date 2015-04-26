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

    this.withRealUser(username, user =>
      render('users/feed', {
        user: user,
        getPage: (page, done) =>
          this.withRequests('activity-logs', logs =>
            logs.recentActivity(username, page, {
              success: done,
              error: () => done([])
            }))
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
        error: () => this.userNotFound(username)
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
        error: () => this.userNotFound(username)
      });
    });
  }

  withRealUser(username, callback) {
    this.withRequests('users', users =>
      users.findByUsername(username, {
        success: callback,
        error: () => this.userNotFound(username)
      }));
  }

  userNotFound(username) {
    this.render('users/not-found', { username: username });
  }
}

export default Users;
