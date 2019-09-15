import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import { db } from "../firebase/Firebase";
import { IUserDetails, IUserCard } from "../interfaces/UserInterfaces";

class UserStore extends EventEmitter {
  uid: string = "0";

  details: IUserDetails = {
    birthday: new Date(1995, 11, 17),
    about: "Hi there!",
    climbingStyles: ["Lead", "Bouldering"],
    availableEquipment: ["60m Rope"],
    languagesSpoken: ["English"]
  };

  card: IUserCard = {
    name: "",
    imgUrl: ""
  };

  getId(): string {
    return this.uid;
  }

  getDetails(uid: string) {
    if (!uid) {
      return new Promise(res => {
        res(this.details);
      });
    } else {
      return new Promise(res => {
        db.ref()
          .child("details/" + uid)
          .on("value", snap => {
            if (snap != null) res(snap.val());
          });
      });
    }
  }

   getCard(uid: string) {
    if (!uid) {
      return this.card;
    } else {
      return new Promise(res => {
        db.ref()
          .child("cards/" + uid)
          .on("value", snap => {
            if (snap != null && snap.val() != null) {
              res(snap.val());
            }
          });
      });
    }
  }

  getName(uid: string) {
    if (!uid) return this.uid;
    else {
      return new Promise(res => {
        db.ref()
          .child("cards/" + uid)
          .on("value", snap => {
            if (snap != null) res(snap.val().name);
          });
      });
    }
  }

  //TODO: dont want to pass entire user, just properties
  setDetails(details: IUserDetails) {
    this.details = details;
    db.ref()
      .child("details/" + this.uid)
      .set(this.details);
    this.emit("change_details");
  }

  setCard(card: IUserCard) {
    this.card = card;
    db.ref()
      .child("cards/" + this.uid)
      .set(this.card);
    this.emit("change_card");
  }

  setName(name: string) {
    this.card.name = name;
    db.ref()
      .child("cards/" + this.uid)
      .set(this.card);
    this.emit("change_card");
  }

  setImg(img: string) {
    this.card.imgUrl = img;
    db.ref()
      .child("cards/" + this.uid)
      .set(this.card);
    this.emit("change_card");
  }

  //TODO: get and use imgUrl
  onLogin(userObj: any) {
    this.uid = userObj.uid;

    if (!this.card.name) {
      this.setName(userObj.displayName);
    }

    db.ref()
      .child("details/" + this.uid)
      .on("value", snap => {
        if (snap != null) {
          this.details = Object.assign({}, this.details, snap.val());
          this.setDetails(this.details);
        }
      });

    db.ref()
      .child("cards/" + this.uid)
      .on("value", snap => {
        if (snap != null) {
          this.card = Object.assign({}, this.card, snap.val());
          this.setCard(this.card);
        }
      });
  }

  handleActions = (action: any) => {
    switch (action.type) {
      case "EDIT_DETAILS": {
        this.setDetails(action.details);
        break;
      }
      case "EDIT_CARD": {
        this.setCard(action.card);
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

const userStore = new UserStore();

dispatcher.register(userStore.handleActions);

export default userStore;
