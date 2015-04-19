import reqwest from 'reqwest';

import { SESSION_KEY_HEADER } from 'tabular/constants';

/**
 * This module exports functions for interacting with comments.
 */
export default {
  list_by_username(username, options) {
    reqwest({
      url: `/api/users/${username}/comments/`,
      method: 'GET',
      type: 'json',
      success: options.success,
      error: options.error
    });
  },

  list_by_tab_id(id, options) {
    reqwest({
      url: `/api/tabs/${id}/comments/`,
      method: 'GET',
      type: 'json',
      success: options.success,
      error: options.error
    });
  },

  create(session_key, id, comment_body, options) {
    reqwest({
      url: `/api/tabs/${id}/comments/`,
      method: 'POST',
      type: 'json',
      data: {
        body: comment_body
      },
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  },

  update(session_key, id, comment_body, options) {
    reqwest({
      url: `/api/comments/${id}/`,
      method: 'PUT',
      type: 'json',
      data: {
        body: comment_body
      },
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  },

  destroy(session_key, id, options) {
    reqwest({
      url: `/api/comments/${id}/`,
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
