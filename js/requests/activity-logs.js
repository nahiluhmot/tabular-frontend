import { API_ROOT } from 'config';

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

  recentActivity(username, page, callbacks) {
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
