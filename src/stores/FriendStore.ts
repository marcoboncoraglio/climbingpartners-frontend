import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
const axios = require('axios');

class FriendStore extends EventEmitter {
  uid: any = localStorage.getItem('uid');
  token: any = localStorage.getItem('token');

  friendList: Array<string> = [];
  friendRequests: Array<string> = [];

  url: string =
    (process.env.BACKEND_URL_TEST as string) ||
    'http://localhost:4000/api/friends';

  async onLogin() {
    this.uid = localStorage.getItem('uid');
    this.token = localStorage.getItem('token');

    await this.updateLists();
  }

  async updateLists() {
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

  // notify user that friend request has been sent
  async sendFriendRequest(uid: string) {
    await axios({
      method: 'post',
      url: `${this.url}/sendFriendRequest/`,
      data: { addedFriendId: uid },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
  }

  async acceptFriendRequest(uid: string) {
    await axios({
      method: 'post',
      url: `${this.url}/acceptFriendRequest`,
      data: { acceptedFriendId: uid },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.friendList.push(uid);
      this.friendRequests = this.friendRequests.filter((id) => id !== uid);
      this.emit('change_friend_list');
      this.emit('change_friend_requests');
    });
  }

  async declineFriendRequest(uid: string) {
    await axios({
      method: 'post',
      url: `${this.url}/declineFriendRequest/`,
      data: { declinedFriendId: uid },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.friendRequests = this.friendRequests.filter((id) => id !== uid);
      this.emit('change_friend_requests');
    });
  }

  async removeFriend(uid: string) {
    await axios({
      method: 'delete',
      url: `${this.url}/removeFriendship/`,
      data: { removedFriendId: uid },
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res: any) => {
      this.friendList = this.friendList.filter((id) => id !== uid);
      this.emit('change_friend_list');
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
