/**
 * This is the main class for the application. It contains setup logic and
 * re-exports its sub modules.
 */
class Tabular {
  constructor(element) {
    this.element = element;
  }
}

/**
 * Initialize the App.
 */
Tabular.initialize = function() {
  return new Tabular(document.body);
};

export default Tabular;
