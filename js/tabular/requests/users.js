import { API_ROOT } from 'tabular/constants';

/**
 * This module contains functions for interacting with Users.
 */
class Users {
  /**
   * The constructor accepts a request function so that it may be stubbed out.
   */
  constructor(request) {
    this.request = request;
  }

  /**
   * Get the logged in user.
   */
  loggedIn(sessionKey, callbacks) {
    this.request({
      url: Users.ROOT,
      method: 'GET',
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }

  /**
   * Create a user with the given username, password, confirmation, and set of
   * callbacks.
   */
  createUser(username, password, confirmation, callbacks) {
    this.request({
      url: Users.ROOT,
      method: 'POST',
      data: {
        username: username,
        password: password,
        password_confirmation: confirmation
      },
      callbacks: callbacks
    });
  }

  /**
   * Update the logged in user's password.
   */
  updatePassword(sessionKey, password, confirmation, callbacks) {
    this.request({
      url: Users.ROOT,
      method: 'PUT',
      data: {
        password: password,
        password_confirmation: confirmation
      },
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }

  /**
   * Destroy the logged in user.
   */
  destroyUser(sessionKey, callbacks) {
    this.request({
      url: Users.ROOT,
      method: 'DELETE',
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }
}

/**
 * The root for User requests.
 */
Users.ROOT = `${API_ROOT}/users`;

export default Users;
