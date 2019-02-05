import dispatcher from '../dispatcher';
import { IUserDetails, IUserCard, ILocation } from "../interfaces/interfaces";


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

export function loginUser(uid: string, name: string, imgUrl: string){
    dispatcher.dispatch({
        type: "LOGIN",
        uid: uid,
        name: name,
        imgUrl: imgUrl
    })
}

export function setUserLocation(location: ILocation){
    dispatcher.dispatch({
        type: "SET_LOCATION",
        location: location
    })
}