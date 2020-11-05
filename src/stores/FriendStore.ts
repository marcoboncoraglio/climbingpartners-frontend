import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
const axios = require('axios');

class FriendStore extends EventEmitter {
  uid: string = '0';
  token: any = localStorage.getItem('token');

  friendList: Array<string> = [];

  friendRequests: Array<string> = [];

  url: string = process.env.BACKEND_URL_TEST || 'http://localhost:4000/api/friendLists';

  onLogin(uid: string) {
    this.uid = uid;
    this.token = localStorage.getItem('token');

    axios({
      method: 'get',
      url: `${this.url}`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((friendLists: any) => {
      this.friendList = friendLists.friendList;
      this.friendRequests = friendLists.friendRequests;
    });
  }

  sendFriendRequest(uid: string) {
    let theirFriendRequests: Array<string> = [];

    axios({
      method: 'get',
      url: `${this.url}/requests/${uid}`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then(
      (friendRequests: Array<string>) => (theirFriendRequests = friendRequests)
    );

    if (!theirFriendRequests.includes(this.uid)) {
      theirFriendRequests.push(this.uid);

      // notify that friend request has been sent
      axios({
        method: 'put',
        url: `${this.url}/requests/${uid}`,
        data: { friendRequests: theirFriendRequests },
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      });
    }
  }

  acceptFriendRequest(uid: string) {
    let theirFriendList: Array<string> = [];

    axios({
      method: 'get',
      url: `${this.url}/requests/${uid}`,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((friendList: Array<string>) => (theirFriendList = friendList));

    theirFriendList.push(this.uid);

    axios({
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
    }).then(() => this.emit('change_friend_list'));

    axios
      .set('Authorization', `Bearer ${this.token}`)
      .put(`${this.url}/friends`, { friendList: this.friendList })
      .then((friendList: Array<string>) => (this.friendList = friendList));

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
    }).then(() => this.emit('change_friend_requests'));
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
        this.onLogin(action.uid);
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
