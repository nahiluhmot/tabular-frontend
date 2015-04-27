import Authenticated from 'controllers/authenticated';
import Root from 'controllers/root';
import Users from 'controllers/users';
import Tabs from 'controllers/tabs';
import IO from 'io';

export default {
  target: new Root(IO),
  '/': 'home',
  '/login': 'login',
  '/sign-up': 'signUp',
  '/a': {
    target: new Authenticated(IO),
    '/': 'feed',
    '/edit': 'edit'
  },
  '/u/:username': {
    target: new Users(IO),
    '/': 'feed',
    '/followers': 'followers',
    '/following': 'following'
  },
  '/tabs': {
    target: new Tabs(IO),
    '/': 'search',
    '/new': 'newTab',
    '/:id': {
      '/': 'show',
      '/edit': 'edit'
    }
  }
};
