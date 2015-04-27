import { API_ROOT } from 'config';

/**
 * This module contains functions for interacting with Sessions.
 */
class Sessions {
  constructor(request) {
    this.request = request;
  }

  login(username, password, callbacks) {
    this.request({
      url: Sessions.ROOT,
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
      callbacks: callbacks
    });
  }

  logout(sessionKey, callbacks) {
    this.request({
      url: Sessions.ROOT,
      method: 'DELETE',
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }
}

Sessions.ROOT = `${API_ROOT}/sessions`;

export default Sessions;
