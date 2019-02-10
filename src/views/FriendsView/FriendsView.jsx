import React, { Component } from 'react';
import './FriendsView.css';

import AppNavbar from '../../components/AppNavbar/AppNavbar'
import AppProfileCard from '../../components/AppProfileCard/AppProfileCard'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FriendStore from '../../stores/FriendStore';
import UserStore from '../../stores/UserStore';

class FriendsView extends Component {
  state = {
    friendList: [],

    friendRequests: []
  }

  componentDidMount() {
    FriendStore.on('change_friend_requests', this.updateFriendRequests)
    FriendStore.on('change_friend_list', this.updateFriendList)
    this.updateFriendRequests();
    this.updateFriendList();
  }

  componentWillMount() {
    FriendStore.removeAllListeners();
  }

  updateFriendRequests = () => {
    this.setState({
      friendRequests: FriendStore.getFriendRequests()
    })
  }

  updateFriendList = () => {
    this.setState({
      friendList: FriendStore.getFriendList()
    })
  }


  render() {
    return (
      <React.Fragment>
        <AppNavbar title="Friends"></AppNavbar>
        <div className="outer_wrapper">
          {
            this.state.friendRequests.length !== 0 &&
            <Typography variant="h6">Someone has added you!</Typography> &&
            <Grid container spacing={24}>
              {
                this.state.friendRequests.map((uid) => {
                  var user = {
                    uid: uid,
                    card: UserStore.getCard(uid)
                  }

                  return (
                    <Grid item key={user.uid} xs={6} lg={3}>
                      <AppProfileCard name={user.card.name} url={user.card.imgUrl}></AppProfileCard>
                    </Grid>
                  )
                })
              }
            </Grid>
          }
          <Grid container spacing={24}>
            {
              this.state.friendList.map((uid) => {

                var user = {
                  uid: uid,
                  card: UserStore.getCard(uid)
                }

                return (
                  <Grid item key={user.uid} xs={6} lg={4}>
                    <AppProfileCard name={user.card.name} url={user.card.imgUrl}></AppProfileCard>
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