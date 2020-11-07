import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
const axios = require('axios');

class FriendStore extends EventEmitter {
  uid: any = localStorage.getItem('uid');
  token: any = localStorage.getItem('token');

  friendList: Array<string> = [];
  friendRequests: Array<string> = [];

  url: string =
    process.env.BACKEND_URL_TEST || 'http://localhost:4000/api/friendLists';

  async onLogin() {
    this.uid = localStorage.getItem('uid');
    this.token = localStorage.getItem('token');

    await axios({
      method: 'get',
      url: `${this.url}`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.friendList = res.data.friendList;
      this.friendRequests = res.data.friendRequests;
    });
  }

  async sendFriendRequest(uid: string) {
    let theirFriendRequests: Array<string> = [];

    await axios({
      method: 'get',
      url: `${this.url}/requests/${uid}`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => (theirFriendRequests = res.data.friendRequests));

    if (!theirFriendRequests.includes(this.uid)) {
      theirFriendRequests.push(this.uid);

      // notify that friend request has been sent
      await axios({
        method: 'put',
        url: `${this.url}/requests/${uid}`,
        data: { friendRequests: theirFriendRequests },
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      });
    }
  }

  async acceptFriendRequest(uid: string) {
    let theirFriendList: Array<string> = [];

    await axios({
      method: 'get',
      url: `${this.url}/requests/${uid}`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => (theirFriendList = res.data.friendList));

    theirFriendList.push(this.uid);

    await axios({
      method: 'put',
      url: `${this.url}/requests/${uid}`,
      data: { friendList: theirFriendList },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });

    this.friendList.push(uid);
    this.saveFriendList();

    this.friendRequests = this.friendRequests.filter((elem) => elem !== uid);
    this.saveFriendRequests();
  }

  declineFriendRequest(uid: string) {
    this.friendRequests = this.friendRequests.filter((elem) => elem !== uid);
    this.saveFriendRequests();
  }

  removeFriend(uid: string) {
    this.friendList = this.friendList.filter((elem) => elem !== uid);
    this.saveFriendList();
  }

  saveFriendList() {
    axios({
      method: 'put',
      url: `${this.url}/friends`,
      data: { friendList: this.friendList },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.friendList = res.data.friendList;
      this.emit('change_friend_list');
    });

    this.emit('change_friend_list');
  }

  saveFriendRequests() {
    axios({
      method: 'put',
      url: `${this.url}/requests/`,
      data: { friendRequests: this.friendRequests },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.friendRequests = res.data.friendRequests;
      this.emit('change_friend_requests');
    });
  }

  isFriend(uid: string): boolean {
    return this.friendList.includes(uid);
  }

  hasRequestedFriendship(uid: string): boolean {
    return this.friendRequests.includes(uid);
  }

  getFriendRequests(): Array<string> {
    return this.friendRequests;
  }

  getFriendList(): Array<string> {
    return this.friendList;
  }

  handleActions = (action: any) => {
    switch (action.type) {
      case 'SEND_FRIEND_REQUEST': {
        this.sendFriendRequest(action.uid);
        break;
      }
      case 'ACCEPT_FRIEND_REQUEST': {
        this.acceptFriendRequest(action.uid);
        break;
      }
      case 'DECLINE_FRIEND_REQUEST': {
        this.declineFriendRequest(action.uid);
        break;
      }
      case 'REMOVE_FRIEND': {
        this.removeFriend(action.uid);
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

const friendStore = new FriendStore();

dispatcher.register(friendStore.handleActions);

export default friendStore;
