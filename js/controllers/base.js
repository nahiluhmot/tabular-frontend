/**
 * This is the base controller for tabular. It contains methods to lazily load
 * requests and pages, as well as to render views.
 */
class Base {
  constructor(io) {
    this.io = io;

    this._requests =
      this.memoize((key, done) =>
        require([`requests/${key}`], type => done(new type(this.io.request))));

    this._pages =
      this.memoize((key, done) =>
        require([`views/pages/${key}`], done));
  }

  withRequests(key, callback) {
    this._requests(key, callback);
  }

  withPage(key, callback) {
    this._pages(key, callback);
  }

  memoize(lookup) {
    const cache = {};

    return (key, done) => {
      if (cache[key]) {
        done(cache[key]);
      } else {
        lookup(key, data => {
          cache[key] = data;
          done(data);
        });
      }
    };
  }

  render(page, props) {
    const key = this.io.getSessionKey();
    props = props || {};
    props.search = query => this.io.navigate('/search', {
      queryParams: {
        query: query,
        page: 1,
        hasNext: true,
        hasPrev: false
      }
    });
    props.logout = event => {
      event.preventDefault();
      this.withRequests('sessions', sessions =>
        sessions.logout(key, { complete: () => this.io.navigate('/') }));
    };

    if (key === '') {
      props.signedIn = false;
      this.io.render(type, props);
    } else {
      this.withRequests('users', users =>
        users.loggedIn(key, {
          success: () => props.signedIn = true,
          error: () => props.signedIn = false,
          complete: () =>
            this.withPage(page, type => this.io.render(type, props))
        })
      );
    }
  }
}

export default Base;
