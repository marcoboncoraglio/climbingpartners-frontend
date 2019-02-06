import React, { Component } from 'react';
import './SettingsView.css';

import AppNavbar from '../../components/AppNavbar/AppNavbar'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {enableGPS, disableGPS} from '../../services/LocationService';


class SettingsView extends Component {
  state = {
    checked: ['gps'],
    searchRadius: 10,
    visibleTo: 0
  };

  handleToggle = (element) => {
    const newList = [...this.state.checked]
    if (newList.includes(element)) {
      const index = newList.indexOf(element);
      newList.splice(index, 1);
      disableGPS();
    }
    else {
      newList.push(element);
      enableGPS();
    }
    this.setState({
      checked: newList
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    return (
      <React.Fragment>
        <AppNavbar title="Settings"></AppNavbar>
        <div className="wrapper">
          <List>
            <ListItem>
              <Typography variant="h5">Location Settings</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Enable gps" />
              <ListItemSecondaryAction>
                <Switch
                  onChange={(e) => this.handleToggle('gps')}
                  checked={this.state.checked.indexOf('gps') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Search radius" />
              <Select
                value={this.state.searchRadius}
                onChange={this.handleChange}
                name="searchRadius"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </ListItem>
            <ListItem>
              <Typography variant="h5">Privacy settings</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Visible to" />
              <Select
                value={this.state.visibleTo}
                onChange={this.handleChange}
                name="visibleTo"
              >
                <MenuItem value={0}>Everyone</MenuItem>
                <MenuItem value={1}>Friends</MenuItem>
                <MenuItem value={2}>Nobody</MenuItem>
              </Select>
            </ListItem>
          </List>
        </div>
      </React.Fragment>
    )
  }
}

export default SettingsView;