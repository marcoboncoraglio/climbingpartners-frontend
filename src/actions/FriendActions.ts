import dispatcher from '../dispatcher';

export function sendFriendRequest(uid: string){
    dispatcher.dispatch({
        type: "SEND_FRIEND_REQUEST",
        uid: uid
    })
}

export function acceptFriendRequest(uid: string){
    dispatcher.dispatch({
        type: "ACCEPT_FRIEND_REQUEST",
        uid: uid
    })
}

export function declineFriendRequest(uid: string){
    dispatcher.dispatch({
        type: "DECLINE_FRIEND_REQUEST",
        uid: uid
    })
}

export function removeFriend(uid: string){
    dispatcher.dispatch({
        type: "REMOVE_FRIEND",
        uid: uid
    })
}