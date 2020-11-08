import React, { Component } from 'react';
import './AppViewProfileCard.css';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import UserStore from '../../stores/UserStore';
import FriendStore from '../../stores/FriendStore';

import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

class AppViewProfileCard extends Component {
  state = {
    card: {
      name: 'Name',
      imgUrl: 'url',
    },
  };

  componentDidMount() {
    UserStore.getCard(this.props.uid).then((card) => {
      this.setState({
        card: card,
      });
    });
  }

  //TODO: Replace this with Message and Add friend icon
  render() {
    return (
      <Card className="wrapper">
        {this.state.card.imgUrl &&
          (window.location.href.indexOf('/friends') !== -1 ? (
            <Link to={`/profile/${this.props.uid}`}>
              <CardMedia
                image={this.state.card.imgUrl}
                className="profile-image"
              />
            </Link>
          ) : (
            <CardMedia
              image={this.state.card.imgUrl}
              className="profile-image"
            />
          ))}
        <CardContent className="profile-restofcard">
          <Typography style={{ textAlign: 'center' }} variant="h4">
            {this.state.card.name}
          </Typography>
          <CardActions style={{ padding: 20 }}>
            <Button fullWidth component="span" color="primary">
              Message
            </Button>
            {!FriendStore.isFriend(this.props.uid) &&
              !FriendStore.hasRequestedFriendship(this.props.uid) && (
                <Button
                  fullWidth
                  component="span"
                  color="primary"
                  onClick={() => FriendStore.sendFriendRequest(this.props.uid)}
                >
                  Add friend
                </Button>
              )}
            {!FriendStore.isFriend(this.props.uid) &&
              FriendStore.hasRequestedFriendship(this.props.uid) && (
                <div>
                  <Button
                    fullWidth
                    component="span"
                    color="primary"
                    onClick={() =>
                      FriendStore.acceptFriendRequest(this.props.uid)
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    fullWidth
                    component="span"
                    color="primary"
                    onClick={() =>
                      FriendStore.declineFriendRequest(this.props.uid)
                    }
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
