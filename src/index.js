//Polyfills
import "core-js/stable";
//
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Compoenents
import App from './app/App';
//
import 'antd/dist/antd.less';
// Render router with App
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);