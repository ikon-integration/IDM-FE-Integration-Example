import React from 'react';
import autoBind from 'react-autobind';
import URLQuery from 'query-string-manipulator';
import IDM from '@ikonintegration/idmclient';
//
import config from '../config/config';
import packageJSON from '../../../package.json';
//
const urlParse = require('url-parse');
//
export default class Authenticator extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    console.debug(`[APP] FE - version: ${packageJSON.version}@${packageJSON.commitHash}`);
    //
    this.isAuthenticating = false;
    this.sessionWillLoadHandler = null;
    this.sessionDidLoadHandler = null;
    this.sessionDidFailLoadHandler = null;
    this.idm = new IDM(config.IDMClientTokenKey, config.IDMClientTokenSecret, config.IDMClientOptions);
    this.idm.sessionLoadedHandler = this.sessionLoadedHandler.bind(this);
  }
  async componentDidMount() {
    this.startLoading(true);
    if (!this.idm.isLogged()) await this.idm.load(); // ask for revalidation if have session - will redirect
    if (!this.idm.isLogged()) this.endLoading(true); //if we kept logged out, stop loading
  }
  // Shortcuts on application levels
  isAdmin() {
    return this.idm.session.authorization ? this.idm.session.authorization.hasClaim('ADMIN') : false;
  }
  isUser() {
    return this.idm.session.authorization ? this.idm.session.authorization.hasClaim('USER') : false;
  }
  isAdvisor() {
    return this.idm.session.authorization ? this.idm.session.authorization.hasClaim('ADVISOR') : false;
  }

  // Loading
  startLoading(reload) {
    this.isAuthenticating = true;
    if (reload) this.forceUpdate();
  }

  endLoading(reload) {
    this.isAuthenticating = false;
    if (reload) this.forceUpdate();
  }

  // IDM delegate calls
  async sessionLoadedHandler() {
    //Todo prevent double session load!
    if (this.isLoadingSession) return;
    this.isLoadingSession = true;
    if (this.sessionWillLoadHandler) this.sessionWillLoadHandler();
    //session will be loaded by this.idm.load or by login call, both should be
    //loading while this is called, so we dont update state when starting loading for session load
    //reloading state will cause authorized area to be called while we haven't fully loaded the session
    this.startLoading(false);

    //LOAD CACHE HERE

    //End loading, unblock other session load
    this.isLoadingSession = false;
    this.endLoading(true);
  }

  //UI
  render() {
    if (this.idm.isLogged() && !this.isAuthenticating) return this.renderAuthorizedView();
    return this.renderUnauthorizedView();
  }


  //Navigation stack
  pushPage(pagePath, args, id, id2, replace) {
    // replace id - TODO: do it dynamically
    if (id2 != undefined && id2 != null) pagePath = pagePath.replace(`:${Globals.URL_Path_ID2_Placeholder}`, id2);
    if (id != undefined && id != null) pagePath = pagePath.replace(`:${Globals.URL_Path_ID_Placeholder}`, id);
    // build url
    const reqURL = URLQuery(pagePath, { set: args || {} });
    console.debug('Pushing page', reqURL);
    //push new page
    if (replace) this.props.history.replace(reqURL);
    else this.props.history.push(reqURL);
  }
  openExternalPage(url, appendProtocol) {
    if (appendProtocol) {
      const curr = urlParse(window.location.href);
      url = `${curr.protocol.replace(':','')}://${url}`;
    }
    window.open(url, '_blank');
    window.focus();
  }
}
