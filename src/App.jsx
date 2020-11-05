import React, { Component } from "react";
import "./App.css";

import MapView from "./views/MapView/MapView";
import FriendsView from "./views/FriendsView/FriendsView";
import MessagesView from "./views/MessagesView/MessagesView";
import ProfileView from "./views/ProfileView/ProfileView";
import SettingsView from "./views/SettingsView/SettingsView";
import WelcomeView from "./views/WelcomeView/WelcomeView";
import LocalLoginView from "./views/LocalLoginView/LocalLoginView";
import LocalRegisterView from "./views/LocalRegisterView/LocalRegisterView";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginStore from "./stores/LoginStore";

class App extends Component {

  state = {
    loggedIn: false
  };

  componentDidMount() {
    LoginStore.on("LOGIN_COMPLETE", this.handleLogin);
    LoginStore.on("LOGOUT", this.handleLogout);
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
              <Route path="/login" exact component={LocalLoginView} />
              <Route path="/register" exact component={LocalRegisterView} />
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
