import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { ILocation } from '../interfaces/LocationInterfaces';
const axios = require('axios');

class LocationStore extends EventEmitter {
  uid: any = localStorage.getItem('uid');
  token: any = localStorage.getItem('token');

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

  onLogin() {
    this.uid = localStorage.getItem('uid');
    this.token = localStorage.getItem('token');
  }

  // only gets set once on login
  setLocation(location: any) {
    if (this.uid !== undefined) {
      axios({
        method: 'put',
        url: `${this.url}/locations/${this.uid}`,
        data: { lat: location.lat, lng: location.lng },
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      }).then((location: ILocation) => (this.location = location));

      this.emit('location');
    }
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

  getLocations() {
    return new Promise((res) => {
      axios({
        method: 'get',
        url: `${this.url}/locations`,
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      }).then((response: any) => {
        res(response.data);
      });
    });
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
        this.onLogin();
        break;
      }
      case 'SET_LOCATION': {
        this.setLocation(action.location);
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
