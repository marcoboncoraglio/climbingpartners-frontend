import React, { Component } from "react";
import "./AppProfileCard.css";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

import UserStore from "../../stores/UserStore";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FriendStore from "../../stores/FriendStore";

//TODO: Add way to upload own image and name
//TODO: BUG: when changing from a viewed profile to your own, details get reloaded but card stays the same

//TODO: Implement different system for card content, so the displaying of buttons
//does not only depend on whether the uid has been passed or not
class AppProfileCard extends Component {
  state = {
    card: {}
  };

  componentDidMount() {
    if (!this.props.uid) {
      UserStore.on("change_card", this.getUserCard);

      this.setState({
        card: UserStore.getCard()
      });
    } else {
      UserStore.getCard(this.props.uid).then(card => {
        this.setState({
          card: card
        });
      });
    }
  }

  componentWillUnmount() {
    if (!this.props.uid) {
      UserStore.removeAllListeners();
    }
  }

  getUserCard = () => {
    this.setState({
      userCard: UserStore.getCard(this.props.uid)
    });
  };

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
          {this.props.uid && (
            <CardActions style={{ padding: 20 }}>
              <Button
                fullWidth
                component="span"
                color="primary"
                onClick={FriendStore.addFriend(this.props.uid)}
              >
                Message
              </Button>
              {!FriendStore.getFriendList().includes(this.props.uid) && (
                <Button fullWidth component="span" color="primary">
                  Add Friend
                </Button>
              )}
            </CardActions>
          )}
        </CardContent>
      </Card>
    );
  }
}

export default AppProfileCard;
