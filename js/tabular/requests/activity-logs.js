import { API_ROOT } from 'tabular/constants';

/**
 * This class has methods for interacting with activity logs.
 */
class ActivityLogs {
  constructor(request) {
    this.request = request;
  }

  frontpage(sessionKey, page, callbacks) {
    this.request({
      url: `${API_ROOT}/feed`,
      method: 'GET',
      data: {
        page: page
      },
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }

  recent_activity(username, page, callbacks) {
    this.request({
      url: `${API_ROOT}/users/${username}/feed`,
      method: 'GET',
      data: {
        page: page
      },
      callbacks: callbacks
    });
  }
}

export default ActivityLogs;
