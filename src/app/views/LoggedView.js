import React from 'react';
import autoBind from 'react-autobind';
//
export default class LoggedView extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    const idmUser = this.props.app.idm.session.data.getUserObject();
    return (
      <div className="main">
        <h3>You are logged as {idmUser.firstName}</h3>
      </div>
    );
  }
}
