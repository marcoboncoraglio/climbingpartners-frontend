import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { IUserDetails, IUserCard } from '../interfaces/UserInterfaces';
const axios = require('axios');

class UserStore extends EventEmitter {
  uid: string = '0';
  token: any = localStorage.getItem('token');

  details!: IUserDetails;
  card!: IUserCard;

  url: string = process.env.BACKEND_URL_TEST || 'http://localhost:4000/api';

  onLogin(uid: string) {
    this.uid = uid;
    this.token = localStorage.getItem('token');

    this.initCard();
    this.initDetails();
  }

  initCard(): any {
    axios({
      method: 'get',
      url: `${this.url}/userCards`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.card = res.data;
    });
  }

  initDetails(): any {
    axios({
      method: 'get',
      url: `${this.url}/userDetails`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.details = res.data;
    });
  }

  getId(): string {
    return this.uid;
  }

  getDetails(uid?: string) {
    if (!uid) {
      return new Promise((res) => {
        if (this.details) res(this.details);
        else {
          this.initDetails();
          res(this.details);
        }
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
      return new Promise((res) => {
        if (this.card) res(this.card);
        else {
          this.initCard();
          res(this.card);
        }
      });
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
      data: details,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.details.about = res.data.about;
      this.details.birthday = res.data.birthday;
      this.details.languagesSpoken = res.data.languagesSpoken;
      this.details.climbingStyles = res.data.climbingStyles;
      this.details.availableEquipment = res.data.availableEquipment;

      this.emit('change_details');
    });
  }

  setCard(card: IUserCard) {
    axios({
      method: 'put',
      url: `${this.url}/userCards/`,
      data: { card },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.card.name = res.data.name;
      this.card.imgUrl = res.data.imgUrl;

      this.emit('change_card');
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
        this.onLogin(action.uid);
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
