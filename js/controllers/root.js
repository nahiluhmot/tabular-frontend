import { MAX_SEARCH_RESULTS_PER_PAGE, LINKS } from 'constants';
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
    this.withPage('home', Home => this.render(Home));
  }

  login() {
    this.withPage('login', Login =>
      this.render(Login, {
        login: (username, password, callbacks) =>
          this.withRequests('sessions', sessions =>
            sessions.login(username, password, callbacks)),
        success: () => this.io.navigate(LINKS.profile)
      })
    );
  }

  logout() {
    this.withRequests('sessions', sessions =>
      sessions.logout(this.io.getSessionKey(), {
        complete: () => this.io.navigate(LINKS.home)
      })
    );
  }

  signUp() {
    this.withPage('sign-up', SignUp =>
      this.render(SignUp, {
        createUser: (username, password, confirmation, callbacks) =>
          this.withRequests('users', users =>
            users.createUser(username, password, confirmation, callbacks)),
        success: data => this.io.navigate(LINKS.profile)
      })
    );
  }

  search(options) {
    let { page, query, hasNext } = options.queryParams;

    this.withRequests('tabs', tabs =>
      tabs.searchTabs(query, page, {
        success: data => {
          const searchLink = params =>
            this.io.linkTo(LINKS.search, { queryParams: params });

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

          if ((page > 1) && (data.length === 0)) {
            this.io.navigate(prevLink(false));
          } else if (page < 1) {
            this.io.navigate(firstLink);
          } else {
            hasNext = hasNext && (data.length === MAX_SEARCH_RESULTS_PER_PAGE);
            this.withPage('search-results', SearchResults =>
              this.render(SearchResults, {
                page: page,
                query: query,
                results: data,
                navigateToTab: id => this.io.navigate(`#/tabs/${id}`),
                linkToUser: name => this.io.linkTo(`#/users/${name}`),
                next: hasNext ? nextLink : null,
                prev: (page > 1) ? prevLink(true) : null
              })
            );
          }
        },
        error: error => console.log(error)
      })
    );
  }
}

export default Root;
