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
import { logoutUser } from './actions/LoginActions';

const AuthenticatedRoute = ({ component: Component, condition, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      condition ? <Component {...props} /> : <Redirect to="/welcome" />
    }
  />
);

class App extends Component {
  state = {
    loggedIn: localStorage.getItem('token') !== null,
  };

  componentDidMount() {
    LoginStore.on('LOGIN_COMPLETE', this.handleLogin);
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  handleLogout = () => {
    logoutUser();
    this.setState({ loggedIn: false });
  };

  componentWillUnmount() {
    LoginStore.removeAllListeners();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/welcome" exact component={WelcomeView} />
          <Route path="/login" exact component={LocalLoginView} />
          <Route path="/register" exact component={LocalRegisterView} />

          <AuthenticatedRoute
            path="/"
            exact={true}
            component={MapView}
            condition={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/friends"
            exact={true}
            component={FriendsView}
            condition={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/messages"
            exact={true}
            component={MessagesView}
            condition={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/profile"
            exact={true}
            component={ProfileView}
            condition={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/profile/:id"
            exact={true}
            component={ProfileView}
            condition={this.state.loggedIn}
          />
          <AuthenticatedRoute
            path="/settings"
            exact={true}
            component={SettingsView}
            condition={this.state.loggedIn}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
