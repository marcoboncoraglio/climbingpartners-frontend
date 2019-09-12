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
    this.updateFriendRequests();
    this.updateFriendList();
    FriendStore.on("change_friend_requests", this.updateFriendRequests);
    FriendStore.on("change_friend_list", this.updateFriendList);
  }

  componentWillUnmount() {
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
    console.log("List: " + this.state.friendList);
    console.log("Requests: " + this.state.friendRequests);
    return (
      <React.Fragment>
        <AppNavbar title="Friends" />
        <div className="outer_wrapper">
          {
            this.state.friendRequests.length !== 0 &&
            <React.Fragment>
              <Typography variant="h5">Someone has added you!</Typography>
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
            </React.Fragment>
          }
          {
            this.state.friendList.length !== 0 &&
            <React.Fragment>
              <Typography variant="h5" style={{ marginTop: 25 }}>Your Friends</Typography>
              <Grid container spacing={24}>
                {
                  this.state.friendList.map(uid => {
                    var user = {
                      uid: uid,
                      card: UserStore.getCard(uid)
                    };

                    return (
                      <Grid item key={user.uid} xs={12} lg={3}>
                        <AppViewProfileCard uid={user.uid} />
                      </Grid>
                    );
                  })
                }
              </Grid>
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default FriendsView;
