import Root from 'controllers/root';
import IO from 'io';
// import Authenticated from 'controllers/authenticated';
// import Tabs from 'controllers/tabs';
// import Users from 'controllers/users';

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
  // '/u': {
  //   target: new Users(IO),
  //   '/:username': 'feed',
  //   '/:username/followers': 'followers',
  //   '/:username/following': 'following'
  // },
  // '/tabs': {
  //   target: new Tabs(IO),
  //   '/new': 'create',
  //   '/:id/': 'show',
  //   '/:id/edit/': 'edit'
  // }
};
