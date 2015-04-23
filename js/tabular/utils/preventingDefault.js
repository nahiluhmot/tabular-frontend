/**
 * Curry a callback and an event together to create a new callback that calls
 * preventDefault() on the event before calling the original callback.
 */
export default callback => event => {
  event.preventDefault();
  callback();
};
