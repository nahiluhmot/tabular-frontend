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

  feed() {
    const key = this.io.getSessionKey();

    this.withRequests('users', users =>
      users.loggedIn(key, {
        success: user =>
          this.render('authenticated/feed', {
            user: user,
            edit: () => this.io.navigate('/a/edit'),
            getPage: (page, done) =>
              this.withRequests('activity-logs', logs =>
                logs.frontpage(key, page, {
                  success: done,
                  error: done([])
                })),
          }),
        error: () => this.io.navigate('/')
      }));
  }

  edit() {
    console.log('going to the edit page');
  }

}

export default Authenticated;
