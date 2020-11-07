import React, { Component } from 'react';
import './App.css';

import MapView from './views/MapView/MapView';
import FriendsView from './views/FriendsView/FriendsView';
import MessagesView from './views/MessagesView/MessagesView';
import ProfileView from './views/ProfileView/ProfileView';
import SettingsView from './views/SettingsView/SettingsView';
import WelcomeView from './views/WelcomeView/WelcomeView';
import LocalLoginView from './views/LocalLoginView/LocalLoginView';
import LocalRegisterView from './views/LocalRegisterView/LocalRegisterView';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginStore from './stores/LoginStore';

const AuthenticatedRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/welcome" />
    }
  />
);

const NonAuthenticatedRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

class App extends Component {
  state = {
    loggedIn: localStorage.getItem('token') !== null,
  };

  componentDidMount() {
    LoginStore.on('LOGIN_COMPLETE', this.handleLogin);
    LoginStore.on('LOGOUT_COMPLETE', this.handleLogout);
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
        <Switch>
          <NonAuthenticatedRoute
            path="/welcome"
            exact={true}
            component={WelcomeView}
            isAuthenticated={this.state.loggedIn}
          />
          <NonAuthenticatedRoute
            path="/login"
            exact={true}
            component={LocalLoginView}
            isAuthenticated={this.state.loggedIn}
          />
          <NonAuthenticatedRoute
            path="/register"
            exact={true}
            component={LocalRegisterView}
            isAuthenticated={this.state.loggedIn}
          />

          <AuthenticatedRoute
            path="/"
            exact={true}
            component={MapView}
            isAuthenticated={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/friends"
            exact={true}
            component={FriendsView}
            isAuthenticated={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/messages"
            exact={true}
            component={MessagesView}
            isAuthenticated={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/profile"
            exact={true}
            component={ProfileView}
            isAuthenticated={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/profile/:id"
            exact={true}
            component={ProfileView}
            isAuthenticated={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/settings"
            exact={true}
            component={SettingsView}
            isAuthenticated={this.state.loggedIn}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
