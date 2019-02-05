import React, { Component } from 'react';
import './FriendsView.css';

import AppNavbar from '../../components/AppNavbar/AppNavbar'
import AppProfileCard from '../../components/AppProfileCard/AppProfileCard'
import Grid from '@material-ui/core/Grid';

const user1 = {
  name: "Jim Carrey",
  imgUrl: "https://images.pexels.com/photos/303040/pexels-photo-303040.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
}

const user2 = {
  name: "Terry Crews",
  imgUrl: "https://images.pexels.com/photos/461593/pexels-photo-461593.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
}

class FriendsView extends Component {
  state = {
    friendsArr: [user1, user2]
  }

  render() {
    return (
      <React.Fragment>
        <AppNavbar title="Friends"></AppNavbar>
        <div className="outer_wrapper">
          <Grid container spacing={24}>
            {
              this.state.friendsArr.map((user, index) => {
                return (
                  <Grid item key={index} xs={12} lg={4}>
                    <AppProfileCard name={user.name} url={user.imgUrl}></AppProfileCard>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default FriendsView;