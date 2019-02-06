import React, { Component } from 'react';
import './AppMap.css';

import { Map, TileLayer, Marker } from 'react-leaflet'

import { db } from '../../firebase/Firebase'
import { setUserLocation } from '../../actions/UserActions'


import UserStore from '../../stores/UserStore';
import LocationStore from '../../stores/LocationStore';


//refactor sending user location to other file, Map should only responsible to display not write
class AppMap extends Component {

  constructor(props) {
    super(props);

    LocationStore.getLocation()
      .then(location => {
        this.setState({
          location,
          zoom: 12,
          hasUserLocation: true
        });
        setUserLocation(this.state.location);
        localStorage.setItem('location', JSON.stringify(this.state.location));
      });
  }

  state = {
    location: {
      lat: 0,
      lng: 0
    },
    zoom: 2,
    hasUserLocation: false,
    userLocations: []
  }

  componentDidMount() {
    localStorage.getItem('location') &&
      this.setState(prevState => ({
        ...prevState,
        location: JSON.parse(localStorage.getItem('location')),
        zoom: 12
      }));

    //gets called every time a user updates, we have to iterate over every user
    //no problem if only close users are returned in the snapshot
    db.ref().child("locations").on('value', snap => {
      this.setState(prevState => ({
        ...prevState,
        userLocations: this.snapshotToArray(snap)
      }));
    });
  }

  snapshotToArray = (snapshot) => {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  };

  render() {
    const position = [this.state.location.lat, this.state.location.lng]
    return (
      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          this.state.userLocations.filter((user) => {
            return (user.key !== UserStore.getId());
          }).map((user) => {
            const pos = [user.lat, user.lng];
            return (
              <Marker key={user.key} position={pos} onclick={() => {
                window.location = `profile/${user.key}`;
              }} />
            )
          })
        }
      </Map>
    )
  }
}

export default AppMap;