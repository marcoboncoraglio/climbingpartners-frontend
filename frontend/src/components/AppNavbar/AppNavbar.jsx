import React, { Component } from 'react';
import './AppNavbar.css'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AppNavbarContent from '../AppNavbarContent/AppNavbarContent'

class AppNavbar extends Component {
  state = {
    open: false
  };

  toggleDrawer = (isOpen) => () => {
    this.setState({
      open: isOpen,
    });
  };

  render() {
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton color="inherit" onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" align="left">
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
          <AppNavbarContent />
        </Drawer>
      </React.Fragment>
    );
  }
}

export default AppNavbar;