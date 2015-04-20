import { API_ROOT } from 'tabular/constants';

/**
 * This module exports functions for interacting with tabs.
 */
class Tabs {
  constructor(request) {
    this.request = request;
  }

  searchTabs(query, page, callbacks) {
    this.request({
      url: Tabs.ROOT,
      method: 'GET',
      data: { query: query, page: page },
      callbacks: callbacks
    });
  }

  createTab(sessionKey, tabData, callbacks) {
    this.request({
      url: Tabs.ROOT,
      method: 'POST',
      data: tabData,
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }

  readTab(id, callbacks) {
    this.request({
      url: `${Tabs.ROOT}/${id}`,
      method: 'GET',
      callbacks: callbacks
    });
  }

  updateTab(sessionKey, id, tabData, callbacks) {
    this.request({
      url: `${Tabs.ROOT}/${id}/`,
      method: 'PUT',
      data: tabData,
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }

  destroyTab(sessionKey, id, callbacks) {
    this.request({
      url: `${Tabs.ROOT}/${id}/`,
      method: 'DELETE',
      sessionKey: sessionKey,
      callbacks: callbacks
    });
  }
}

/**
 * The root for User requests.
 */
Tabs.ROOT = `${API_ROOT}/tabs`;

export default Tabs;
