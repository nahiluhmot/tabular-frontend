/**
 * This function accepts a username and returns an error message if it is
 * invalid, or null if it is valid.
 */
export default username => {
  let message = null;

   if ((typeof username !== 'string') || username.length < 1) {
     message = 'may not be empty';
   } else if (!username.match(/^[a-zA-Z0-9_]+$/)) {
     message = 'may only contain letters, numbers, and underscores';
   }

   return message;
};
