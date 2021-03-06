import Base from 'controllers/base';

import Edit from 'views/pages/authenticated/edit';
import Feed from 'views/pages/authenticated/feed';

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

    this.whenAuthenticated('/', (key, user) =>
      this.render(Feed, {
        user: user,
        edit: () => this.io.navigate('/a/edit/'),
        newTab: () => this.io.navigate('/tabs/new/'),
        getPage: (page, done) =>
          this.logs.frontpage(key, page, {
            success: done,
            error: () => done([])
          }),
      }));
  }

  /**
   * Render the feed for authenticated users.
   */
  edit() {
    this.whenAuthenticated('/', (key, { username }) => {
      this.render(Edit, {
        changePassword: (password, confirmation, callbacks) =>
          this.users.updatePassword(key, password, confirmation, callbacks),
        destroyUser: (password, callbacks) =>
          this.sessions.login(username, password, {
            success: () =>
              this.users.destroyUser(key, {
                success: () => {
                  callbacks.success();
                  this.io.navigate('/');
                },
                error: callbacks.error
              }),
            error: callbacks.error
          }),
        login: (password, callbacks) =>
          this.sessions.login(username, password, callbacks),
        success: () => this.io.navigate('/a/')
      });
    });
  }
}

export default Authenticated;
