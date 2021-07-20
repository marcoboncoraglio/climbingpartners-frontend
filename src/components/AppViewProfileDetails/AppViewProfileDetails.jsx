import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import ChipInput from 'material-ui-chip-input';

import UserStore from '../../stores/UserStore';
import './AppViewProfileDetails.css';

var getAge = require('get-age');

class AppViewProfileDetails extends Component {
  state = {
    details: {
      birthday: new Date(),
      about: '',
      climbingStyles: [],
      availableEquipment: [],
      languagesSpoken: [],
    },
  };

  componentDidMount() {
    UserStore.getDetails(this.props.uid).then((details) => {
      this.setState({
        details: details,
      });
    });
  }

  render() {
    return (
      <Paper className="detailsContainer">
        <List>
          <ListItem>
            <Typography variant="h5">Details</Typography>
          </ListItem>
          {this.state.details.birthday && (
            <ListItem>
              <TextField
                fullWidth
                label="Age"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                value={getAge(this.state.details.birthday)}
              />
            </ListItem>
          )}
          {this.state.details.about && (
            <ListItem>
              <TextField
                multiline
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                label="About"
                placeholder="About"
                value={this.state.details.about}
                onChange={this.handleChangeAbout}
              />
            </ListItem>
          )}
          <ListItem>
            <ChipInput
              readOnly
              fullWidth
              label="Languages Spoken"
              value={this.state.details.languagesSpoken}
              chipRenderer={(value) => (
                <Chip
                  key={value.text}
                  label={value.text}
                  style={{ marginRight: '5px' }}
                ></Chip>
              )}
            />
          </ListItem>
          <ListItem>
            <ChipInput
              readOnly
              fullWidth
              label="Climbing Styles"
              value={this.state.details.climbingStyles}
              chipRenderer={(value) => (
                <Chip
                  key={value.text}
                  label={value.text}
                  style={{ marginRight: '5px' }}
                ></Chip>
              )}
            />
          </ListItem>
          <ListItem>
            <ChipInput
              readOnly
              fullWidth
              label="Equipment"
              value={this.state.details.availableEquipment}
              chipRenderer={(value) => (
                <Chip
                  key={value.text}
                  label={value.text}
                  style={{ marginRight: '5px' }}
                ></Chip>
              )}
            />
          </ListItem>
        </List>
      </Paper>
    );
  }
}

export default AppViewProfileDetails;
