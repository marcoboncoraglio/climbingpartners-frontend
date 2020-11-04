import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { ILocation, ILocationUser } from '../interfaces/LocationInterfaces';
const axios = require('axios');

class LocationStore extends EventEmitter {
  uid: string = '0';

  location: ILocation = {
    lat: 0,
    lng: 0,
  };

  gpsID: number = 0;

  highAccuracy: boolean = false;

  url: string = process.env.BACKEND_URL_TEST || 'localhost:4000/api/';

  getId() {
    return this.uid;
  }

  onLogin(userObject: any) {
    this.uid = userObject.uid;
  }

  // only gets set once on login
  setLocation(location: ILocation) {
    axios
      .put(`${this.url}/locations/${this.uid}`)
      .then((locationDetails: ILocation) => (this.location = locationDetails));

    this.emit('location');
  }

  getLocation() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.log(
            err.message + ', getting approximate locationg from ip...'
          );
          resolve(
            fetch('https://ipapi.co/json')
              .then((res) => res.json())
              .then((location) => {
                return {
                  lat: location.latitude,
                  lng: location.longitude,
                };
              })
          );
        },
        { enableHighAccuracy: this.highAccuracy }
      );
    });
  }

  async getLocations() {
    axios
      .get(`${this.url}/locations/`)
      .then((locations: Array<ILocationUser>) => ({ locations }));
  }

  enableGPS() {
    this.gpsID = navigator.geolocation.watchPosition(
      () => {
        this.highAccuracy = true;
      },
      () => {
        this.highAccuracy = false;
      },
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
      case 'SET_LOCATION': {
        this.setLocation(action.location);
        break;
      }
      case 'LOGIN': {
        this.onLogin(action.uObject);
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
