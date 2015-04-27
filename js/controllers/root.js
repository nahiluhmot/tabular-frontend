import { MAX_SEARCH_RESULTS_PER_PAGE } from 'config';
import Base from 'controllers/base';

import Home from 'views/pages/home';
import Login from 'views/pages/login';
import SearchResults from 'views/pages/search-results';
import SignUp from 'views/pages/sign-up';

/**
 * This is the top level controller for the application.
 */
class Root extends Base {
  /**
   * Create a new Root controller.
   */
  constructor(io) {
    super(io);
  }

  home() {
    this.users.loggedIn(this.io.getSessionKey(), {
      success: () => this.io.navigate('/a/'),
      error: () => this.render(Home)
    });
  }

  login() {
    this.render(Login, {
      login: (username, password, callbacks) =>
        this.sessions.login(username, password, callbacks),
      success: () => this.io.navigate('/a/')
    });
  }

  logout() {
    this.sessions.logout(this.io.getSessionKey(), {
      complete: () => this.io.navigate('/')
    });
  }

  signUp() {
    this.render(SignUp, {
      createUser: (username, password, confirmation, callbacks) =>
        this.users.createUser(username, password, confirmation, callbacks),
      success: data => this.io.navigate('/a/')
    });
  }

  search(options) {
    let { page, query, hasNext } = options.queryParams;

    this.tabs.searchTabs(query, page, {
      success: data => {
        const searchLink = params => this.io.linkTo('/search', {
          queryParams: params
        });

        const nextLink = searchLink({
          page: page + 1,
          query: query,
          hasNext: true,
          hasPrev: true
        });
        const firstLink = searchLink({
          page: 1,
          query: query,
          hasPrev: false,
          hasNext: true
        });
        const prevLink = hasNext =>
          searchLink({
            page: page - 1,
            query: query,
            hasNext: true,
            hasPrev: page > 2
          });
        const tabLink = id => this.io.linkTo(`/tab/:id`, { id: id });

        if ((page > 1) && (data.length === 0)) {
          this.io.navigate(prevLink(false));
        } else if (page < 1) {
          this.io.navigate(firstLink);
        } else {
          hasNext = hasNext && (data.length === MAX_SEARCH_RESULTS_PER_PAGE);
          this.render(SearchResults, {
            page: page,
            query: query,
            results: data,
            navigateToTab: id => this.io.navigate(tabLink(id)),
            next: hasNext ? nextLink : null,
            prev: (page > 1) ? prevLink(true) : null
          });
        }
      },
      error: error => {
        console.log(`Error searching tabs for query: ${query}`);
        console.log(error);
      }
    });
  }
}

export default Root;
