import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { ILocation, ILocationUser } from '../interfaces/LocationInterfaces';
const axios = require('axios');

class LocationStore extends EventEmitter {
  uid: string = '0';
  token: any;

  location: ILocation = {
    lat: 0,
    lng: 0,
  };

  gpsID: number = 0;

  highAccuracy: boolean = false;

  url: string = process.env.BACKEND_URL_TEST || 'http://localhost:4000/api';

  getId() {
    return this.uid;
  }

  async onLogin(uid: string, token: any) {
    this.uid = uid;
    this.token = token;

    await this.setLocation();
  }

  // only gets set once on login
  async setLocation() {
    const location: any = await this.getLocation();

    axios({
      method: 'put',
      url: `${this.url}/locations/${this.uid}`,
      data: { lat: location.lat, lng: location.lng },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((location: ILocation) => (this.location = location));

    // this should go somewhere else?
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
    axios({
      method: 'get',
      url: `${this.url}/locations`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((locations: Array<ILocationUser>) => ({ locations }));
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
      case 'LOGIN_COMPLETE': {
        this.onLogin(action.uid, action.token);
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
