import dispatcher from '../dispatcher';

export function addFriend(uid: string){
    dispatcher.dispatch({
        type: "ADD_FRIEND",
        uid: uid
    })
}

export function removeFriend(uid: string){
    dispatcher.dispatch({
        type: "REMOVE_FRIEND",
        uid: uid
    })
}