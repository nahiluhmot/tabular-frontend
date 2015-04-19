import reqwest from 'reqwest';

import { SESSION_KEY_HEADER } from 'tabular/constants';

/**
 * This module contains functions for interacting with Relationships.
 */
export default {
  followers(username, options) {
    reqwest({
      url: `/api/users/${username}/followers/`,
      method: 'GET',
      type: 'json',
      success: options.success,
      error: options.error
    });
  },

  followees(username, options) {
    reqwest({
      url: `/api/users/${username}/followees/`,
      method: 'GET',
      type: 'json',
      success: options.success,
      error: options.error
    });
  },

  follow(session_key, username, options) {
    reqwest({
      url: `/api/users/${username}/followers/`,
      method: 'POST',
      type: 'json',
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  },

  unfollow(session_key, username, options) {
    reqwest({
      url: `/api/users/${username}/followers/`,
      method: 'DELETE',
      type: 'json',
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  }
};
