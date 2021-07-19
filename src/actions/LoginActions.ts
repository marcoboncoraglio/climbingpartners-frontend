import dispatcher from '../dispatcher';

export function registerUserLocal(username: string, password: string) {
  dispatcher.dispatch({
    type: 'REGISTER',
    username: username,
    password: password,
  });
}

export function loginUserLocal(username: string, password: string) {
  dispatcher.dispatch({
    type: 'LOGIN',
    username: username,
    password: password,
  });
}

export function loginUserGoogle(uid: string, token: string) {
  dispatcher.dispatch({
    type: 'LOGIN_GOOGLE',
    uid: uid,
    token: token,
  });
}

export function logoutUser() {
  dispatcher.dispatch({
    type: 'LOGOUT',
  });
}
