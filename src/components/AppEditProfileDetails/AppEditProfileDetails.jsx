import React, { Component } from 'react';
import './AppEditProfileDetails.css';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';
import { KeyboardDatePicker } from '@material-ui/pickers';

import UserStore from '../../stores/UserStore';
import { editUserDetails } from '../../actions/UserActions';
import { Button } from '@material-ui/core';

class AppEditProfileDetails extends Component {
  state = {
    details: {
      birthday: 0,
      about: "",
      climbingStyles: [],
      availableEquipment: [],
      languagesSpoken: []
    }
  }

  componentDidMount() {
    this.getUserDetails();
    UserStore.on("change_details", this.getUserDetails);
  }

  componentWillUnmount() {
    UserStore.removeAllListeners();
  }

  getUserDetails = () => {
    UserStore.getDetails()
      .then((details) => {
        this.setState({
          details: details
        });
      })

  }

  saveChanges = () => {
    editUserDetails(this.state.details);
  }

  handleSaveBirthday = date => {
    let tmpDetails = Object.assign({}, this.state.details);
    tmpDetails.birthday = date.toString();
    this.setState({ details: tmpDetails });
  }

  handleChangeAbout = event => {
    let tmpDetails = Object.assign({}, this.state.details);
    tmpDetails.about = event.target.value;
    this.setState({ details: tmpDetails });
  };

  handleAddChip = (type, item) => {
    let tmpUser = Object.assign({}, this.state.details);
    switch (type) {
      case 'lang': {
        tmpUser.languagesSpoken.push(item);
        this.setState(tmpUser);
        break;
      }
      case 'style': {
        tmpUser.climbingStyles.push(item);
        this.setState(tmpUser);
        break;
      }
      case 'equip': {
        tmpUser.availableEquipment.push(item);
        this.setState(tmpUser);
        break;
      }
      default: {
        return;
      }
    }
  }

  handleDeleteChip = (type, item) => {
    let tmpUser = Object.assign({}, this.state.details);
    switch (type) {
      case 'lang': {
        tmpUser.languagesSpoken.splice(item, 1);
        this.setState(tmpUser);
        break;
      }
      case 'style': {
        tmpUser.climbingStyles.splice(item, 1);
        this.setState(tmpUser);
        break;
      }
      case 'equip': {
        tmpUser.availableEquipment.splice(item, 1);
        this.setState(tmpUser);
        break;
      }
      default: {
        return;
      }
    }
  }

  render() {
    return (
      <Paper className="margintop">
        <List>
          <ListItem>
            <Typography variant="h4">Details</Typography>
          </ListItem>
          <ListItem>
            {
              <KeyboardDatePicker fullWidth
                label="Birthday"
                value={this.state.details.birthday}
                format="dd/MM/yyyy"
                InputLabelProps={{
                  shrink: true,
                }}
                onAccept={this.handleSaveBirthday} />
            }
          </ListItem>
          <ListItem>
            <TextField
              multiline
              fullWidth
              label="About"
              placeholder="About"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.details.about}
              onChange={this.handleChangeAbout} />
          </ListItem>
          <ListItem>
            <ChipInput fullWidth
              label="Languages spoken"
              value={this.state.details.languagesSpoken}
              onAdd={(chip) => this.handleAddChip('lang', chip)}
              onDelete={(chip) => this.handleDeleteChip('lang', chip)} />
          </ListItem>
          <ListItem>
            <ChipInput fullWidth
              label="Climbing styles"
              value={this.state.details.climbingStyles}
              onAdd={(chip) => this.handleAddChip('style', chip)}
              onDelete={(chip) => this.handleDeleteChip('style', chip)} />
          </ListItem>
          <ListItem>
            <ChipInput fullWidth
              label="Available equipment"
              value={this.state.details.availableEquipment}
              onAdd={(chip) => this.handleAddChip('equip', chip)}
              onDelete={(chip) => this.handleDeleteChip('equip', chip)} />
          </ListItem>
          <ListItem>
            <Button size="large" color="primary" onClick={this.saveChanges}>
              Save
            </Button>
          </ListItem>
        </List>
      </Paper>
    )
  }
}

export default AppEditProfileDetails;