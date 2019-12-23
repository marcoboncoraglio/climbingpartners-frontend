import dispatcher from '../dispatcher';

export function loginUser(userObject: any){
    dispatcher.dispatch({
        type: "LOGIN",
        uObject: userObject
    })
}

export function logoutUser(){
    dispatcher.dispatch({
        type: "LOGOUT"
    })
}