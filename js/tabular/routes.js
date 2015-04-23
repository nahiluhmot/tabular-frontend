import { LINKS } from 'tabular/constants';
import Root from 'tabular/controllers/root';
import Sessions from 'tabular/controllers/sessions';
import Users from 'tabular/controllers/users';
import IO from 'tabular/io';

const { home, logout, signUp } = LINKS;

export default {
  target: new Root(IO),
  [home]: 'home',
  [logout]: 'logout',
  [signUp]: 'signUp',
  '/users': {
    target: new Users(IO),
    '/create': 'signUp',
    '/edit': 'changePassword'
  },
  '/sessions': {
    target: new Sessions(IO),
    '/create': 'login'
  }
};
