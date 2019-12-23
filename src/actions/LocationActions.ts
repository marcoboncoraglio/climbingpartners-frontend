import dispatcher from '../dispatcher';
import { ILocation } from "../interfaces/LocationInterfaces";

export function setUserLocation(location: ILocation){
    dispatcher.dispatch({
        type: "SET_LOCATION",
        location: location
    })
}