import React from 'react';
import { Route } from 'react-router-dom';
//
export default ({ component: C, appRef: cRef, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return <C {...props} {...cRef.childProps} app={cRef.props.app} alertController={cRef.props.alertController} />;
      }}
    />
  );
};
