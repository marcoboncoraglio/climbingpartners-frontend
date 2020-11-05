import React, { Component } from 'react';
import './AppMap.css';

import { Map, TileLayer, Marker } from 'react-leaflet';
import { setUserLocation } from '../../actions/LocationActions';
import LocationStore from '../../stores/LocationStore';

class AppMap extends Component {
  state = {
    location: {
      lat: 0,
      lng: 0,
    },
    zoom: 2,
    hasUserLocation: false,
    userLocations: [],
  };

  getLocationFromGPS = () => {
    LocationStore.getLocation().then((location) => {
      this.setState({
        location,
        zoom: 12,
        hasUserLocation: true,
      });
      setUserLocation(this.state.location);
      localStorage.setItem('location', JSON.stringify(this.state.location));
    });
  };

  // setTimeout?
  getUserLocations = () => {
    LocationStore.getLocations().then((locations) => {
      console.log(locations);
      this.setState((prevState) => ({
        ...prevState,
        userLocations: locations,
      }));
    });
  };

  putLocationInMap = () => {
    localStorage.getItem('location') &&
      this.setState((prevState) => ({
        ...prevState,
        location: JSON.parse(localStorage.getItem('location')),
        zoom: 12,
      }));
  };

  componentDidMount() {
    this.getLocationFromGPS();
    this.getUserLocations();
    this.putLocationInMap();
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];

    const bounds = [
      [-90, -180],
      [90, 180],
    ];

    return (
      <Map
        className="map"
        center={position}
        zoom={this.state.zoom}
        minZoom={3}
        maxBounds={bounds}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          bounds={bounds}
          noWrap
        />
        {this.state.userLocations
          .filter((user) => {
            return user.key !== LocationStore.getId();
          })
          .map((user) => {
            const pos = [user.lat, user.lng];
            return (
              <Marker
                key={user.key}
                position={pos}
                onclick={() => {
                  window.location = `profile/${user.key}`;
                }}
              />
            );
          })}
      </Map>
    );
  }
}

export default AppMap;
