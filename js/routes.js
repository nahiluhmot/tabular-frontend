import Root from 'controllers/root';
import Users from 'controllers/users';
import IO from 'io';

// import Authenticated from 'controllers/authenticated';
// import Tabs from 'controllers/tabs';

export default {
  target: new Root(IO),
  '/': 'home',
  '/login': 'login',
  '/sign-up': 'signUp',
  '/search': 'search',
  // '/a': {
  //   target: new Authenticated(IO),
  //   '/': 'feed',
  //   '/edit': 'edit'
  // },
  '/u/:username': {
    target: new Users(IO),
    '/': 'feed',
    '/followers': 'followers',
    '/following': 'following'
  }
  // '/tabs': {
  //   target: new Tabs(IO),
  //   '/new': 'create',
  //   '/:id/': 'show',
  //   '/:id/edit/': 'edit'
  // }
};
