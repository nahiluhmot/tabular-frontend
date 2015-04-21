/**
 * This function accepts a password and confrimation returns an error message
 * if they don't match.
 */
export default (password, confirmation) =>
  (password !== confirmation ) ? 'must match the password' : null;
