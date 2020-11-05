import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { loginComplete } from '../actions/LoginActions';
const axios = require('axios');

class LoginStore extends EventEmitter {
  uid: any;
  token: any;
  username: string = 'username';

  url: string = process.env.BACKEND_URL_TEST || 'http://localhost:4000/api';

  loginLocal(username: string, password: string) {
    this.username = username;
    axios
      .post(`${this.url}/auth/login`, {
        username: username,
        password: password,
      })
      .then((res: any) => {
        if (res.data.token && res.data.uid) {
          this.token = res.data.token;
          this.uid = res.data.uid;
          loginComplete(this.uid, this.token);
          this.emit('LOGIN_COMPLETE');
        } else {
          console.log('error: ', res.data);
          return res.data;
        }
      })
      .catch((err: any) => console.log(err));
  }

  //todo: implement this
  registerLocal(username: string, password: string) {}

  logout() {
    this.token = null;
    this.uid = undefined;
    this.username = 'username';
  }

  getUid(): string {
    return this.uid;
  }

  IsLoggedIn(): boolean {
    return this.uid !== undefined;
  }

  handleActions = (action: any) => {
    switch (action.type) {
      case 'LOGIN': {
        this.loginLocal(action.username, action.password);
        break;
      }
      case 'LOGOUT': {
        this.logout();
        break;
      }
      default: {
        return;
      }
    }
  };
}

const loginStore = new LoginStore();

dispatcher.register(loginStore.handleActions);

export default loginStore;
