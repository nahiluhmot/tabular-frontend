/**
 * This function accepts a password and returns an error message if it is
 * invalid, or null if it is valid.
 */
export default password =>
  ((password || '').length < 8) ? 'must be at least 8 characters' : null;
