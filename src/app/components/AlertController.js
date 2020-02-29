import React, { Component } from 'react';
import { message, notification } from 'antd';
import autoBind from 'react-autobind';
//
class AlertController extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  // Actions
  showAPIErrorAlert(title, resp, resp2) {
    console.error(resp, resp2);
    let errMessage = null;
    if (resp && resp.body && resp.body.err) errMessage = resp.body.err;
    //40x codes
    else if (resp && resp.body && resp.body.message) errMessage = resp.body.message;
    //20x codes with error (auth)
    else if (resp && resp.error && resp.error.message) errMessage = resp.error.message;
    //2nd error
    else if (resp2 && resp2.body && resp2.body.err) errMessage = resp2.body.err;
    else if (resp2 && resp2.body && resp2.body.message) errMessage = resp2.body.message;
    else if (resp2 && resp2.error && resp2.error.message) errMessage = resp2.error.message;
    notification.error({ message: !title ? 'Error' : title, description: errMessage, duration: 0 });
  }
  showErrorAlert(title, description) {
    notification.error({ message: title, description, duration: 0 });
  }

  showSuccessAlert(title, description) {
    message.success(title + description, 5);
  }
  showWarningAlert(title, description) {
    notification.warning({ message: title, description: description });
  }

  showQuestionAlert(title, description) {
    return window.confirm(`${title}\n${description}`);
  }

  showPromptAlert(title, description) {
    return window.prompt(`${title}\n${description}`);
  }

  // UI
  render() {
    return (
      <>
        {' '}
        {React.cloneElement(this.props.children, {
          alertController: this,
        })}{' '}
      </>
    );
  }
}
export default AlertController;
