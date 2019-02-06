import dispatcher from '../dispatcher';
import { IUserDetails, IUserCard } from "../interfaces/UserInterfaces";

export function editUserDetails(details: IUserDetails){
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