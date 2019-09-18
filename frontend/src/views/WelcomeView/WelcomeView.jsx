import React, { Component } from 'react';
import { Grid } from '@material-ui/core'
import { FacebookLoginButton, GoogleLoginButton, createButton } from "react-social-login-buttons";
import { EmailTwoTone } from "@material-ui/icons"
import { Link } from "react-router-dom";

import './WelcomeView.css';

const customEmailButtonConfig = {
  text: "Login with email",
  icon: EmailTwoTone,
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#fff", color: "757575" }
};

const EmailLoginButton = createButton(customEmailButtonConfig);


class WelcomeView extends Component {

  render() {
    return (
      <div className="image">
        <div className="container">
          <h1 className="header">Climbing partners</h1>
          <p className="motto">Find climbing partners around you!</p>
          <Grid style={{ display: "inline-block" }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <EmailLoginButton></EmailLoginButton>
            </Link>
            <GoogleLoginButton preventActiveStyles onClick={() => alert("login!")}></GoogleLoginButton>
            <FacebookLoginButton preventActiveStyles onClick={() => alert("login!")}></FacebookLoginButton>
          </Grid>
        </div>
      </div>
    )
  }
}
export default WelcomeView;