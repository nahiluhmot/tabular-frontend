import { SESSION_KEY_COOKIE } from 'tabular/constants';

/**
 * This class defines the base methods common to all controllers.
 */
class Base {
  /**
   * The constructor for controllers accepts an object that holds methods to
   * perform IO like getting cookies, navigating to a link, and rendering a
   * React view. This allows them to be stubbed out for testing.
   */
  constructor({ get_cookie, navigate, render }) {
    this.get_cookie = get_cookie;
    this.navigate = navigate;
    this.render = render;
    this._session_key = null;
  }

  /**
   * Lazily load and cache the session key.
   */
  session_key() {
    if (!this._session_key) {
      this._session_key = this.get_cookie(SESSION_KEY_COOKIE);
    }

    return this._session_key;
  }
}

export default Base;
