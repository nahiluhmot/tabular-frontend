import Base from 'views/inputs/base';

/**
 * This class represents a Password input field.
 */
class Password extends Base {
  /**
   * Create a new Password input field.
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
Password.defaultProps = {
  label: 'Password',
  placeholder: 'Password',
  type: 'password'
};

export default Password;
