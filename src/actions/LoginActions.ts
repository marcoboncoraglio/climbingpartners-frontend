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

export function loginComplete(uid: string) {
  dispatcher.dispatch({
    type: 'LOGIN_COMPLETE',
    uid: uid,
  });
}

export function logoutUser() {
  dispatcher.dispatch({
    type: 'LOGOUT',
  });
}
