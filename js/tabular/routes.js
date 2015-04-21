import Users from 'tabular/controllers/users';
import Sessions from 'tabular/controllers/sessions';
import IO from 'tabular/io';

export default {
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
