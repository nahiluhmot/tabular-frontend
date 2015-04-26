import { MAX_SEARCH_RESULTS_PER_PAGE } from 'constants';
import Base from 'controllers/base';

/**
 * This is the top level controller for the application.
 */
class Root extends Base {
  /**
   * Expected IO functions:
   *   - getSessionKey(): Get the session key.
   *   - render(component, params, callback): Render the React view.
   *   - request(options): Send an HTTP request.
   */
  constructor(io) {
    super(io);
  }

  home() {
    this.render('home');
  }

  login() {
    this.render('login', {
      login: (username, password, callbacks) =>
        this.withRequests('sessions', sessions =>
          sessions.login(username, password, callbacks)),
      success: () => this.io.navigate('/')
    });
  }

  logout() {
    this.withRequests('sessions', sessions =>
      sessions.logout(this.io.getSessionKey(), {
        complete: () => this.io.navigate('/')
      })
    );
  }

  signUp() {
    this.render('sign-up', {
      createUser: (username, password, confirmation, callbacks) =>
        this.withRequests('users', users =>
          users.createUser(username, password, confirmation, callbacks)),
      success: data => this.io.navigate('/')
    });
  }

  search(options) {
    let { page, query, hasNext } = options.queryParams;

    this.withRequests('tabs', tabs =>
      tabs.searchTabs(query, page, {
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
            this.render('search-results', {
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
      })
    );
  }
}

export default Root;
