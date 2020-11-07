import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { IUserDetails, IUserCard } from '../interfaces/UserInterfaces';
const axios = require('axios');

class UserStore extends EventEmitter {
  uid: any = localStorage.getItem('uid');
  token: any = localStorage.getItem('token');

  details!: IUserDetails;
  card!: IUserCard;

  url: string =
    (process.env.BACKEND_URL_TEST as string) ||
    'http://localhost:4000/api/' + 'users';

  async onLogin() {
    this.uid = localStorage.getItem('uid');
    this.token = localStorage.getItem('token');

    await this.initCard();
    await this.initDetails();
  }

  async initCard() {
    await axios({
      method: 'get',
      url: `${this.url}/cards`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.card = res.data;
    });
  }

  async initDetails() {
    await axios({
      method: 'get',
      url: `${this.url}/details`,
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
      return new Promise(async (res) => {
        if (this.details) res(this.details);
        else {
          await this.initDetails();
          res(this.details);
        }
      });
    } else {
      return new Promise((res) => {
        axios({
          method: 'get',
          url: `${this.url}/details/${uid}`,
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        }).then((response: any) => res(response.data));
      });
    }
  }

  getCard(uid?: string) {
    if (!uid) {
      return new Promise(async (res) => {
        if (this.card) res(this.card);
        else {
          await this.initCard();
          res(this.card);
        }
      });
    } else {
      return new Promise((res) => {
        axios({
          method: 'get',
          url: `${this.url}/cards/${uid}`,
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        }).then((response: any) => res(response.data));
      });
    }
  }

  setDetails(details: IUserDetails) {
    axios({
      method: 'put',
      url: `${this.url}/details`,
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
      url: `${this.url}/cards`,
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
        this.onLogin();
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
