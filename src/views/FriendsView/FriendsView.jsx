import React, { Component } from "react";
import "./FriendsView.css";

import AppNavbar from "../../components/AppNavbar/AppNavbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppViewProfileCard from "../../components/AppViewProfileCard/AppViewProfileCard";

import FriendStore from "../../stores/FriendStore";
import UserStore from "../../stores/UserStore";

class FriendsView extends Component {
  state = {
    friendList: [],

    friendRequests: []
  };

  componentDidMount() {
    FriendStore.on("change_friend_requests", this.updateFriendRequests);
    FriendStore.on("change_friend_list", this.updateFriendList);
    this.updateFriendRequests();
    this.updateFriendList();
  }

  componentWillMount() {
    FriendStore.removeAllListeners();
  }

  updateFriendRequests = () => {
    this.setState({
      friendRequests: FriendStore.getFriendRequests()
    });
  };

  updateFriendList = () => {
    this.setState({
      friendList: FriendStore.getFriendList()
    });
  };

  render() {
    return (
      <React.Fragment>
        <AppNavbar title="Friends" />
        <div className="outer_wrapper">
          {this.state.friendRequests.length !== 0 && (
              <Typography variant="h6">Someone has added you!</Typography>
            ) && (
              <Grid container spacing={24}>
                {this.state.friendRequests.map(uid => {
                  var user = {
                    uid: uid,
                    card: UserStore.getCard(uid)
                  };

                  return (
                    <Grid item key={user.uid} xs={12} lg={3}>
                      <AppViewProfileCard uid={user.uid} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          <Typography variant="h6" style={{ marginTop: 25 }}>
            Your Friends
          </Typography>
          <Grid container spacing={24}>
            {this.state.friendList.map(uid => {
              var user = {
                uid: uid,
                card: UserStore.getCard(uid)
              };

              return (
                <Grid item key={user.uid} xs={12} lg={4}>
                  <AppViewProfileCard uid={user.uid} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default FriendsView;
