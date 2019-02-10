import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import { db } from "../firebase/Firebase";

class FriendStore extends EventEmitter {

    uid: string = "0";

    friendList: Array<string> = [];

    friendRequests: Array<string> = [];

    onLogin(userObject: any) {
        this.uid = userObject.uid;

        db.ref()
            .child("friendList/" + this.uid)
            .on("value", snap => {
                if (snap != null && snap.val() != null) {
                    this.friendList = snap.val();
                    this.emit("friend_list_update");

                }
            });

        db.ref()
            .child("friendRequests/" + this.uid)
            .on("value", snap => {
                if (snap != null && snap.val() != null) {
                    this.friendRequests = snap.val();
                    this.emit("friend_request");
                }
            });
    }

    addFriend(uid: string) {
        this.friendList.push(uid);
        this.saveFriendList();
    }

    removeFriend(uid: string) {
        this.friendList = this.friendList.filter((elem) => elem == uid);
        this.saveFriendList();
    }

    saveFriendList() {
        db.ref()
            .child("friendList/" + this.uid)
            .set(this.friendList);
        this.emit("change_friend_list");
    }

    saveFriendRequests() {
        db.ref()
            .child("friendRequests/" + this.uid)
            .set(this.friendList);
        this.emit("change_friend_requests");
    }

    getFriendRequests(): Array<string> {
        return this.friendRequests;
    }

    getFriendList(): Array<string> {
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
