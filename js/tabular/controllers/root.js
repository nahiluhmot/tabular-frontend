import { extend } from 'underscore';

import { MAX_SEARCH_RESULTS_PER_PAGE, LINKS } from 'tabular/constants';

import Home from 'tabular/views/pages/home';
import Login from 'tabular/views/pages/login';
import SignUp from 'tabular/views/pages/sign-up';
import SearchResults from 'tabular/views/pages/search-results';

import Users from 'tabular/requests/users';
import Sessions from 'tabular/requests/sessions';
import Tabs from 'tabular/requests/tabs';

/**
 * This is the top level controller for the application.
 */
class Root {
  /**
   * Expected IO functions:
   *   - getSessionKey(): Get the session key.
   *   - render(component, params, callback): Render the React view.
   *   - request(options): Send an HTTP request.
   */
  constructor(io) {
    this.io = io;
    this.sessions = new Sessions(io.request);
    this.tabs = new Tabs(io.request);
    this.users = new Users(io.request);
  }

  home() {
    this.render(Home);
  }

  login() {
    this.render(Login, {
      login: (username, password, callbacks) =>
        this.sessions.login(username, password, callbacks),
      success: () => this.io.navigate(LINKS.profile)
    });
  }

  logout() {
    this.sessions.logout(this.io.getSessionKey(), {
      complete: () => this.io.navigate(LINKS.home)
    });
  }

  signUp() {
    this.render(SignUp, {
      createUser: (username, password, confirmation, callbacks) =>
        this.users.createUser(username, password, confirmation, callbacks),
      success: (data) => this.io.navigate(LINKS.profile)
    });
  }

  search(options) {
    let { page, query, hasNext } = options.queryParams;

    this.tabs.searchTabs(query, page, {
      success: data => {
        const toNext = () =>
          this.io.navigate(LINKS.search, {
            queryParams: {
              page: page + 1,
              query: query,
              hasNext: true,
              hasPrev: true
            }
          });

        const toPrev = hasNext =>
          this.io.navigate(LINKS.search, {
            queryParams: {
              page: page - 1,
              query: query,
              hasNext: hasNext,
              hasPrev: page > 2
            }
          });

        const notFilled = data.length < MAX_SEARCH_RESULTS_PER_PAGE;

        if ((page > 1) && (data.length === 0)) {
          toPrev(false);
        } else if (page < 1) {
          this.io.navigate(LINKS.search, {
            page: 1,
            query: query,
            hasPrev: false,
            hasNext: true
          });
        } else {
          this.render(SearchResults, {
            page: page,
            query: query,
            results: data,
            next: (!hasNext || notFilled) ? null : toNext,
            prev: (page <= 1) ? null : () => toPrev(true)
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
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

    this.users.loggedIn(this.io.getSessionKey(), {
      success: () => props.signedIn = true,
      error: () => props.signedIn = false,
      complete: () => this.io.render(type, props)
    });
  }
}

export default Root;
