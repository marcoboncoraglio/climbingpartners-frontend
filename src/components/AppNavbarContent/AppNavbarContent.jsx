import React from 'react';
import './AppNavbarContent.css';

import { NavLink } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';

import { logoutUser } from '../../actions/LoginActions';

const navBarButtonStyles = {
  color: '#7a7a7a',
  // fontWeight: 500,
  // letterSpacing: '.15rem',
};

const NavbarContent = (props) => {
  return (
    <div className="content-wrapper">
      <List>
        <ListItem button component={NavLink} to="/">
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: navBarButtonStyles }}
            primary="Map"
          />
        </ListItem>
        <ListItem button component={NavLink} to="/messages">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: navBarButtonStyles }}
            primary="Messages"
          />
        </ListItem>

        {/* <ListItem button component={NavLink} to="/friends">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: navBarButtonStyles }}
            primary="Friends"
          ></ListItemText>
        </ListItem> */}

        <ListItem
          button
          component={NavLink}
          to="/profile"
          onClick={props.toggleDrawer(false)}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: navBarButtonStyles }}
            primary="Profile"
          ></ListItemText>
        </ListItem>
        <ListItem button component={NavLink} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: navBarButtonStyles }}
            primary="Settings"
          >
            Settings
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            logoutUser();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: navBarButtonStyles }}
            primary="Logout"
          ></ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default NavbarContent;
