import React from 'react';
import './AppNavbarContent.css'

import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase/Firebase'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PeopleIcon from '@material-ui/icons/People'

const NavbarContent = () => {
  return (
    <div className="content-wrapper">
      <List>
        <ListItem>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <NavLink to="/">
            <ListItemText>Map</ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <NavLink to="/messages">
            <ListItemText>Messages</ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <NavLink to="/friends">
            <ListItemText>Friends</ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <NavLink to="/profile">
            <ListItemText>Profile</ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <NavLink to="/settings">
            <ListItemText>Settings</ListItemText>
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <NavLink onClick={() => auth.signOut()} to="/welcome">
            <ListItemText>Logout</ListItemText>
          </NavLink>
        </ListItem>
      </List>
    </div>
  )
}

export default NavbarContent;