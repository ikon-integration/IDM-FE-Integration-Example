import React from 'react';
import autoBind from 'react-autobind';
//
export default class LoggedView extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }
  async componentDidMount() {
    const userObj = await this.props.app.idm.session.data.getUserObject();
    this.setState({ userObj });
  }
  render() {
    return (
      <div className="main">
        <h3>You are logged as {this.state.userObj?.firstName || 'loading..'}</h3>
      </div>
    );
  }
}
