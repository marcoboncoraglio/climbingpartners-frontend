import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
const axios = require('axios');

class FriendStore extends EventEmitter {
  uid: string = '0';

  friendList: Array<string> = [];

  friendRequests: Array<string> = [];

  url: string = process.env.BACKEND_URL_TEST || 'localhost:4000/api/';

  onLogin(userObject: any) {
    this.uid = userObject.uid;

    axios
      .get(`${this.url}/friends`)
      .then((friendList: Array<string>) => (this.friendList = friendList));

    axios
      .get(`${this.url}/requests`)
      .then(
        (friendRequests: Array<string>) =>
          (this.friendRequests = friendRequests)
      );
  }

  sendFriendRequest(uid: string) {
    let theirFriendRequests: Array<string> = [];

    axios
      .get(`${this.url}/requests/${uid}`)
      .then(
        (friendRequests: Array<string>) =>
          (theirFriendRequests = friendRequests)
      );

    if (!theirFriendRequests.includes(this.uid)) {
      theirFriendRequests.push(this.uid);

      axios
        .put(`${this.url}/requests/${uid}`, { friendRequests: theirFriendRequests })
        .then(
          (friendRequests: Array<string>) =>
            (theirFriendRequests = friendRequests)
        );
    }
  }

  acceptFriendRequest(uid: string) {
    let theirFriendList: Array<string> = [];

    axios
      .get(`${this.url}/friends/${uid}`)
      .then((friendList: Array<string>) => (theirFriendList = friendList));

    theirFriendList.push(this.uid);

    axios.put(`${this.url}/friends/${uid}`, { friendList: theirFriendList });

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
    axios
      .put(`${this.url}/friends`, { friendList: this.friendList })
      .then((friendList: Array<string>) => (this.friendList = friendList));

    this.emit('change_friend_list');
  }

  saveFriendRequests() {
    axios
      .put(`${this.url}/requests`, { friendRequests: this.friendRequests })
      .then(
        (friendRequests: Array<string>) =>
          (this.friendRequests = friendRequests)
      );

    this.emit('change_friend_requests');
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

const friendStore = new FriendStore();

dispatcher.register(friendStore.handleActions);

export default friendStore;
