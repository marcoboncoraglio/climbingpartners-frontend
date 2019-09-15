import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {config} from './config';

export const signInOptions = [
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
  firebase.auth.GoogleAuthProvider.PROVIDER_ID
]

export const app = firebase.initializeApp(config);
export const auth = app.auth();
export const db = app.database();

