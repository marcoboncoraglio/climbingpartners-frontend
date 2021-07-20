import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
const axios = require('axios');

class LoginStore extends EventEmitter {
  uid: any;
  token: any;
  username: string = 'username';

  url: string =
    (process.env.BACKEND_URL_TEST as string) ||
    'http://localhost:4000/api/auth';

  loginLocal(username: string, password: string) {
    this.username = username;
    axios
      .post(`${this.url}/login`, {
        username: username,
        password: password,
      })
      .then((res: any) => {
        if (res.data.token && res.data.id) {
          this.token = res.data.token;
          this.uid = res.data.id;
          localStorage.setItem('token', this.token);
          localStorage.setItem('uid', this.uid);
          this.emit('LOGIN_COMPLETE');
        } else {
          console.log('error: ', res.data);
          return res.data;
        }
      })
      .catch((err: any) => console.log(err));
  }

  registerLocal(username: string, password: string) {
    this.username = username;
    axios
      .post(`${this.url}/register`, {
        username: username,
        password: password,
      })
      .then((res: any) => {
        if (res.data.token && res.data.id) {
          this.token = res.data.token;
          this.uid = res.data.id;
          localStorage.setItem('token', this.token);
          localStorage.setItem('uid', this.uid);
          this.emit('LOGIN_COMPLETE');
        } else {
          console.log('error: ', res.data);
          return res.data;
        }
      })
      .catch((err: any) => console.log(err));
  }

  loginGoogle(uid: string, token: string) {
    this.uid = uid;
    this.token = token;
    localStorage.setItem('token', this.token);
    localStorage.setItem('uid', this.uid);
    this.emit('LOGIN_COMPLETE');
  }

  logout() {
    this.token = null;
    this.uid = undefined;
    this.username = 'username';
    localStorage.clear();
    this.emit('LOGOUT_COMPLETE');
  }

  getUid(): string {
    return this.uid;
  }

  isLoggedIn(): boolean {
    return this.uid !== undefined;
  }

  handleActions = (action: any) => {
    switch (action.type) {
      case 'LOGIN': {
        this.loginLocal(action.username, action.password);
        break;
      }
      case 'REGISTER': {
        this.registerLocal(action.username, action.password);
        break;
      }
      case 'LOGIN_GOOGLE': {
        this.loginGoogle(action.uid, action.token);
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
