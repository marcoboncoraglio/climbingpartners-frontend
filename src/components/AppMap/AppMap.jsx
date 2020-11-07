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
      localStorage.getItem('uid') &&
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
          .filter((locationObject) => {
            return locationObject.id !== LocationStore.getId();
          })
          .map((locationObject) => {
            const pos = [locationObject.lat, locationObject.lng];
            return (
              <Marker
                key={locationObject.id}
                position={pos}
                onclick={() => {
                  window.location = `profile/${locationObject.id}`;
                }}
              />
            );
          })}
      </Map>
    );
  }
}

export default AppMap;
