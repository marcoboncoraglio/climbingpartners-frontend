import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { IUserDetails, IUserCard } from '../interfaces/UserInterfaces';
const axios = require('axios');

class UserStore extends EventEmitter {
  uid: string = '0';
  token: any;

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

  url: string = process.env.BACKEND_URL_TEST || 'http://localhost:4000/api';

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
        axios({
          method: 'get',
          url: `${this.url}/userDetails/${uid}`,
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        }).then((details: any) => res(details));
      });
    }
  }

  getCard(uid?: string) {
    if (!uid) {
      return this.card;
    } else {
      return new Promise((res) => {
        axios({
          method: 'get',
          url: `${this.url}/userCards/${uid}`,
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        }).then((card: any) => res(card));
      });
    }
  }

  setDetails(details: IUserDetails) {
    axios({
      method: 'put',
      url: `${this.url}/userDetails/`,
      data: { details },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });

    this.emit('change_details');
  }

  setCard(card: IUserCard) {
    axios({
      method: 'put',
      url: `${this.url}/userCards/`,
      data: { card },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });

    this.emit('change_card');
  }

  onLogin(uid: string, token: any) {
    this.uid = uid;
    this.token = token;

    axios({
      method: 'get',
      url: `${this.url}/userCards`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((card: any) => {
      this.card = card;
    });

    axios({
      method: 'get',
      url: `${this.url}/userDetails`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((details: any) => {
      this.details = details;
    });
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
      case 'LOGIN_COMPLETE': {
        this.onLogin(action.uid, action.token);
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
