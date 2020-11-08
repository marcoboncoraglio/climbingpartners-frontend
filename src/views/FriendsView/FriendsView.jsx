import React, { Component } from 'react';
import './FriendsView.css';

import AppNavbar from '../../components/AppNavbar/AppNavbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppViewProfileCard from '../../components/AppViewProfileCard/AppViewProfileCard';

import FriendStore from '../../stores/FriendStore';

class FriendsView extends Component {
  state = {
    friendList: [],
    friendRequests: [],
  };

  async componentDidMount() {
    await FriendStore.updateLists();
    this.getFriendRequests();
    this.getFriendList();
    FriendStore.on('change_friend_requests', this.getFriendRequests);
    FriendStore.on('change_friend_list', this.getFriendList);
  }

  componentWillUnmount() {
    FriendStore.removeAllListeners();
  }

  getFriendRequests = () => {
    this.setState({
      friendRequests: FriendStore.getFriendRequests(),
    });
  };

  getFriendList = () => {
    this.setState({
      friendList: FriendStore.getFriendList(),
    });
  };

  render() {
    return (
      <React.Fragment>
        <AppNavbar title="Friends" />
        <div className="outer_wrapper">
          {this.state.friendRequests.length !== 0 && (
            <React.Fragment>
              <Typography variant="h5" style={{ marginLeft: 5 }}>
                Someone has added you!
              </Typography>
              <Grid container spacing={5}>
                {this.state.friendRequests.map((uid) => {
                  return (
                    <Grid item key={uid} xs={12} lg={3}>
                      <AppViewProfileCard uid={uid} />
                    </Grid>
                  );
                })}
              </Grid>
            </React.Fragment>
          )}
          {this.state.friendList.length !== 0 && (
            <React.Fragment>
              <Typography variant="h5" style={{ marginTop: 25, marginLeft: 5 }}>
                Your Friends
              </Typography>
              <Grid container spacing={5}>
                {this.state.friendList.map((uid) => {
                  return (
                    <Grid item key={uid} xs={12} lg={3}>
                      <AppViewProfileCard uid={uid} />
                    </Grid>
                  );
                })}
              </Grid>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default FriendsView;
