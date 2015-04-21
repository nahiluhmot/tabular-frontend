import Base from 'tabular/views/inputs/base';
import { extend } from 'underscore';

/**
 * This class represents a Confirmation input field.
 */
class Confirmation extends Base {
  /**
   * Create a new Confirmation input field.
   *
   * Props:
   *   - className: Optional CSS class name.
   *   - onChange:  Callback to perform when the input changes.
   */
  constructor(props) {
    super(props);
  }
}

/**
 * Default prop attributes for the input field.
 */
Confirmation.defaultProps = {
  label: 'Confirmation',
  placeholder: 'Confirmation',
  type: 'password'
};

export default Confirmation;
