import ActivityLogs from 'requests/activity-logs';
import Comments from 'requests/comments';
import Relationships from 'requests/relationships';
import Sessions from 'requests/sessions';
import Tabs from 'requests/tabs';
import Users from 'requests/users';

/**
 * This is the base controller for tabular. It contains methods to lazily load
 * requests and pages, as well as to render views.
 */
class Base {
  constructor(io) {
    this.io = io;
    this.logs = new ActivityLogs(io.request);
    this.comments = new Comments(io.request);
    this.relationships = new Relationships(io.request);
    this.sessions = new Sessions(io.request);
    this.tabs = new Tabs(io.request);
    this.users = new Users(io.request);
  }

  render(page, props) {
    const key = this.io.getSessionKey();
    props = props || {};
    props.search = query => this.io.navigate('/tabs/', {
      queryParams: {
        query: query,
        page: 1,
        hasNext: true,
        hasPrev: false
      }
    });

    if (key === '') {
      props.signedIn = false;
      this.io.render(page, props);
    } else {
      this.users.loggedIn(key, {
        success: () => {
          props.signedIn = true;
          props.logout = () =>
            this.sessions.logout(this.io.getSessionKey(), {
              complete: () => this.io.navigate('/')
            });
        },
        error: () => props.signedIn = false,
        complete: () => this.io.render(page, props)
      });
    }
  }

  whenAuthenticated(redirect, callback) {
    const key = this.io.getSessionKey();

    this.users.loggedIn(key, {
      success: user => callback(key, user),
      error: () => this.io.navigate(redirect)
    });
  }
}

export default Base;
