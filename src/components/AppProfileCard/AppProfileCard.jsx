import React, { Component } from 'react';
import './AppProfileCard.css';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import UserStore from '../../stores/UserStore';

import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


//add way to upload own image and name
class AppProfileCard extends Component {

  constructor(props) {
    super(props);

    this.props.uid ?
      this.state = {
        card: UserStore.getCard(this.props.uid)
      }
      :
      this.state = {
        card: UserStore.getCard()
      }
  }

  state = {
    card: {}
  }

  componentDidMount() {
    if (!this.props.uid) {
      UserStore.on("change_card", this.getUserCard);

      this.setState({
        card: UserStore.getCard()
      });
    }
    else {
      UserStore.getCard(this.props.uid)
        .then((card) => {
          this.setState({
            card: card
          });
        })
    }
  }

  componentWillUnmount() {
    if (!this.props.uid) {
      UserStore.removeListener("change_card", this.getUserCard);
    }
  }

  getUserCard = () => {
    this.setState({
      userCard: UserStore.getCard(this.props.uid)
    })
  }

  render() {
    const defaultImageUrl = "https://images.pexels.com/photos/209209/pexels-photo-209209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    return (
      <Card className="wrapper">
        {
          this.state.card.imgUrl &&
          <CardMedia image={this.state.card.imgUrl} className="profile-image" />
        }
        {
          !this.state.card.imgUrl &&
          <CardMedia image={defaultImageUrl} className="profile-image" />
        }
        <CardContent className="profile-restofcard">
          <Typography style={{ textAlign: "center" }} variant="h4">{this.state.card.name}</Typography>
          {
            this.props.uid &&
            <CardActions style={{padding: 20}}>
              <Button fullWidth component="span" color="primary">
                Message
              </Button>
              <Button fullWidth component="span" color="primary">
                Add Friend
              </Button>
            </CardActions>
          }

        </CardContent>
      </Card>
    )
  }
}

export default AppProfileCard;