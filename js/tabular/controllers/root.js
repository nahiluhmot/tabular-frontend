import Home from 'tabular/views/pages/home';
import Tabs from 'tabular/requests/tabs';

/**
 * This is the top level controller for the application.
 */
class Root {
  /**
   * Expected expected IO functions:
   *   - getSessionKey(): Get the session key.
   *   - render(component, params, callback): Render the React view.
   *   - request(options): Send an HTTP request.
   */
  constructor(io) {
    this.io = io;
  }

  home() {
    this.io.render(Home, {
      signUpLink: '#sign-up',
      loginLink: '#login',
      search: query => {
        console.log(`searched for ${query}`);
      }
    });
  }
}

export default Root;
