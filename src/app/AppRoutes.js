import React from 'react';
import { Switch } from 'react-router-dom';
import CustomRoute from './components/CustomRoute';
//
import LoggedView from './views/LoggedView';
import CommonLoginView from './views/CommonLoginView';
//
import config from './config/config';

export default class AppRoutes extends React.Component {
  _renderPrivilegedRoutes() {
    // not logged? - default landing page
    if (!this.props.appRef.props.app.idm.isLogged() || this.props.appRef.props.app.isAuthenticating) {
      // Login page will eventually be here
      return (
        <Switch>
          <CustomRoute component={CommonLoginView} appRef={this.props.appRef} />
        </Switch>
      );
    }
    //
    if (this.props.appRef.props.app.isAdmin()) {
      //subsequent routes
      // <CustomRoute path={config.ApplicationRoutes.homepage} exact
      //              component={AdminDashboardView} appRef={this.props.appRef}/>
      return (
        <Switch>
          <CustomRoute component={LoggedView} appRef={this.props.appRef} />
        </Switch>
      );
    }
    //
    if (this.props.appRef.props.app.isAdvisor()) {
      return (
        <Switch>
          <CustomRoute component={LoggedView} appRef={this.props.appRef} />
        </Switch>
      );
    }
    //
    if (this.props.appRef.props.app.isUser()) {
      return (
        <Switch>
          <CustomRoute component={LoggedView} appRef={this.props.appRef} />
        </Switch>
      );
    }
    return <Switch />;
  }

  render() {
    return this._renderPrivilegedRoutes();
  }
}
