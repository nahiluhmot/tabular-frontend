import { API_ROOT } from 'constants';

/**
 * This class exports functions for interacting with comments.
 */
class Comments {
  /**
   * The constructor accepts a request function so that it may be stubbed out.
   */
  constructor(request) {
    this.request = request;
  }

  forTab(tabId, callbacks) {
    this.request({
      url: Comments.ROOT,
      method: 'GET',
      data: { tabId: tabId },
      callbacks: callbacks
    });
  }

  create(sessionKey, tabId, commentBody, callbacks) {
    this.request({
      url: Comments.ROOT,
      method: 'POST',
      data: {
        tab_id: tabId,
        body: commentBody
      },
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }

  update(sessionKey, id, commentBody, callbacks) {
    this.request({
      url: `${Comment.ROOT}/${id}`,
      method: 'PUT',
      data: {
        body: commentBody
      },
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }

  destroy(sessionKey, id, callbacks) {
    this.request({
      url: `/api/comments/${id}/`,
      method: 'DELETE',
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }
}

/**
 * The root for User requests.
 */
Comments.ROOT = `${API_ROOT}/comments`;

export default Comments;
