import { Component, createElement, DOM } from 'react';
import { map } from 'underscore';

import NavBar from 'views/navs/nav-bar';

const { a, br, button, div, h1, h2, label, p, small, span, textarea } = DOM;

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
    this.state = { comment: '' };
  }

  render() {
    const { tab, loggedIn, owner } = this.props;
    const { comment } = this.state;
    const { artist, album, body, comments, id, title, user } = tab;
    const { username } = user;

    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },

          // Header
          div({ className: 'row' },
            div({ className: 'page-header' },
              h1({}, title, ' ',
                small({}, 'Uploaded by ',
                  a({ className: 'navigate', href: `/u/${username}/` },
                    username),
                  // Feature detect edit/remove buttons.
                  ((typeof owner !== 'object') ?
                    null :
                    div({ className: 'pull-right' },
                      ' ',
                      a({ onClick: owner.editTab },
                        span({ className: 'glyphicon glyphicon-cog' })),
                      ' ',
                      a({ onClick: () => this.destroyTab(owner) },
                        span({ className: 'glyphicon glyphicon-remove' })))))))),

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
              h2({}, 'Comments'))),

          // Feature detect comment box.
          ((typeof loggedIn !== 'object') ?
            null :
            div({ className: 'form-group' },
              label({}, 'New Comment'),
              textarea({
                className: 'form-control',
                rows: 4,
                onChange: event => this.setState({ comment: event.target.value })
              }),
              button({
                className: 'btn btn-primary',
                disabled: comment === null,
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
                span({ className: 'glyphicon glyphicon-remove' }))))),
        div({ className: 'panel-body' }, body));

    return tree;
  }
}

export default Show;
