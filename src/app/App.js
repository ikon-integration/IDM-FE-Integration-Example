import React from 'react';
import { withRouter } from 'react-router-dom';
//
import UnauthorizedViewController from './UnauthorizedViewController';
import AuthorizedViewController from './AuthorizedViewController';
import AlertController from './components/AlertController';
import Authenticator from './components/Authenticator';
//
class App extends Authenticator {
  renderAuthorizedView() {
    return (
      <AlertController>
        <AuthorizedViewController app={this} history={this.props.history} logoutHandler={this.handleLogout} />
      </AlertController>
    );
  }

  renderUnauthorizedView() {
    return (
      <AlertController>
        <UnauthorizedViewController app={this} history={this.props.history} logoutHandler={this.handleLogout} />
      </AlertController>
    );
  }
}
export default withRouter(App);
