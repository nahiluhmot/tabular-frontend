import { Component, createElement, DOM } from 'react';
import swal from 'sweet-alert';
import { map } from 'underscore';

import NavBar from 'views/navs/nav-bar';

const { a, br, button, div, h1, h2, label, p, small, strong, span } = DOM;
const { textarea } = DOM;

/**
 * This class shows a tab and its comments.
 */
class Show extends Component {
  /**
   * Create a new Home page. It requires all of the props required by the
   * Nav and SignUpForm.
   */
  constructor(props) {
    super(props);
    this.state = { comment: '', isCommenting: false };
  }

  render() {
    const { tab, loggedIn, owner } = this.props;
    const { comment, isCommenting } = this.state;
    const { artist, album, body, comments, id, title, user } = tab;
    const { username } = user;

    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },

          div({ className: 'row' },
            div({ className: 'col-md-6' },
              div({ className: 'row' },
                div({ className: 'col-xs-6' },
                  p({ className: 'lead pull-right' }, 'Artist:')),
                  p({ className: 'lead' },
                    strong({}, artist))),

              div({ className: 'row' },
                div({ className: 'col-xs-6' },
                  p({ className: 'lead pull-right' }, 'Album:')),
                  p({ className: 'lead' },
                    strong({}, album))),

              div({ className: 'row' },
                div({ className: 'col-xs-6' },
                  p({ className: 'lead pull-right' }, 'Title:')),
                  p({ className: 'lead' },
                    strong({}, title)))),

            div({ className: 'col-md-6' },
              div({ className: 'row' },
                div({ className: 'col-xs-6' },
                  p({ className: 'lead pull-right' }, 'Uploaded By:')),
                  p({ className: 'lead' },
                    a({ className: 'navigate', href: `/u/${username}/` },
                      strong({}, username)))),

                // Feature detect edit/remove buttons.
                ((typeof owner !== 'object') ?
                  null :
                  div({ className: 'row' },
                    div({ className: 'col-xs-6' },
                      button({
                        className: 'btn btn-primary full-button',
                        onClick: owner.editTab
                      }, 'Edit Tab')),
                    div({ className: 'col-xs-6' },
                      button({
                        className: 'btn btn-danger full-button',
                        onClick: () => this.destroyTab(owner.destroyTab)
                      }, 'Destroy Tab')))))),

           // Tab body
          div({ className: 'row' },
            div({ className: 'tab-body' },
            map(body.split('\n'), (line, idx) =>
              (line === '') ?
                br({ key: idx }) :
                p({ key: idx }, line)))),

          // Comments header
          (((comments.length === 0) && (typeof loggedIn !== 'object')) ?
            null :
            div({ className: 'row centered-text' },
              p({ className: 'lead' }, 'Comments',
                (typeof loggedIn !== 'object') ?
                  null :
                    a({
                      onClick: () =>
                        this.setState({ isCommenting: !isCommenting })
                    }, ' ',
                      span({
                        className: `fui-${isCommenting ? 'cross' : 'plus'}`
                      }))))),

          // Feature detect comment box.
          (((typeof loggedIn !== 'object') || !isCommenting) ?
            null :
            div({ className: 'form-group' },
              label({}, 'New Comment'),
              textarea({
                className: 'form-control',
                rows: 4,
                onChange: event => this.setState({ comment: event.target.value })
              }),
              button({
                className: 'btn btn-primary full-button',
                style: { marginTop: '10px' },
                disabled: comment === '',
                onClick: event => {
                  event.preventDefault();
                  loggedIn.createComment(comment);
                }
              }, 'Save'))),

          // Render the existing comments.
          map(comments, comment => this.renderComment(comment))));


    return tree;
  }

  renderComment({ id, user, body }) {
    let { loggedIn } = this.props;
    loggedIn = loggedIn || {};

    const tree =
      div({ key: id, className: 'panel panel-default' },
        div({ className: 'panel-heading' },
          a({ className: 'navigate', href: `/u/${user.username}/` },
            user.username),
          ((loggedIn.username !== user.username) ?
            null :
            div({ className: 'pull-right' },
              ' ',
              a({ onClick: () => loggedIn.destroyComment(id) },
                span({ className: 'fui-cross-circle' }))))),
        div({ className: 'panel-body' }, body));

    return tree;
  }

  destroyTab(request) {
    swal({
      title: 'Are you sure you want to delete this tab?',
      text: 'You will not be able to recover it once it has been deleted',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c0392b',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      closeOnConfirm: true,
      closeOnCancel: true
    }, confirmed => {
      if (confirmed) {
        request();
      }
    });
  }
}

export default Show;
