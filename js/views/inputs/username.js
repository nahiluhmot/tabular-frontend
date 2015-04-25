import Base from 'views/inputs/base';

/**
 * This class represents a Username input field.
 */
class Username extends Base {
  /**
   * Create a new Username input field.
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
 * Default props for the Username.
 */
Username.defaultProps = {
  label: 'Username',
  placeholder: 'Username',
  type: 'text'
};

export default Username;
