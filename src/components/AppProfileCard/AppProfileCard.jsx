import React, { Component } from "react";
import "./AppProfileCard.css";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

import UserStore from "../../stores/UserStore";

//TODO: Add way to upload own image and name
//TODO: BUG: when changing from a viewed profile to your own, details get reloaded but card stays the same
class AppProfileCard extends Component {
  state = {
    card: {}
  };

  componentDidMount() {
    UserStore.on("change_card", this.getUserCard);

    this.getUserCard();
  }

  componentWillUnmount() {
    UserStore.removeAllListeners();
  }

  getUserCard = () => {
    this.setState({
      card: UserStore.getCard()
    });
  };

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
        </CardContent>
      </Card>
    );
  }
}

export default AppProfileCard;
