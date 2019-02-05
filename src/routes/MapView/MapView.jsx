import React, { Component } from 'react';
import './MapView.css';

import AppNavbar from '../../components/AppNavbar/AppNavbar'
import AppMap from '../../components/AppMap/AppMap';

class HomeView extends Component {
  render() {
    return (
      <div className="outer">
        <AppNavbar title="Map"></AppNavbar>
        <AppMap className="inner_remaining"></AppMap>
      </div>
    );
  }
}

export default HomeView;