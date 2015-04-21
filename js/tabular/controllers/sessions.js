import Login from 'tabular/views/sessions/login';
import { default as SessionsRequests } from 'tabular/requests/sessions';

/**
 * This controller handles routes for the Sessions.
 */
class Sessions {
  /**
   * Expected expected IO functions:
   *   - getSessionKey(): Get the session key.
   *   - render(component, params, callback): Render the React view.
   *   - request(options): Send an HTTP request.
   */
  constructor(io) {
    this.io = io;
    this.sessions = new SessionsRequests(this.io.request);
  }

  login() {
    const sessions = this.sessions;

    this.io.render(Login, {
      login: (username, password, callbacks) =>
        sessions.login(username, password, callbacks),
      success: () => console.log(`success logging in: ${this.io.getSessionKey()}`)
    });
  }
}

export default Sessions;
