import dispatcher from '../dispatcher';

export function loginUserLocal(username: string, password: string) {
  dispatcher.dispatch({
    type: 'LOGIN',
    username: username,
    password: password,
  });
}

export function loginComplete(uid: string, token: any) {
  dispatcher.dispatch({
    type: 'LOGIN_COMPLETE',
    uid: uid,
    token: token,
  });
}

export function logoutUser() {
  dispatcher.dispatch({
    type: 'LOGOUT',
  });
}
