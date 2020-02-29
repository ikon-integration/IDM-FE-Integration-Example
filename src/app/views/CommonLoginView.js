import React from 'react';
import autoBind from 'react-autobind';
import { Layout, Row, Col, Button, Form, Input, Icon } from 'antd';
//
import Utils from '../components/Utils';
import config from '../config/config';
import { IDMGlobals } from "@ikonintegration/idmclient";
//
const { Content } = Layout;
//
export default class CommonLoginView extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { isLoading: false };
    //Session auto load
    this.props.app.sessionWillLoadHandler = this.sessionWillLoadHandler;
    this.props.app.sessionDidLoadHandler = this.sessionDidLoadHandler;
    this.props.app.sessionDidFailLoadHandler = this.sessionDidFailLoadHandler;
    //Login direct call -- this should be uncommented if config.externalAuth is not enabled
    //this.props.app.idm.sessionLoadErrorHandler = this.idmLoginErrorHandler.bind(this);
  }

  componentDidMount() { document.title = `Sign in - ${config.ApplicationName}`; }

  //session delegate -
  sessionWillLoadHandler() { this.startLoading(); }
  sessionDidLoadHandler() { this.stopLoading(); }
  sessionDidFailLoadHandler(err) {
    if (!err) err = 'Could not load application information. Please, check your internet connection.';
    this.props.alertController.showErrorAlert('Error!', err);
    if (this._isMounted) this.stopLoading();
  }

  // Util
  startLoading() { this.setState({ isLoading: true }); }
  stopLoading(setState) {
    if (setState == undefined) setState = true;
    this.state.isLoading = false;
    if (setState) this.setState(this.state);
  }

  // Actions
  async handleSignin(e) {
    if (e) e.preventDefault();
    this.startLoading();
    //Redirects to IDM and wait redirect back
    await this.props.app.idm.authenticator.login(this.emailInput.state.value, null, config.IDMClientOptions.roles.USER, window.location);
    //To directly call API, config.externalAuth should be false when the following call should be user
    //await this.props.app.idm.authenticator.login(email, password);
  }
  handleRegistration(e) {
    e.preventDefault();
    this.props.app.idm.registration.register(config.IDMClientOptions.roles.USER, true /* this last param force redirect registration even when config.externalAuth is false*/);
  }

  // UI
  render() {
    const isLoading = this.state.isLoading || this.props.app.isAuthenticating;
    return (
      <Content className="pageContentFullScreen">
        {isLoading && "Is Loading!"}
        <Row type="flex" justify="center" align="middle" className="authorizationContainer">
          <Col span={6} className="authorizationBoxContainer" align="middle" justify="center">
            <div className="authorizationBox">
              <Row>
                <Col align="center"> Logo HERE </Col>
              </Row>
              <Row>
                <Col align="center">
                  <h5 className="authorizationBoxTitle">Log in</h5>
                  <h6 className="authorizationBoxDescription">Use your [ORG] Account</h6>
                  <Form className="authorizationForm" onSubmit={this.handleSignin}>
                    <Form.Item>
                      <Input className='authorizationFormInput' placeholder="Username" {...Utils.propagateRef(this, 'emailInput')}
                             prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Row type="flex" align='middle' justify='space-between'>
                <Col align="center">
                  <a className="authorizationCreateAccountLink" onClick={this.handleRegistration} href=''>Create account</a>
                </Col>
                <Col align="center">
                  <Button className='authorizationLoginButton' onClick={this.handleSignin}>Log in</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Content>
    );
  }


  //Direct login callback -- this should be uncommented if config.externalAuth is not enabled
  // async idmLoginErrorHandler(loginResp, username, isRenew) {
  //   if (loginResp.statusCode == 400) {
  //     this.props.alertController.showAPIErrorAlert(null, loginResp);
  //   } else if (loginResp.statusCode == 200 || loginResp.statusCode == 401) {
  //     const challengeState = (loginResp.body && loginResp.body.challengeState ? loginResp.body.challengeState :
  //                             (loginResp.body && loginResp.body.errCode ? loginResp.body.errCode : ''));
  //     //Success
  //     if (challengeState == IDMGlobals.AuthorizationChallengeState_Authorized) {
  //       this.props.alertController.showSuccessAlert("", `Welcome ${this.props.app.idm.session.data.getUserObject().firstName}!`); //welcome message
  //       this.props.app.pushPage(config.ApplicationRoutes.homepage); //push to main page
  //     }
  //     //Reset pass required
  //     else if (challengeState == IDMGlobals.AuthorizationChallengeState_PasswordResetRequired) {
  //       this.props.alertController.showWarningAlert('Could not login!', loginResp.body.message);
  //       this.props.app.pushPage(config.ApplicationRoutes.resetPasswordConfirmation, null, username); //push to main page
  //     }
  //     //New pass required
  //     else if (challengeState == IDMGlobals.AuthorizationChallengeState_NewPasswordRequired) {
  //       this.props.alertController.showWarningAlert('Could not login!', loginResp.body.message);
  //       this.props.app.pushPage(config.ApplicationRoutes.setupPassword, null, username, loginResp.body.challengeContext); //push to main page
  //     }
  //     //Confirmation required
  //     else if (challengeState == IDMGlobals.AuthorizationChallengeState_ConfirmationRequired) {
  //       this.props.alertController.showWarningAlert('Could not login!', loginResp.body.message);
  //       console.log(loginResp)
  //       this.props.app.pushPage(config.ApplicationRoutes.registrationConfirmation, null, Globals.URL_Path_ID_Placeholder, username); //push to main page
  //     }
  //     //Handling auth challenges errors
  //     else if (challengeState != IDMGlobals.AuthorizationChallengeState_Forbidden &&
  //              challengeState != IDMGlobals.AuthorizationChallengeState_NotFound) {
  //       this.props.alertController.showWarningAlert('Could not login!', loginResp.body.message);
  //       this.props.app.pushViewWithState(config.ApplicationRoutes.authError, null, null, null, loginResp.body); //push to main page
  //     }
  //     //Unhandled error
  //     else if (!isRenew) {
  //       this.props.alertController.showAPIErrorAlert("Login error!", loginResp);
  //     }
  //   } else { //probably connection error or server is offline :/
  //     this.props.alertController.showAPIErrorAlert("Unknown error!", JSON.stringify(loginResp));
  //   }
  //   this.stopLoading();
  // }
}
