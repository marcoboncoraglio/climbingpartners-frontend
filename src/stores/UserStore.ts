import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { IUserDetails, IUserCard } from '../interfaces/UserInterfaces';
const axios = require('axios');

class UserStore extends EventEmitter {
  uid: string = '0';

  details: IUserDetails = {
    birthday: new Date(1995, 11, 17),
    about: 'Hi there!',
    climbingStyles: ['Lead', 'Bouldering'],
    availableEquipment: ['60m Rope'],
    languagesSpoken: ['English'],
  };

  card: IUserCard = {
    name: '',
    imgUrl: '',
  };

  url: string = process.env.BACKEND_URL_TEST || 'localhost:4000';

  getId(): string {
    return this.uid;
  }

  getDetails(uid?: string) {
    if (!uid) {
      return new Promise((res) => {
        res(this.details);
      });
    } else {
      return new Promise((res) => {
        axios.get(`{$url}/userDetails/{$uid}`).then((json) => res(json));
      });
    }
  }

  getCard(uid?: string) {
    if (!uid) {
      return this.card;
    } else {
      return new Promise((res) => {
        axios.get(`{$url}/userCards/{$uid}`).then((json) => res(json));
      });
    }
  }

  setDetails(details: IUserDetails) {
    axios
      .put(`{$url}/userDetails/{$uid}`)
      .then((updatedDetails: IUserDetails) => (this.details = updatedDetails));

    this.emit('change_details');
  }

  setCard(card: IUserCard) {
    axios
      .put(`{$url}/userCard/{$uid}`)
      .then((updatedCard: IUserCard) => (this.card = updatedCard));

    this.emit('change_card');
  }
  onLogin(userObj: any) {
    this.uid = userObj.uid;
    this.getCard();
    this.getDetails();
  }

  handleActions = (action: any) => {
    switch (action.type) {
      case 'EDIT_DETAILS': {
        this.setDetails(action.details);
        break;
      }
      case 'EDIT_CARD': {
        this.setCard(action.card);
        break;
      }
      case 'LOGIN': {
        this.onLogin(action.uObject);
        break;
      }
      default: {
        return;
      }
    }
  };
}

const userStore = new UserStore();

dispatcher.register(userStore.handleActions);

export default userStore;
