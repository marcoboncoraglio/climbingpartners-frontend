import React, { Component } from 'react';
import './App.css';

import MapView from './routes/MapView/MapView'
import FriendsView from './routes/FriendsView/FriendsView'
import MessagesView from './routes/MessagesView/MessagesView'
import ProfileView from './routes/ProfileView/ProfileView';
import SettingsView from './routes/SettingsView/SettingsView';
import WelcomeView from './routes/WelcomeView/WelcomeView';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { auth } from './firebase/Firebase'
import { loginUser } from './actions/LoginActions'
import LoginStore from './stores/LoginStore'


class App extends Component {
  constructor() {
    super();

    auth.onAuthStateChanged((user) => {
      if (user) {
        loginUser(user);
        this.handleLogin();
      }
    });
  }

  state = {
    loggedIn: false
  }

  componentDidMount() {
    LoginStore.on("logout", this.handleLogout);
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  }

  handleLogout = () => {
    this.setState({ loggedIn: false });
  }

  componentWillUnmount() {
    LoginStore.removeListener("logout", this.handleLogout);
  }

  render() {
    return (
      <BrowserRouter>
        {
          this.state.loggedIn ?
            <React.Fragment>
              <Switch>
                <Route path="/" exact component={MapView}></Route>
                <Route path="/friends" exact component={FriendsView}></Route>
                <Route path="/messages" exact component={MessagesView}></Route>
                <Route path="/profile" exact component={ProfileView}></Route>
                <Route path="/profile/:id" exact component={ProfileView}></Route>
                <Route path="/settings" exact component={SettingsView}></Route>
              </Switch>
            </React.Fragment>
            :
            <React.Fragment>
              <Switch>
                <Route path="/" exact component={WelcomeView}></Route>
                <Route path="/welcome" exact component={WelcomeView}></Route>
              </Switch>
            </React.Fragment>

        }
      </BrowserRouter>
    );
  }
}

export default App;
