import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Layout, Row, Col, Typography } from 'antd';
//
import AppRoutes from './AppRoutes';
//
import Globals from './config/Globals';
//
export default class UnauthorizedViewController extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.props.app.props.history.location.state = undefined; // reset history state if restarting app
  }
  // UI
  render() {
    return this._renderPage();
  }
  /* subviews */
  _renderPage() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Layout.Content style={{ height: '100%', marginTop: '200px' }}>
          <Layout style={{ height: '100%' }}>
            <Layout.Content>
              <AppRoutes appRef={this} />
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    );
  }
}
