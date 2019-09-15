import React, { Component } from "react";
import "./App.css";

import MapView from "./views/MapView/MapView";
import FriendsView from "./views/FriendsView/FriendsView";
import MessagesView from "./views/MessagesView/MessagesView";
import ProfileView from "./views/ProfileView/ProfileView";
import SettingsView from "./views/SettingsView/SettingsView";
import WelcomeView from "./views/WelcomeView/WelcomeView";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { auth } from "./firebase/Firebase";
import { loginUser } from "./actions/LoginActions";
import LoginStore from "./stores/LoginStore";

class App extends Component {
  constructor() {
    super();

    auth.onAuthStateChanged(user => {
      if (user && user.uid !== undefined) {
        loginUser(user);
      }
    });
  }

  state = {
    loggedIn: false
  };

  componentDidMount() {
    LoginStore.on("login", this.handleLogin);
    LoginStore.on("logout", this.handleLogout);
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  handleLogout = () => {
    this.setState({ loggedIn: false });
  };

  componentWillUnmount() {
    LoginStore.removeAllListeners();
  }

  render() {
    return (
      <BrowserRouter>
        {!this.state.loggedIn ? (
          <React.Fragment>
            <Switch>
              <Route path="/" exact component={WelcomeView} />
              <Route path="/welcome" exact component={WelcomeView} />
            </Switch>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Switch>
              <Route path="/" exact component={MapView} />
              <Route path="/friends" exact component={FriendsView} />
              <Route path="/messages" exact component={MessagesView} />
              <Route path="/profile" exact component={ProfileView} />
              <Route path="/profile/:id" exact component={ProfileView} />
              <Route path="/settings" exact component={SettingsView} />
            </Switch>
          </React.Fragment>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
