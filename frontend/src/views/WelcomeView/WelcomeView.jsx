import React, { Component } from 'react';
import AppLogin from '../../components/AppLogin/AppLogin'
import './WelcomeView.css';


class WelcomeView extends Component {

  render() {
    return (
      <div className="image">
        <div className="container">
          <h1 className="header">Climbing partners</h1>
          <p className="motto">Find climbing partners around you!</p>
          <AppLogin/>
        </div>
      </div>
    )
  }
}
export default WelcomeView;