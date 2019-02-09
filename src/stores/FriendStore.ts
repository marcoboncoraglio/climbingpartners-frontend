import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import { db } from "../firebase/Firebase";

class FriendStore extends EventEmitter {
    uid: string = "0";

    friendList: Array<string> = [];

    //incoming friend requests
    friendRequests: Array<string> = [];

    onLogin(userObject: any) {
        this.uid = userObject.uid;

        db.ref()
            .child("friends/" + this.uid)
            .on("value", snap => {
                if (snap != null) {
                    this.friendList = Object.assign({}, this.friendList, snap.val());
                }
            });

        db.ref()
            .child("friendRequests/" + this.uid)
            .on("value", snap => {
                if (snap != null) {
                    this.friendList = Object.assign({}, this.friendList, snap.val());
                    this.emit("friend_request");
                }
            });
    }

    addFriend(uid: string) {
        this.friendList = [...uid];
        this.SaveFriendList();
    }

    removeFriend(uid: string) {
        this.friendList = this.friendList.filter((elem) => elem == uid);
        this.SaveFriendList();
    }

    SaveFriendList() {
        db.ref()
            .child("friendList/" + this.uid)
            .set(this.friendList);
    }

    SaveFriendRequests() {
        db.ref()
            .child("friendRequests/" + this.uid)
            .set(this.friendList);
        this.emit("change_details");
    }

    getFriendRequests() {
        return this.friendRequests;
    }

    getFriendList() {
        return this.friendList;
    }

    handleActions = (action: any) => {
        switch (action.type) {
            case "ADD_FRIEND": {
                this.addFriend(action.uid);
                break;
            }
            case "REMOVE_FRIEND": {
                this.removeFriend(action.uid);
                break;
            }
            case "LOGIN": {
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
