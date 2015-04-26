import { API_ROOT } from 'constants';

/**
 * This module contains functions for interacting with relationships.
 */
class Relationships {
  constructor(request) {
    this.request = request;
  }

  followers(username, callbacks) {
    this.request({
      url: `${API_ROOT}/users/${username}/followers`,
      method: 'GET',
      callbacks: callbacks
    });
  }

  followees(username, callbacks) {
    this.request({
      url: `${API_ROOT}/users/${username}/followees`,
      method: 'GET',
      callbacks: callbacks
    });
  }

  isFollowing(sessionKey, username, callbacks) {
    this.request({
      url: `${API_ROOT}/users/${username}/is-following`,
      method: 'GET',
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }

  follow(sessionKey, username, callbacks) {
    this.request({
      url: `${API_ROOT}/users/${username}/followers`,
      method: 'POST',
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }

  unfollow(sessionKey, username, callbacks) {
    this.request({
      url: `${API_ROOT}/users/${username}/followers`,
      method: 'DELETE',
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }
}

export default Relationships;
