import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class LoginStore extends EventEmitter {
    UserLoggedIn: boolean = false
    userObject: any;

    login(googleUserObject: any) {
        this.userObject = googleUserObject;
        this.UserLoggedIn = true;
        this.emit("login");
    }

    logout(){
        this.UserLoggedIn = false;
        this.emit("logout");
    }

    getUserName(): string {
        return this.userObject.displayName;
    }

    getUid(): string {
        return this.userObject.uid;
    }

    IsLoggedIn(): boolean{
        return this.UserLoggedIn;
    }

    handleActions = (action: any) => {
        switch (action.type) {
            case "LOGIN": {
                this.login(action.userObject);
                break;
            }
            case "LOGOUT":{
                this.logout();
                break;
            }
            default: {
                return;
            }
        }
    };
}

const loginStore = new LoginStore();

dispatcher.register(loginStore.handleActions);

export default loginStore;