import Base from 'controllers/base';

/**
 * This is the controller reserved for authenticated users.
 */
class Authenticated extends Base {
  /**
   * Create a new authenticated controller.
   */
  constructor(io) {
    super(io);
  }

  /**
   * Render the feed for authenticated users.
   */
  feed() {
    const key = this.io.getSessionKey();

    this.whenAuthenticated((key, user) =>
      this.render('authenticated/feed', {
        user: user,
        edit: () => this.io.navigate('/a/edit'),
        getPage: (page, done) =>
          this.withRequests('activity-logs', logs =>
            logs.frontpage(key, page, {
              success: done,
              error: done([])
            })),
      }));
  }


  /**
   * Render the feed for authenticated users.
   */
  edit() {
    this.whenAuthenticated((key, { username }) => {
      this.render('authenticated/edit', {
        changePassword: (password, confirmation, callbacks) =>
          this.withRequests('users', users =>
            users.updatePassword(key, password, confirmation, callbacks)),
        login: (password, callbacks) =>
          this.withRequests('sessions', sessions =>
            sessions.login(username, password, callbacks)),
        success: () => this.io.navigate('/a/')
      });
    });
  }

  whenAuthenticated(callback) {
    const key = this.io.getSessionKey();

    this.withRequests('users', users =>
      users.loggedIn(key, {
        success: user => callback(key, user),
        error: () => this.io.navigate('/')
      }));
  }
}

export default Authenticated;
