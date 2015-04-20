import Users from 'tabular/controllers/users';
import IO from 'tabular/io';

export default {
  '/users': {
    target: new Users(IO),
    '/sign-up': 'signUp',
  }
};
