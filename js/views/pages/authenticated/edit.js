import { Component, createElement, DOM } from 'react';

import NavBar from 'views/navs/nav-bar';
import ChangePassword from 'views/forms/change-password';

const { a, button, div, h3, p, span } = DOM;

/**
 * This class represents edit page.
 */
class Edit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          div({ className: 'row' },
            div({ className: 'col-xs-12' },
              h3({ className: 'centered-text' }, 'Change Password'),
              createElement(ChangePassword, this.props))),
          div({ className: 'row' },
            h3({ className: 'centered-text' }, 'Destroy Account')),
          div({ className: 'row' },
            div({ className: 'col-md-2' }),
            div({ className: 'col-md-8' },
              a({
                className: 'btn btn-danger full-button',
                onClick: () => this.deleteAlert(),
              }, span({ className: 'fui-cross' }))),
            div({ className: 'col-md-2' }))));
    return tree;
  }

  deleteAlert() {
    const { destroyUser } = this.props;

    swal({
      title: [
        'You will not be able to recover your data once your account has been',
        'deleted.'
      ].join(' '),
      text: [
        'Please type your password to confirm that you would like to delete',
        'your account.'
      ].join(' '),
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: 'Delete my Account',
      confirmButtonColor: '#c0392b',
      inputPlaceholder: 'Password',
      inputType: 'password'
    }, function(password) {
      destroyUser(password, {
        success: () => swal.close(),
        error: () => swal.showInputError('Bad Password')
      });
    });
  }
}

export default Edit;
