import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import { db } from "../firebase/Firebase";
import { ILocation } from "../interfaces/LocationInterfaces";

class LocationStore extends EventEmitter {
    uid: string = "0";
    
    location: ILocation = {
        lat: 0,
        lng: 0
    }
    
    gpsID: number = 0;

    highAccuracy: boolean = false;

    getId(){
        return this.uid;
    }

    login(uid: string, name: string, imgUrl: string) {
        this.uid = uid;
    }

    setLocation(location: ILocation) {
        db.ref()
            .child("locations/" + this.uid)
            .set(location);
        this.emit("location");
    }

    getLocation() {
        console.log("high accuracy: " + this.highAccuracy);
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, (err) => {
                console.log(err.message + ", getting approximate locationg from ip...")
                resolve(fetch('https://ipapi.co/json')
                    .then(res => res.json())
                    .then(location => {
                        return {
                            lat: location.latitude,
                            lng: location.longitude
                        };
                    }));
            }, { enableHighAccuracy: this.highAccuracy });
        });
    }

    enableGPS() {
        this.gpsID = navigator.geolocation.watchPosition(
            () => { this.highAccuracy = true },
            () => { this.highAccuracy = false },
            { enableHighAccuracy: this.highAccuracy }
        );
    }

    disableGPS() {
        navigator.geolocation.clearWatch(this.gpsID);
        this.highAccuracy = false;
        this.gpsID = 0;
    }

    handleActions = (action: any) => {
        switch (action.type) {
            case "SET_LOCATION": {
                this.setLocation(action.location);
                break;
            }
            case "LOGIN": {
                this.login(action.uid, action.name, action.imgUrl);
                break;
            }
            default: {
                return;
            }
        }
    };
}

const locationStore = new LocationStore();

dispatcher.register(locationStore.handleActions);

export default locationStore;
