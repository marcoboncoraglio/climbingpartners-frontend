import React, { Component } from "react";
import "./AppViewProfileCard.css";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

import UserStore from "../../stores/UserStore";
import FriendStore from "../../stores/FriendStore";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

//TODO: refactor kinda ugly code
class AppViewProfileCard extends Component {
  state = {
    card: {}
  };

  componentDidMount() {
    UserStore.getCard(this.props.uid).then(card => {
      this.setState({
        card: card
      });
    });
  }

  //TODO: Replace this with Message and Add friend icon
  render() {
    const defaultImageUrl =
      "https://images.pexels.com/photos/209209/pexels-photo-209209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    return (
      <Card className="wrapper">
        {this.state.card.imgUrl ? (
          <CardMedia image={this.state.card.imgUrl} className="profile-image" />
        ) : (
          <CardMedia image={defaultImageUrl} className="profile-image" />
        )}
        <CardContent className="profile-restofcard">
          <Typography style={{ textAlign: "center" }} variant="h4">
            {this.state.card.name}
          </Typography>
          <CardActions style={{ padding: 20 }}>
            <Button fullWidth component="span" color="primary">
              Message
            </Button>
            {//if profile card viewed is not your friend
            !FriendStore.isFriend(this.props.uid) &&
              !FriendStore.hasRequestedFriendship(this.props.uid)(
                <Button
                  fullWidth
                  component="span"
                  color="primary"
                  onClick={() => FriendStore.addFriend(this.props.uid)}
                >
                  Add friend
                </Button>
              )}
            {//if profile card viewed is not your friend
            //TODO: replace with acceptFriendship method
            !FriendStore.isFriend(this.props.uid) &&
              FriendStore.hasRequestedFriendship(this.props.uid)(
                <div>
                <Button
                  fullWidth
                  component="span"
                  color="primary"
                  onClick={() => this.addFriend(this.props.uid)}
                >
                  Accept
                </Button>
                <Button
                fullWidth
                component="span"
                color="primary"
                onClick={() => this.addFriend(this.props.uid)}
              >
                Decline
              </Button>
              </div>
              )}
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

export default AppViewProfileCard;
