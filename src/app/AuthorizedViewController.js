import React from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Typography } from 'antd';
//
import AppRoutes from './AppRoutes';
//
import IDMUserBadge from './components/IDMUserBadge';
//
import config from './config/config';
import Globals from './config/Globals';
//
const { Content, Sider, Header } = Layout;

export default class AuthorizedViewController extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    // reset history state if restarting app
    this.props.app.props.history.location.state = undefined;
    this.handleLogout = this.handleLogout.bind(this);
    document.title = 'Sample App - Logged';
    this.state = {
      collapsed: true,
      isLoading: false,
    };
  }

  // Actions
  async handleLogout() {
    this.startLoading();
    await this.props.app.idm.authenticator.logout();
    this.props.app.pushPage(config.ApplicationRoutes.login);
  }
  changePassword() {
    this.props.app.openExternalPage(config.IDMClientOptions.externalAuthDomain + Globals.URL_IDMQueryParam_ChangePassword, true);
  }
  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  // Util
  startLoading() {
    this.setState({ isLoading: true });
  }

  stopLoading(setState) {
    if (setState == undefined) setState = true;
    this.state.isLoading = false;
    if (setState) this.setState(this.state);
  }

  //Helpers
  checkForValidAuthorization() {
    //Rare case where user has two tabs open, no CCPO access but logs in on IDM
    //CCPO gets notified with valid session, however, no app access - handle logout
    if (!(this.props.app.isAdmin() || this.props.app.isUser() || this.props.app.isAdvisor())) {
      this.props.app.idm.session.clearSession(true);
      this.props.alertController.showWarningAlert(
        'Login error',
        "You are not registered with this application, please, click on 'Create account' to enroll with your existing account."
      );
      this.props.app.pushPage('/');
      return true;
    }
    return false;
  }
  // UI
  render() {
    //this check will redirect user out of application, if authorization is
    //not valid for some reason
    if (this.checkForValidAuthorization()) return <></>;
    return this._renderPage();
  }

  /* private methods */
  _renderPage() {
    return (
      <Layout className="container-layout" style={{ height: '100vh' }}>
        {this._renderHeader()}
        <Layout>
          {this._renderUserNavigationBar()}
          <Layout>
            <Content className="main-content">
              {this.state.isLoading && "Loading..."}
              <AppRoutes appRef={this} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
  _renderHeader() {
    return (
      <Header className="appHeader">
        <Row type="flex" align="middle" justify="space-between">
          <Col className="menu-icon">
            <Icon className="trigger" type={this.state.collapsed ? 'menu' : 'close'} onClick={this.onCollapse} />
          </Col>
          <Col> LOGO HERE </Col>
          <Col>
            {this.props.app.idm.isLogged() && (
              <IDMUserBadge user={this.props.app.idm.session.data.getUserObject()}
                            changePassword={this.changePassword} logoutHandler={this.handleLogout}/>
            )}
          </Col>
        </Row>
      </Header>
    );
  }
  _renderUserNavigationBar() {
    // this should not happen, but it take our precautions :p
    if (!this.props.app.idm.isLogged()) return <></>;
    return this._renderPrivilegedNavigation();
  }
  _renderPrivilegedNavigation() {
    const pathName = this.props.app.props.history.location.pathname;
    return (
      <Sider theme="light" width={225} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu mode="inline" className="sideNavigation" selectedKeys={[pathName]} style={{ height: '100%' }}>
          <Menu.Item key={config.ApplicationRoutes.homepage}>
            <Icon type="pie-chart" />
            <span>Dashboard</span>
            <Link to={config.ApplicationRoutes.homepage} />
          </Menu.Item>
          {this.props.app.isAdmin() && (
            <Menu.Item key={'/settings'}>
              <Icon type="setting" />
              <span>Settings</span>
              <Link to={'/settings'} />
            </Menu.Item>
          )}
        </Menu>
      </Sider>
    );
  }
}
