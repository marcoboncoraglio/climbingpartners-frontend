import React from 'react';
import './ProfileView.css';

import AppNavbar from '../../components/AppNavbar/AppNavbar'
import AppProfileCard from '../../components/AppProfileCard/AppProfileCard'
import AppEditProfileDetails from '../../components/AppEditProfileDetails/AppEditProfileDetails'
import AppViewProfileDetails from '../../components/AppViewProfileDetails/AppViewProfileDetails'
import Grid from '@material-ui/core/Grid';


const ProfileView = (props) => {
  return (
    <div className="outer">
      <AppNavbar title="Profile"></AppNavbar>
      <div className="inner_wrapper">
        <Grid container className="inner_remaining" spacing={16}>
          <Grid item xs={12} md>
            {
              props.match.params.id ?
                <AppProfileCard uid={props.match.params.id} />
                :
                <AppProfileCard />
            }
          </Grid>
          <Grid item xs={12} md>
            {
              props.match.params.id ?
                <AppViewProfileDetails uid={props.match.params.id} />
                :
                <AppEditProfileDetails />
            }
            {
            }
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ProfileView;