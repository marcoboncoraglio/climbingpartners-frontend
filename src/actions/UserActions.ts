import dispatcher from '../dispatcher';
import { IUserDetails, IUserCard } from "../interfaces/UserInterfaces";


export function editUserDetails(details: IUserDetails){
    console.log("action");
    dispatcher.dispatch({
        type: "EDIT_DETAILS",
        details: details
    })
}

export function editUserCard(card: IUserCard){
    dispatcher.dispatch({
        type: "EDIT_CARD",
        card: card
    })
}

//TODO: Make loginStore
export function loginUser(uid: string, name: string, imgUrl: string){
    dispatcher.dispatch({
        type: "LOGIN",
        uid: uid,
        name: name,
        imgUrl: imgUrl
    })
}