import React, { Component } from 'react';
import './WelcomeView.css';

import {auth, signInOptions } from '../../firebase/Firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


class WelcomeView extends Component {
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: signInOptions,
    signInSuccessUrl: "/"
  };

  render() {
    return (
      <div className="image">
        <div className="container">
          <h1 className="header">Climbing partners</h1>
          <p className="motto">Find climbing partners around you!</p>
          <div className="buttons">
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
          </div>
        </div>
      </div>
    )
  }
}
export default WelcomeView;