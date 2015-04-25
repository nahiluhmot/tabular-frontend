import { LINKS } from 'constants';

/**
 * This is the base controller for tabular. It contains methods to lazily load
 * requests and pages, as well as to render views.
 */
class Base {
  constructor(io) {
    this.io = io;
  }

  withRequests(string, callback) {
    require([`requests/${string}`], klass =>
      callback(new klass(this.io.request)));
  }

  withPage(string, callback) {
    return require([`views/pages/${string}`], callback);
  }

  render(type, props) {
    props = props || {};
    props.search = query =>
      this.io.navigate(LINKS.search, {
        queryParams: {
          query: query,
          page: 1,
          hasNext: true,
          hasPrev: false
        }
      });

    this.withRequests('users', users =>
      users.loggedIn(this.io.getSessionKey(), {
        success: () => props.signedIn = true,
        error: () => props.signedIn = false,
        complete: () => this.io.render(type, props)
      })
    );
  }
}

export default Base;
