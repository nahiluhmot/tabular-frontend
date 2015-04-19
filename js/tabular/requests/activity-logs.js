import reqwest from 'reqwest';

import { SESSION_KEY_HEADER } from 'tabular/constants';

/**
 * This module exports functions for interacting with activity logs.
 */
export default {
  frontpage(session_key, page, options) {
    reqwest({
      url: '/api/feed/',
      method: 'GET',
      type: 'json',
      data: {
        page: page
      },
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  },

  recent_activity(username, page, options) {
    reqwest({
      url: `/api/users/${username}/feed/`,
      method: 'GET',
      type: 'json',
      data: {
        page: page
      },
      success: options.success,
      error: options.error
    });
  }
};
